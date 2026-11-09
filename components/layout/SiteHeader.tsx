'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  CURRENCIES,
  CURRENCY_CODES,
  useSiteSettings,
} from '@/lib/site-settings';
import { useModalState } from '@/lib/modal-context';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/appeals', label: 'Appeals & Causes' },
  { href: '/zakat-calculator', label: 'Zakat Fund' },
  { href: '/impact', label: 'Impact & Reports' },
  { href: '/gallery', label: 'Field Gallery' },
  { href: '/members', label: 'Members & Team' },
  { href: '/about', label: 'About Us' },
  { href: '/volunteer', label: 'Volunteer Portal' },
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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-subtle/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    >
      {/* International Meta Strip */}
      <div className="bg-emerald-dark text-on-primary">
        <div className="max-w-[1280px] mx-auto h-8 sm:h-9 px-3 sm:px-8 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-medium">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-gold-warm shrink-0">
              call
            </span>
            <span className="flex items-baseline gap-1 whitespace-nowrap truncate">
              <span className="hidden sm:inline">24/7 Helpline:</span>
              <strong className="text-white">+880 1913-119525</strong>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-primary-fixed shrink-0">
            <button
              type="button"
              onClick={() => openLicenseModal()}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15"
              title="সরকারি নিবন্ধন ও শরীয়াহ সনদপত্র দেখুন"
            >
              <span className="material-symbols-outlined text-[15px] text-gold-warm">
                verified_user
              </span>
              <span>সরকারি লাইসেন্স ও সনদপত্র (#NGO-AB-89423)</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              className="hidden md:flex items-center gap-1 hover:text-gold-warm transition-colors whitespace-nowrap"
              href="/zakat-calculator"
            >
              <span className="material-symbols-outlined text-[15px]">
                calculate
              </span>
              <span>Zakat Calculator</span>
            </Link>
            {!isSimple && (
              <div
                className="flex items-center gap-1 bg-black/20 px-1.5 sm:px-2 py-0.5 rounded border border-white/10"
                data-l10n="off"
              >
                <span className="material-symbols-outlined text-[13px] text-gold-warm">
                  currency_exchange
                </span>
                <select
                  className="bg-transparent text-white text-[11px] sm:text-xs focus:outline-none cursor-pointer"
                  value={currency}
                  onChange={event =>
                    setCurrency(event.target.value as typeof currency)
                  }
                  aria-label="Select currency"
                >
                  {CURRENCY_CODES.map(code => (
                    <option
                      key={code}
                      className="text-slate-900 bg-white"
                      value={code}
                    >
                      {CURRENCIES[code].label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div
              className="flex items-center gap-1 bg-black/20 p-0.5 rounded border border-white/10"
              data-l10n="off"
            >
              <button
                type="button"
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold leading-tight ${
                  language === 'en'
                    ? 'bg-gold-warm text-emerald-dark'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold leading-tight ${
                  language === 'bn'
                    ? 'bg-gold-warm text-emerald-dark'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-pressed={language === 'bn'}
                onClick={() => setLanguage('bn')}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto h-16 sm:h-20 px-3 sm:px-8 flex items-center justify-between gap-2 sm:gap-4">
        <Link
          className="flex items-center gap-2 sm:gap-3 group min-w-0"
          href="/"
        >
          <div className="h-10 sm:h-12 shrink-0 flex items-center justify-start group-hover:scale-105 transition-transform">
            <img
              src="/images/gmcf-logo-full.png"
              alt="Global Muslim Charitable Foundation Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </div>
        </Link>
        <nav className="hidden xl:flex items-center gap-1 text-[14px] font-semibold text-on-surface-variant">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-3 py-2 text-primary bg-surface-subtle-mint rounded-lg font-bold whitespace-nowrap'
                    : 'px-3 py-2 hover:text-primary hover:bg-surface-subtle-mint/60 rounded-lg transition-colors whitespace-nowrap'
                }
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              openPaymentModal({
                amount: currency === 'BDT' ? 1000 : 25,
                cause: 'General Humanitarian Relief Fund',
              })
            }
            className={`inline-flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-[11px] xs:text-xs sm:text-sm px-2.5 xs:px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full whitespace-nowrap shrink-0 cursor-pointer ${
              isSimple
                ? 'shadow-md hover:shadow-lg transition-all'
                : 'shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:shadow-lg transition-all transform hover:-translate-y-0.5'
            }`}
          >
            <span className="material-symbols-outlined text-[13px] xs:text-[15px] sm:text-[18px]">
              favorite
            </span>
            <span>Donate Now</span>
          </button>
          {!isSimple && (
            <Link
              className="hidden sm:flex w-10 h-10 rounded-full bg-surface-subtle-mint hover:bg-primary/10 border border-primary/20 items-center justify-center text-primary transition-colors shrink-0"
              href="/login"
              title="Admin & Volunteer Portal Login"
            >
              <span className="material-symbols-outlined text-[20px]">
                admin_panel_settings
              </span>
            </Link>
          )}
          <button
            id="mobile-menu-btn"
            type="button"
            className={`xl:hidden w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary ${
              isSimple
                ? ''
                : 'hover:bg-primary hover:text-white transition-colors'
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
        } xl:hidden bg-white/98 backdrop-blur-md border-t border-border-subtle shadow-xl`}
        onClick={event => event.stopPropagation()}
      >
        <nav className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto px-3 pb-2 pt-2 flex flex-col gap-0.5 text-sm font-semibold text-on-surface-variant">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-3.5 py-3 text-primary bg-surface-subtle-mint rounded-xl font-bold flex items-center justify-between gap-3'
                    : 'px-3.5 py-3 hover:text-primary hover:bg-surface-subtle-mint/60 rounded-xl transition-colors flex items-center justify-between gap-3'
                }
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
              >
                <span className="truncate">{item.label}</span>
                <span
                  className={
                    isActive
                      ? 'material-symbols-outlined text-[16px] shrink-0'
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
            <span>Donate Now (EPS Gateway)</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-subtle-mint text-primary text-xs font-bold border border-primary/20"
              onClick={() => {
                setIsDrawerOpen(false);
                openLicenseModal();
              }}
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>লাইসেন্স ও সনদ</span>
            </button>
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300"
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>অ্যাডমিন লগইন</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
