import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const borderPalette = buildPalette('system.color.border', {
  default: system.color.border.root,
  strong: system.color.border.strong,
  'primary.default': system.color.brand.border.primary,
  info: system.color.border.info.root,
  danger: system.color.border.danger,
  warning: system.color.border.warning,
  contrast: system.color.border.contrast.root,
  input: system.color.border.input.root,
  inputHover: system.color.border.input.hover,
  inverse: system.color.border.inverse.root,
  inverseStrong: system.color.border.inverse.strong,
  transparent: system.color.border.transparent,
  ai: system.color.border.ai,
}).sort(sortSystemColorPalette);

export const BorderColors = () => (
  <ColorGrid name="Border Colors" palette={borderPalette} variableType="system" />
);
