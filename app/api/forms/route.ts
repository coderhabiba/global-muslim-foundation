import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Handles newsletter, volunteer registrations, and contact messages.
 * Stores them directly into Supabase tables when configured.
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const payload = new URLSearchParams(body);
    const formName = payload.get('form-name');

    if (!formName) {
      return NextResponse.json(
        { ok: false, error: 'Missing form-name field.' },
        { status: 400 },
      );
    }

    const hasSupabase =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (hasSupabase) {
      if (formName === 'volunteer') {
        await supabase.from('volunteers').insert({
          full_name: payload.get('name') || payload.get('full_name') || 'Anonymous',
          email: payload.get('email') || '',
          phone: payload.get('phone') || '',
          district: payload.get('district') || '',
          interests: payload.get('interests') || payload.get('skills') || '',
          skills: payload.get('experience') || '',
        });
      } else if (formName === 'newsletter') {
        const email = payload.get('email');
        if (email) {
          await supabase.from('newsletter_subscribers').upsert({ email }, { onConflict: 'email' });
        }
      } else if (formName === 'contact') {
        await supabase.from('contact_messages').insert({
          sender_name: payload.get('name') || 'Anonymous',
          sender_email: payload.get('email') || '',
          sender_phone: payload.get('phone') || '',
          subject: payload.get('subject') || 'General Inquiry',
          message: payload.get('message') || '',
        });
      }
    }

    return NextResponse.json({ ok: true, form: formName }, { status: 200 });
  } catch (err: any) {
    console.error('Form submission processing error:', err);
    return NextResponse.json({ ok: true, error: err.message }, { status: 200 });
  }
}
