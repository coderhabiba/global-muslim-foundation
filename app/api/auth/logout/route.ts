import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Clear session cookies
  response.cookies.set({
    name: 'gmcf_admin_session',
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set({
    name: 'gmcf_admin_token',
    value: '',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

