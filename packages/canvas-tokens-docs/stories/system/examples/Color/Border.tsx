import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const borderPalette = buildPalette('system.color.border', {
  container: system.color.border.container,
  divider: system.color.border.divider,
  primary: system.color.border.primary.default,
  inverse: system.color.border.inverse,
  transparent: system.color.border.transparent,
  ai: system.color.border.ai,
}).sort(sortSystemColorPalette);

export const BorderColors = () => <ColorGrid name="Border Colors" palette={borderPalette} />;

const contrastPalette = buildPalette(
  'system.color.border.contrast',
  system.color.border.contrast
).sort(sortSystemColorPalette);

export const BorderContrastColors = () => (
  <ColorGrid name="Border Contrast Colors" palette={contrastPalette} />
);

const inputPalette = buildPalette('system.color.border.input', system.color.border.input).sort(
  sortSystemColorPalette
);

export const BorderInputColors = () => (
  <ColorGrid name="Border Input Colors" palette={inputPalette} />
);

const statusPalettes = buildPaletteGroup(
  'system.color.border',
  {
    caution: system.color.border.caution,
    critical: system.color.border.critical,
  },
  sortSystemColorPalette
);

export const BorderStatusColors = () => (
  <ColorGrid name="Border Status Colors" palette={statusPalettes} />
);
