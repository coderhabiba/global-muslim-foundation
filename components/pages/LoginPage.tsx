'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Demo credentials check: admin@gmcf.org / admin123 OR gmcfoundation2022@gmail.com / gmcf2025
      const cleanEmail = email.trim().toLowerCase();
      if (
        (cleanEmail === 'admin@gmcf.org' || cleanEmail === 'gmcfoundation2022@gmail.com' || cleanEmail === 'admin') &&
        (password === 'admin123' || password === 'gmcf2025' || password === 'admin')
      ) {
        // Store session in localStorage and cookie
        localStorage.setItem('gmcf:admin_auth', JSON.stringify({
          email: cleanEmail,
          role: 'SUPER_ADMIN',
          name: 'Mohammad Ali Mostafa (Chairman)',
          loginTime: new Date().toISOString(),
        }));
        document.cookie = 'gmcf_admin_token=active_session; path=/; max-age=86400';
        router.push('/admin');
      } else {
        setIsLoading(false);
        setError('ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে ডেমো তথ্য ব্যবহার করুন।');
      }
    }, 600);
  };

  const handleQuickFill = () => {
    setEmail('gmcfoundation2022@gmail.com');
    setPassword('gmcf2025');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 flex items-center justify-center p-4 pt-28 pb-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-fadeIn">
        {/* Header Branding */}
        <div className="bg-emerald-900/90 text-white p-7 text-center relative border-b border-emerald-800">
          <Link href="/" className="inline-block group mb-3">
            <div className="bg-white/95 p-2 rounded-2xl inline-block shadow-md group-hover:scale-105 transition-transform">
              <img
                src="/images/gmcf-logo-full.png"
                alt="Global Muslim Charitable Foundation Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
          </Link>
          <h2 className="text-xl font-bold font-serif-heading text-white">
            অ্যাডমিন ও স্টাফ লগইন
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1">
            Global Muslim Charitable Foundation Management Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                ইমেইল ঠিকানা / ইউজারনেম
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="gmcfoundation2022@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-slate-400 text-[20px]">
                  mail
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                গোপন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-3 text-slate-400 text-[20px]">
                  lock
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-emerald-700 focus:ring-0" />
                <span>মনে রাখুন</span>
              </label>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                ডেমো লগইন পূরণ করুন
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[18px]">
                    progress_activity
                  </span>
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  <span>লগইন করুন</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between text-slate-700 font-bold border-b border-slate-200 pb-1.5">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-[16px]">key</span>
                পরীক্ষামূলক ডেমো লগইন তথ্য:
              </span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold hover:bg-emerald-200"
              >
                স্বয়ংক্রিয় বসান
              </button>
            </div>
            <p className="font-mono text-[11px] text-slate-700">
              Email: <strong>gmcfoundation2022@gmail.com</strong>
            </p>
            <p className="font-mono text-[11px] text-slate-700">
              Password: <strong>gmcf2025</strong> (অথবা <strong>admin / admin</strong>)
            </p>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-emerald-800 inline-flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              মূল ওয়েবসাইটে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
