import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface OpacityToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The opacity value as a percentage (0-100) */
  percentageValue: string;
  /** The opacity value as a decimal (0-1) */
  decimalValue: string;
}

// Opacity tokens
const opacityTokens: OpacityToken[] = [
  {cssVar: base.opacity0, jsVar: formatJSVar('base.opacity0')},
  {cssVar: base.opacity80, jsVar: formatJSVar('base.opacity80')},
  {cssVar: base.opacity120, jsVar: formatJSVar('base.opacity120')},
  {cssVar: base.opacity200, jsVar: formatJSVar('base.opacity200')},
  {cssVar: base.opacity400, jsVar: formatJSVar('base.opacity400')},
  {cssVar: base.opacity640, jsVar: formatJSVar('base.opacity640')},
  {cssVar: base.opacity840, jsVar: formatJSVar('base.opacity840')},
].map(token => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token.cssVar);
  // Opacity values in CSS are stored as decimals (0-1)
  // Extract the percentage from the token name (e.g., "opacity80" -> 8%, "opacity200" -> 20%)
  const tokenName = token.cssVar.replace('--cnvs-base-opacity-', '');
  const numericValue = parseFloat(tokenName) || 0;
  const percentageValue = `${numericValue / 10}%`; // Convert 80 -> 8%, 200 -> 20%
  // The CSS value is already a decimal (0-1), so use it directly
  const decimalValue = parseFloat(value) || 0;
  
  return {
    ...token,
    value,
    percentageValue,
    decimalValue: decimalValue.toFixed(2),
  };
});

export const OpacityTokens = () => {
  return (
    <TokenGrid
      caption="base opacity tokens"
      headings={[
        'Sample',
        'CSS Variable',
        'JS Variable',
        'Value',
        'Percentage',
        'Decimal',
      ]}
      rows={opacityTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: '60px',
                height: '60px',
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
          <TokenGrid.RowItem>{token.percentageValue}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.decimalValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
};
