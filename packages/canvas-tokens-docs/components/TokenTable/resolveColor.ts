import {Theme} from '../ThemeControl';
import {cleanRef} from './tokenNames';
import {SDToken} from './types';

/**
 * The ref (e.g. `brand.neutral.50`) and computed value of a color token for a theme and color mode.
 * - Sana Canvas, light: the default value. Dark: the `modes.dark` value, or the default if none.
 * - Canvas: the `themes.canvas.light` value (or `themes.canvas.$value`), or the default if none.
 *   Dark mode resolves the same as light mode.
 */
export const resolveColor = (sdToken: SDToken, theme?: Theme, isDark?: boolean) => {
  const key = 'sana.canvas.tokens';
  const resolved = sdToken.$extensions?.[key];
  const original = sdToken.original.$extensions?.[key];

  const pick = (value?: string, originalValue?: string) =>
    value ? {value, ref: cleanRef(originalValue)} : undefined;

  if (theme === 'canvas') {
    const canvas = resolved?.themes?.canvas;
    const originalCanvas = original?.themes?.canvas;
    if (canvas && !canvas.$excluded) {
      const found = canvas.light
        ? pick(canvas.light.$value, originalCanvas?.light?.$value)
        : pick(canvas.$value, originalCanvas?.$value);
      if (found) return found;
    }
  } else if (isDark) {
    const found = pick(resolved?.modes?.dark?.$value, original?.modes?.dark?.$value);
    if (found) return found;
  }

  return {value: sdToken.$value, ref: cleanRef(sdToken.original.$value)};
};
