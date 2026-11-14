'use client';

import React, { useEffect, useState } from 'react';
import { useSiteSettings } from '@/lib/site-settings';

/**
 * ScrollControlsWidget
 * Floating navigation widget with Scroll-To-Top and Scroll-To-Bottom buttons
 * - Powered by Lenis smooth scrolling with native fallback
 * - Displays live scroll percentage progress ring/indicator
 * - Accessible, responsive, and available across all pages
 */
export default function ScrollControlsWidget() {
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const percent = Math.min(
          100,
          Math.max(0, Math.round((scrollY / scrollHeight) * 100))
        );
        setScrollProgress(percent);
        setIsAtTop(scrollY < 120);
        setIsAtBottom(scrollY >= scrollHeight - 120);
      } else {
        setScrollProgress(0);
        setIsAtTop(true);
        setIsAtBottom(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToBottom = () => {
    if (typeof window !== 'undefined') {
      const target = document.documentElement.scrollHeight;
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 1.2 });
      } else {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div
      aria-label="Scroll Navigation"
      className="fixed right-3 sm:right-5 bottom-24 sm:bottom-28 z-40 flex flex-col items-center gap-1.5 pointer-events-auto select-none"
    >
      <div className="bg-emerald-950/85 hover:bg-emerald-950/95 backdrop-blur-md p-1 rounded-2xl border border-emerald-700/40 shadow-xl shadow-black/25 flex flex-col items-center transition-all duration-300 group">
        {/* Scroll To Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          title={isBn ? 'পৃষ্ঠার একদম উপরে যান' : 'Scroll to top'}
          aria-label={isBn ? 'পৃষ্ঠার একদম উপরে যান' : 'Scroll to top'}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${
            isAtTop
              ? 'text-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-900/40'
              : 'text-amber-400 hover:text-amber-300 hover:bg-emerald-900/60 shadow-xs'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] transition-transform duration-200 group-hover:-translate-y-0.5">
            arrow_upward
          </span>
        </button>

        {/* Dynamic Circular Progress Indicator */}
        <div
          className="relative w-8 h-8 flex items-center justify-center my-0.5 cursor-pointer"
          onClick={isAtTop ? scrollToBottom : scrollToTop}
          title={
            isBn
              ? `স্ক্রল অগ্রগতি: ${scrollProgress}% (${isAtTop ? 'নিচে যান' : 'উপরে যান'})`
              : `Scroll progress: ${scrollProgress}% (${isAtTop ? 'Go to bottom' : 'Go to top'})`
          }
        >
          <svg className="w-7 h-7 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-emerald-900/70"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-amber-400 transition-all duration-150 ease-out"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[9px] font-mono font-bold text-emerald-200">
            {scrollProgress}
          </span>
        </div>

        {/* Scroll To Bottom Button */}
        <button
          type="button"
          onClick={scrollToBottom}
          title={isBn ? 'পৃষ্ঠার একদম নিচে যান' : 'Scroll to bottom'}
          aria-label={isBn ? 'পৃষ্ঠার একদম নিচে যান' : 'Scroll to bottom'}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${
            isAtBottom
              ? 'text-emerald-400/50 hover:text-emerald-300 hover:bg-emerald-900/40'
              : 'text-amber-400 hover:text-amber-300 hover:bg-emerald-900/60 shadow-xs'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] transition-transform duration-200 group-hover:translate-y-0.5">
            arrow_downward
          </span>
        </button>
      </div>
    </div>
  );
}
