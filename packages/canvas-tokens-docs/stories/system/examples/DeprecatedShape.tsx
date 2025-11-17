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
  /** The recommended replacement token based on pixel value */
  recommendedReplacement?: React.ReactNode;
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

/**
 * Finds the closest new shape token based on pixel value.
 * Returns the JS variable name of the recommended replacement.
 */
function findClosestShapeToken(deprecatedPxValue: number): string | null {
  // Get all new (non-deprecated) shape tokens with their pixel values
  const allowedShapeKeys = ['zero', 'xs', 'sm', 'md', 'lg', 'full'];

  const newShapeTokens = allowedShapeKeys
    .map(key => {
      const varName = system.shape[key as keyof typeof system.shape];
      if (!varName) return null;

      const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
      const calculatedValue = multiplyCalcValues(value);
      const pxValue = calculatedValue * 16;

      return {
        key,
        pxValue,
        jsVar: `system.shape.${key}`,
      };
    })
    .filter((token): token is NonNullable<typeof token> => token !== null);

  // Find the closest match
  let closest = newShapeTokens[0];
  let minDiff = Math.abs(deprecatedPxValue - closest.pxValue);

  for (const token of newShapeTokens) {
    const diff = Math.abs(deprecatedPxValue - token.pxValue);
    if (diff < minDiff) {
      minDiff = diff;
      closest = token;
    }
  }

  return closest.jsVar;
}

// Only show deprecated shape tokens
const notAllowedShapeKeys = ['zero', 'xs', 'sm', 'md', 'lg', 'full'];

const shapeTokens: ShapeToken[] = Object.entries(system.shape)
  .filter(([key]) => !notAllowedShapeKeys.includes(key))
  .map(([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const calculatedValue = multiplyCalcValues(value);
    const pxValue = calculatedValue * 16;
    const recommendedReplacement = findClosestShapeToken(pxValue);

    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.shape.${key}`),
      value,
      calculatedValue: `${calculatedValue}rem`,
      pxValue: `${pxValue}px`,
      recommendedReplacement: recommendedReplacement
        ? formatJSVar(recommendedReplacement)
        : undefined,
    };
  });

export function DeprecatedShapeTokens() {
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
        'Recommended Replacement',
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
          <TokenGrid.RowItem>
            {token.recommendedReplacement ? (
              <TokenGrid.MonospaceLabel>{token.recommendedReplacement}</TokenGrid.MonospaceLabel>
            ) : (
              '—'
            )}
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
