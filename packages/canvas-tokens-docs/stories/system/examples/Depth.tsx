import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DepthToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

// Depth levels 1-6 as per the token structure
const depthLevels = ['1', '2', '3', '4', '5', '6'] as const;

const depthTokens: DepthToken[] = depthLevels.map(level => {
  // CSS variable format: --cnvs-sys-depth-{level}
  const cssVarName = `--cnvs-sys-depth-${level}`;
  const value =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement).getPropertyValue(cssVarName) || ''
      : '';
  const formattedValue = value ? value.split('),').join('),\n') : '';

  return {
    cssVar: cssVarName,
    jsVar: formatJSVar(`system.depth.${level}`),
    value: formattedValue,
  };
});

export function DepthTokens() {
  return (
    <TokenGrid
      caption="depth tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Values']}
      rows={depthTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample style={{boxShadow: token.value}} />
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
  );
}
