import {Transform} from 'style-dictionary';

const refToCSSVar = (ref: string): string => {
  const path = ref.startsWith('{') && ref.endsWith('}') ? ref.slice(1, -1) : ref;
  return `--cnvs-${path.replace(/\./g, '-').toLowerCase()}`;
};

/** Dot-path aliases like base.palette.* or {sys.space.x4}; not plain literals (e.g. light-red). */
const isTokenPathReference = (s: string): boolean =>
  (s.startsWith('{') && s.endsWith('}')) || /^(base|sys|brand|component)(\.[\w-]+)+$/i.test(s);

const toFallbackSegment = (s: string): string =>
  typeof s === 'string' && isTokenPathReference(s) ? refToCSSVar(s) : s;

export const generateFallbacks = (array: string[], rawValue: string): string => {
  if (Array.isArray(array) && !array.length) {
    return rawValue;
  }

  const [current, ...rest] = array;

  const currentValue = typeof current === 'string' ? toFallbackSegment(current) : current;

  if (!rest.length) {
    if (!currentValue.startsWith('--cnvs')) {
      return currentValue;
    }

    if (
      typeof rawValue === 'string' &&
      !rawValue.startsWith('{') &&
      !rawValue.startsWith('--cnvs')
    ) {
      return `var(${currentValue}, ${rawValue})`;
    }

    return `var(${currentValue})`;
  }

  return `var(${currentValue}, ${generateFallbacks(rest, rawValue)})`;
};

export const generateNewTokenFallback: Transform['transformer'] = token => {
  const deprecatedValues = token.original.deprecatedValues;
  if (typeof deprecatedValues === 'object' && deprecatedValues !== null) {
    const {raw, ...refs} = deprecatedValues as Record<string, unknown>;
    const fallbackValues = Object.values(refs).filter(v => typeof v === 'string') as string[];

    return generateFallbacks(fallbackValues, raw || token.value);
  }

  const newValue =
    typeof token.original.value === 'string' &&
    !token.original.value.startsWith('{') &&
    token.value.startsWith('{')
      ? `var(${refToCSSVar(token.value)}, ${token.original.value})`
      : token.value;

  return newValue;
};
