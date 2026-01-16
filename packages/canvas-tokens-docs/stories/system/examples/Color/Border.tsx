import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const borderPalette = buildPalette('system.color.border', {
  default: system.color.border.default,
  strong: system.color.border.strong,
  'primary.default': system.color.brand.border.primary,
  info: system.color.border.info.default,
  danger: system.color.border.danger,
  warning: system.color.border.warning,
  'inverse.default': system.color.border.inverse.default,
  'inverse.strong': system.color.border.inverse.strong,
  contrast: system.color.border.contrast.default,
  transparent: system.color.border.transparent,
}).sort(sortSystemColorPalette);

export const BorderColors = () => (
  <ColorGrid name="Border Colors" palette={borderPalette} variableType="system" />
);

const contrastPalette = buildPalette('system.color.border.contrast', {
  contrast: system.color.border.contrast.default,
}).sort(sortSystemColorPalette);

export const BorderContrastColors = () => (
  <ColorGrid name="Border Contrast Colors" palette={contrastPalette} variableType="system" />
);

const inputPalette = buildPalette('system.color.border.input', system.color.border.input).sort(
  sortSystemColorPalette
);

export const BorderInputColors = () => (
  <ColorGrid name="Border Input Colors" palette={inputPalette} variableType="system" />
);

const statusPalettes = buildPaletteGroup(
  'system.color.brand.border',
  {
    'primary.default': system.color.brand.border.primary,
    critical: system.color.brand.border.critical,
    caution: system.color.brand.border.caution,
  },
  sortSystemColorPalette
);

export const BorderStatusColors = () => (
  <ColorGrid name="Border Status Colors" palette={statusPalettes} variableType="system" />
);
