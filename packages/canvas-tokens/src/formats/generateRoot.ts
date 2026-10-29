import type {
  Dictionary,
  File,
  OutputReferences,
  TransformedToken,
  TransformedTokens,
} from 'style-dictionary/types';
import {fileHeader, getReferences} from 'style-dictionary/utils';
import {kebabCase} from 'case-anything';

import {isOklchToken} from '../../filters';
import {getOklchValue, joinParts} from '../../utils';

type Format = {
  dictionary: Dictionary;
  file: File;
  options: {
    compositeTokens?: string[];
    modeSelector?: string;
    outputReferences?: OutputReferences;
    prefix?: string;
    themeSelector?: string;
    useThemeValues?: string;
  };
};

/**
 * SD Format for generating a CSS file of custom properties for the scope defined by the
 * theme and mode selectors, followed by a class for each composite token
 */
export const generateRoot = async ({dictionary, file, options}: Format) => {
  const {compositeTokens, prefix, outputReferences, themeSelector, useThemeValues, modeSelector} =
    options;
  const header = await fileHeader({file});
  const allTokens = dictionary.unfilteredTokens;
  const extractOptions = {
    prefix,
    outputReferences,
    tokens: allTokens,
    useThemeValues,
    modeSelector,
  };
  const isComposite = (token: TransformedToken) =>
    compositeTokens && token.$type && compositeTokens.includes(token.$type);

  const tokens = dictionary.allTokens
    .filter(token => !isComposite(token))
    .map(token => {
      const name = toCSSVarName(token, prefix);
      const finalValue = extractValue(token, extractOptions);

      const deprecatedWarning = token.$deprecated
        ? `\t/* Token is deprecated and will be removed in a future version.*/\n`
        : '';

      const comment = token.$description ? ` /* ${token.$description} */` : '';

      return `${deprecatedWarning}\t${name}: ${finalValue}${comment};`;
    })
    .join('\n');

  const compositeTokensBlock = dictionary.unfilteredAllTokens
    ?.filter(isComposite)
    .map((token: TransformedToken) => generateCompositeTokens(token, {prefix, tokens: allTokens}))
    .join('\n');

  const scope = getScope(themeSelector, modeSelector);

  return header + `${scope} {\n` + tokens + '\n}\n\n' + compositeTokensBlock;
};

/**
 * Get the CSS selector a token block is scoped to, based on the theme and mode selectors.
 * Falls back to `:root` when neither is set.
 */
const getScope = (themeSelector?: string, modeSelector?: string) => {
  const mode = `data-mode="${modeSelector}"`;
  const theme = `data-theme="${themeSelector}"`;

  if (themeSelector) {
    return modeSelector
      ? `[${theme}][${mode}],\n[${theme}] [${mode}],\n[${mode}] [${theme}]`
      : `[${theme}]`;
  }

  if (modeSelector) {
    return `[${mode}]`;
  }

  return ':root';
};

/** Get the prefixed, kebab-case token name, with a trailing `-root` renamed to `-default` */
const getTokenSlug = (token: TransformedToken, prefix?: string) => {
  const cleanName = token.name.replace(/-root$/, '-default');
  return joinParts(prefix, cleanName);
};

/** Build the CSS custom property name (`--prefix-name`) for a token */
const toCSSVarName = (token: TransformedToken, prefix?: string) =>
  `--${getTokenSlug(token, prefix)}`;

/** Build a `var(--prefix-name)` reference to a token's CSS custom property */
const toCSSVarRef = (token: TransformedToken, prefix?: string) =>
  `var(${toCSSVarName(token, prefix)})`;

type ExtractOptions = {
  modeSelector?: string;
  outputReferences?: OutputReferences;
  prefix?: string;
  tokens?: TransformedTokens;
  useThemeValues?: string;
};

/**
 * Get the final CSS value of a token. Resolution order: mode value (when a mode selector is set),
 * theme value (when `useThemeValues` is set), then the token's own value.
 * References are converted to `var()` when `outputReferences` is enabled.
 */
const extractValue = (token: TransformedToken, options: ExtractOptions) => {
  const {prefix, outputReferences, tokens, useThemeValues, modeSelector} = options;

  if (modeSelector) {
    const modeValue =
      token.original.$extensions?.['sana.canvas.tokens']?.modes?.[modeSelector]?.$value;
    const modeToken = {original: {$value: modeValue}};

    if (typeof modeValue === 'string') {
      return outputReferences ? resolveReferences(modeValue, {prefix, tokens}) : modeValue;
    }

    if (isOklchToken(modeToken)) {
      return getOklchValue(modeToken);
    }
  }

  const initialValue =
    outputReferences && typeof token.original.$value === 'string'
      ? resolveReferences(token.original.$value, {prefix, tokens})
      : token.$value;

  if (useThemeValues) {
    const extension = token.original.$extensions?.['sana.canvas.tokens']?.themes?.[useThemeValues];

    const value =
      typeof extension === 'object' && extension?.light
        ? extension.light.$value
        : extension?.$value;

    return value ? resolveReferences(value, {prefix, tokens}) : initialValue;
  }

  return initialValue;
};

type ShortenOptions = Pick<ExtractOptions, 'prefix' | 'tokens'>;

/** Replace `{token.reference}` placeholders in a value with `var()` references to the tokens */
const resolveReferences = (value: string, options: ShortenOptions) => {
  const {prefix, tokens} = options;
  const ref = tokens ? getReferences(value, tokens) : [];

  return value.replace(/\{([\w.$-]+)\}/g, a => {
    const refToken = ref.find(r => r.key === a);
    return refToken ? toCSSVarRef(refToken, prefix) : a;
  });
};

/** Generate a CSS class from a composite token, with one declaration per property */
const generateCompositeTokens = (token: TransformedToken, options: ShortenOptions) => {
  const values = token.original.$value as Record<string, string>;
  const className = getTokenSlug(token, options.prefix);
  const properties = Object.entries(values)
    .map(entry => generateClassProps(entry, options))
    .join('\n');

  return `.${className} {\n${properties}\n}\n`;
};

/** Generate a single kebab-case CSS declaration, resolving references in string values */
const generateClassProps = ([key, value]: [string, any], options: ShortenOptions) =>
  `\t${kebabCase(key)}: ${typeof value === 'string' ? resolveReferences(value, options) : value};`;
