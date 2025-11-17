import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
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
  /** The recommended replacement token based on pixel value */
  recommendedReplacement?: React.ReactNode;
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

/**
 * Finds the closest gap token based on pixel value.
 * Returns the JS variable name of the recommended replacement.
 */
function findClosestGapToken(deprecatedPxValue: number): string | null {
  // Get all gap tokens with their pixel values
  const gapTokenKeys = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2Xl'];

  const gapTokens = gapTokenKeys
    .map(key => {
      const varName = system.gap[key as keyof typeof system.gap];
      if (!varName) return null;

      const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
      const calculatedValue = multiplyCalcValues(value);
      const pxValue = calculatedValue * 16;

      return {
        key,
        pxValue,
        jsVar: `system.gap.${key}`,
      };
    })
    .filter((token): token is NonNullable<typeof token> => token !== null);

  // Find the closest match
  let closest = gapTokens[0];
  let minDiff = Math.abs(deprecatedPxValue - closest.pxValue);

  for (const token of gapTokens) {
    const diff = Math.abs(deprecatedPxValue - token.pxValue);
    if (diff < minDiff) {
      minDiff = diff;
      closest = token;
    }
  }

  return closest.jsVar;
}

const deprecatedSpaceTokens: DeprecatedSpaceToken[] = Object.entries(system.space).map(
  ([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const calculatedValue = multiplyCalcValues(value);
    const pxValue = calculatedValue * 16;
    const recommendedReplacement = findClosestGapToken(pxValue);

    return {
      cssVar: varName,
      jsVar: formatJSVar(`system.space.${key}`),
      value,
      calculatedValue: `${calculatedValue}rem`,
      pxValue: `${pxValue}px`,
      recommendedReplacement: recommendedReplacement
        ? formatJSVar(recommendedReplacement)
        : undefined,
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
        'Recommended Replacement',
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
