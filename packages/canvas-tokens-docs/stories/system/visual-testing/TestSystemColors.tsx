import React from 'react';
import {TestPaletteScale} from '../../../components/TestPaletteScale';

const GROUPS = [
  // Surface
  'system.color.surface',
  'system.color.surface.alt',
  'system.color.surface.contrast',
  'system.color.surface.danger',
  'system.color.surface.info',
  'system.color.surface.success',
  'system.color.surface.warning',
  'system.color.surface.ai',
  'system.color.surface.overlay',
  'system.color.surface.text',
  // Background
  'system.color.bg',
  // Accent
  'system.color.accent',
  'system.color.accent.muted',
  'system.color.accent.overlay',
  // Foreground
  'system.color.fg',
  'system.color.fg.contrast',
  'system.color.fg.danger',
  'system.color.fg.info',
  'system.color.fg.link',
  'system.color.fg.muted',
  'system.color.fg.success',
  'system.color.fg.warning',
  // Border
  'system.color.border',
  'system.color.border.input',
  'system.color.border.inverse',
  // Focus
  'system.color.focus',
  // Brand
  'system.color.brand.surface',
  'system.color.brand.accent',
  'system.color.brand.fg',
  'system.color.brand.border',
  'system.color.brand.focus',
  // Chart
  'system.color.chart.categorical',
  'system.color.chart.sequential',
  'system.color.chart.diverging',
] as const;

export const SystemColorsExample = ({isDark}: {isDark?: boolean}) => (
  <div style={{display: 'grid', gap: '8px'}}>
    {GROUPS.map(group => (
      <TestPaletteScale key={group} group={group} isDark={isDark} />
    ))}
  </div>
);
