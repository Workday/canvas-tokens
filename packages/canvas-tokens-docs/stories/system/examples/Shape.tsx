import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

interface ShapeToken {
  label: string;
  value: string;
  computedValue: string;
  pxValue: string;
  varName: string;
}

function multiplyCalcValues(value: string) {
  // Matches numbers such as .25, 0.25, or 25
  const numberRegExp = new RegExp(/(0*\.)?\d+/g);
  // Find the numbers in the string value
  const matches = value.match(numberRegExp);
  if (matches) {
    // Multiply the matched values
    return matches.reduce((acc, current) => acc * Number(current), 1);
  }
  // If none exist, return 0
  return 0;
}

const shapeTokens: ShapeToken[] = Object.values(system.shape).map(varName => {
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

export function ShapeTokens() {
  return (
    <TokenGrid
      caption="shape tokens"
      headings={['Sample', 'Name', 'Value', 'Computed Value', 'Pixel Value']}
      rows={shapeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                borderRadius: token.value,
                border: `solid 0.0625rem var(${base.blackPepper300})`,
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
