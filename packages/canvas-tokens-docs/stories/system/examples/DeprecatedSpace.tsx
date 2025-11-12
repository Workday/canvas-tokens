import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DeprecatedSpaceToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The value of the CSS token after calculating the base unit times the multiplier */
  calculatedValue: string;
  /** The value of the CSS token after converting rem to pixels */
  pxValue: string;
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

const deprecatedSpaceTokens: DeprecatedSpaceToken[] = Object.entries(system.space).map(
  ([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const calculatedValue = multiplyCalcValues(value);
    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.space.${key}`),
      value,
      calculatedValue: `${calculatedValue}rem`,
      pxValue: `${calculatedValue * 16}px`,
    };
  }
);

export function DeprecatedSpaceTokens() {
  return (
    <TokenGrid
      caption="space tokens"
      headings={[
        'Sample',
        'CSS Variable',
        'JS Variable',
        'Value',
        'Calculated Value',
        'Pixel Value',
      ]}
      rows={deprecatedSpaceTokens}
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
