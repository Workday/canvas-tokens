import React from 'react';
import {TestPaletteScale} from '../../../components/TestPaletteScale';

const FAMILIES = [
  'amber',
  'azure',
  'blue',
  'coral',
  'green',
  'indigo',
  'teal',
  'magenta',
  'neutral',
  'orange',
  'purple',
  'red',
  'slate',
] as const;

export const PaletteDarkColorsExample = () => {
  return (
    <div style={{display: 'grid', gap: '8px'}}>
      {FAMILIES.map(family => (
        <TestPaletteScale group={`palette.dark.${family}`} isDark />
      ))}
      <TestPaletteScale group="palette.white" isDark />
    </div>
  );
};
