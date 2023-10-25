import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface FontWeightToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

const fontWeightTokens: FontWeightToken[] = Object.entries(system.fontWeight).map(
  ([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.fontWeight.${key}`),
      value: value,
    };
  }
);

export function FontWeightTokens() {
  return (
    <TokenGrid
      caption="font weight tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value']}
      rows={fontWeightTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample style={{fontWeight: token.value}}>Canvas</TokenGrid.Sample>
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
}
