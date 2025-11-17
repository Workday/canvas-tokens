import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DeprecatedBaseToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

// Deprecated unit token
const deprecatedUnitToken: DeprecatedBaseToken = {
  cssVar: base.baseUnit as string,
  jsVar: formatJSVar('base.unit'),
  value: getComputedStyle(document.documentElement).getPropertyValue(base.baseUnit as string),
};

const deprecatedTokens: DeprecatedBaseToken[] = [deprecatedUnitToken];

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

