import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
} from '../../../../components/ColorGrid';

// Brand Focus Colors
const brandFocusPalette = buildPalette('system.color.brand.focus', {
  primary: system.color.brand.focus.primary,
  critical: system.color.brand.focus.critical,
  'caution.outer': system.color.brand.focus.caution.outer,
  'caution.inner': system.color.brand.focus.caution.inner,
}).sort(sortSystemColorPalette);

export const BrandFocusColors = () => (
  <ColorGrid name="Brand Focus Colors" palette={brandFocusPalette} variableType="system" />
);

// Brand Surface Colors
const brandSurfacePalettes = buildPaletteGroup(
  'system.color.brand.surface',
  {
    primary: system.color.brand.surface.primary,
    critical: system.color.brand.surface.critical,
    caution: system.color.brand.surface.caution,
    positive: system.color.brand.surface.positive,
  },
  sortSystemColorPalette
);

const brandSurfaceSelectedPalette = buildPalette('system.color.brand.surface', {
  selected: system.color.brand.surface.selected,
}).sort(sortSystemColorPalette);

export const BrandSurfaceColors = () => (
  <ColorGrid
    name="Brand Surface Colors"
    palette={[...brandSurfacePalettes, ...brandSurfaceSelectedPalette]}
    variableType="system"
  />
);

// Brand Accent Colors
const brandAccentPalette = buildPalette('system.color.brand.accent', {
  primary: system.color.brand.accent.primary,
  critical: system.color.brand.accent.critical,
  caution: system.color.brand.accent.caution,
  positive: system.color.brand.accent.positive,
  action: system.color.brand.accent.action,
}).sort(sortSystemColorPalette);

export const BrandAccentColors = () => (
  <ColorGrid name="Brand Accent Colors" palette={brandAccentPalette} variableType="system" />
);

// Brand Foreground Colors
const brandFgPalettes = buildPaletteGroup(
  'system.color.brand.fg',
  {
    primary: system.color.brand.fg.primary,
    critical: system.color.brand.fg.critical,
    caution: system.color.brand.fg.caution,
    positive: system.color.brand.fg.positive,
  },
  sortSystemColorPalette
);

const brandFgSelectedPalette = buildPalette('system.color.brand.fg', {
  selected: system.color.brand.fg.selected,
}).sort(sortSystemColorPalette);

export const BrandFgColors = () => (
  <ColorGrid
    name="Brand Foreground Colors"
    palette={[...brandFgPalettes, ...brandFgSelectedPalette]}
    variableType="system"
  />
);

// Brand Border Colors
const brandBorderPalette = buildPalette('system.color.brand.border', {
  'primary.default': system.color.brand.border.primary.default,
  critical: system.color.brand.border.critical,
  caution: system.color.brand.border.caution,
}).sort(sortSystemColorPalette);

export const BrandBorderColors = () => (
  <ColorGrid name="Brand Border Colors" palette={brandBorderPalette} variableType="system" />
);
