import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  recordFailedAttempt,
  resetLoginAttempts,
  timingSafeCompare,
  createSessionToken,
} from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    // 1. Check rate limit
    const { isLocked, remainingSec } = checkRateLimit(ip);
    if (isLocked) {
      return NextResponse.json(
        {
          error: `অতিরিক্ত ভুল চেষ্টার কারণে লগইন সাময়িকভাবে লক রয়েছে। অনুগ্রহ করে ${Math.ceil(
            remainingSec / 60
          )} মিনিট পর আবার চেষ্টা করুন।`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ইমেইল ও পাসওয়ার্ড উভয়ই প্রদান করা আবশ্যক।' },
        { status: 400 }
      );
    }

    // 2. Verified Server Credentials (from Environment Variables)
    const validUsers = [
      {
        email: (process.env.ADMIN_EMAIL || 'gmcfoundation2022@gmail.com').toLowerCase(),
        password: process.env.ADMIN_PASSWORD || 'gmcf#Admin2025!',
        name: 'Mohammad Ali Mostafa (Chairman)',
        role: 'SUPER_ADMIN' as const,
      },
      {
        email: (process.env.ADMIN_BACKUP_EMAIL || 'admin@gmcf.org').toLowerCase(),
        password: process.env.ADMIN_BACKUP_PASSWORD || 'gmcf2025',
        name: 'GMCF System Administrator',
        role: 'ADMIN' as const,
      },
    ];

    // Find user
    const matchedUser = validUsers.find(
      u => u.email === email && timingSafeCompare(password, u.password)
    );

    if (!matchedUser) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে। পুনরায় যাচাই করুন।' },
        { status: 401 }
      );
    }

    // Reset rate limiter on success
    resetLoginAttempts(ip);

    const rememberMe = Boolean(body.rememberMe);
    // If rememberMe: 30 days session, else 24 hours
    const sessionMaxAge = rememberMe ? 30 * 86400 : 86400;

    // 3. Create cryptographically signed session token
    const token = createSessionToken(
      {
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
      },
      sessionMaxAge
    );

    const response = NextResponse.json({
      success: true,
      user: {
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
      },
    });

    // 4. Set HttpOnly, SameSite=Lax, Secure session cookie
    response.cookies.set({
      name: 'gmcf_admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: sessionMaxAge,
    });

    // Also set client-accessible flag cookie for Next.js middleware if needed
    response.cookies.set({
      name: 'gmcf_admin_token',
      value: 'active_session',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: sessionMaxAge,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'সার্ভার প্রক্রিয়াকরণে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}

