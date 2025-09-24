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
).sort((a, b) => (a.cssVar > b.cssVar ? 1 : -1));

console.log(staticPalettes);

export const StaticColors = () => <ColorGrid name="Static Colors" palette={staticPalettes} />;
