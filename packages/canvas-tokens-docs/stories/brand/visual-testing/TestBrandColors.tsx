import React from 'react';
import {TestPaletteScale} from '../../../components/TestPaletteScale';

const FAMILIES = ['primary', 'positive', 'caution', 'critical', 'neutral', 'common'] as const;

export const BrandColorsExample = () => {
  return (
    <div style={{display: 'grid', gap: '8px'}}>
      {FAMILIES.map(family => (
        <TestPaletteScale key={family} group={`brand.${family}`} />
      ))}
    </div>
  );
};
