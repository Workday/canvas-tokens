import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface SizeToken {
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
  // Extract the multiplier from calc expressions like "calc(var(--cnvs-base-baseline) * 2.00)"
  // The pattern matches: * followed by optional whitespace, then a number (with optional decimal)
  const multiplierMatch = value.match(/\*\s*([\d.]+)/);
  if (multiplierMatch) {
    const multiplier = parseFloat(multiplierMatch[1]);
    // base.baseline is 0.5rem, so multiply by 0.5 to get the final rem value
    return multiplier * 0.5;
  }
  // If no multiplier found, try to parse as a direct rem value
  const remMatch = value.match(/([\d.]+)rem/);
  if (remMatch) {
    return parseFloat(remMatch[1]);
  }
  // If none exist, return 0
  return 0;
}

const sizeTokens: SizeToken[] = Object.entries(system.size).map(([key, varName]) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  const calculatedValue = multiplyCalcValues(value);
  return {
    cssVar: varName,
    jsVar: formatJSVar(`system.size.${key}`),
    value,
    calculatedValue: `${calculatedValue}rem`,
    pxValue: `${calculatedValue * 16}px`,
  };
});

export function SizeTokens() {
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
