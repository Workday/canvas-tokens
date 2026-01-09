import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

const accentBasePalette = buildPalette('system.color.accent', {
  ai: system.color.accent.ai,
  info: system.color.accent.info,
  danger: system.color.accent.danger,
  warning: system.color.accent.warning,
  success: system.color.accent.success,
  contrast: system.color.accent.contrast,
}).sort(sortSystemColorPalette);

export const AccentColors = () => (
  <ColorGrid name="Accent Colors" palette={accentBasePalette} variableType="system" />
);

const accentMutedPalette = buildPalette(
  'system.color.accent.muted',
  system.color.accent.muted
).sort(sortSystemColorPalette);

export const AccentMutedColors = () => (
  <ColorGrid name="Accent Muted Colors" palette={accentMutedPalette} variableType="system" />
);

const accentOverlayPalette = buildPalette(
  'system.color.accent.overlay',
  system.color.accent.overlay
).sort(sortSystemColorPalette);

export const AccentOverlayColors = () => (
  <ColorGrid name="Accent Overlay Colors" palette={accentOverlayPalette} variableType="system" />
);
