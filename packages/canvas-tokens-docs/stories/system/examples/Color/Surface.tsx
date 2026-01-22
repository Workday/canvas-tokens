import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const surfaceBasePalette = buildPalette('system.color.surface', {
  default: system.color.surface.default,
  navigation: system.color.surface.navigation,
  popover: system.color.surface.popover,
  modal: system.color.surface.modal,
  raised: system.color.surface.raised,
  loading: system.color.surface.loading,
  transparent: system.color.surface.transparent,
  inverse: system.color.surface.inverse,
}).sort(sortSystemColorPalette);

export const SurfaceColors = () => (
  <ColorGrid name="Surface Colors" palette={surfaceBasePalette} variableType="system" />
);

const surfaceAltPalette = buildPalette(
  'system.color.surface.alt',
  {alt: system.color.surface.alt.default, strong: system.color.surface.alt.strong},
).sort(sortSystemColorPalette);

export const SurfaceAltColors = () => (
  <ColorGrid name="Surface Alt Colors" palette={surfaceAltPalette} variableType="system" />
);

const surfaceContrastPalette = buildPalette(
  'system.color.surface.contrast',
  system.color.surface.contrast
).sort(sortSystemColorPalette);

export const SurfaceContrastColors = () => (
  <ColorGrid name="Surface Contrast Colors" palette={surfaceContrastPalette} variableType="system" />
);

const surfaceOverlayPalette = buildPalette('system.color.surface.overlay', {
  'hover.default': system.color.surface.overlay.hover.default,
  'hover.inverse': system.color.surface.overlay.hover.inverse,
  'pressed.default': system.color.surface.overlay.pressed.default,
  'pressed.inverse': system.color.surface.overlay.pressed.inverse,
  scrim: system.color.surface.overlay.scrim,
}).sort(sortSystemColorPalette);

export const SurfaceOverlayColors = () => (
  <ColorGrid name="Surface Overlay Colors" palette={surfaceOverlayPalette} variableType="system" />
);

const surfaceStatusPalettes = buildPaletteGroup(
  'system.color.surface',
  {
    info: system.color.surface.info,
    danger: system.color.surface.danger,
    warning: system.color.surface.warning,
    success: system.color.surface.success,
  },
  sortSystemColorPalette
);

export const SurfaceStatusColors = () => (
  <ColorGrid name="Surface Status Colors" palette={surfaceStatusPalettes} variableType="system" />
);

const surfaceAIPalette = buildPalette(
  'system.color.surface.ai',
  system.color.surface.ai
).sort(sortSystemColorPalette);

export const SurfaceAIColors = () => (
  <ColorGrid name="Surface AI Colors" palette={surfaceAIPalette} variableType="system" />
);
