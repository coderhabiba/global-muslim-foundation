import { NextRequest, NextResponse } from 'next/server';
import { EPS } from 'eps-gateway-nodejs';
import { supabase } from '@/lib/supabase';

/**
 * /api/payment/eps/callback
 *
 * EPS redirects the customer's browser here after payment:
 *   GET  ?status=success|fail|cancel&txId=GMCF...&merchantTransactionId=...
 *
 * EPS may also POST IPN (Instant Payment Notification) with transaction data.
 *
 * Flow:
 *  1. Extract merchantTransactionId from query / body
 *  2. Verify status directly with EPS (never trust the redirect alone)
 *  3. Update Supabase donations table
 *  4. Redirect browser to homepage with result params
 */

const SITE_URL = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

function getEpsClient(): EPS | null {
  const username   = process.env.EPS_MERCHANT_USERNAME ?? '';
  const password   = process.env.EPS_MERCHANT_PASSWORD ?? '';
  const hashKey    = process.env.EPS_HASH_KEY          ?? '';
  const merchantId = process.env.EPS_MERCHANT_ID       ?? '';
  const storeId    = process.env.EPS_STORE_ID          ?? '';
  const sandbox    = process.env.EPS_SANDBOX === 'true';

  if (!username || !password || !hashKey || !merchantId || !storeId) return null;
  return new EPS({ username, password, hashKey, merchantId, storeId, sandbox });
}

async function processCallback(
  urlStatus: string,          // 'success' | 'fail' | 'cancel' from URL
  merchantTxId: string | null,
  epsTxId: string | null,
) {
  if (!merchantTxId) return 'fail';

  // ANTI-FRAUD / FAKE PAYMENT PREVENTION:
  // Never trust the client redirect URL query parameter alone.
  // We strictly verify the transaction cryptographically with EPS Gateway servers.
  let verifiedStatus = 'fail';

  if (urlStatus === 'cancel') {
    verifiedStatus = 'cancel';
  } else {
    try {
      const eps = getEpsClient();
      if (eps) {
        const result = await eps.verifyPayment({ merchantTransactionId: merchantTxId });
        // EPS official verification response must explicitly return 'success'
        if (result && (result.Status?.toLowerCase() === 'success' || result.Status?.toLowerCase() === 'completed')) {
          verifiedStatus = 'success';
        } else {
          console.warn('[EPS Anti-Fraud] Payment verification rejected by EPS:', result?.ErrorMessage || result?.Status);
          verifiedStatus = 'fail';
        }
      } else {
        console.warn('[EPS Callback] EPS client not configured for live verification.');
        verifiedStatus = 'fail';
      }
    } catch (verifyErr) {
      console.error('[EPS Anti-Fraud Error] Verification failed with EPS servers:', verifyErr);
      verifiedStatus = 'fail';
    }
  }

  // Map to Supabase status strictly
  const dbStatus =
    verifiedStatus === 'success' ? 'completed' :
    verifiedStatus === 'cancel'  ? 'cancelled' : 'failed';

  try {
    await supabase
      .from('donations')
      .update({
        status:            dbStatus,
        eps_transaction_id: epsTxId ?? undefined,
      })
      .eq('transaction_id', merchantTxId);
  } catch (dbErr) {
    console.error('[EPS Callback] Supabase update error:', dbErr);
  }

  return verifiedStatus;
}

// ─── Browser Redirect (GET) ───────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  // EPS sends merchantTransactionId in query on redirect
  const merchantTxId =
    sp.get('txId') ??
    sp.get('merchantTransactionId') ??
    sp.get('MerchantTransactionId') ??
    null;

  const epsTxId =
    sp.get('epsTransactionId') ??
    sp.get('EpsTransactionId') ??
    null;

  const urlStatus = (sp.get('status') ?? 'fail').toLowerCase();

  const verifiedStatus = await processCallback(urlStatus, merchantTxId, epsTxId);
  const finalStatus = verifiedStatus ?? urlStatus;

  // Redirect to homepage — the page reads ?payment= and shows a toast/modal
  const dest = new URL('/', SITE_URL());
  dest.searchParams.set('payment', finalStatus);
  if (merchantTxId) dest.searchParams.set('txId', merchantTxId);

  return NextResponse.redirect(dest.toString());
}

// ─── IPN Webhook (POST) ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    let body: Record<string, string> = {};

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      new URLSearchParams(text).forEach((v, k) => { body[k] = v; });
    }

    const merchantTxId =
      body.merchantTransactionId ??
      body.MerchantTransactionId ??
      null;

    const epsTxId =
      body.epsTransactionId ??
      body.EpsTransactionId ??
      null;

    const rawStatus: string =
      body.status ?? body.Status ?? body.transactionStatus ?? 'failed';
    const urlStatus = rawStatus.toLowerCase().includes('success') ? 'success' : 'fail';

    await processCallback(urlStatus, merchantTxId, epsTxId);

    // EPS expects HTTP 200 to acknowledge IPN
    return NextResponse.json({ ok: true, received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[EPS IPN Error]', message);
    // Return 200 to prevent EPS from retrying
    return NextResponse.json({ ok: false, error: message });
  }
}
