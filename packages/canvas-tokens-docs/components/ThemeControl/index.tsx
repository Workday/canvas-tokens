import React from 'react';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';

export type ColorMode = 'light' | 'dark';

type ThemeControlProps = {
  children: React.ReactNode;
  stack?: 'vertical' | 'horizontal';
};

export const ThemeControl = ({children, stack = 'vertical'}: ThemeControlProps) => {
  const [mode, setMode] = React.useState<ColorMode>('dark');
  return (
    <div className={`theme-control`} style={{marginBlock: '24px'}}>
      <SegmentedControl initialValue={mode} onSelect={({id: value}) => setMode(value as ColorMode)}>
        <SegmentedControl.List aria-label="Color Mode">
          <SegmentedControl.Item data-id="light">Light</SegmentedControl.Item>
          <SegmentedControl.Item data-id="dark">Dark</SegmentedControl.Item>
        </SegmentedControl.List>
      </SegmentedControl>
      <div
        data-theme="sana-canvas"
        data-color-mode={setMode}
        style={{
          display: 'grid',
          gridTemplateColumns: stack === 'vertical' ? '1fr' : 'repeat(auto-fit, minmax(45%, 1fr))',
          gap: '16px',
          marginTop: '16px',
        }}
      >
        {children}
      </div>
    </div>
  );
};
