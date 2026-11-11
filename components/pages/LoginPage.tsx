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
    <main data-l10n="off" className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white text-zinc-900">
      {/* ============================================================== */}
      {/* Left Column: Full-Height Visual Hero Panel (7 cols on lg) */}
      {/* ============================================================== */}
      <div className="relative hidden lg:flex lg:col-span-7 xl:col-span-7 flex-col justify-between p-12 xl:p-16 text-white overflow-hidden bg-zinc-950 min-h-screen">
        {/* Full-bleed background image with multi-layer modern overlay */}
        <img
          src="/images/street-children-hot-meals.jpg"
          alt="GMCF Humanitarian Relief Work"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-emerald-950/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-white/15 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>রেজিস্ট্রেশন নং: S-14086/2023 | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত</span>
          </div>

          <Link
            href="/"
            className="text-xs font-medium text-white/80 hover:text-white inline-flex items-center gap-1.5 transition-colors"
          >
            <span>ওয়েবসাইট হোম</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Middle: Mission & Chairman Quote */}
        <div className="relative z-10 max-w-xl space-y-4 my-auto py-10">
          <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium">
            Global Muslim Charitable Foundation
          </div>
          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif-heading">
            সুবিধাবঞ্চিত মানুষের সেবায় নিবেদিত বিশ্বস্ত মানবিক প্ল্যাটফর্ম
          </h1>
          <p className="text-sm xl:text-base text-zinc-300 leading-relaxed font-normal">
            ১০০% যাকাত তামলিক পলিসি ও শতভাগ স্বচ্ছতার সাথে প্রতিটি আমানত সরাসরি মুস্তাহিক ও প্রান্তিক অসহায় মানুষের কাছে পৌঁছে দেওয়া আমাদের মূল অঙ্গীকার।
          </p>

          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-zinc-200 leading-relaxed italic">
            &ldquo;আমাদের প্রতিটি অনুদান সরাসরি ফিল্ডে সুবিধাবঞ্চিত মানুষের জীবন পরিবর্তনের আলো জ্বালায়। কোনো প্রশাসনিক অপচয় ছাড়াই প্রতিটি টাকা হকদারদের জন্য নির্ধারিত।&rdquo;
            <span className="block mt-2 font-semibold not-italic text-emerald-300">— মোহাম্মদ আলী মোস্তফা, চেয়ারম্যান</span>
          </div>
        </div>

        {/* Bottom: 3 Trust Credentials Badges */}
        <div className="relative z-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
            <p className="text-xl font-bold font-mono text-emerald-400">১০০%</p>
            <p className="text-xs text-zinc-300 font-medium mt-0.5">যাকাত বণ্টন নীতি</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
            <p className="text-xl font-bold font-mono text-emerald-400">০%</p>
            <p className="text-xs text-zinc-300 font-medium mt-0.5">অ্যাডমিন ফি কর্তন</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10">
            <p className="text-lg font-bold font-mono text-emerald-400">S-14086</p>
            <p className="text-xs text-zinc-300 font-medium mt-0.5">সরকারি লাইসেন্স</p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* Right Column: Clean Form Container (5 cols on lg) */}
      {/* ============================================================== */}
      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between min-h-screen p-6 sm:p-10 lg:p-14 bg-white">
        {/* Top: Transparent Logo with NO WHITE WRAPPER BACKGROUND */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block group" title="Global Muslim Charitable Foundation">
            {/* Direct transparent logo, NO white wrapper box! */}
            <img
              src="/images/gmcf-logo-full.png"
              alt="Global Muslim Charitable Foundation Logo"
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          <Link
            href="/"
            className="lg:hidden text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
          >
            <span>মূল সাইট</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Center: Auth Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className="mb-7">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-mono font-medium border border-zinc-200 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>GMCF Secure Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-serif-heading">
              {isBn ? 'অ্যাডমিন ও স্টাফ লগইন' : 'Staff & Admin Login'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5">
              {isBn
                ? 'ম্যানেজমেন্ট পোর্টালে প্রবেশের জন্য আপনার অফিসিয়াল তথ্য দিন'
                : 'Enter your verified official credentials to access the console'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5 animate-in fade-in">
              <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
              <span className="font-medium leading-snug">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
                {isBn ? 'অফিসিয়াল ইমেইল' : 'Official Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="gmcfoundation2022@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all shadow-2xs"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-2.5 sm:top-3 text-zinc-400 text-[20px] pointer-events-none">
                  mail
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1.5">
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
                  className="w-full px-3.5 py-2.5 sm:py-3 pr-11 rounded-xl bg-zinc-50/50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-mono transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 sm:top-3 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                  title={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-emerald-700 focus:ring-0 cursor-pointer"
                />
                <span>{isBn ? 'লগইন মনে রাখুন (২৪ ঘণ্টা)' : 'Remember me (24h)'}</span>
              </label>

              <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                <span>SSL এনক্রিপ্টেড</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 sm:py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-3 active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                  <span>{isBn ? 'নিরাপত্তা যাচাই হচ্ছে...' : 'Verifying security token...'}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[19px]">lock_open</span>
                  <span>{isBn ? 'সুরক্ষিত সাইন ইন করুন' : 'Sign In to Dashboard'}</span>
                </>
              )}
            </button>
          </form>

          {/* Security Instruction Badge */}
          <div className="mt-6 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">verified_user</span>
            <div className="text-[11px] text-zinc-600 leading-relaxed">
              <span className="font-semibold text-zinc-800 block">অনুমোদিত অ্যাক্সেস সংক্রান্ত নির্দেশনা:</span>
              এই পোর্টালটি শুধুমাত্র গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের অফিসিয়াল স্টাফ ও পরিচালনা পর্ষদের জন্য সংরক্ষিত।
            </div>
          </div>
        </div>

        {/* Bottom footer links */}
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-2">
          <Link
            href="/"
            className="hover:text-emerald-800 inline-flex items-center gap-1 font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>{isBn ? 'মূল ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
          </Link>
          <span className="text-[11px] text-zinc-400 font-mono">
            © ২০২৫ GMCF • রেজি: S-14086/2023
          </span>
        </div>
      </div>
    </main>
  );
}
