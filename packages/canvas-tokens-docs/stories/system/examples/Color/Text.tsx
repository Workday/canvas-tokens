import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const textPalette = buildPalette('system.color.text', {
  default: system.color.text.default,
  strong: system.color.text.strong,
  stronger: system.color.text.stronger,
  hint: system.color.text.hint,
  disabled: system.color.text.disabled,
  inverse: system.color.text.inverse,
}).sort(sortSystemColorPalette);

export const TextColors = () => <ColorGrid name="Text Default Colors" palette={textPalette} />;

const statusPalettes = buildPaletteGroup(
  'system.color.text',
  {
    primary: system.color.text.primary,
    caution: system.color.text.caution,
    critical: system.color.text.critical,
  },
  sortSystemColorPalette
);

export const TextStatusColors = () => (
  <ColorGrid name="Text Status Colors" palette={statusPalettes} />
);
