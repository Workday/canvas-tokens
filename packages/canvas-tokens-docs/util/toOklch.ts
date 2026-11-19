const round = (value: number, digits = 4) => Number(value.toFixed(digits));

const parseNumber = (part: string | undefined, percentScale = 1) => {
  if (!part || part === 'none') return 0;
  const value = parseFloat(part);
  return part.endsWith('%') ? (value / 100) * percentScale : value;
};

/** `oklab` components to a normalized `oklch(L C H / A)` string. */
const fromOklab = (l: number, a: number, b: number, alpha: number) => {
  const c = Math.hypot(a, b);
  // Achromatic colors have no meaningful hue
  const h = c < 1e-4 ? 0 : ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  const alphaPart = alpha < 1 ? ` / ${round(alpha, 3)}` : '';
  return `oklch(${round(l)} ${round(c < 1e-4 ? 0 : c)} ${round(h, 2)}${alphaPart})`;
};

/** Gamma-encoded sRGB channels (0..1) to a normalized `oklch()` string. */
const fromSrgb = (r: number, g: number, b: number, alpha: number) => {
  const [lr, lg, lb] = [r, g, b].map(x =>
    x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
  );
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  return fromOklab(
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
    alpha
  );
};

/**
 * Normalizes a computed CSS color (`getComputedStyle(...).backgroundColor`) to `oklch(L C H / A)`.
 * Browsers serialize computed colors as `oklch()`, `oklab()`, `color(srgb ...)` or `rgb()` depending
 * on how the color was authored, so all of them are converted. Unknown formats are returned as is.
 */
export function toOklch(css: string): string {
  const match = css.trim().match(/^(oklch|oklab|color|rgba?)\((.*)\)$/i);
  if (!match) return css;

  const [fn, body] = [match[1].toLowerCase(), match[2]];
  const [channels, alphaPart] = body.split('/').map(part => part.trim());
  let parts = channels.split(/[\s,]+/).filter(Boolean);
  let alpha = alphaPart === undefined ? 1 : parseNumber(alphaPart, 1);

  if (fn === 'oklch') {
    const [l, c, h] = [parseNumber(parts[0], 1), parseNumber(parts[1], 0.4), parseNumber(parts[2])];
    return `oklch(${round(l)} ${round(c)} ${round(h, 2)}${
      alpha < 1 ? ` / ${round(alpha, 3)}` : ''
    })`;
  }
  if (fn === 'oklab') {
    return fromOklab(
      parseNumber(parts[0], 1),
      parseNumber(parts[1], 0.4),
      parseNumber(parts[2], 0.4),
      alpha
    );
  }
  if (fn === 'color') {
    if (parts[0] !== 'srgb') return css;
    parts = parts.slice(1);
    return fromSrgb(parseNumber(parts[0]), parseNumber(parts[1]), parseNumber(parts[2]), alpha);
  }
  // rgb() / rgba(): legacy syntax carries alpha as a fourth comma separated value
  if (alphaPart === undefined && parts[3] !== undefined) alpha = parseNumber(parts[3], 1);
  return fromSrgb(
    parseNumber(parts[0], 255) / 255,
    parseNumber(parts[1], 255) / 255,
    parseNumber(parts[2], 255) / 255,
    alpha
  );
}
