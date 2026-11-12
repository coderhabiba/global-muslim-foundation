import { NextRequest, NextResponse } from 'next/server';
import { EPS, generateTransactionId, TransactionType } from 'eps-gateway-nodejs';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/payment/eps/init
 *
 * Initialises an EPS payment session using the eps-gateway-nodejs package.
 * Returns a RedirectURL that the client navigates to for checkout.
 *
 * Request JSON:
 *   { amount, currency?, cause?, donorName?, donorEmail?, donorPhone?, donorAddress? }
 *
 * Response JSON (success):
 *   { ok: true, redirectUrl: string, merchantTransactionId: string }
 *
 * Response JSON (error):
 *   { ok: false, error: string, missingConfig?: true }
 */

// ─── EPS client singleton (created once per server process) ──────────────────
function getEpsClient(): EPS {
  const username   = process.env.EPS_MERCHANT_USERNAME ?? '';
  const password   = process.env.EPS_MERCHANT_PASSWORD ?? '';
  const hashKey    = process.env.EPS_HASH_KEY          ?? '';
  const merchantId = process.env.EPS_MERCHANT_ID       ?? '';
  const storeId    = process.env.EPS_STORE_ID          ?? '';
  const sandbox    = process.env.EPS_SANDBOX === 'true';

  if (!username || !password || !hashKey || !merchantId || !storeId) {
    throw new Error('EPS credentials not fully configured. Please set EPS_MERCHANT_USERNAME, EPS_MERCHANT_PASSWORD, EPS_HASH_KEY, EPS_MERCHANT_ID, and EPS_STORE_ID in your environment.');
  }

  return new EPS({ username, password, hashKey, merchantId, storeId, sandbox });
}

// ─── Callback URL helpers ─────────────────────────────────────────────────────
const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

const callbackUrl = (status: string, txId: string) =>
  process.env[`EPS_${status.toUpperCase()}_URL`]
    ? `${process.env[`EPS_${status.toUpperCase()}_URL`]}&txId=${txId}`
    : `${siteUrl()}/api/payment/eps/callback?status=${status}&txId=${txId}`;

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const {
      amount       = 0,
      currency     = 'BDT',
      cause        = 'General Humanitarian Relief Fund',
      donorName    = 'Anonymous Donor',
      donorEmail   = '',
      donorPhone   = '',
      donorAddress = '',
    } = (await req.json()) as {
      amount: number;
      currency?: string;
      cause?: string;
      donorName?: string;
      donorEmail?: string;
      donorPhone?: string;
      donorAddress?: string;
    };

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { ok: false, error: 'Invalid or missing donation amount.' },
        { status: 400 },
      );
    }

    // Instantiate EPS client (throws if env vars missing)
    let eps: EPS;
    try {
      eps = getEpsClient();
    } catch (configErr: unknown) {
      return NextResponse.json(
        {
          ok: false,
          missingConfig: true,
          error: configErr instanceof Error ? configErr.message : String(configErr),
        },
        { status: 503 },
      );
    }

    const merchantTransactionId = generateTransactionId();

    const payment = await eps.initializePayment({
      customerOrderId:    merchantTransactionId,
      merchantTransactionId,
      transactionTypeId:  TransactionType.WEB,
      totalAmount:        amount,

      successUrl: callbackUrl('success', merchantTransactionId),
      failUrl:    callbackUrl('fail',    merchantTransactionId),
      cancelUrl:  callbackUrl('cancel',  merchantTransactionId),

      customerName:     donorName,
      customerEmail:    donorEmail,
      customerPhone:    donorPhone || '01000000000',
      customerAddress:  donorAddress || 'Dhaka, Bangladesh',
      customerCity:     'Dhaka',
      customerState:    'Dhaka',
      customerPostcode: '1000',
      customerCountry:  'BD',

      productName:    cause,
      productProfile: 'non-physical-goods',
      productCategory:'Donation',
      noOfItem:       1,

      // Pass metadata for callback verification
      valueA: cause,
      valueB: currency,
      valueC: donorName,

      shippingMethod: 'NO',
      ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1',
    });

    if (!payment.RedirectURL) {
      throw new Error(
        `EPS did not return a RedirectURL. ErrorMessage: ${payment.ErrorMessage}`,
      );
    }

    // Save pending donation to Supabase
    try {
      await supabase.from('donations').insert({
        donor_name:     donorName,
        donor_phone:    donorPhone,
        donor_email:    donorEmail,
        amount,
        currency,
        cause,
        payment_method: 'EPS',
        transaction_id: merchantTransactionId,
        eps_transaction_id: payment.TransactionId || null,
        status:         'pending',
      });
    } catch (dbErr) {
      console.error('[EPS Init] Supabase insert error (non-fatal):', dbErr);
    }

    return NextResponse.json({
      ok: true,
      redirectUrl: payment.RedirectURL,
      merchantTransactionId,
      epsTransactionId: payment.TransactionId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[EPS Init Error]', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
