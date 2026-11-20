import { NextRequest, NextResponse } from 'next/server';
import {
  verifySessionToken,
  verifyAdminPassword,
  setCustomAdminPassword,
} from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin via session cookie or header
    const token =
      req.cookies.get('gmcf_admin_session')?.value ||
      req.cookies.get('gmcf_admin_token')?.value ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      return NextResponse.json({ error: 'অননুমোদিত অ্যাক্সেস। অনুগ্রহ করে লগইন করুন।' }, { status: 401 });
    }

    const session = verifySessionToken(token);
    if (!session || !session.email) {
      return NextResponse.json({ error: 'সেশন মেয়াদোত্তীর্ণ বা অবৈধ। পুনরায় লগইন করুন।' }, { status: 401 });
    }

    const body = await req.json();
    const currentPassword = (body.currentPassword || '').trim();
    const newPassword = (body.newPassword || '').trim();
    const confirmPassword = (body.confirmPassword || '').trim();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'বর্তমান এবং নতুন পাসওয়ার্ড উভয়ই প্রদান করা আবশ্যক।' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'নতুন পাসওয়ার্ড ন্যূনতম ৮ অক্ষরের হতে হবে।' }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।' }, { status: 400 });
    }

    // Determine current fallback password
    const emailLower = session.email.toLowerCase();
    const envFallback =
      emailLower === (process.env.ADMIN_EMAIL || 'gmcfoundation2022@gmail.com').toLowerCase()
        ? process.env.ADMIN_PASSWORD || 'gmcf#Admin2025!'
        : process.env.ADMIN_BACKUP_PASSWORD || 'gmcf2025';

    // Verify current password
    const isCurrentCorrect = await verifyAdminPassword(currentPassword, emailLower, envFallback);
    if (!isCurrentCorrect) {
      return NextResponse.json({ error: 'বর্তমান পাসওয়ার্ডটি সঠিক নয়।' }, { status: 400 });
    }

    // Hash with bcrypt and store securely
    const success = await setCustomAdminPassword(emailLower, newPassword);
    if (!success) {
      return NextResponse.json({ error: 'পাসওয়ার্ড সংরক্ষণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে এবং সিকিউর হ্যাশ হিসেবে সংরক্ষিত হয়েছে।',
    });
  } catch (error: any) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'সার্ভারে অভ্যন্তরীণ ত্রুটি ঘটেছে।' }, { status: 500 });
  }
}
