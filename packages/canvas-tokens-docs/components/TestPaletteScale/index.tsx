import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';

import palette from '../../data/tokens/base/palette';
import pr from '../../data/tokens/brand/primary';
import ct from '../../data/tokens/brand/caution';
import cr from '../../data/tokens/brand/critical';
import ps from '../../data/tokens/brand/positive';

import './index.css';

type TestPaletteScaleProps = {
  group: string;
  isDark?: boolean;
};

const allColors = {
  palette,
  brand: {
    primary: pr.brand.primary,
    caution: ct.brand.caution,
    critical: cr.brand.critical,
    positive: ps.brand.positive,
  },
};

const getDeepValue = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => acc[key], obj);
};

const Swatch = ({color}: {color: string}) => {
  return <div className="swatch" style={{backgroundColor: color}} />;
};

export const TestPaletteScale = ({group, isDark}: TestPaletteScaleProps) => {
  const path = group.split('.');
  const colors = getDeepValue(allColors, path);

  console.log(isDark);

  return (
    <Card data-theme="sana-canvas" data-color-mode={isDark ? 'dark' : undefined}>
      <Card.Heading>{group}</Card.Heading>
      <div className="swatch-container">
        {Object.entries(colors).map(([key, value]: [string, any]) => (
          <div key={key} className="swatch-item">
            {value?.$value && <Swatch color={value?.$value} />}
            <Subtext size="small">{key}</Subtext>
          </div>
        ))}
      </div>
    </Card>
  );
};
