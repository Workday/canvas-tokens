import {oklchToSrgb} from './oklchToSrgb';

export function oklchToRgba(oklch: string) {
  const srgb = oklchToSrgb(oklch);
  if (!srgb) return undefined;
  const {r, g, b, alpha} = srgb;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
