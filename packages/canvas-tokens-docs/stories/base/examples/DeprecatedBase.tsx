import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';
import {TokenGrid} from '../../../components/TokenGrid';
import {BaseToken} from './utils/tokenUtils';
import {formatJSVar} from '../../../components/TokenGrid';

// Deprecated unit token
const deprecatedUnitToken: BaseToken = {
  cssVar: base.baseUnit as string,
  jsVar: formatJSVar('base.unit'),
  value: getComputedStyle(document.documentElement).getPropertyValue(base.baseUnit as string),
};

const deprecatedTokens: BaseToken[] = [deprecatedUnitToken];

export const DeprecatedBaseTokens = () => {
  return (
    <TokenGrid
      caption="Deprecated Base Tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value']}
      rows={deprecatedTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: `var(${token.cssVar})`,
                backgroundColor: 'var(--cnvs-base-palette-blue-400)',
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
        </>
      )}
    </TokenGrid>
  );
};

