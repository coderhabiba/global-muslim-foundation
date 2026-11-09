'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  CURRENCIES,
  CURRENCY_CODES,
  useSiteSettings,
} from '@/lib/site-settings';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/appeals', label: 'Appeals & Causes' },
  { href: '/zakat-calculator', label: 'Zakat Fund' },
  { href: '/impact', label: 'Impact & Reports' },
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
      <div className="bg-emerald-dark text-on-primary py-1.5 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-gold-warm">
                call
              </span>
              <span>
                24/7 Helpline:{' '}
                <strong className="text-white">+880 1800-4673</strong>
              </span>
            </div>
            <span className="hidden md:inline text-white/30">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-primary-fixed">
              <span className="material-symbols-outlined text-[15px] text-gold-warm">
                verified_user
              </span>
              <span>100% Zakat Policy Guaranteed — Zero Admin Deductions</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="hidden sm:flex items-center gap-1 hover:text-gold-warm transition-colors"
              href="/zakat-calculator"
            >
              <span className="material-symbols-outlined text-[15px]">
                calculate
              </span>
              <span>Zakat Calculator</span>
            </Link>
            {!isSimple && (
              <div
                className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded border border-white/10"
                data-l10n="off"
              >
                <span className="material-symbols-outlined text-[13px] text-gold-warm">
                  currency_exchange
                </span>
                <select
                  className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
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
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
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
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
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
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3 group" href="/">
            <div className="w-11 h-11 rounded-xl bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
              <span className="material-symbols-outlined text-[26px]">
                volunteer_activism
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-emerald-dark tracking-tight leading-tight">
                Global Muslim Foundation
              </span>
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                Charitable Relief &amp; Zakat Fund
              </span>
            </div>
          </Link>
        </div>
        <nav className="hidden xl:flex items-center gap-1 text-[14px] font-semibold text-on-surface-variant">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-3 py-2 text-primary bg-surface-subtle-mint rounded-lg font-bold'
                    : 'px-3 py-2 hover:text-primary hover:bg-surface-subtle-mint/60 rounded-lg transition-colors'
                }
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm px-5 py-2.5 rounded-full ${
              isSimple
                ? 'shadow-md hover:shadow-lg transition-all'
                : 'shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:shadow-lg transition-all transform hover:-translate-y-0.5'
            }`}
            href="/appeals"
          >
            <span className="material-symbols-outlined text-[18px]">
              favorite
            </span>
            <span>Donate Now</span>
          </Link>
          {!isSimple && (
            <Link
              className="w-10 h-10 rounded-full bg-surface-subtle-mint hover:bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-colors"
              href="/volunteer"
              title="Volunteer &amp; Donor Portal"
            >
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            </Link>
          )}
          <button
            id="mobile-menu-btn"
            type="button"
            className={`xl:hidden w-10 h-10 rounded-xl bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary ${
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
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`${
          isDrawerOpen ? '' : 'hidden'
        } xl:hidden bg-white/98 backdrop-blur-md border-t border-border-subtle px-4 py-4 shadow-xl`}
        onClick={event => event.stopPropagation()}
      >
        <nav className="flex flex-col gap-1 text-sm font-semibold text-on-surface-variant">
          {NAV_ITEMS.map(item => {
            const isActive = !isSimple && item.href === activeHref;

            return (
              <Link
                key={item.href}
                className={
                  isActive
                    ? 'px-4 py-2.5 text-primary bg-surface-subtle-mint rounded-lg font-bold flex items-center justify-between'
                    : 'px-4 py-2.5 hover:text-primary hover:bg-surface-subtle-mint/60 rounded-lg transition-colors flex items-center justify-between'
                }
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
              >
                <span>{item.label}</span>
                <span
                  className={
                    isActive
                      ? 'material-symbols-outlined text-[16px]'
                      : 'material-symbols-outlined text-[16px] text-gray-400'
                  }
                >
                  chevron_right
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
