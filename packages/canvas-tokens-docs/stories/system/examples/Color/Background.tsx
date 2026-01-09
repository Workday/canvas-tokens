import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const backgroundPalette = buildPalette('system.color.bg', {
  default: system.color.bg.default,
}).sort(sortSystemColorPalette);

export const BackgroundColors = () => (
  <ColorGrid name="Background Default Colors" palette={backgroundPalette} variableType="system" />
);

const backgroundTransparentPalette = buildPalette('system.color.surface', {
  transparent: system.color.surface.transparent,
  'overlay.hover.default': system.color.surface.overlay.hover.default,
  'overlay.hover.inverse': system.color.surface.overlay.hover.inverse,
  'overlay.pressed.default': system.color.surface.overlay.pressed.default,
  'overlay.pressed.inverse': system.color.surface.overlay.pressed.inverse,
  'overlay.scrim': system.color.surface.overlay.scrim,
}).sort(sortSystemColorPalette);

export const BackgroundTransparentColors = () => (
  <ColorGrid
    name="Background Transparent Colors"
    palette={backgroundTransparentPalette}
    variableType="system"
  />
);

// Note: system.color.bg.muted doesn't exist, using surface.alt instead
const mutedPalette = buildPalette('system.color.surface.alt', system.color.surface.alt).sort(
  sortSystemColorPalette
);

export const BackgroundMutedColors = () => (
  <ColorGrid name="Background Muted Colors" palette={mutedPalette} variableType="system" />
);

const contrastPalette = buildPalette(
  'system.color.surface.contrast',
  system.color.surface.contrast
).sort(sortSystemColorPalette);

export const BackgroundContrastColors = () => (
  <ColorGrid name="Background Contrast Colors" palette={contrastPalette} variableType="system" />
);

const primaryPalette = buildPalette(
  'system.color.brand.surface.primary',
  system.color.brand.surface.primary
).sort(sortSystemColorPalette);

export const BackgroundPrimaryColors = () => (
  <ColorGrid name="Background Primary Colors" palette={primaryPalette} variableType="system" />
);

const infoPalette = buildPalette('system.color.surface.info', system.color.surface.info).sort(
  sortSystemColorPalette
);

export const BackgroundInfoColors = () => (
  <ColorGrid name="Background Info Colors" palette={infoPalette} variableType="system" />
);

const statusPalettes = buildPaletteGroup(
  'system.color.surface',
  {
    success: system.color.surface.success,
    warning: system.color.surface.warning,
    danger: system.color.surface.danger,
  },
  sortSystemColorPalette
);

export const BackgroundStatusColors = () => (
  <ColorGrid name="Background Status Colors" palette={statusPalettes} variableType="system" />
);

const aiPalette = buildPalette('system.color.surface.ai', system.color.surface.ai).sort(
  sortSystemColorPalette
);

export const BackgroundAIColors = () => (
  <ColorGrid name="Background AI Colors" palette={aiPalette} variableType="system" />
);
