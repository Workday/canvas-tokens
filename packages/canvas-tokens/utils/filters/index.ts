import {Matcher} from 'style-dictionary';

export const isSysShadow: Matcher = ({path: [level, type]}) => {
  return level === 'sys' && type === 'depth';
};

export const isBaseFontFamily: Matcher = ({path: [level, category]}) => {
  return level === 'base' && category === 'font-family';
};

export const isBaseFontWeight: Matcher = ({type, path: [level, category]}) => {
  return level === 'base' && category === 'font-weight' && type === 'text';
};

export const isBorder: Matcher = ({type, path: [level]}) => {
  return level === 'sys' && type === 'border';
};

export const isHexColor: Matcher = ({value}) => {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/.test(value);
};

export const isLetterSpacing: Matcher = ({path: [level, category]}) => {
  return level === 'base' && category === 'letter-spacing';
};

export const isPxLineHeight: Matcher = ({type, path: [level, category]}) => {
  return level === 'base' && category === 'line-height' && type === 'number';
};

export const isSysColor: Matcher = ({original}) => {
  return typeof original.value === 'string'
    ? original.value.includes('oklch({')
    : original.value.length &&
        original.value.some((v: Record<string, string>) => v.color.includes('oklch({'));
};

export const isMathExpression: Matcher = ({value}) => {
  const mathChars = [' + ', ' - ', ' * ', ' / '];
  return (
    typeof value === 'string' &&
    !value.includes('oklch') &&
    mathChars.some(char => value.includes(char))
  );
};

export const isDeprecated: Matcher = ({original}) => {
  return original.deprecated;
};

export const isComposite: Matcher = ({type}) => {
  return /composition|typography/g.test(type);
};

export const isNotComposite: Matcher = token => {
  return !isComposite(token) && token.path[1] !== 'depth';
};

export const isBaseOpacity: Matcher = token => {
  const [level, category] = token.path;
  return level === 'base' && category === 'opacity' && parseFloat(token.value) > 1;
};

export const isBreakpoints: Matcher = token => {
  const [level, category] = token.path;
  return level === 'sys' && category === 'breakpoints';
};

export const filterCodeTokens: Matcher = token => {
  const excludedTokens = ['level', 'shadow', 'typescale'];
  return !excludedTokens.includes(token.path[1]);
};

export const filterActionTokens: Matcher = token => {
  const excludedTokens = ['action'];
  return !excludedTokens.includes(token.path[1]);
};
