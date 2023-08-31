import {Matcher} from 'style-dictionary';

export const isBaseShadow: Matcher = ({path: [level], type}) => {
  return level === 'base' && type === 'boxShadow';
};

export const isBaseFontFamily: Matcher = ({type, path: [level]}) => {
  return level === 'base' && type === 'fontFamilies';
};

export const isBorder: Matcher = ({type, path: [level]}) => {
  return level === 'sys' && type === 'border';
};

export const isHexColor: Matcher = ({value}) => {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/.test(value);
};

export const isLetterSpacing: Matcher = ({type}) => {
  return type === 'letterSpacing';
};

export const isSysColor: Matcher = ({original}) => {
  return typeof original.value === 'string'
    ? original.value.includes('rgba')
    : original.value.length &&
        original.value.some((v: Record<string, string>) => v.color.includes('rgba'));
};

export const isMathExpression: Matcher = ({value}) => {
  const mathChars = [' + ', ' - ', ' * ', ' / '];
  return typeof value === 'string' && mathChars.some(char => value.includes(char));
};

export const isComposite: Matcher = ({type}) => {
  return /composition|typography/g.test(type);
};

export const isNotComposite: Matcher = token => {
  return !isComposite(token);
};
