import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const shadowPalette = buildPalette('system.color.shadow', {
  base: system.color.shadow.base,
  ambient: system.color.shadow.ambient,
}).sort(sortSystemColorPalette);

export const ShadowColors = () => <ColorGrid name="Shadow Colors" palette={shadowPalette} variableType="system" />;
