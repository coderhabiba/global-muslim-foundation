'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSiteSettings } from '@/lib/site-settings';

/**
 * FloatingContactWidget
 * Floating Speed-Dial Contact Component for GMC Foundation
 * Expands to reveal 3 direct channels:
 * 1. WhatsApp (+8801913119525)
 * 2. Facebook Messenger (https://m.me/100088694393644)
 * 3. Email (gmcfoundation2022@gmail.com)
 */
export default function FloatingContactWidget() {
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const facebookPageUrl =
    'https://www.facebook.com/profile.php?id=100088694393644';
  const messengerUrl = 'https://m.me/100088694393644';
  const whatsappUrl = `https://wa.me/8801913119525?text=${encodeURIComponent(
    isBn
      ? 'আসসালামু আলাইকুম, আমি গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশন (GMCF)-এর কার্যক্রম ও অনুদান সম্পর্কে জানতে চাই।'
      : 'Assalamu Alaikum, I would like to learn more about Global Muslim Charitable Foundation projects and donations.'
  )}`;
  const mailUrl = `mailto:gmcfoundation2022@gmail.com?subject=${encodeURIComponent(
    isBn
      ? 'GMC Foundation — তথ্য ও মানবিক সহায়তা অনুসন্ধান'
      : 'GMC Foundation — Inquiry & Humanitarian Support'
  )}`;

  return (
    <div
      ref={containerRef}
      className="fixed right-3 sm:right-5 bottom-5 sm:bottom-6 z-40 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Expanded Speed-Dial Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={isBn ? 'যোগাযোগের মাধ্যমসমূহ' : 'Contact channels'}
          className="mb-3 w-[290px] sm:w-[320px] bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                {isBn ? 'সরাসরি যোগাযোগ ও সহায়তা' : 'Direct Contact & Support'}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            {isBn
              ? 'যেকোনো অনুদান, যাকাত বা প্রজেক্ট সংক্রান্ত তথ্যে আমাদের সাথে তাৎক্ষণিক যুক্ত হোন:'
              : 'Reach out to our team instantly regarding donations, Zakat, or projects:'}
          </p>

          {/* Action List */}
          <div className="space-y-2">
            {/* 1. WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] text-slate-800 hover:text-white border border-[#25D366]/25 hover:border-transparent transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  {/* WhatsApp SVG Icon */}
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-bold text-xs block group-hover:text-white">
                    {isBn ? 'হোয়াটসঅ্যাপে চ্যাট' : 'WhatsApp Chat'}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-white/90 font-mono">
                    +880 1913-119525
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </a>

            {/* 2. Messenger / Facebook Button */}
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-2xl bg-[#0084FF]/10 hover:bg-[#0084FF] text-slate-800 hover:text-white border border-[#0084FF]/25 hover:border-transparent transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  {/* Messenger SVG Icon */}
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.096.304 2.256.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.74 8.35l3.13 3.259 5.888-3.259-6.567 6.613z" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-bold text-xs block group-hover:text-white">
                    {isBn ? 'মেসেঞ্জারে নক দিন' : 'Facebook Messenger'}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-white/90">
                    GMC Foundation Page
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </a>

            {/* 3. Official Email Button */}
            <a
              href={mailUrl}
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-600 text-slate-800 hover:text-white border border-rose-200/60 hover:border-transparent transition-all duration-200 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </div>
                <div className="text-left">
                  <span className="font-bold text-xs block group-hover:text-white">
                    {isBn ? 'অফিসিয়াল ইমেইল' : 'Official Email'}
                  </span>
                  <span className="text-[10px] text-slate-500 group-hover:text-white/90 font-mono truncate max-w-[170px] block">
                    gmcfoundation2022@gmail.com
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Facebook Page Quick Link */}
          <div className="pt-1 text-center">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
            >
              <span>{isBn ? 'অফিসিয়াল ফেসবুক পেইজ ভিজিট করুন' : 'Visit Official Facebook Page'}</span>
              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button (Compact Floating Action Button) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isBn ? 'সরাসরি যোগাযোগ ও সহায়তা বাটন' : 'Contact and Support Button'}
        className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 ${
          isOpen
            ? 'bg-slate-900 text-white border border-slate-700'
            : 'bg-gradient-to-r from-emerald-800 via-[#0e4d36] to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white border border-emerald-400/40 shadow-emerald-900/40'
        }`}
      >
        {/* Subtle Ambient Ping when Closed */}
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white" />
            </span>
          </>
        )}

        {/* Dynamic Icon */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span
            className={`material-symbols-outlined text-[26px] sm:text-[28px] transition-transform duration-300 ${
              isOpen ? 'rotate-90 text-rose-400' : 'rotate-0 text-amber-300'
            }`}
          >
            {isOpen ? 'close' : 'support_agent'}
          </span>
        </div>
      </button>
    </div>
  );
}
