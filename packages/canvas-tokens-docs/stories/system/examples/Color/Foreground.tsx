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
  <ColorGrid name="Foreground Default Colors" palette={foregroundPalette} variableType="system" />
);

const statusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    warning: system.color.fg.warning,
    danger: system.color.fg.danger,
    success: system.color.fg.success,
    critical: system.color.fg.critical,
    positive: system.color.fg.positive,
    caution: system.color.fg.caution,
  },
  sortSystemColorPalette
);

export const ForegroundStatusColors = () => (
  <ColorGrid name="Foreground Status Colors" palette={statusPalettes} variableType="system" />
);

const mutedPalette = buildPalette('system.color.fg.muted', {
  default: system.color.fg.muted.default,
  strong: system.color.fg.muted.strong,
}).sort(sortSystemColorPalette);

export const ForegroundMutedColors = () => (
  <ColorGrid name="Foreground Muted Colors" palette={mutedPalette} variableType="system" />
);

const primaryPalette = buildPalette('system.color.brand.fg.primary', {
  default: system.color.brand.fg.primary.default,
  strong: system.color.brand.fg.primary.strong,
}).sort(sortSystemColorPalette);

export const ForegroundPrimaryColors = () => (
  <ColorGrid name="Foreground Primary Colors" palette={primaryPalette} variableType="system" />
);

const infoPalette = buildPalette('system.color.fg.info', {
  default: system.color.fg.info.default,
  strong: system.color.fg.info.strong,
}).sort(sortSystemColorPalette);

export const ForegroundInfoColors = () => (
  <ColorGrid name="Foreground Info Colors" palette={infoPalette} variableType="system" />
);

const contrastPalette = buildPalette('system.color.fg.contrast', {
  default: system.color.fg.contrast.default,
  strong: system.color.fg.contrast.strong,
}).sort(sortSystemColorPalette);

export const ForegroundContrastColors = () => (
  <ColorGrid name="Foreground Contrast Colors" palette={contrastPalette} variableType="system" />
);

const aiPalette = buildPalette('system.color.fg', {
  ai: system.color.fg.ai,
}).sort(sortSystemColorPalette);

export const ForegroundAIColors = () => (
  <ColorGrid name="Foreground AI Colors" palette={aiPalette} variableType="system" />
);
