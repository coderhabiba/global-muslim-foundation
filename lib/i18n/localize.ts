import bn from './bn';
import { DYNAMIC_RULES } from './dynamic';

/**
 * Shared translation helpers.
 *
 * Both the DOM bridge (visible copy) and the imperative call sites (native
 * alert dialogs, document title) go through the same two steps: look the
 * English phrase up in the Bengali dictionary, then re-express any dollar
 * amount in the currency the visitor picked.
 */

const DOLLAR_AMOUNT = /\$\s?([0-9][0-9,]*(?:\.[0-9]{1,2})?)/g;

/**
 * JSX collapses source line breaks into single spaces, but some phrases carry
 * a newline or a non-breaking space in the rendered DOM. Dictionary keys use
 * plain single spaces, typographic apostrophes and no ellipsis variants, so
 * both sides are normalised before matching.
 */
function normalize(text: string): string {
  return text
    .replace(/[\u00a0\u2007\u202f]/g, ' ')
    .replace(/[\u2018\u2019\u201b]/g, "'")
    .replace(/[\u201c\u201d\u201f]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\s+/g, ' ')
    .trim();
}

const normalizedIndex = new Map<string, string>();
for (const [key, value] of Object.entries(bn)) {
  const normalizedKey = normalize(key);
  if (!normalizedIndex.has(normalizedKey)) {
    normalizedIndex.set(normalizedKey, value);
  }
}

export function localizeText(text: string, language: string): string {
  if (language !== 'bn') return text;

  const direct = bn[text];
  if (direct !== undefined) return direct;

  const normalized = normalizedIndex.get(normalize(text));
  if (normalized !== undefined) return normalized;

  for (const [pattern, replacement] of DYNAMIC_RULES) {
    if (pattern.test(text)) return text.replace(pattern, replacement);
  }

  return text;
}

export function convertPrices(
  text: string,
  currency: string,
  money: (usd: number) => string,
): string {
  if (currency === 'USD') return text;

  const symbol = money(0).replace(/[\d.,\s]/g, '');

  return (
    text
      .replace(DOLLAR_AMOUNT, (_match, amount: string) =>
        money(Number(amount.replace(/,/g, ''))),
      )
      // Bare currency markers in labels, e.g. "Cash in Hand ($)".
      .replace(/\$/g, symbol)
      .replace(/\bUSD\b/g, currency)
  );
}
