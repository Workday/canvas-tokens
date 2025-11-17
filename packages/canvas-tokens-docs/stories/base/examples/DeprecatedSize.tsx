import * as React from 'react';
import {base, system} from '@workday/canvas-tokens-web';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';

interface DeprecatedSizeToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The value of the CSS token after converting rem to pixels */
  pxValue: string;
}

function getPixelValue(value: string) {
  // Strip 'rem' from the string, convert to a number, and multiply by 16
  const remMatch = value.match(/([\d.]+)rem/);
  if (remMatch) {
    const remValue = parseFloat(remMatch[1]);
    return `${remValue * 16}px`;
  }
  // If it's already a number (like line-height), return as is
  return value;
}

// Deprecated font-size tokens
const deprecatedFontSizeKeys = [
  '25',
  '50',
  '75',
  '100',
  '125',
  '150',
  '200',
  '250',
  '300',
  '400',
  '500',
  '600',
  '750',
  '900',
  '1050',
];

const deprecatedFontSize: Record<string, string> = {};
deprecatedFontSizeKeys.forEach(key => {
  const propName = `fontSize${key}` as keyof typeof base;
  if (propName in base) {
    deprecatedFontSize[key] = base[propName] as string;
  }
});

const deprecatedFontSizeTokens: DeprecatedSizeToken[] = Object.entries(deprecatedFontSize).map(
  ([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    return {
      cssVar: varName,
      jsVar: formatJSVar(`base.fontSize.${key}`),
      value,
      pxValue: getPixelValue(value),
    };
  }
);

// Deprecated line-height tokens
const deprecatedLineHeightKeys = [
  '50',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '500',
  '600',
  '750',
  '900',
  '1050',
];

const deprecatedLineHeight: Record<string, string> = {};
deprecatedLineHeightKeys.forEach(key => {
  const propName = `lineHeight${key}` as keyof typeof base;
  if (propName in base) {
    deprecatedLineHeight[key] = base[propName] as string;
  }
});

const deprecatedLineHeightTokens: DeprecatedSizeToken[] = Object.entries(deprecatedLineHeight).map(
  ([key, varName]) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
    return {
      cssVar: varName,
      jsVar: formatJSVar(`base.lineHeight.${key}`),
      value,
      pxValue: value, // line-height values are already in pixels
    };
  }
);

export const DeprecatedFontSizeTokens = () => {
  return (
    <TokenGrid
      caption="Deprecated Font Size Tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Pixel Value']}
      rows={deprecatedFontSizeTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                fontSize: `var(${token.cssVar})`,

                color: `var(${system.color.fg.primary.default})`,
              }}
            >
              Aa
            </TokenGrid.Sample>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.value}</TokenGrid.RowItem>
          <TokenGrid.RowItem>{token.pxValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
};
