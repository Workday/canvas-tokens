import {DesignToken} from 'style-dictionary';

const OKLCH_COMPONENTS_RE = /^oklch\(\s*([^\s/]+)\s+([^\s/]+)\s+([^\s/)]+)\s*\/\s*([^)]+)\s*\)$/i;

const NESTED_OKLCH_SLASH_RE = /^oklch\(\s*(oklch\(.+?\))\s*\/\s*(.+?)\s*\)$/;
const NESTED_OKLCH_COMMA_RE = /^oklch\(\s*(oklch\(.+?\))\s*,\s*(.+?)\s*\)$/;
const RELATIVE_OKLCH_RE = /^oklch\(\s*from\s+(oklch\(.+?\))\s*\/\s*(.+?)\s*\)$/i;
const REF_OKLCH_SLASH_RE = /^oklch\(\s*(\{[^}]+\})\s*\/\s*(.+?)\s*\)$/;

const NESTED_OKLCH_SLASH_GLOBAL_RE = /oklch\(\s*(oklch\(.+?\))\s*\/\s*([^),]+?)\s*\)/g;
const NESTED_OKLCH_COMMA_GLOBAL_RE = /oklch\(\s*(oklch\(.+?\))\s*,\s*([^),]+?)\s*\)/g;
const RELATIVE_OKLCH_GLOBAL_RE = /oklch\(\s*from\s+(oklch\(.+?\))\s*\/\s*([^),]+?)\s*\)/gi;

const isZeroAlpha = (alpha: string) => alpha === '0' || alpha === '0.0';

/** Resolves relative/nested oklch to a single flat oklch string for CSS output. */
const toFlatOklch = (inner: string, alpha: string) => {
  const trimmedAlpha = alpha.trim();
  if (isZeroAlpha(trimmedAlpha)) return 'transparent';

  const match = inner.trim().match(OKLCH_COMPONENTS_RE);
  if (!match) {
    return `oklch(from ${inner} / ${trimmedAlpha})`;
  }

  const [, l, c, h] = match;
  return `oklch(${l} ${c} ${h} / ${trimmedAlpha})`;
};

const flattenRelativeOklchExpressions = (value: string) =>
  value.replace(RELATIVE_OKLCH_GLOBAL_RE, (_, inner, alpha) => toFlatOklch(inner, alpha));

const flattenNestedOklchExpressions = (value: string) =>
  value
    .replace(NESTED_OKLCH_SLASH_GLOBAL_RE, (_, inner, alpha) => toFlatOklch(inner, alpha))
    .replace(NESTED_OKLCH_COMMA_GLOBAL_RE, (_, inner, alpha) => toFlatOklch(inner, alpha));

/** Flattens every nested or relative oklch occurrence inside a string (e.g. box-shadow lists). */
export const flattenOklchInString = (value: string): string => {
  if (!value.includes('oklch(')) {
    return value;
  }

  let result = value;
  let prev = '';

  while (result !== prev) {
    prev = result;
    result = flattenRelativeOklchExpressions(flattenNestedOklchExpressions(result));
  }

  return result;
};

/**
 * Converts nested oklch expressions to a single flat oklch value.
 *
 * - `oklch(oklch(L C H / a1) / a2)` → `oklch(L C H / a2)`
 * - `oklch(from oklch(L C H / a1) / a2)` → `oklch(L C H / a2)`
 */
export const flatOklchColor = ({value, original}: DesignToken): string => {
  const stringValue = typeof value === 'string' ? value : String(value);
  const originalValue =
    typeof original?.value === 'string' ? original.value : String(original?.value ?? '');

  if (originalValue.includes('{base.opacity.0}')) {
    return 'transparent';
  }

  const flattened = flattenOklchInString(stringValue);
  if (flattened !== stringValue) {
    return flattened;
  }

  const refSource = originalValue.includes('oklch({') ? originalValue : stringValue;
  const refSlash = refSource.match(REF_OKLCH_SLASH_RE);
  if (refSlash) {
    const alpha = refSlash[2].trim();
    if (isZeroAlpha(alpha)) return 'transparent';
    return `oklch(from ${refSlash[1]} l c h / ${alpha})`;
  }

  const relative = stringValue.match(RELATIVE_OKLCH_RE);
  if (relative) {
    return toFlatOklch(relative[1], relative[2]);
  }

  const slashNested = stringValue.match(NESTED_OKLCH_SLASH_RE);
  if (slashNested) {
    return toFlatOklch(slashNested[1], slashNested[2]);
  }

  const commaNested = stringValue.match(NESTED_OKLCH_COMMA_RE);
  if (commaNested) {
    return toFlatOklch(commaNested[1], commaNested[2]);
  }

  return stringValue;
};
