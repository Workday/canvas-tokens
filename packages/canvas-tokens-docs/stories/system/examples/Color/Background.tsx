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

const backgroundTransparentPalette = buildPalette('system.color.bg', {
  'transparent.default': system.color.bg.transparent.default,
  'transparent.strong': system.color.bg.transparent.strong,
  'transparent.stronger': system.color.bg.transparent.stronger,
  translucent: system.color.bg.translucent,
  overlay: system.color.bg.overlay,
}).sort(sortSystemColorPalette);

export const BackgroundTransparentColors = () => (
  <ColorGrid
    name="Background Transparent Colors"
    palette={backgroundTransparentPalette}
    variableType="system"
  />
);

const alternatePalette = buildPalette('system.color.bg.alt', system.color.bg.alt).sort(
  sortSystemColorPalette
);

export const BackgroundAlternateColors = () => (
  <ColorGrid name="Background Alternate Colors" palette={alternatePalette} variableType="system" />
);

const mutedPalette = buildPalette('system.color.bg.muted', system.color.bg.muted).sort(
  sortSystemColorPalette
);

export const BackgroundMutedColors = () => (
  <ColorGrid name="Background Muted Colors" palette={mutedPalette} variableType="system" />
);

const contrastPalette = buildPalette('system.color.bg.contrast', system.color.bg.contrast).sort(
  sortSystemColorPalette
);

export const BackgroundContrastColors = () => (
  <ColorGrid name="Background Contrast Colors" palette={contrastPalette} variableType="system" />
);

const primaryPalette = buildPalette('system.color.bg.primary', system.color.bg.primary).sort(
  sortSystemColorPalette
);

export const BackgroundPrimaryColors = () => (
  <ColorGrid name="Background Primary Colors" palette={primaryPalette} variableType="system" />
);

const infoPalette = buildPalette('system.color.bg.info', system.color.bg.info).sort(
  sortSystemColorPalette
);

export const BackgroundInfoColors = () => (
  <ColorGrid name="Background Info Colors" palette={infoPalette} variableType="system" />
);

const statusPalettes = buildPaletteGroup(
  'system.color.bg',
  {
    positive: system.color.bg.positive,
    caution: system.color.bg.caution,
    critical: system.color.bg.critical,
  },
  sortSystemColorPalette
);

export const BackgroundStatusColors = () => (
  <ColorGrid name="Background Status Colors" palette={statusPalettes} variableType="system" />
);

const aiPalette = buildPalette('system.color.bg.ai', system.color.bg.ai).sort(
  sortSystemColorPalette
);

export const BackgroundAIColors = () => (
  <ColorGrid name="Background AI Colors" palette={aiPalette} variableType="system" />
);
