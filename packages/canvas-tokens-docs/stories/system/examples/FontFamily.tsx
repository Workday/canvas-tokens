import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface FontFamilyToken {
  label: string;
  value: string;
}

const fontFamilyTokens: FontFamilyToken[] = Object.values(system.fontFamily).map(varName => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

  return {
    label: varName,
    value: value,
  };
});

export function FontFamilyTokens() {
  return (
    <TokenGrid
      caption="font family tokens"
      headings={['Sample', 'Name', 'Value']}
      rows={fontFamilyTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{fontFamily: token.value}}>Canvas</span>
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
