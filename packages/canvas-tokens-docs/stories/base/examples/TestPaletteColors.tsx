import React from 'react';
import {TestPaletteScale} from '../../../components/TestPaletteScale';

const FAMILIES = [
  'amber',
  'azure',
  'black',
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

export const PaletteColorsExample = () => {
  return (
    <div style={{display: 'grid', gap: '8px'}}>
      {FAMILIES.map(family => (
        <TestPaletteScale key={family} group={`palette.${family}`} />
      ))}
    </div>
  );
};
