import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const borderPalette = buildPalette('system.color.border', {
  default: system.color.border.default,
  strong: system.color.border.strong,
  'primary.default': system.color.brand.border.primary,
  'info.default': system.color.border.info.default,
  danger: system.color.border.danger,
  warning: system.color.border.warning,
  'contrast.default': system.color.border.contrast.default,
  'input.default': system.color.border.input.default,
  'input.hover': system.color.border.input.hover,
  'inverse.default': system.color.border.inverse.default,
  'inverse.strong': system.color.border.inverse.strong,
  transparent: system.color.border.transparent,
  ai: system.color.border.ai,
}).sort(sortSystemColorPalette);

export const BorderColors = () => (
  <ColorGrid name="Border Colors" palette={borderPalette} variableType="system" />
);
