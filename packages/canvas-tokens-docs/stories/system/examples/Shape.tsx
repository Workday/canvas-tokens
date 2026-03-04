import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface ShapeToken {
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

const deprecatedShapeTokens = ['zero', 'half', 'x1', 'x1Half', 'x2', 'x4', 'x6', 'full'];
const deprecatedShapeTokensData: ShapeToken[] = Object.entries(system.shape).filter(([key]) => deprecatedShapeTokens.includes(key)).map(([key, varName]) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  const calculatedValue = multiplyCalcValues(value);
  return {
    cssVar: varName,
    jsVar: formatJSVar(`system.shape.${key as keyof typeof system.shape}`),
    value,
    calculatedValue: `${calculatedValue}rem`,
    pxValue: `${calculatedValue * 16}px`
  };
});

const shapeTokens: ShapeToken[] = Object.entries(system.shape).filter(([key]) => !deprecatedShapeTokens.includes(key)).map(([key, varName]) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  const calculatedValue = multiplyCalcValues(value);

  return {
    cssVar: varName,
    jsVar: formatJSVar(`system.shape.${key as keyof typeof system.shape}`),
    value,
    calculatedValue: `${calculatedValue}rem`,
    pxValue: `${calculatedValue * 16}px`,
  };
});

export const DeprecatedShapeTokens = () => {
    return (
      <TokenGrid
        caption="deprecated shape tokens"
        headings={[
          'Sample',
          'CSS Variable',
          'JS Variable',
          'Value',
          'Calculated Value',
          'Pixel Value',
        ]}
        rows={deprecatedShapeTokensData}
      >
        {token => (
          <>
            <TokenGrid.RowItem>
              <TokenGrid.Sample
                style={{
                  borderRadius: `var(${token.cssVar})`,
                  height: 80,
                  width: 80,
                  border: `solid 0.0625rem var(${system.color.border.contrast.default})`,
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
  
  export const ShapeTokens = () => {
    return (
      <TokenGrid
        caption="shape tokens"
        headings={[
          'Sample',
          'CSS Variable',
          'JS Variable',
          'Value',
          'Calculated Value',
          'Pixel Value',
        ]}
        rows={shapeTokens}
      >
        {token => (
          <>
            <TokenGrid.RowItem>
              <TokenGrid.Sample
                style={{
                  borderRadius: `var(${token.cssVar})`,
                  height: 80,
                  width: 80,
                  border: `solid 0.0625rem var(${system.color.border.contrast.default})`,
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