import { NextRequest, NextResponse } from 'next/server';
import { EPS } from 'eps-gateway-nodejs';

/**
 * GET /api/payment/eps/status?txId=GMCF...
 *
 * Verifies the payment status of a given merchantTransactionId directly
 * from EPS. Used by the frontend after the user returns from EPS checkout.
 *
 * Response (success):
 *   { ok: true, status: 'Success'|'Failed'|'Pending', data: VerifyPaymentResponse }
 *
 * Response (error):
 *   { ok: false, error: string }
 */

function getEpsClient(): EPS {
  const username   = process.env.EPS_MERCHANT_USERNAME ?? '';
  const password   = process.env.EPS_MERCHANT_PASSWORD ?? '';
  const hashKey    = process.env.EPS_HASH_KEY          ?? '';
  const merchantId = process.env.EPS_MERCHANT_ID       ?? '';
  const storeId    = process.env.EPS_STORE_ID          ?? '';
  const sandbox    = process.env.EPS_SANDBOX === 'true';

  if (!username || !password || !hashKey || !merchantId || !storeId) {
    throw new Error('EPS credentials not configured.');
  }

  return new EPS({ username, password, hashKey, merchantId, storeId, sandbox });
}

export async function GET(req: NextRequest) {
  try {
    const txId = req.nextUrl.searchParams.get('txId');
    if (!txId) {
      return NextResponse.json(
        { ok: false, error: 'Missing txId query parameter.' },
        { status: 400 },
      );
    }

    const eps = getEpsClient();
    const data = await eps.verifyPayment({ merchantTransactionId: txId });

    return NextResponse.json({
      ok:     true,
      status: data.Status, // 'Success' | 'Failed' | 'Pending'
      data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[EPS Status Error]', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
