import {fileHeader, getReferences} from 'style-dictionary/utils';
import type {TransformedToken, TransformedTokens} from 'style-dictionary';

export const generateRoot = async ({dictionary, file, options}: any) => {
  const {prefix, outputReferences, themeSelector, useThemeValues} = options;
  const header = await fileHeader({file});
  const tokens = dictionary.allTokens
    .map((token: TransformedToken) => {
      const name = resolveCSSName(token, {prefix});

      const finalValue = extractValue(token, {
        prefix,
        outputReferences,
        tokens: dictionary.unfilteredTokens,
        useThemeValues,
      });

      return `\t${name}: ${finalValue};`;
    })
    .join('\n');

  const scope = themeSelector ? `[data-theme="${themeSelector}"]` : ':root';

  return header + `${scope} {\n` + tokens + '\n}\n';
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
    const extension = token.$extensions?.theme?.[useThemeValues];
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

  return value.replace(/\{([\w.-]+)\}/g, a => {
    const refToken = ref.find(r => r.key === a);
    return refToken ? resolveCSSName(refToken, {prefix, isRef: true}) : a;
  });
};
