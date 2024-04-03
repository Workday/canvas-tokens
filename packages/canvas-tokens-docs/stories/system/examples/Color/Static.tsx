import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const staticPalettes = buildPaletteGroup(
  'system.color.static',
  system.color.static,
  sortSystemColorPalette
);

export const StaticColors = () => <ColorGrid name="Static Colors" palette={staticPalettes} />;
