import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';

function getPixelValue(value: string) {
  // Strip 'rem' from the string, convert to a number, and multiply by 16
  const pxValue = Number(value.replace('rem', '')) * 16;
  return `${pxValue}px`;
}

const value = getComputedStyle(document.documentElement).getPropertyValue(base.fontSize);

const pxValue = getPixelValue(value);
const baseUnitToken = {
  label: base.fontSize,
  value,
  pxValue,
};

export const BaseFontSize = () => {
  return (
    <TokenGrid
      caption="Base Font Size"
      headings={['Sample', 'CSS Variable', 'Value', 'Pixel Value']}
      rows={[baseUnitToken]}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                fontSize: `var(${token.label})`,
              }}
            >
              Canvas
            </TokenGrid.Sample>
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
};
