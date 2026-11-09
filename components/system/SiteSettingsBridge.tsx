'use client';

import { useEffect, useRef } from 'react';

import bn from '@/lib/i18n/bn';
import { DYNAMIC_RULES } from '@/lib/i18n/dynamic';
import { useSiteSettings } from '@/lib/site-settings';

/**
 * Translates the rendered page in place.
 *
 * The marketing pages were ported verbatim from the legacy static site, so the
 * English copy lives directly in JSX. Rather than rewriting thousands of text
 * nodes (and risking the verified markup/typography parity), the language
 * switch walks the DOM and swaps text using a phrase dictionary, then re-applies
 * itself whenever React re-renders or the visitor changes language/currency.
 */

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE']);
const SKIP_CLASS = 'material-symbols-outlined';
const LOCALIZED_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const;

const textOriginals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();

const DOLLAR_AMOUNT = /\$\s?([0-9][0-9,]*(?:\.[0-9]{1,2})?)/g;

function isSkipped(element: Element | null): boolean {
  let node: Element | null = element;

  while (node) {
    if (SKIP_TAGS.has(node.tagName) || node.classList.contains(SKIP_CLASS)) {
      return true;
    }

    if (node.getAttribute('data-l10n') === 'off') {
      return true;
    }

    node = node.parentElement;
  }

  return false;
}

function localizeCore(core: string, language: string): string {
  if (language === 'en') return core;

  const direct = bn[core];
  if (direct !== undefined) return direct;

  for (const [pattern, replacement] of DYNAMIC_RULES) {
    if (pattern.test(core)) return core.replace(pattern, replacement);
  }

  return core;
}

function convertPrices(
  text: string,
  currency: string,
  money: (usd: number) => string,
): string {
  if (currency === 'USD') return text;

  return text
    .replace(DOLLAR_AMOUNT, (_match, amount: string) =>
      money(Number(amount.replace(/,/g, ''))),
    )
    .replace(/\bUSD\b/g, currency);
}

function translateTextNode(
  node: Text,
  language: string,
  currency: string,
  money: (usd: number) => string,
): void {
  if (isSkipped(node.parentElement)) return;

  const current = node.data;

  let base = textOriginals.get(node);
  if (base === undefined) {
    base = current;
    textOriginals.set(node, base);
  }

  if (base.trim() === '') return;

  const leading = base.match(/^\s*/)?.[0] ?? '';
  const trailing = base.match(/\s*$/)?.[0] ?? '';
  const core = base.trim();

  const localized = localizeCore(core, language);
  const next = `${leading}${convertPrices(localized, currency, money)}${trailing}`;

  if (current !== next) node.data = next;
}

function translateAttributes(
  root: HTMLElement,
  language: string,
  currency: string,
  money: (usd: number) => string,
): void {
  root
    .querySelectorAll<HTMLElement>(
      LOCALIZED_ATTRS.map(attr => `[${attr}]`).join(','),
    )
    .forEach(element => {
      if (isSkipped(element)) return;

      for (const attr of LOCALIZED_ATTRS) {
        const value = element.getAttribute(attr);
        if (!value || value.trim() === '') continue;

        let store = attrOriginals.get(element);
        if (!store) {
          store = new Map<string, string>();
          attrOriginals.set(element, store);
        }

        let base = store.get(attr);
        if (base === undefined) {
          base = value;
          store.set(attr, base);
        }

        const localized = localizeCore(base.trim(), language);
        const next = convertPrices(localized, currency, money);

        if (value !== next) element.setAttribute(attr, next);
      }
    });
}

function translateTree(
  root: HTMLElement,
  language: string,
  currency: string,
  money: (usd: number) => string,
): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) translateTextNode(node, language, currency, money);

  translateAttributes(root, language, currency, money);
}

export default function SiteSettingsBridge() {
  const { currency, language, money } = useSiteSettings();
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.body;
    let observer: MutationObserver | null = null;
    let applying = false;

    const run = () => {
      frameRef.current = null;
      if (applying) return;

      applying = true;
      observer?.disconnect();

      try {
        translateTree(root, language, currency, money);
      } finally {
        observer?.observe(root, {
          subtree: true,
          childList: true,
          characterData: true,
          attributes: true,
          attributeFilter: [...LOCALIZED_ATTRS],
        });
        applying = false;
      }
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(run);
    };

    observer = new MutationObserver(schedule);
    run();

    return () => {
      observer?.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [currency, language, money]);

  return null;
}
