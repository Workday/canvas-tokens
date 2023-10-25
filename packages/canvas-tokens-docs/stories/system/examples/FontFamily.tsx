import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface FontFamilyToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

const fontFamilyTokens: FontFamilyToken[] = Object.entries(system.fontFamily).map(
  ([familyName, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);

    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.fontFamily.${familyName}`),
      value: value.replace(/"/g, ''),
    };
  }
);

export function FontFamilyTokens() {
  return (
    <TokenGrid
      caption="font family tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value']}
      rows={fontFamilyTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <span style={{fontFamily: token.value}}>Canvas</span>
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
