import React from 'react';
import {Card} from '@workday/canvas-kit-react/card';
import {Subtext} from '@workday/canvas-kit-react/text';

import {getTokens, getTokensByStep} from '../../util';

import './index.css';

type TestPaletteScaleProps = {
  group: string;
  isDark?: boolean;
};

const Swatch = ({color}: {color: string}) => {
  return <div className="swatch" style={{backgroundColor: color}} />;
};

export const TestPaletteScale = ({group, isDark}: TestPaletteScaleProps) => {
  const path = group.split('.');
  // `palette.red` is the `red` family of `base.palette`, others are groups like `brand.primary`
  const colors =
    path[0] === 'palette'
      ? getTokensByStep(getTokens('base.palette'), path.slice(1))
      : getTokensByStep(getTokens(group), path);

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
