import {isSizeZeroToken} from './naming.js';

const DIMENSION_SCOPES = [
  'WIDTH_HEIGHT',
  'GAP',
  'CORNER_RADIUS',
  'FONT_SIZE',
  'LINE_HEIGHT',
  'LETTER_SPACING',
  'PARAGRAPH_SPACING',
  'PARAGRAPH_INDENT',
  'EFFECT_FLOAT',
];

export function roundNumber(value, decimals = 4) {
  if (!Number.isFinite(value)) {
    return value;
  }

  if (Object.is(value, -0) || value === 0) {
    return 0;
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function roundOpacity(value) {
  return roundNumber(value, 2);
}

export function valueWithUnit(value, unit) {
  return {
    value: roundNumber(value),
    unit,
  };
}

function srgbToLinear(channel) {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearRgbToOklab(r, g, b) {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  return {
    L: 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot,
    a: 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot,
    b: 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot,
  };
}

function oklabToOklch({L, a, b}) {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) {
    h += 360;
  }

  return {
    l: L,
    c,
    h,
  };
}

function rgbaToHex({r, g, b, a = 1}) {
  const channel = value =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');

  const hex = `#${channel(r)}${channel(g)}${channel(b)}`;
  if (a >= 1) {
    return hex;
  }

  return `${hex}${channel(a)}`;
}

function formatOklchComponent(value, index) {
  if (index === 2) {
    return roundNumber(value, 2);
  }

  const rounded = roundNumber(value, 4);
  if (index === 1 && Math.abs(rounded) < 0.0002) {
    return 0.0001;
  }

  if (index === 0) {
    return roundNumber(rounded, 4);
  }

  return rounded;
}

export function rgbaToOklchColor(rgba) {
  const linearR = srgbToLinear(rgba.r);
  const linearG = srgbToLinear(rgba.g);
  const linearB = srgbToLinear(rgba.b);
  const oklab = linearRgbToOklab(linearR, linearG, linearB);
  const oklch = oklabToOklch(oklab);

  const color = {
    colorSpace: 'oklch',
    components: [
      formatOklchComponent(oklch.l, 0),
      formatOklchComponent(oklch.c, 1),
      formatOklchComponent(oklch.h, 2),
    ],
    hex: rgbaToHex(rgba),
  };

  if (rgba.a !== undefined && rgba.a < 1) {
    color.alpha = roundOpacity(rgba.a);
  }

  return color;
}

export function formatNumericValue(rawValue, variable) {
  if (variable.resolvedType === 'TIMING') {
    return valueWithUnit(Math.round(rawValue * 1000), 'ms');
  }

  const value = isSizeZeroToken(variable.name) ? 0 : rawValue;
  const scopes = variable.scopes || [];

  if (scopes.includes('OPACITY')) {
    return roundOpacity(value / 100);
  }

  if (DIMENSION_SCOPES.some(scope => scopes.includes(scope))) {
    return valueWithUnit(value, 'px');
  }

  return roundNumber(value);
}

export function formatEasingValue(value) {
  if (typeof value === 'string') {
    return value;
  }

  const bezier = value?.bezierValues;
  if (!bezier) {
    return value;
  }

  const p1x = roundNumber(bezier.p1x, 2);
  const p1y = roundNumber(bezier.p1y, 2);
  const p2x = roundNumber(bezier.p2x, 2);
  const p2y = roundNumber(bezier.p2y, 2);

  return `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;
}

export function figmaTypeToDtcg(resolvedType, value) {
  switch (resolvedType) {
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return typeof value === 'object' && value?.unit ? 'dimension' : 'number';
    case 'STRING':
      return 'fontFamily';
    case 'TIMING':
      return 'duration';
    case 'EASING':
      return 'cubic-bezier';
    default:
      return undefined;
  }
}
