import {oklchToSrgb} from './oklchToSrgb';

const toHexByte = (value: number) => value.toString(16).padStart(2, '0');

export function oklchToHex(oklch: string) {
  const srgb = oklchToSrgb(oklch);
  if (!srgb) return undefined;
  const {r, g, b, alpha} = srgb;

  // Alpha is only appended when not fully opaque
  const alphaHex = alpha >= 1 ? '' : toHexByte(Math.round(alpha * 255));

  return '#' + [r, g, b].map(toHexByte).join('') + alphaHex;
}
