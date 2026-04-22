import {Transform} from 'style-dictionary';

export const generateFallbacks = (array: string[], rawValue: string): string => {
  // this function should take an array of strings and return a string of inner content for a var function
  // ['{sys.size.x4}', '{sys.space.x4}'] & ['1rem', '1rem'] -> 'var({sys.size.x4}, var({sys.space.x4}, 1rem))'
  // ['{sys.size.x4}', '{sys.space.x4}', '24px'] & ['1rem', '1rem', '24px'] -> 'var({sys.size.x4}, var({sys.space.x4}, 24px))'
  const [current, ...rest] = array;

  const currentValue =
    current.startsWith('{') && current.endsWith('}')
      ? `--cnvs-${current.slice(1, -1).replace(/\./g, '-')}`
      : current;

  if (!rest.length) {
    return !currentValue.startsWith('--cnvs') ? currentValue : `var(${currentValue}, ${rawValue})`;
  }
  // Recursively build up the nested var fallback
  return rawValue.startsWith('{') || rawValue.startsWith('--cnvs')
    ? `var(${currentValue}, ${generateFallbacks(rest, rawValue)})`
    : `var(${currentValue})`;
};

export const generateNewTokenFallback: Transform['transformer'] = token => {
  if (token.original.oldValues?.length) {
    return generateFallbacks(token.original.oldValues, token.original.value);
  }

  return token.original.value.startsWith('{')
    ? `var(${token.value}, ${token.original.value})`
    : token.value;
};
