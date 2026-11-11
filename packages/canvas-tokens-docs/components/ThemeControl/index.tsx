import React from 'react';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';

import {ColorModeContext} from '../../util';
import type {ColorMode} from '../../util';

import './index.css';

export type {ColorMode};

type ThemeControlProps = {
  children: React.ReactNode;
  stack?: 'vertical' | 'horizontal';
};

export const ThemeControl = ({children, stack = 'vertical'}: ThemeControlProps) => {
  const [mode, setMode] = React.useState<ColorMode>('light');
  return (
    <div className="cnvs-docs-theme-control">
      <SegmentedControl initialValue={mode} onSelect={({id: value}) => setMode(value as ColorMode)}>
        <SegmentedControl.List aria-label="Color Mode">
          <SegmentedControl.Item data-id="light">Light</SegmentedControl.Item>
          <SegmentedControl.Item data-id="dark">Dark</SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
      <div
        data-theme="sana-canvas"
        data-color-mode={mode}
        className={[
          'cnvs-docs-theme-control-content',
          stack === 'horizontal' && 'cnvs-docs-theme-control-horizontal',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <ColorModeContext.Provider value={mode}>{children}</ColorModeContext.Provider>
      </div>
    </div>
  );
};
