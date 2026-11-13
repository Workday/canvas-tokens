import React from 'react';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';

import './index.css';

export type ColorMode = 'light' | 'dark';

type ThemeControlProps = {
  /** Each element child receives an `isDark` prop reflecting the selected color mode. */
  children: React.ReactNode;
  stack?: 'vertical' | 'horizontal';
};

export const ThemeControl = ({children, stack = 'vertical'}: ThemeControlProps) => {
  const [mode, setMode] = React.useState<ColorMode>('light');
  const isDark = mode === 'dark';
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
        {React.Children.map(children, child =>
          React.isValidElement(child) ? React.cloneElement(child, {isDark} as object) : child
        )}
      </div>
    </div>
  );
};
