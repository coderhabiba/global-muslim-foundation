'use client';

import React, { useEffect, useState, useMemo } from 'react';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Parses any string into a numeric value, detecting Bengali/Western digits,
 * currency prefixes, and suffixes like '+', '%', 'টি', 'জন'.
 */
export function parseNumFromStr(str: string): {
  num: number;
  isBengali: boolean;
  prefix: string;
  suffix: string;
  hasDigits: boolean;
} {
  if (!str) return { num: 0, isBengali: false, prefix: '', suffix: '', hasDigits: false };

  const trimmed = str.trim();
  let isBengali = false;
  let normalized = '';
  let prefix = '';
  let suffix = '';

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    const bnIdx = BN_DIGITS.indexOf(ch);
    if (bnIdx !== -1) {
      isBengali = true;
      normalized += bnIdx;
    } else if (ch >= '0' && ch <= '9') {
      normalized += ch;
    } else if (normalized.length === 0) {
      if (ch === '৳' || ch === '$' || ch === '€' || ch === '£' || ch === '#') {
        prefix += ch;
      }
    } else {
      // after number starts
      if (ch === ',' || ch === '.') {
        // skip thousands separators
        continue;
      }
      suffix += ch;
    }
  }

  const hasDigits = normalized.length > 0;
  const num = hasDigits ? parseInt(normalized, 10) || 0 : 0;

  return {
    num,
    isBengali,
    prefix,
    suffix: suffix.trim(),
    hasDigits,
  };
}

export function formatLocalizedNumber(num: number, isBengali: boolean): string {
  if (isBengali) {
    return String(num).replace(/[0-9]/g, d => BN_DIGITS[Number(d)]);
  }
  return num.toLocaleString('en-US');
}

export interface DynamicLiveCounterProps {
  /** The value string or number from CMS or prop (e.g. "০", "0", "850+", "12", "100%") */
  value?: string | number;
  /** Fallback default string if value is empty */
  defaultValue?: string;
  /** Range of random fluctuation when value > 0. Default [-2, 4]. Set [0, 0] to disable. */
  fluctuateRange?: [number, number];
  /** Interval in ms between fluctuations. Default 4500ms. */
  intervalMs?: number;
  /** Custom class name for the numeric value span */
  className?: string;
  /** Custom class name for the pulse highlight */
  pulseClassName?: string;
  /** Show live blinking green dot next to number when active (> 0) */
  showLiveDot?: boolean;
}

/**
 * Reusable Dynamic Live Counter
 * - Fully reactive to Admin CMS changes
 * - Defaults cleanly to 0 / '০' without mock data
 * - When value > 0, smoothly auto-fluctuates and pulses in real time
 */
export function DynamicLiveCounter({
  value,
  defaultValue = '০',
  fluctuateRange = [-2, 4],
  intervalMs = 4500,
  className = '',
  pulseClassName = 'scale-105 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
  showLiveDot = false,
}: DynamicLiveCounterProps) {
  const rawStr = String(value !== undefined && value !== null && value !== '' ? value : defaultValue).trim();
  const { num: baseNum, isBengali, prefix, suffix, hasDigits } = useMemo(
    () => parseNumFromStr(rawStr),
    [rawStr]
  );

  const [currentNum, setCurrentNum] = useState(baseNum);
  const [isPulsing, setIsPulsing] = useState(false);

  // Sync whenever base value updates (e.g. from CMS)
  useEffect(() => {
    setCurrentNum(baseNum);
  }, [baseNum]);

  // Real-time subtle live fluctuation when baseNum > 0
  useEffect(() => {
    // If not a number or 0 or percentage, do not fluctuate
    if (baseNum <= 0 || !hasDigits || suffix.includes('%')) return;

    const [minDelta, maxDelta] = fluctuateRange;
    if (minDelta === 0 && maxDelta === 0) return;

    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * (maxDelta - minDelta + 1)) + minDelta;
      const nextVal = Math.max(0, baseNum + delta);
      setCurrentNum(prev => {
        if (prev !== nextVal) {
          setIsPulsing(true);
          setTimeout(() => setIsPulsing(false), 700);
        }
        return nextVal;
      });
    }, intervalMs + Math.floor(Math.random() * 2000));

    return () => clearInterval(interval);
  }, [baseNum, hasDigits, suffix, fluctuateRange, intervalMs]);

  // If input had no digits (e.g. "Grade A"), just render the raw string
  if (!hasDigits) {
    return <span className={className}>{rawStr}</span>;
  }

  const formattedNum = formatLocalizedNumber(currentNum, isBengali);

  return (
    <span className="inline-flex items-baseline gap-0.5 relative">
      {prefix && <span className="opacity-90">{prefix}</span>}
      <span
        className={`transition-all duration-500 inline-block ${className} ${
          isPulsing ? pulseClassName : ''
        }`}
      >
        {formattedNum}
      </span>
      {suffix && <span className="opacity-90">{suffix}</span>}
      {showLiveDot && baseNum > 0 && (
        <span className="inline-flex h-2 w-2 relative ml-1 top-[-4px]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
    </span>
  );
}

export default DynamicLiveCounter;

