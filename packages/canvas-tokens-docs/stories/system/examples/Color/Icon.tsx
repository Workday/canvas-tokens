import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const iconPalette = buildPalette('system.color.icon', {
  default: system.color.icon.default,
  soft: system.color.icon.soft,
  strong: system.color.icon.strong,
  inverse: system.color.icon.inverse,
}).sort(sortSystemColorPalette);

export const IconColors = () => <ColorGrid name="Icon Default Colors" palette={iconPalette} />;

const iconPrimaryPalette = buildPalette(
  'system.color.icon.primary',
  system.color.icon.primary
).sort(sortSystemColorPalette);

export const IconPrimaryColors = () => (
  <ColorGrid name="Icon Primary Colors" palette={iconPrimaryPalette} />
);

const iconStatusPalettes = buildPaletteGroup(
  'system.color.icon',
  {
    positive: system.color.icon.positive,
    caution: system.color.icon.caution,
    critical: system.color.icon.critical,
  },
  sortSystemColorPalette
);

export const IconStatusColors = () => (
  <ColorGrid name="Icon Status Colors" palette={iconStatusPalettes} />
);
