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
  'black',
  'white',
] as const;

export const PaletteColorsExample = () => {
  return (
    <div style={{display: 'grid', gap: '8px'}}>
      {FAMILIES.map(family => (
        <TestPaletteScale group={`palette.${family}`} />
      ))}
    </div>
  );
};
