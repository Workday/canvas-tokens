import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const backgroundPalette = buildPalette('system.color.bg', {
  default: system.color.bg.default,
  transparent: system.color.bg.transparent,
  translucent: system.color.bg.translucent,
  overlay: system.color.bg.overlay,
}).sort(sortSystemColorPalette);

export const BackgroundColors = () => (
  <ColorGrid name="Background Default Colors" palette={backgroundPalette} />
);

const alternatePalette = buildPalette('system.color.bg.alt', system.color.bg.alt).sort(
  sortSystemColorPalette
);

export const BackgroundAlternateColors = () => (
  <ColorGrid name="Background Alternate Colors" palette={alternatePalette} />
);

const mutedPalette = buildPalette('system.color.bg.muted', system.color.bg.muted).sort(
  sortSystemColorPalette
);

export const BackgroundMutedColors = () => (
  <ColorGrid name="Background Muted Colors" palette={mutedPalette} />
);

const contrastPalette = buildPalette('system.color.bg.contrast', system.color.bg.contrast).sort(
  sortSystemColorPalette
);

export const BackgroundContrastColors = () => (
  <ColorGrid name="Background Contrast Colors" palette={contrastPalette} />
);
const statusPalettes = buildPaletteGroup(
  'system.color.bg',
  {
    positive: system.color.bg.positive,
    caution: system.color.bg.caution,
    critical: system.color.bg.critical,
  },
  sortSystemColorPalette
);

export const BackgroundStatusColors = () => (
  <ColorGrid name="Background Status Colors" palette={statusPalettes} />
);
