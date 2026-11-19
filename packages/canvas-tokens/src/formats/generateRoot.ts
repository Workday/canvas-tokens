import type {
  Dictionary,
  File,
  OutputReferences,
  TransformedToken,
  TransformedTokens,
} from 'style-dictionary/types';
import {fileHeader, getReferences} from 'style-dictionary/utils';
import {kebabCase} from 'case-anything';

import {isBaseShadowToken, isOklchToken} from '../../filters';
import {getOklchValue, isComposite as isCompositeToken, joinParts} from '../../utils';

type Format = {
  dictionary: Dictionary;
  file: File;
  options: {
    compositeTokens?: string[];
    modeSelector?: string;
    /** Drop the trailing `-default` from the variable names, `--wdt-color-bg-default` -> `--wdt-color-bg` */
    omitDefault?: boolean;
    /** Scope the tokens to the light color mode as well as to the theme itself, so they can be overridden */
    lightScope?: boolean;
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
  const {
    compositeTokens,
    prefix,
    outputReferences,
    themeSelector,
    useThemeValues,
    modeSelector,
    omitDefault,
    lightScope,
  } = options;
  const header = await fileHeader({file});
  const allTokens = dictionary.unfilteredTokens;
  const extractOptions = {
    prefix,
    outputReferences,
    tokens: allTokens,
    useThemeValues,
    modeSelector,
    omitDefault,
  };
  const isComposite = (token: TransformedToken) => isCompositeToken(token, compositeTokens);

  const tokens = dictionary.allTokens
    .filter(token => !isComposite(token))
    .map(token => {
      const name = toCSSVarName(token, prefix, omitDefault);
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

  const scope = getScope(themeSelector, modeSelector, lightScope);

  return header + `${scope} {\n` + tokens + '\n}\n\n' + compositeTokensBlock;
};

/**
 * Get the CSS selector a token block is scoped to, based on the theme and mode selectors.
 * Falls back to `:root` when neither is set.
 */
const getScope = (themeSelector?: string, modeSelector?: string, lightScope?: boolean) => {
  const mode = `data-color-mode="${modeSelector}"`;

  if (themeSelector && lightScope) {
    const light = 'data-color-mode="light"';
    return `${themeSelector},\n${themeSelector}[${light}],\n${themeSelector} [${light}]`;
  }

  if (themeSelector) {
    return modeSelector
      ? `${themeSelector}[${mode}],\n${themeSelector} [${mode}],\n[${mode}] ${themeSelector}`
      : `${themeSelector}`;
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
const toCSSVarName = (token: TransformedToken, prefix?: string, omitDefault?: boolean) => {
  const slug = getTokenSlug(token, prefix);
  return `--${omitDefault ? slug.replace(/-default$/, '') : slug}`;
};

/** Build a `var(--prefix-name)` reference to a token's CSS custom property */
const toCSSVarRef = (token: TransformedToken, prefix?: string, omitDefault?: boolean) =>
  `var(${toCSSVarName(token, prefix, omitDefault)})`;

type ExtractOptions = {
  modeSelector?: string;
  outputReferences?: OutputReferences;
  omitDefault?: boolean;
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
  const {prefix, outputReferences, tokens, useThemeValues, modeSelector, omitDefault} = options;

  if (modeSelector) {
    const modeValue =
      token.original.$extensions?.['sana.canvas.tokens']?.modes?.[modeSelector]?.$value;
    const modeToken = {original: {$value: modeValue}};

    if (typeof modeValue === 'string') {
      return outputReferences
        ? resolveReferences(modeValue, {prefix, tokens, omitDefault})
        : modeValue;
    }

    if (isOklchToken(modeToken)) {
      return getOklchValue(modeToken);
    }
  }

  const initialValue =
    outputReferences && typeof token.original.$value === 'string'
      ? resolveReferences(token.original.$value, {prefix, tokens, omitDefault})
      : outputReferences && token.$type === 'shadow' && Array.isArray(token.original.$value)
      ? shadowToCss(token.original.$value, {prefix, tokens, omitDefault})
      : token.$value;

  if (useThemeValues) {
    const extension = token.original.$extensions?.['sana.canvas.tokens']?.themes?.[useThemeValues];

    const value =
      typeof extension === 'object' && extension?.light
        ? extension.light.$value
        : extension?.$value;

    return value ? resolveReferences(value, {prefix, tokens, omitDefault}) : initialValue;
  }

  return initialValue;
};

type ShortenOptions = Pick<ExtractOptions, 'omitDefault' | 'prefix' | 'tokens'>;

/** Replace `{token.reference}` placeholders in a value with `var()` references to the tokens */
const resolveReferences = (value: string, options: ShortenOptions) => {
  const {prefix, tokens, omitDefault} = options;
  const ref = tokens ? getReferences(value, tokens) : [];

  return value.replace(/\{([\w.$-]+)\}/g, a => {
    const refToken = ref.find(r => r.key === a);
    if (refToken && isBaseShadowToken(refToken)) return String(refToken.$value);
    return refToken ? toCSSVarRef(refToken, prefix, omitDefault) : a;
  });
};

type ShadowLayer = Record<'offsetX' | 'offsetY' | 'blur' | 'spread' | 'color', unknown>;

/**
 * Build a `box-shadow` value from the layers of a shadow token. Each part that references another
 * token (color, offset, blur, spread) stays a `var()` reference instead of a resolved value.
 */
const shadowToCss = (layers: ShadowLayer[], options: ShortenOptions) => {
  const toPart = (part: unknown) => {
    if (typeof part === 'string') return resolveReferences(part, options);
    const {value, unit} = (part ?? {}) as {value?: number; unit?: string};
    return `${value ?? 0}${unit ?? ''}`;
  };

  return layers
    .map(({offsetX, offsetY, blur, spread, color}) =>
      [offsetX, offsetY, blur, spread, color].map(toPart).join(' ')
    )
    .join(', ');
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
