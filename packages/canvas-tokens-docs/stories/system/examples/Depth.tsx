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

const depthTokens: DepthToken[] = Object.entries(system.depth).map(([level, varName]) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

  return {
    cssVar: varName,
    jsVar: formatJSVar(`system.depth.${level}`),
    value: value.split('),').join('),\n'),
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
            {token.value.split('),').map((item, i) => (
              <span key={i}>{i === 0 ? `${item})` : item}</span>
            ))}
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
