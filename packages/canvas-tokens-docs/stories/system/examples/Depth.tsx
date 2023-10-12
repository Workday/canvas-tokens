import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface DepthToken {
  label: string;
  value: string;
}

const depthTokens: DepthToken[] = Object.values(system.depth).map(varName => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

  return {
    label: varName,
    value: value.split('),').join('),\n'),
  };
});

export function DepthTokens() {
  return (
    <TokenGrid caption="depth tokens" headings={['Sample', 'Name', 'Value']} rows={depthTokens}>
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample style={{boxShadow: token.value}} />
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
