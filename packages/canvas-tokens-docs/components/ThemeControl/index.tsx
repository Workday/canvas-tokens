import React from 'react';
import {SegmentedControl} from '@workday/canvas-kit-react/segmented-control';
import {TextInput} from '@workday/canvas-kit-react/text-input';
import {BodyText} from '@workday/canvas-kit-react/text';

import './index.css';

export type ColorMode = 'light' | 'dark';

type ThemeControlProps = {
  /** Each element child receives an `isDark` prop reflecting the selected color mode. */
  children: React.ReactNode;
  stack?: 'vertical' | 'horizontal';
  /** Show a search field that filters children by their string props (e.g. `colorFamily`). */
  searchable?: boolean;
};

const matchesQuery = (child: React.ReactNode, query: string) => {
  if (!React.isValidElement(child)) return true;
  return Object.values(child.props as Record<string, unknown>).some(
    value => typeof value === 'string' && value.toLowerCase().includes(query)
  );
};

export const ThemeControl = ({children, stack = 'vertical', searchable}: ThemeControlProps) => {
  const [mode, setMode] = React.useState<ColorMode>('light');
  const [search, setSearch] = React.useState('');
  const query = search.trim().toLowerCase();
  const items = React.Children.toArray(children).filter(
    child => !query || matchesQuery(child, query)
  );
  const isDark = mode === 'dark';
  return (
    <div className="cnvs-docs-theme-control">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {searchable ? (
          <TextInput
            className="cnvs-docs-theme-control-search"
            type="search"
            aria-label="Search"
            placeholder="Search..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        ) : (
          <BodyText size="small" cs={{margin: 0, fontWeight: 500}}>
            Select a color mode
          </BodyText>
        )}
        <SegmentedControl
          initialValue={mode}
          onSelect={({id: value}) => setMode(value as ColorMode)}
        >
          <SegmentedControl.List aria-label="Color Mode">
            <SegmentedControl.Item data-id="light">Light</SegmentedControl.Item>
            <SegmentedControl.Item data-id="dark">Dark</SegmentedControl.Item>
          </SegmentedControl.List>
        </SegmentedControl>
      </div>
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
        {items.map(child =>
          React.isValidElement(child) ? React.cloneElement(child, {isDark} as object) : child
        )}
        {query && items.length === 0 && <p>No results for “{search}”.</p>}
      </div>
    </div>
  );
};
