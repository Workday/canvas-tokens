import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface FontSizeToken {
  label: string;
  value: string;
  pxValue: string;
}

const fontSizeTokens = Object.keys(system.fontSize).reduce((acc, level) => {
  const levelTokens = Object.values(system.fontSize[level as keyof typeof system.fontSize]).map(
    varName => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
      const pxValue = Number(value.replace('rem', '')) * 16;
      return {
        label: varName,
        value: value,
        pxValue: `${pxValue}px`,
      };
    }
  );
  return acc.concat(...levelTokens);
}, [] as FontSizeToken[]);

export function FontSizeTokens() {
  return (
    <TokenGrid
      caption="font size tokens"
      headings={['Sample', 'Name', 'Value', 'Pixel Value']}
      rows={fontSizeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{fontSize: token.value}}>Canvas</span>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.label}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.pxValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
