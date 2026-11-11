'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSiteSettings } from '@/lib/site-settings';

export default function LoginPage() {
  const router = useRouter();
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(
          data.error ||
            (isBn
              ? 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।'
              : 'Invalid email or password.')
        );
        return;
      }

      // Store client session info for instant hydration
      localStorage.setItem(
        'gmcf:admin_auth',
        JSON.stringify({
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
          loginTime: new Date().toISOString(),
        })
      );

      // Redirect to Admin Dashboard
      router.push('/admin');
    } catch {
      setIsLoading(false);
      setError(
        isBn
          ? 'সার্ভার সংযোগে ত্রুটি দেখা দিয়েছে। কিছুক্ষণ পর চেষ্টা করুন।'
          : 'Unable to connect to the authentication server.'
      );
    }
  };

  return (
    <main
      data-l10n="off"
      className="min-h-screen bg-[#f3f6f4] flex items-center justify-center px-4 pt-32 sm:pt-36 pb-20"
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(4,78,66,0.08)] border border-slate-200/80 overflow-hidden transition-all">
        {/* Top Header Card */}
        <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white p-7 sm:p-8 text-center relative border-b border-emerald-800/80">
          <Link href="/" className="inline-block group mb-3.5">
            <div className="bg-white px-3.5 py-1.5 rounded-2xl inline-block shadow-md group-hover:scale-105 transition-transform">
              <img
                src="/images/gmcf-logo-full.png"
                alt="Global Muslim Charitable Foundation Logo"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </div>
          </Link>
          <h2 className="text-xl sm:text-2xl font-black font-serif-heading text-white tracking-tight">
            {isBn ? 'অ্যাডমিন ও স্টাফ পোর্টাল' : 'Staff & Admin Portal'}
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1 font-medium">
            {isBn
              ? 'গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন ম্যানেজমেন্ট'
              : 'Global Muslim Charitable Foundation Secure Access'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">
                error
              </span>
              <span className="font-medium leading-snug">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {isBn ? 'অফিসিয়াল ইমেইল ঠিকানা' : 'Official Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="gmcfoundation2022@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-slate-400 text-[20px] pointer-events-none">
                  mail
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {isBn ? 'গোপন পাসওয়ার্ড' : 'Account Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-emerald-800 focus:ring-0"
                />
                <span>{isBn ? 'লগইন মনে রাখুন (২৪ ঘণ্টা)' : 'Remember Me (24h)'}</span>
              </label>
              <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>{isBn ? 'SSL এনক্রিপ্টেড' : 'SSL Protected'}</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-3 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">
                    progress_activity
                  </span>
                  <span>{isBn ? 'নিরাপত্তা যাচাই হচ্ছে...' : 'Verifying Security Token...'}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[19px]">lock_open</span>
                  <span>{isBn ? 'সুরক্ষিত লগইন করুন' : 'Secure Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice Box */}
          <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="text-[11px] leading-relaxed text-emerald-800">
              <p className="font-bold">{isBn ? 'নিরাপত্তা নির্দেশনা' : 'Authorized Access Only'}</p>
              <p className="text-emerald-700 mt-0.5">
                {isBn
                  ? 'এই পোর্টালটি শুধুমাত্র গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের অনুমোদিত কর্মকর্তা ও ট্রাস্টি বোর্ডের সদস্যদের জন্য সংরক্ষিত।'
                  : 'This management console is restricted strictly to authorized staff and board members of GMCF.'}
              </p>
            </div>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-emerald-800 inline-flex items-center gap-1 font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>{isBn ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Back to Home'}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
