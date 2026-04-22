import {Transform} from 'style-dictionary';

export const generateFallbacks = (array: string[], rawValue: string): string => {
  if (Array.isArray(array) && !array.length) {
    return rawValue;
  }

  const [current, ...rest] = array;

  const currentValue =
    current.startsWith('{') && current.endsWith('}')
      ? `--cnvs-${current.slice(1, -1).replace(/\./g, '-')}`
      : current;

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

  return token.original.value.startsWith('{')
    ? `var(${token.value}, ${token.original.value})`
    : token.value;
};
