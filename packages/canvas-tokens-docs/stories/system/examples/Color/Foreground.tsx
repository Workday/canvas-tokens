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

// Helper to filter tokens to only include default and strong variants
function filterStatusTokens(tokens: Record<string, string>) {
  const filtered: Record<string, string> = {};
  if (tokens.default) filtered.default = tokens.default;
  if (tokens.strong) filtered.strong = tokens.strong;
  return filtered;
}

const statusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    warning: filterStatusTokens(system.color.fg.warning),
    danger: filterStatusTokens(system.color.fg.danger),
    success: filterStatusTokens(system.color.fg.success),
    critical: filterStatusTokens(system.color.fg.critical),
    positive: filterStatusTokens(system.color.fg.positive),
    caution: filterStatusTokens(system.color.fg.caution)
  },
  sortSystemColorPalette
);

export const ForegroundStatusColors = () => (
  <ColorGrid name="Foreground Status Colors" palette={statusPalettes} variableType="system" />
);

const mutedPalette = buildPalette('system.color.fg.muted', filterStatusTokens(system.color.fg.muted)).sort(
  sortSystemColorPalette
);

export const ForegroundMutedColors = () => (
  <ColorGrid name="Foreground Muted Colors" palette={mutedPalette} variableType="system" />
);

const primaryPalette = buildPalette('system.color.brand.fg.primary', system.color.brand.fg.primary).sort(
  sortSystemColorPalette
);

export const ForegroundPrimaryColors = () => (
  <ColorGrid name="Foreground Primary Colors" palette={primaryPalette} variableType="system" />
);

const infoPalette = buildPalette('system.color.fg.info', filterStatusTokens(system.color.fg.info)).sort(
  sortSystemColorPalette
);

export const ForegroundInfoColors = () => (
  <ColorGrid name="Foreground Info Colors" palette={infoPalette} variableType="system" />
);

const contrastPalette = buildPalette('system.color.fg.contrast', system.color.fg.contrast).sort(
  sortSystemColorPalette
);

export const ForegroundContrastColors = () => (
  <ColorGrid name="Foreground Contrast Colors" palette={contrastPalette} variableType="system" />
);

const aiPalette = buildPalette('system.color.fg', {
  ai: system.color.fg.ai,
}).sort(sortSystemColorPalette);

export const ForegroundAIColors = () => (
  <ColorGrid name="Foreground AI Colors" palette={aiPalette} variableType="system" />
);
