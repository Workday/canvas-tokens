const HYPHENATED_SEGMENT_PAIRS = [
  ['font', 'size'],
  ['font', 'weight'],
  ['font', 'family'],
  ['line', 'height'],
  ['letter', 'spacing'],
];

export function toSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isDarkMode(mode) {
  return toSlug(mode.name) === 'dark';
}

export function findDarkMode(collection) {
  return collection.modes?.find(isDarkMode);
}

export function findLightMode(collection) {
  return collection.modes?.find(mode => toSlug(mode.name) === 'light');
}

export function toTokenPath(name) {
  const segments = name.split('/').map(segment => segment.replace(/\s+/g, '-'));
  const normalized = [];

  for (let index = 0; index < segments.length; index += 1) {
    const pair = HYPHENATED_SEGMENT_PAIRS.find(
      ([left, right]) => segments[index] === left && segments[index + 1] === right
    );
    if (pair) {
      normalized.push(`${pair[0]}-${pair[1]}`);
      index += 1;
      continue;
    }
    normalized.push(segments[index]);
  }

  return normalized;
}

export function flattenFontPath(name) {
  const segments = toTokenPath(name);
  if (segments[0] !== 'font') {
    return segments;
  }

  if (segments[1] === 'letter-spacing' || segments[1] === 'line-height') {
    return [segments[1], ...segments.slice(2)];
  }

  return [`font-${segments[1]}`, ...segments.slice(2)];
}

export function flattenThemeTypePath(name) {
  return flattenFontPath(name.replace(/^type\//, ''));
}

export function isSizeZeroToken(name) {
  const path = toTokenPath(name);
  return path[0] === 'size' && path[1] === '0' && path.length === 2;
}

export function isPxToken(name) {
  const segments = toTokenPath(name);
  return segments[segments.length - 1] === 'px';
}

export function getThemeCategory(variable) {
  return toTokenPath(variable.name)[0];
}

export function getThemePathSegments(variable) {
  return toTokenPath(variable.name).slice(1);
}
