import { NextResponse } from 'next/server';

/**
 * Accepts the newsletter and volunteer submissions that the legacy Netlify
 * build posted back to `/`. Persisting them is intentionally left to the host
 * (database, CRM or e-mail provider); the endpoints keep the original
 * fire-and-forget contract so the UI behaves exactly as before.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const payload = new URLSearchParams(body);
  const formName = payload.get('form-name');

  if (!formName) {
    return NextResponse.json(
      { ok: false, error: 'Missing form-name field.' },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true, form: formName }, { status: 200 });
}
