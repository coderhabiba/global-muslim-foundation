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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === 'admin@gmcf.org' ||
          cleanEmail === 'gmcfoundation2022@gmail.com' ||
          cleanEmail === 'admin') &&
        (password === 'admin123' || password === 'gmcf2025' || password === 'admin')
      ) {
        localStorage.setItem(
          'gmcf:admin_auth',
          JSON.stringify({
            email: cleanEmail,
            role: 'SUPER_ADMIN',
            name: 'Mohammad Ali Mostafa (Chairman)',
            loginTime: new Date().toISOString(),
          })
        );
        document.cookie = 'gmcf_admin_token=active_session; path=/; max-age=86400';
        router.push('/admin');
      } else {
        setIsLoading(false);
        setError(
          isBn
            ? 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে ডেমো তথ্য ব্যবহার করুন।'
            : 'Invalid email or password. Please use the verified demo credentials below.'
        );
      }
    }, 600);
  };

  const handleQuickFill = () => {
    setEmail('gmcfoundation2022@gmail.com');
    setPassword('gmcf2025');
    setError('');
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
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-2">
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
                  type="text"
                  required
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
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-mono transition-all"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-slate-400 text-[20px] pointer-events-none">
                  lock
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-emerald-800 focus:ring-0"
                />
                <span>{isBn ? 'লগইন মনে রাখুন' : 'Remember Me'}</span>
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-emerald-800 hover:text-emerald-950 font-bold hover:underline cursor-pointer"
              >
                {isBn ? 'স্বয়ংক্রিয় পূরণ করুন' : 'Auto-fill Demo'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">
                    progress_activity
                  </span>
                  <span>{isBn ? 'যাচাই করা হচ্ছে...' : 'Verifying Credentials...'}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[19px]">login</span>
                  <span>{isBn ? 'লগইন করুন' : 'Sign In to Dashboard'}</span>
                </>
              )}
            </button>
          </form>

          {/* Clean Demo Info Pill Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between text-slate-800 font-bold border-b border-slate-200 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">
                  vpn_key
                </span>
                <span>{isBn ? 'ডেমো লগইন অ্যাক্সেস' : 'Demo Login Credentials'}</span>
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer"
              >
                {isBn ? 'ক্লিক করে বসান' : 'Fill'}
              </button>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700">
              <p>
                Email: <strong className="text-emerald-900">gmcfoundation2022@gmail.com</strong>
              </p>
              <p>
                Password: <strong className="text-emerald-900">gmcf2025</strong>{' '}
                <span className="text-slate-500">
                  ({isBn ? 'অথবা admin / admin' : 'or admin / admin'})
                </span>
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
