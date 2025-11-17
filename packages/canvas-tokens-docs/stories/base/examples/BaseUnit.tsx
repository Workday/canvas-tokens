import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';
import {remToPx} from './utils/tokenUtils';

const value = getComputedStyle(document.documentElement).getPropertyValue(base.baseline);
const pxValue = remToPx(value);
const baseUnitToken = {
  label: base.baseline,
  value,
  pxValue,
};

export const BaseUnit = () => {
  return (
    <TokenGrid
      caption="Base Unit"
      headings={['Sample', 'CSS Variable', 'Value', 'Pixel Value']}
      rows={[baseUnitToken]}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: `var(${token.label})`,
                backgroundColor: `var(${system.color.bg.primary.default})`,
              }}
            />
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
