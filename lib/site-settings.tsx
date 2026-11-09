'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { convertPrices, localizeText } from '@/lib/i18n/localize';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'BDT';
export type Language = 'en' | 'bn';

export type CurrencyConfig = {
  symbol: string;
  /** Indicative conversion rate from 1 USD. */
  rate: number;
  locale: string;
  label: string;
};

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: '$', rate: 1, locale: 'en-US', label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB', label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.92, locale: 'en-IE', label: 'EUR (€)' },
  BDT: { symbol: '৳', rate: 122, locale: 'en-IN', label: 'BDT (৳)' },
};

export const CURRENCY_CODES = Object.keys(CURRENCIES) as CurrencyCode[];

const CURRENCY_KEY = 'gmcf:currency';
const LANGUAGE_KEY = 'gmcf:language';

function isCurrency(value: string | null): value is CurrencyCode {
  return value !== null && Object.hasOwn(CURRENCIES, value);
}

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'bn';
}

/** Formats a USD amount in the selected currency. */
export function formatUsd(usd: number, currency: CurrencyCode): string {
  const { symbol, rate, locale } = CURRENCIES[currency];
  const converted = Math.round(usd * rate * 100) / 100;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(converted);

  return `${symbol}${formatted}`;
}

type SiteSettingsValue = {
  currency: CurrencyCode;
  language: Language;
  setCurrency: (currency: CurrencyCode) => void;
  setLanguage: (language: Language) => void;
  /** Converts and formats a USD amount with the active currency. */
  money: (usd: number) => string;
  /**
   * Translates one English phrase and re-expresses its dollar amounts in the
   * active currency. Used for native dialogs, where the DOM bridge cannot
   * reach the text.
   */
  localize: (text: string) => string;
};

const SiteSettingsContext = createContext<SiteSettingsValue | null>(null);

export function SiteSettingsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Initial state is USD / en to perfectly match the hardcoded English JSX during SSR,
  // preventing hydration mismatches across all pages.
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [language, setLanguageState] = useState<Language>('en');

  // Once mounted on the client, restore the visitor's choice or default to BDT / bn.
  useEffect(() => {
    try {
      const storedCurrency = window.localStorage.getItem(CURRENCY_KEY);
      const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isCurrency(storedCurrency)) {
        setCurrencyState(storedCurrency);
      } else {
        setCurrencyState('BDT');
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (isLanguage(storedLanguage)) {
        setLanguageState(storedLanguage);
      } else {
        setLanguageState('bn');
      }
    } catch {
      setCurrencyState('BDT');
      setLanguageState('bn');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next);

    try {
      window.localStorage.setItem(CURRENCY_KEY, next);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);

    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const money = useCallback(
    (usd: number) => formatUsd(usd, currency),
    [currency],
  );

  const localize = useCallback(
    (text: string) =>
      convertPrices(localizeText(text, language), currency, money),
    [currency, language, money],
  );

  const value = useMemo<SiteSettingsValue>(
    () => ({ currency, language, setCurrency, setLanguage, money, localize }),
    [currency, language, setCurrency, setLanguage, money, localize],
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsValue {
  const value = useContext(SiteSettingsContext);

  if (!value) {
    throw new Error('useSiteSettings must be used inside SiteSettingsProvider');
  }

  return value;
}
