import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';
import {buildTokensFromBase, extractRemValue} from './utils/tokenUtils';
import {SizeToken} from './utils/tokenTypes';

// Only show non-deprecated size tokens
const allowedSizeKeys = [
  '0',
  '25',
  '50',
  '75',
  '100',
  '125',
  '150',
  '175',
  '200',
  '225',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '600',
  '700',
  '800',
  '900',
  '1000',
  '1100',
  '1200',
  '1300',
  '1400',
];

const sizeTokens: SizeToken[] = buildTokensFromBase<SizeToken>(base, {
  keys: allowedSizeKeys,
  propertyPrefix: 'size',
  jsPathPrefix: 'base.size',
  computeProperties: value => {
    const remValue = extractRemValue(value);
    return {
      calculatedValue: `${remValue}rem`,
      pxValue: `${remValue * 16}px`,
    };
  },
});

export function BaseSizeTokens() {
  return (
    <TokenGrid
      caption="size tokens"
      headings={[
        'Sample',
        'CSS Variable',
        'JS Variable',
        'Value',
        'Calculated Value',
        'Pixel Value',
      ]}
      rows={sizeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: `var(${token.cssVar})`,
                backgroundColor: `var(${system.color.bg.primary.default})`,
              }}
            />
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.calculatedValue}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.pxValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
