import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('gmcf_admin_session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = verifySessionToken(sessionCookie);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (error) {
    console.error('Session verify error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

