import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface FontSizeToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The value of the CSS token after converting rem to pixels */
  pxValue: string;
}
system.fontSize;
const fontSizeTokens = Object.keys(system.fontSize).reduce((acc, level) => {
  const levelSizes = system.fontSize[level as keyof typeof system.fontSize];
  const levelTokens = Object.entries(levelSizes).map(([size, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const pxValue = Number(value.replace('rem', '')) * 16;
    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.fontSize.${level}.${size}`),
      value,
      pxValue: `${pxValue}px`,
    };
  });
  return acc.concat(...levelTokens);
}, [] as FontSizeToken[]);

export function FontSizeTokens() {
  return (
    <TokenGrid
      caption="font size tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Pixel Value']}
      rows={fontSizeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample style={{fontSize: token.value}}>Canvas</TokenGrid.Sample>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>

          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.pxValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
