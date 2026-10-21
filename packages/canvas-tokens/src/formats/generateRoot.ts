import {fileHeader, getReferences} from 'style-dictionary/utils';
import type {TransformedToken, TransformedTokens} from 'style-dictionary';
import {kebabCase} from 'case-anything';

export const generateRoot = async ({dictionary, file, options}: any) => {
  const {compositeTokens, prefix, outputReferences, themeSelector, useThemeValues} = options;
  const header = await fileHeader({file});
  const allTokens = dictionary.unfilteredTokens;

  const tokens = dictionary.allTokens
    .map((token: TransformedToken) => {
      const name = resolveCSSName(token, {prefix});

      const finalValue = extractValue(token, {
        prefix,
        outputReferences,
        tokens: allTokens,
        useThemeValues,
      });
      const cssValue = token.$type === 'fontFamily' ? quoteFontFamily(finalValue) : finalValue;

      const deprecatedWarning = token.$deprecated
        ? `\t/* Token is deprecated and will be removed in the future version.*/\n`
        : '';
      const comment = token.$description ? ` /* ${token.$description} */` : '';

      return `${deprecatedWarning}\t${name}: ${cssValue}${comment};`;
    })
    .join('\n');

  const compositeTokensBlock = dictionary.unfilteredAllTokens
    .filter((token: TransformedToken) => compositeTokens && compositeTokens.includes(token.$type))
    .map((token: TransformedToken) => generateCompositeTokens(token, {prefix, tokens: allTokens}))
    .join('\n');

  const scope = themeSelector ? `[data-theme="${themeSelector}"]` : ':root';

  return header + `${scope} {\n` + tokens + '\n}\n\n' + compositeTokensBlock;
};

const resolveCSSName = (token: TransformedToken, options: {prefix: string; isRef?: boolean}) => {
  const {prefix, isRef} = options;
  const noRootName = token.name.replace(/-root$/, '-default');
  const name = `--${prefix}-${noRootName}`;

  return isRef ? `var(${name})` : name;
};

const extractValue = (
  token: TransformedToken,
  options: {
    prefix: string;
    outputReferences: boolean;
    tokens: TransformedTokens;
    useThemeValues: string;
  }
) => {
  const {prefix, outputReferences, tokens, useThemeValues} = options;
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
    return refToken ? resolveCSSName(refToken, {prefix, isRef: true}) : a;
  });
};

// Font families are always wrapped in double quotes: a single family is always quoted,
// in a stack only names containing spaces are quoted.
const quoteFontFamily = (value: unknown) => {
  if (typeof value !== 'string' || value.includes('var(')) {
    return value;
  }

  const families = value.split(',').map(family => family.trim().replace(/^["']|["']$/g, ''));

  return families
    .map(family => (families.length === 1 || /\s/.test(family) ? `"${family}"` : family))
    .join(', ');
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

  const className = resolveCSSName(token, {prefix: options.prefix}).replace(/^--/, '');

  return `.${className} {\n${properties}\n}\n`;
};
