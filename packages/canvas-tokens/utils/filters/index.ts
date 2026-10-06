import {TransformedToken} from 'style-dictionary/types';

type TokenFilter = (token: TransformedToken) => boolean;

export const isSysShadow: TokenFilter = ({path: [level, type]}) => {
  return level === 'sys' && type === 'depth';
};

export const isBaseFontFamily: TokenFilter = ({path: [level, category, name]}) => {
  return level === 'base' && category === 'font-family' && !['0', 'fallback'].includes(name);
};

export const isBaseFontWeight: TokenFilter = ({type, path: [level, category]}) => {
  return level === 'base' && category === 'font-weight' && type === 'text';
};

export const isBaseDuration: TokenFilter = ({type, path: [level, category]}) => {
  return level === 'base' && category === 'duration' && type === 'number';
};

export const isBorder: TokenFilter = ({type, path: [level]}) => {
  return level === 'sys' && type === 'border';
};

export const isHexColor: TokenFilter = ({value}) => {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/.test(value);
};

export const isLetterSpacing: TokenFilter = ({path: [level, category]}) => {
  return level === 'base' && category === 'letter-spacing';
};

export const isPxLineHeight: TokenFilter = ({type, path: [level, category]}) => {
  return level === 'base' && category === 'line-height' && type === 'number';
};

export const isSysColor: TokenFilter = ({original}) => {
  return typeof original.value === 'string'
    ? original.value.includes('oklch({')
    : original.value.length &&
        original.value.some((v: Record<string, string>) => v.color.includes('oklch({'));
};

export const isMathExpression: TokenFilter = ({path, value}) => {
  if (!path) return false;

  const mathChars = [' + ', ' - ', ' * ', ' / '];
  return (
    typeof value === 'string' &&
    !value.includes('oklch') &&
    mathChars.some(char => value.includes(char))
  );
};

export const isDeprecated: TokenFilter = ({original}) => {
  return original.deprecated;
};

export const isNotDeprecated: TokenFilter = ({original}) => {
  return !original.deprecated;
};

export const isComposite: TokenFilter = ({type}) => {
  return /composition|typography/g.test(type ?? '');
};

export const isNotComposite: TokenFilter = token => {
  return !isComposite(token) && token.path[1] !== 'depth';
};

export const isBaseOpacity: TokenFilter = token => {
  const [level, category] = token.path;
  return level === 'base' && category === 'opacity' && parseFloat(token.value) > 1;
};

export const isBreakpoints: TokenFilter = token => {
  const [level, category] = token.path;
  return level === 'sys' && category === 'breakpoints';
};

export const filterCodeTokens: TokenFilter = token => {
  const excludedTokens = ['level', 'shadow', 'typescale'];
  return !excludedTokens.includes(token.path[1]);
};

export const filterActionTokens: TokenFilter = token => {
  const excludedTokens = ['action'];
  return !excludedTokens.includes(token.path[1]);
};

export const isOldValues: TokenFilter = token => {
  return Boolean(token.original.deprecatedValues) && token.path[1] !== 'type';
};

export const isSanaTheme: TokenFilter = token => {
  const [level, category] = token.path;
  const isBrandAction = level === 'brand' && category === 'action';

  return (
    token.filePath.includes('theme/sana.json') && !token.path.includes('shadow') && !isBrandAction
  );
};
