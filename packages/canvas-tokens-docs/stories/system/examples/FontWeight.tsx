import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface FontWeightToken {
  label: string;
  value: string;
}

const fontWeightTokens: FontWeightToken[] = Object.values(system.fontWeight).map(varName => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

  return {
    label: varName,
    value: value,
  };
});

export function FontWeightTokens() {
  return (
    <TokenGrid
      caption="font weight tokens"
      headings={['Sample', 'Name', 'Value']}
      rows={fontWeightTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{fontWeight: token.value}}>Canvas</span>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.label}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
