import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const foregroundPalette = buildPalette('system.color.fg', {
  default: system.color.fg.default,
  strong: system.color.fg.strong,
  stronger: system.color.fg.stronger,
  disabled: system.color.fg.disabled,
  inverse: system.color.fg.inverse,
}).sort(sortSystemColorPalette);

export const ForegroundColors = () => (
  <ColorGrid name="Foreground Default Colors" palette={foregroundPalette} />
);

const statusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    caution: system.color.fg.caution,
    critical: system.color.fg.critical,
  },
  sortSystemColorPalette
);

export const ForegroundStatusColors = () => (
  <ColorGrid name="Foreground Status Colors" palette={statusPalettes} />
);

const mutedPalette = buildPalette('system.color.fg.muted', system.color.fg.muted).sort(
  sortSystemColorPalette
);

export const ForegroundMutedColors = () => (
  <ColorGrid name="Foreground Muted Colors" palette={mutedPalette} />
);

const primaryPalette = buildPalette('system.color.fg.primary', system.color.fg.primary).sort(
  sortSystemColorPalette
);

export const ForegroundPrimaryColors = () => (
  <ColorGrid name="Foreground Primary Colors" palette={primaryPalette} />
);

const contrastPalette = buildPalette('system.color.fg.contrast', system.color.fg.contrast).sort(
  sortSystemColorPalette
);

export const ForegroundContrastColors = () => (
  <ColorGrid name="Foreground Contrast Colors" palette={contrastPalette} />
);

const aiPalette = buildPalette('system.color.fg', {
  ai: system.color.fg.default,
}).sort(sortSystemColorPalette);

export const ForegroundAIColors = () => (
  <ColorGrid name="Foreground AI Colors" palette={aiPalette} />
);
