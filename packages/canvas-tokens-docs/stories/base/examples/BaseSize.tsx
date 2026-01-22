import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
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
  if (!value) return 0;
  
  // If it's a calc() expression, evaluate it
  if (value.includes('calc(')) {
    // Extract the expression inside calc()
    const calcMatch = value.match(/calc\(([^)]+)\)/);
    if (calcMatch) {
      const expression = calcMatch[1];
      // Remove 'rem' units and evaluate the math expression
      const cleanExpression = expression.replace(/rem/g, '').trim();
      try {
        // Simple evaluation: if it's multiplication like "0.25 * 10", calculate it
        if (cleanExpression.includes('*')) {
          const parts = cleanExpression.split('*').map(p => parseFloat(p.trim()));
          return parts.reduce((acc, val) => acc * val, 1);
        }
        // If it's just a number, return it
        return parseFloat(cleanExpression) || 0;
      } catch {
        return 0;
      }
    }
  }
  
  // If it's already a rem value like "2.5rem", extract the number
  const remMatch = value.match(/^([\d.]+)\s*rem$/);
  if (remMatch) {
    return parseFloat(remMatch[1]) || 0;
  }
  
  // Fallback: try to extract any number from the string
  const numberMatch = value.match(/([\d.]+)/);
  return numberMatch ? parseFloat(numberMatch[1]) : 0;
}

// Size tokens
const sizeTokens: SizeToken[] = [
  {cssVar: base.size0, jsVar: formatJSVar('base.size0')},
  {cssVar: base.size25, jsVar: formatJSVar('base.size25')},
  {cssVar: base.size50, jsVar: formatJSVar('base.size50')},
  {cssVar: base.size75, jsVar: formatJSVar('base.size75')},
  {cssVar: base.size100, jsVar: formatJSVar('base.size100')},
  {cssVar: base.size125, jsVar: formatJSVar('base.size125')},
  {cssVar: base.size150, jsVar: formatJSVar('base.size150')},
  {cssVar: base.size175, jsVar: formatJSVar('base.size175')},
  {cssVar: base.size200, jsVar: formatJSVar('base.size200')},
  {cssVar: base.size225, jsVar: formatJSVar('base.size225')},
  {cssVar: base.size250, jsVar: formatJSVar('base.size250')},
  {cssVar: base.size300, jsVar: formatJSVar('base.size300')},
  {cssVar: base.size350, jsVar: formatJSVar('base.size350')},
  {cssVar: base.size400, jsVar: formatJSVar('base.size400')},
  {cssVar: base.size450, jsVar: formatJSVar('base.size450')},
  {cssVar: base.size500, jsVar: formatJSVar('base.size500')},
  {cssVar: base.size600, jsVar: formatJSVar('base.size600')},
  {cssVar: base.size700, jsVar: formatJSVar('base.size700')},
  {cssVar: base.size800, jsVar: formatJSVar('base.size800')},
  {cssVar: base.size900, jsVar: formatJSVar('base.size900')},
  {cssVar: base.size1000, jsVar: formatJSVar('base.size1000')},
  {cssVar: base.size1100, jsVar: formatJSVar('base.size1100')},
  {cssVar: base.size1200, jsVar: formatJSVar('base.size1200')},
  {cssVar: base.size1300, jsVar: formatJSVar('base.size1300')},
  {cssVar: base.size1400, jsVar: formatJSVar('base.size1400')},
].map(token => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token.cssVar);
  const calculatedValue = multiplyCalcValues(value);
  return {
    ...token,
    value,
    calculatedValue: `${calculatedValue}rem`,
    pxValue: `${calculatedValue * 16}px`,
  };
});

export const BaseSizeTokens = () => {
  return (
    <TokenGrid
      caption="base size tokens"
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
                height: `var(${token.cssVar})`,
                backgroundColor: `var(${system.color.border.contrast.default})`,
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
};
