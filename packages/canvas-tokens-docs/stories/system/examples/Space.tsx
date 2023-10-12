import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface SpaceToken {
  label: string;
  value: string;
  computedValue: string;
  pxValue: string;
  varName: string;
}

function multiplyCalcValues(value: string) {
  // Find the numbers in the string value
  const matches = value.match(/(0.)?\d+/g);
  if (matches) {
    // Multiply the matched values
    return matches.reduce((acc, current) => acc * Number(current), 1);
  }
  // If none exist, return 0
  return 0;
}

const spaceTokens: SpaceToken[] = Object.values(system.space).map(varName => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  const computedValue = multiplyCalcValues(value);
  return {
    label: varName,
    value: value,
    computedValue: `${computedValue}rem`,
    varName,
    pxValue: `${computedValue * 16}px`,
  };
});

export function SpaceTokens() {
  return (
    <TokenGrid
      caption="space tokens"
      headings={['Sample', 'Name', 'Value', 'Computed Value', 'Pixel Value']}
      rows={spaceTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: token.value,
                backgroundColor: `var(${base.blueberry400})`,
              }}
            />
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.label}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.computedValue}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.pxValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
