import type {TransformedToken} from 'style-dictionary/types';

export const getOklchValue = (token: any) => {
  const components = token.original.$value.components;
  const alpha = typeof token.original.$value.alpha === 'number' ? token.original.$value.alpha : 1;

  return `oklch(${components.join(' ')} / ${alpha})`;
};

/** Module syntax a generated JS file is written in; `ts` is used for `.d.ts` declarations */
export type SyntaxStyle = 'es6' | 'commonjs' | 'ts';

/** Join the non-empty parts with a dash */
export const joinParts = (...parts: (string | undefined)[]) => parts.filter(Boolean).join('-');

/** Whether tokens of a source file are exported as flat constants rather than as an object tree */
export const isInlineTokenFile = (file: string) =>
  file.includes('base/') || (file.includes('brand/') && !/(common|action)\.json/.test(file));

/** Composite tokens (typography) have an object of references to other tokens as value */
export const isComposite = (token: TransformedToken, compositeTokens?: string[]) =>
  !!token.$type && !!compositeTokens?.includes(token.$type);

/**
 * Turn a token key into a kebab-case CSS name part.
 * Same as the CSS name transform: digits stay attached to the preceding word (`a25`, not `a-25`)
 */
const normalizeKey = (key: string) =>
  key
    .replace('$root', 'default')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

/**
 * Get the CSS variable level segment (`sys`, `base-palette`, ...) from a token's source file path.
 * Brand tokens have no level.
 */
const getTokenLevel = (filePath: string): string => {
  if (filePath.includes('palette')) return 'base-palette';
  const level = filePath.split('/')[3];
  if (level === 'brand') return '';
  return level === 'system' ? 'sys' : level;
};

/** Build the CSS variable name (`--cnvs-sys-...`) a token resolves to */
export const toCSSVarName = (token: TransformedToken, prefix?: string) =>
  token.key ? `--${joinParts(prefix, getTokenLevel(token.filePath), normalizeKey(token.key))}` : '';
