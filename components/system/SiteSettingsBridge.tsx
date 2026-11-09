'use client';

import { useEffect, useRef } from 'react';

import { convertPrices, localizeText } from '@/lib/i18n/localize';
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

const textOriginals = new WeakMap<Text, { base: string; applied: string }>();
const attrOriginals = new WeakMap<
  Element,
  Map<string, { base: string; applied: string }>
>();

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

/**
 * Converts dollar amounts unless the slot is marked `data-money="off"`,
 * which is used for reference tables that list several currencies at once.
 */
function applyMoney(
  text: string,
  element: Element | null,
  currency: string,
  money: (usd: number) => string,
): string {
  if (element?.closest('[data-money="off"]')) return text;
  return convertPrices(text, currency, money);
}

function translateTextNode(
  node: Text,
  language: string,
  currency: string,
  money: (usd: number) => string,
): void {
  if (isSkipped(node.parentElement)) return;

  const current = node.data;

  // React can rewrite a text node (calculator results, counters, etc.). If the
  // live text no longer matches what we last wrote, treat it as a new source.
  let entry = textOriginals.get(node);
  if (!entry || current !== entry.applied) {
    entry = { base: current, applied: current };
    textOriginals.set(node, entry);
  }

  if (entry.base.trim() === '') return;

  const leading = entry.base.match(/^\s*/)?.[0] ?? '';
  const trailing = entry.base.match(/\s*$/)?.[0] ?? '';
  const core = entry.base.trim();

  const localized = localizeText(core, language);
  const next = `${leading}${applyMoney(localized, node.parentElement, currency, money)}${trailing}`;

  if (current !== next) node.data = next;
  entry.applied = next;
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
      // Form controls carry their copy in attributes, not child text, so the
      // TEXTAREA guard that protects typed values must not apply here. Only
      // the element's own opt-out and its ancestors are honoured.
      if (element.getAttribute('data-l10n') === 'off') return;
      if (isSkipped(element.parentElement)) return;

      for (const attr of LOCALIZED_ATTRS) {
        const value = element.getAttribute(attr);
        if (!value || value.trim() === '') continue;

        let store = attrOriginals.get(element);
        if (!store) {
          store = new Map<string, { base: string; applied: string }>();
          attrOriginals.set(element, store);
        }

        let entry = store.get(attr);
        if (!entry || value !== entry.applied) {
          entry = { base: value, applied: value };
          store.set(attr, entry);
        }

        const localized = localizeText(entry.base.trim(), language);
        const next = applyMoney(localized, element, currency, money);

        if (value !== next) element.setAttribute(attr, next);
        entry.applied = next;
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
  translateTitle(language, currency, money);
}

/** Localises the browser tab title, which lives outside <body>. */
function translateTitle(
  language: string,
  currency: string,
  money: (usd: number) => string,
): void {
  const current = document.title;
  if (!current) return;

  let entry = titleOriginal;
  if (!entry || current !== entry.applied) {
    entry = { base: current, applied: current };
    titleOriginal = entry;
  }

  const next = convertPrices(
    localizeText(entry.base, language),
    currency,
    money,
  );

  if (current !== next) document.title = next;
  entry.applied = next;
}

let titleOriginal: { base: string; applied: string } | null = null;

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
