import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const iconPalette = buildPalette('system.color.fg', {
  default: system.color.fg.default,
  'muted.default': system.color.fg.muted.default,
  strong: system.color.fg.strong,
  inverse: system.color.fg.inverse,
}).sort(sortSystemColorPalette);

export const IconColors = () => <ColorGrid name="Icon Default Colors" palette={iconPalette} />;

const iconPrimaryPalette = buildPalette(
  'system.color.brand.fg.primary',
  system.color.brand.fg.primary
).sort(sortSystemColorPalette);

export const IconPrimaryColors = () => (
  <ColorGrid name="Icon Primary Colors" palette={iconPrimaryPalette} />
);

const iconInfoPalette = buildPalette('system.color.fg.info', system.color.fg.info).sort(
  sortSystemColorPalette
);

export const IconInfoColors = () => <ColorGrid name="Icon Info Colors" palette={iconInfoPalette} />;

const iconStatusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    success: system.color.fg.success,
    warning: system.color.fg.warning,
    danger: system.color.fg.danger,
    disabled: system.color.fg.disabled,
  },
  sortSystemColorPalette
);

export const IconStatusColors = () => (
  <ColorGrid name="Icon Status Colors" palette={iconStatusPalettes} />
);
