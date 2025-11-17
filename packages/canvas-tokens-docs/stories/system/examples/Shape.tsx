import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';
import {getTokenDescription} from './utils/tokenMetadata';

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
  /** The description/comment from the token definition */
  description?: string;
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

// Only show non-deprecated shape tokens
const allowedShapeKeys = ['zero', 'xs', 'sm', 'md', 'lg', 'full'];

const shapeTokens: ShapeToken[] = Object.entries(system.shape)
  .filter(([key]) => allowedShapeKeys.includes(key))
  .map(([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const calculatedValue = multiplyCalcValues(value);

    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.shape.${key}`),
      value,
      calculatedValue: `${calculatedValue}rem`,
      pxValue: `${calculatedValue * 16}px`,
      description: getTokenDescription('shape', key),
    };
  });

export function ShapeTokens() {
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
        'Description',
      ]}
      rows={shapeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                borderRadius: `var(${token.cssVar})`,
                border: `solid 0.0625rem var(${system.color.border.container})`,
                height: '5rem',
                width: '5rem',
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
          <TokenGrid.RowItem>{token.description || '—'}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
