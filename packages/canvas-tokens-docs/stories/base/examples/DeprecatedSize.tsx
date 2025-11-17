import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';
import {buildTokensFromBase, remToPx} from './utils/tokenUtils';
import {DeprecatedSizeToken} from './utils/tokenTypes';

// Deprecated font-size tokens
const deprecatedFontSizeKeys = [
  '25',
  '50',
  '75',
  '100',
  '125',
  '150',
  '200',
  '250',
  '300',
  '400',
  '500',
  '600',
  '750',
  '900',
  '1050',
];

const deprecatedFontSizeTokens: DeprecatedSizeToken[] = buildTokensFromBase<DeprecatedSizeToken>(
  base,
  {
    keys: deprecatedFontSizeKeys,
    propertyPrefix: 'fontSize',
    jsPathPrefix: 'base.fontSize',
    computeProperties: value => ({
      pxValue: remToPx(value),
    }),
  }
);

export const DeprecatedFontSizeTokens = () => {
  return (
    <TokenGrid
      caption="Deprecated Font Size Tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Pixel Value']}
      rows={deprecatedFontSizeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                fontSize: `var(${token.cssVar})`,

                color: `var(${system.color.fg.primary.default})`,
              }}
            >
              Aa
            </TokenGrid.Sample>
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
};
