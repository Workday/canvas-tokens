import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const backgroundPalette = buildPalette('system.color.bg', {
  default: system.color.bg.default,
  alt: system.color.bg.alt.default,
}).sort(sortSystemColorPalette);

export const BackgroundColors = () => (
  <ColorGrid name="Background Default Colors" palette={backgroundPalette} variableType="system" />
);
