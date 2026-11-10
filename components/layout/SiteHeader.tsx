'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  useSiteSettings,
} from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

const NAV_ITEMS = [
  // { href: '/appeals', en: 'Appeals', bn: 'আবেদনসমূহ' },
  { href: '/about', en: 'About Us', bn: 'আমাদের সম্পর্কে' },
  { href: '/sponsor-orphan', en: 'Sponsor Child', bn: 'দুস্থ শিশু স্পনসর' },
  { href: '/upcoming-projects', en: 'Upcoming', bn: 'আসন্ন প্রকল্প' },
  { href: '/impact', en: 'Our Projects', bn: 'আমাদের প্রজেক্ট সমূহ' },
  { href: '/news', en: 'News', bn: 'সংবাদ' },
  { href: '/zakat-calculator', en: 'Zakat', bn: 'যাকাত' },
  { href: '/gallery', en: 'Gallery', bn: 'গ্যালারি' },
  // { href: '/members', en: 'Team', bn: 'টিম ও মেম্বার' },
  { href: '/volunteer', en: 'Volunteer', bn: 'স্বেচ্ছাসেবক' },
] as const;

type SiteHeaderProps = {
  /**
   * The legacy 404 page shipped a slimmer header (no currency switcher, no
   * donor portal shortcut). `"simple"` reproduces that variant.
   */
  variant?: 'default' | 'simple';
};

export default function SiteHeader({ variant = 'default' }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { currency, setCurrency, language, setLanguage } = useSiteSettings();
  const { openPaymentModal, openLicenseModal } = useModalState();

  const isBn = language === 'bn';
  const isSimple = variant === 'simple';
  const activeHref = pathname.startsWith('/campaign-details')
    ? '/appeals'
    : pathname;

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    }

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return (
    <header
      ref={headerRef}
      data-l10n="off"
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-subtle/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto h-16 sm:h-20 px-3 sm:px-6 flex items-center justify-between gap-2 lg:gap-4">
        {/* Brand Logo */}
        <Link
          className="flex items-center shrink-0 group py-1"
          href="/"
          title="Global Muslim Charitable Foundation"
        >
          <img
            src="/images/gmcf-logo-full.png"
            alt="Global Muslim Charitable Foundation Logo"
            className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain group-hover:scale-[1.02] transition-transform duration-200"
          />
        </Link>

        {/* Clean, Compact Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[13px] xl:text-[14px] font-semibold text-slate-700">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;
            const label = isBn ? item.bn : item.en;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-2.5 xl:px-3 py-1.5 text-emerald-800 bg-emerald-50 rounded-lg font-bold whitespace-nowrap'
                    : 'px-2.5 xl:px-3 py-1.5 hover:text-emerald-700 hover:bg-slate-100/70 rounded-lg transition-colors whitespace-nowrap'
                }
                href={item.href}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <div
            className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/90 shadow-2xs"
            data-l10n="off"
          >
            <button
              type="button"
              className={`px-2.5 py-1 rounded-full text-xs font-bold leading-none transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`px-2.5 py-1 rounded-full text-xs font-bold leading-none transition-all cursor-pointer ${
                language === 'bn'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={language === 'bn'}
              onClick={() => setLanguage('bn')}
            >
              বাং
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              openPaymentModal({
                amount: currency === 'BDT' ? 1000 : 25,
                cause: 'General Humanitarian Relief Fund',
              })
            }
            className={`inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer ${
              isSimple
                ? 'shadow-md hover:shadow-lg transition-all'
                : 'shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:shadow-lg transition-all transform hover:-translate-y-0.5'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[17px]">
              favorite
            </span>
            <span>{isBn ? 'অনুদান দিন' : 'Donate'}</span>
          </button>

          {!isSimple && (
            <Link
              className="hidden sm:flex w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full bg-slate-100 hover:bg-emerald-50 border border-slate-200 items-center justify-center text-slate-700 hover:text-emerald-800 transition-colors shrink-0"
              href="/login"
              title={isBn ? 'অ্যাডমিন পোর্টাল' : 'Admin Portal Login'}
            >
              <span className="material-symbols-outlined text-[19px]">
                admin_panel_settings
              </span>
            </Link>
          )}

          <button
            id="mobile-menu-btn"
            type="button"
            className={`lg:hidden w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 ${
              isSimple
                ? ''
                : 'hover:bg-emerald-800 hover:text-white transition-colors'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={isDrawerOpen}
            onClick={event => {
              event.stopPropagation();
              setIsDrawerOpen(open => !open);
            }}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDrawerOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`${
          isDrawerOpen ? 'block' : 'hidden'
        } lg:hidden bg-white/98 backdrop-blur-md border-t border-border-subtle shadow-xl`}
        onClick={event => event.stopPropagation()}
      >
        <nav className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto px-3 pb-2 pt-2 flex flex-col gap-0.5 text-sm font-semibold text-slate-700">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;
            const label = isBn ? item.bn : item.en;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-3.5 py-2.5 text-emerald-800 bg-emerald-50 rounded-xl font-bold flex items-center justify-between gap-3'
                    : 'px-3.5 py-2.5 hover:text-emerald-800 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-between gap-3'
                }
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
              >
                <span className="truncate">{label}</span>
                <span
                  className={
                    isActive
                      ? 'material-symbols-outlined text-[16px] text-emerald-700 shrink-0'
                      : 'material-symbols-outlined text-[16px] text-gray-400 shrink-0'
                  }
                >
                  chevron_right
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border-subtle px-3 py-3 space-y-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm px-4 py-3 rounded-xl shadow-md whitespace-nowrap cursor-pointer"
            onClick={() => {
              setIsDrawerOpen(false);
              openPaymentModal({ amount: currency === 'BDT' ? 1000 : 25 });
            }}
          >
            <span className="material-symbols-outlined text-[18px]">
              favorite
            </span>
            <span>{isBn ? 'অনলাইন অনুদান দিন (EPS)' : 'Donate Now (EPS Gateway)'}</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
              onClick={() => {
                setIsDrawerOpen(false);
                openLicenseModal();
              }}
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{isBn ? 'লাইসেন্স ও সনদ' : 'Govt. License'}</span>
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>{isBn ? 'লগইন' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
