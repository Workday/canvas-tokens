import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {buildPalette, ColorGrid, sortSystemColorPalette} from '../../../../components/ColorGrid';

const focusPalette = buildPalette('system.color.focus', {
  inverse: system.color.focus.inverse,
  contrast: system.color.focus.contrast,
}).sort(sortSystemColorPalette);

export const FocusColors = () => (
  <ColorGrid name="Focus Colors" palette={focusPalette} variableType="system" />
);
