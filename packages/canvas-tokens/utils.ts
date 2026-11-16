import type {TransformedToken, TransformedTokens} from 'style-dictionary/types';
import {getReferences, resolveReferences} from 'style-dictionary/utils';
import {camelCase} from 'case-anything';

export const getOklchValue = (token: any) => {
  const components = token.original.$value.components;
  const alpha = typeof token.original.$value.alpha === 'number' ? token.original.$value.alpha : 1;

  return `oklch(${components.join(' ')} / ${alpha})`;
};

/** Module syntax a generated JS file is written in; `ts` is used for `.d.ts` declarations */
export type SyntaxStyle = 'es6' | 'commonjs' | 'ts';

/** Turn a token key into a JS property name, the `$root` key is named `default` */
export const toJsKey = (key: string) => camelCase(key === '$root' ? 'default' : key);

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

type JsDocOptions = {
  compositeTokens?: string[];
  /** All tokens, used to resolve references in theme and mode values */
  tokens?: TransformedTokens;
};

const SANA_EXTENSION = 'sana.canvas.tokens';

/** Get the resolved value of the Canvas theme, if the token defines one */
const getCanvasValue = (token: TransformedToken, tokens?: TransformedTokens) => {
  const canvas = token.original.$extensions?.[SANA_EXTENSION]?.themes?.canvas;
  const value = canvas?.light?.$value ?? canvas?.$value;

  // An empty theme value means the default value is used, same as in the CSS
  if (!value) return undefined;
  if (typeof value !== 'string' || !tokens) return value;

  // A value that is a single reference resolves to the referenced token
  const resolved: any = resolveReferences(value, tokens);
  return resolved?.$value ?? resolved;
};

/** Get the JS access path (`brand.primary100`) of a token, as exported from the package index */
export const getJsPath = (token: TransformedToken): string => {
  const level = token.filePath.split('/')[3];
  if (isInlineTokenFile(token.filePath)) return `${level}.${token.name}`;

  // Brand files skip their `brand` root, color files keep their `color` root
  const path = /(^|\/)brand\//.test(token.filePath) ? token.path.slice(1) : token.path;
  return [level, ...path.map(toJsKey)].join('.');
};

/**
 * Get the dark mode value of a token, as a JS access path when it is a reference.
 * References to the base dark palette are skipped as it is not exported
 */
const getDarkValue = (token: TransformedToken, tokens?: TransformedTokens) => {
  const value = token.original.$extensions?.[SANA_EXTENSION]?.modes?.dark?.$value;
  if (typeof value !== 'string') return undefined;

  const [reference] = tokens ? getReferences(value, tokens) : [];
  if (reference?.path[0] === 'dark') return undefined;

  return reference ? getJsPath(reference) : value;
};

/**
 * Build a JS Doc block for a token: its description, raw value, Sana and dark values
 * and deprecation flag. When the token has a Canvas theme value, that is the raw value
 * and the default value is the Sana one.
 * Uses the single-line form when there is only one line to show.
 */
export const getJsDoc = (token: TransformedToken, options: JsDocOptions, tabs = ''): string => {
  const canvasValue = getCanvasValue(token, options.tokens);
  const darkValue = getDarkValue(token, options.tokens);
  const rawValue = canvasValue ?? JSON.stringify(token.$value);
  const lines = [
    token.comment ?? token.$description,
    !isComposite(token, options.compositeTokens) && `Root Raw Value: \`${rawValue}\``,
    canvasValue !== undefined && `Sana Value: \`${token.$value}\``,
    darkValue && `Dark Value: \`${darkValue}\``,
    token.$deprecated && '@deprecated',
  ].filter(Boolean);

  if (!lines.length) return '';

  return lines.length === 1
    ? `${tabs}/** ${lines[0]} */\n`
    : `${tabs}/**\n${lines.map(line => `${tabs} * ${line}\n`).join('')}${tabs} */\n`;
};
