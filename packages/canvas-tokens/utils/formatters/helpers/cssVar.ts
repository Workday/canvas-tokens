import {Dictionary} from 'style-dictionary';
import {kebabCase} from 'case-anything';
import {generateFallbacks} from '../../transformers/generateNewTokenFallback';

export const getCSSVarName = (path: string[]) => {
  return '--cnvs-' + path.map(i => (!i.match(/^A\d+$/) ? kebabCase(i) : i.toLowerCase())).join('-');
};

export const getLegacyEntries = (tokens: Dictionary['allTokens']) => {
  return tokens
    .filter(token => token.original.deprecatedValues)
    .map(token => {
      const {base: baseValue, ...refs} = token.original.deprecatedValues as Record<string, unknown>;
      const fallbackValues = Object.values(refs).filter(
        item => typeof item === 'string'
      ) as string[];

      const cssVarName = getCSSVarName(token.path);

      return {
        name: token.name,
        value: `var(${cssVarName}, ${generateFallbacks(fallbackValues, baseValue || token.value)})`,
      };
    });
};
