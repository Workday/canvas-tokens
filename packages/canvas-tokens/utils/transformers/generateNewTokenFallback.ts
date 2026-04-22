import {Transform} from 'style-dictionary';

const refToCSSVar = (ref: string): string => {
  return `--cnvs-${ref.slice(1, -1).replace(/\./g, '-').toLowerCase()}`;
};

export const generateFallbacks = (array: string[], rawValue: string): string => {
  if (Array.isArray(array) && !array.length) {
    return rawValue;
  }

  const [current, ...rest] = array;

  const currentValue =
    current.startsWith('{') && current.endsWith('}') ? refToCSSVar(current) : current;

  if (!rest.length) {
    const endingValue =
      typeof rawValue === 'string' && !rawValue.startsWith('{') && !rawValue.startsWith('--cnvs')
        ? rawValue
        : '';

    return !currentValue.startsWith('--cnvs')
      ? currentValue
      : endingValue
      ? `var(${currentValue}, ${endingValue})`
      : `var(${currentValue})`;
  }

  return `var(${currentValue}, ${generateFallbacks(rest, rawValue)})`;
};

export const generateNewTokenFallback: Transform['transformer'] = token => {
  if (token.original.oldValues?.length) {
    return generateFallbacks(token.original.oldValues, token.original.value);
  }

  const newValue =
    typeof token.original.value === 'string' &&
    !token.original.value.startsWith('{') &&
    token.value.startsWith('{')
      ? `var(${refToCSSVar(token.value)}, ${token.original.value})`
      : token.value;

  return newValue;
};
