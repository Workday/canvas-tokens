import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';
import {buildTokensFromBase} from './utils/tokenUtils';
import {OpacityToken} from './utils/tokenTypes';

// Only show opacity tokens
const allowedOpacityKeys = ['0', '100', '200', '250', '300', '400', '500'];

const opacityTokens: OpacityToken[] = buildTokensFromBase<OpacityToken>(base, {
  keys: allowedOpacityKeys,
  propertyPrefix: 'opacity',
  jsPathPrefix: 'base.opacity',
  computeProperties: value => ({
    opacityValue: value,
  }),
});

export const BaseOpacityTokens = () => {
  return (
    <TokenGrid
      caption="Base Opacity Tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Opacity Value']}
      rows={opacityTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: `var(${system.color.bg.primary.default})`,
                opacity: `var(${token.cssVar})`,
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
          <TokenGrid.RowItem>{token.opacityValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
};
