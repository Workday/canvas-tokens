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
  /** The numeric opacity value */
  opacityValue: string;
}

// Only show opacity tokens
const allowedOpacityKeys = ['0', '100', '200', '250', '300', '400', '500'];

// Construct opacity object from individual base.opacity* properties
const baseOpacity: Record<string, string> = {};
allowedOpacityKeys.forEach(key => {
  const propName = `opacity${key}` as keyof typeof base;
  if (propName in base) {
    baseOpacity[key] = base[propName] as string;
  }
});

const opacityTokens: OpacityToken[] = Object.entries(baseOpacity).map(([key, varName]) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    cssVar: varName,
    jsVar: formatJSVar(`base.opacity.${key}`),
    value,
    opacityValue: value,
  };
});

export const BaseOpacityTokens = () => {
  return (
    <TokenGrid
      caption="Base Opacity Tokens"
      headings={['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Opacity Value']}
      rows={opacityTokens}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Sample
              style={{
                width: '100px',
                height: '100px',
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
          <TokenGrid.RowItem>{token.opacityValue}</TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
};
