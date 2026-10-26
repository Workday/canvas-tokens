import {fileHeader, getReferences} from 'style-dictionary/utils';
import type {TransformedToken, TransformedTokens} from 'style-dictionary';
import {kebabCase} from 'case-anything';
import {isOklchToken} from '../../filters';
import {getOklchValue} from '../../utils';

export const generateRoot = async ({dictionary, file, options}: any) => {
  const {compositeTokens, prefix, outputReferences, themeSelector, useThemeValues, modeSelector} =
    options;
  const header = await fileHeader({file});
  const allTokens = dictionary.unfilteredTokens;
  const isComposite = (token: TransformedToken) =>
    compositeTokens && compositeTokens.includes(token.$type);

  const tokens = dictionary.allTokens
    .filter((token: TransformedToken) => !isComposite(token))
    .map((token: TransformedToken) => {
      const name = toCSSVarName(token, prefix);

      const finalValue = extractValue(token, {
        prefix,
        outputReferences,
        tokens: allTokens,
        useThemeValues,
        modeSelector,
      });

      const deprecatedWarning = token.$deprecated
        ? `\t/* Token is deprecated and will be removed in a future version.*/\n`
        : '';
      const comment = token.$description ? ` /* ${token.$description} */` : '';

      return `${deprecatedWarning}\t${name}: ${finalValue}${comment};`;
    })
    .join('\n');

  const compositeTokensBlock = dictionary.unfilteredAllTokens
    .filter(isComposite)
    .map((token: TransformedToken) => generateCompositeTokens(token, {prefix, tokens: allTokens}))
    .join('\n');

  const scope = getScope(themeSelector, modeSelector);

  return header + `${scope} {\n` + tokens + '\n}\n\n' + compositeTokensBlock;
};

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

const getTokenSlug = (token: TransformedToken, prefix: string) =>
  `${prefix}-${token.name.replace(/-root$/, '-default')}`;

const toCSSVarName = (token: TransformedToken, prefix: string) =>
  `--${getTokenSlug(token, prefix)}`;

const toCSSVarRef = (token: TransformedToken, prefix: string) =>
  `var(${toCSSVarName(token, prefix)})`;

const extractValue = (
  token: TransformedToken,
  options: {
    prefix: string;
    outputReferences: boolean;
    tokens: TransformedTokens;
    useThemeValues: string;
    modeSelector?: string;
  }
) => {
  const {prefix, outputReferences, tokens, useThemeValues, modeSelector} = options;

  if (modeSelector) {
    const modeValue =
      token.original.$extensions?.['sana.canvas.tokens']?.modes?.[modeSelector]?.$value;

    if (typeof modeValue === 'string') {
      return outputReferences ? resolveReferences(modeValue, {prefix, tokens}) : modeValue;
    }

    if (isOklchToken({original: {$value: modeValue}})) {
      return getOklchValue({original: {$value: modeValue}});
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

const resolveReferences = (value: string, options: {prefix: string; tokens: TransformedTokens}) => {
  const {prefix, tokens} = options;
  const ref = getReferences(value, tokens);

  return value.replace(/\{([\w.$-]+)\}/g, a => {
    const refToken = ref.find(r => r.key === a);
    return refToken ? toCSSVarRef(refToken, prefix) : a;
  });
};

const generateCompositeTokens = (
  token: TransformedToken,
  options: {prefix: string; tokens: TransformedTokens}
) => {
  const values = token.original.$value as Record<string, string>;
  const properties = Object.entries(values)
    .map(
      ([key, value]) =>
        `\t${kebabCase(key)}: ${
          typeof value === 'string' ? resolveReferences(value, options) : value
        };`
    )
    .join('\n');

  const className = getTokenSlug(token, options.prefix);

  return `.${className} {\n${properties}\n}\n`;
};
