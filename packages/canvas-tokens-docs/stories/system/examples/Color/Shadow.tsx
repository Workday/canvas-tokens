import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const statusPalettes = buildPaletteGroup(
  'system.color.shadow',
  {
    default: system.color.shadow.default,
    '1': system.color.shadow['1'],
    '2': system.color.shadow['2'],
  },
  sortSystemColorPalette
);

export const ShadowColors = () => <ColorGrid name="Text Status Colors" palette={statusPalettes} />;
