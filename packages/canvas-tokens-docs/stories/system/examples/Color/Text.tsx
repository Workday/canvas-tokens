import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const textPalette = buildPalette('system.color.fg', {
  default: system.color.fg.default,
  strong: system.color.fg.strong,
  stronger: system.color.fg.stronger,
  disabled: system.color.fg.disabled,
  'muted.default': system.color.fg.muted.default,
  'muted.strong': system.color.fg.muted.strong,
  inverse: system.color.fg.inverse,
  ai: system.color.fg.ai,
}).sort(sortSystemColorPalette);

export const TextColors = () => <ColorGrid name="Text Default Colors" palette={textPalette} />;

const statusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    success: system.color.fg.success,
    warning: system.color.fg.warning,
    danger: system.color.fg.danger,
  },
  sortSystemColorPalette
);

export const TextStatusColors = () => (
  <ColorGrid name="Text Status Colors" palette={statusPalettes} />
);

const primaryPalette = buildPalette('system.color.brand.fg.primary', system.color.brand.fg.primary).sort(
  sortSystemColorPalette
);

export const TextPrimaryColors = () => (
  <ColorGrid name="Text Primary Colors" palette={primaryPalette} />
);

const infoPalette = buildPalette('system.color.fg.info', system.color.fg.info).sort(
  sortSystemColorPalette
);

export const TextInfoColors = () => <ColorGrid name="Text Info Colors" palette={infoPalette} />;
