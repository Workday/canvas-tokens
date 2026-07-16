import * as React from 'react';
import {sana as systemSana} from '@workday/canvas-tokens-web/dist/es6/system/sana';

import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

const depthLevels = ['1', '2', '3', '4', '5', '6'] as const;

interface DepthToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The resolved shadow value from the themed CSS variable */
  shadow: string;
  /** The resolved value formatted for display */
  value: string;
}

function formatShadowLayers(value: string) {
  return value ? value.split('),').join('),\n') : '';
}

function readDepthTokens(container: HTMLElement): DepthToken[] {
  const styles = getComputedStyle(container);

  return depthLevels.flatMap(level => {
    const cssVar = `--cnvs-sys-depth-${level}`;
    const shadow = styles.getPropertyValue(cssVar).trim();
    if (!shadow) return [];

    return [
      {
        cssVar,
        jsVar: formatJSVar(`system.sana.depth.${level}`),
        shadow,
        value: formatShadowLayers(shadow),
      },
    ];
  });
}

export function SystemSanaDepth() {
  const themeRef = React.useRef<HTMLDivElement>(null);
  const [depthTokens, setDepthTokens] = React.useState<DepthToken[]>([]);

  React.useLayoutEffect(() => {
    const container = themeRef.current;
    if (!container) return;

    setDepthTokens(readDepthTokens(container));
  }, []);

  const hasDepthExport = Boolean(systemSana.depth);

  if (!hasDepthExport) {
    return (
      <p>
        No Sana depth tokens found. Rebuild tokens with <code>yarn build:tokens</code> and restart
        Storybook.
      </p>
    );
  }

  return (
    <div ref={themeRef} data-theme="sana-canvas">
      <TokenGrid
        caption="sana depth tokens"
        headings={['Sample', 'CSS Variable', 'JS Variable', 'Values']}
        rows={depthTokens}
      >
        {token => (
          <>
            <TokenGrid.RowItem>
              <div style={{padding: '1.5rem'}}>
                <TokenGrid.Sample
                  style={{
                    width: '7rem',
                    height: '5rem',
                    backgroundColor: 'var(--cnvs-sys-color-color-bg-default)',
                    borderRadius: '0.25rem',
                    boxShadow: token.shadow,
                  }}
                />
              </div>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              {token.value
                ? token.value
                    .split('),')
                    .map((item, i) => <span key={i}>{i === 0 ? `${item})` : item}</span>)
                : '—'}
            </TokenGrid.RowItem>
          </>
        )}
      </TokenGrid>
    </div>
  );
}
