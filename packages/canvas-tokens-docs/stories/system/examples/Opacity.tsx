import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
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

function flattenOpacityTokens(
  obj: Record<string, unknown>,
  prefix = ''
): Array<{path: string; cssVar: string}> {
  const entries: Array<{path: string; cssVar: string}> = [];
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string' && val.startsWith('--')) {
      entries.push({path, cssVar: val});
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      entries.push(...flattenOpacityTokens(val as Record<string, unknown>, path));
    }
  }
  return entries;
}

const opacityTokensData = flattenOpacityTokens(
  system.opacity as unknown as Record<string, unknown>
);

const opacityTokens: OpacityToken[] = opacityTokensData.map(({path, cssVar}) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar);
  const decimalValue = parseFloat(value) ?? 0;
  const percentageValue = `${Math.round(decimalValue * 100)}%`;
  const jsPath = `system.opacity.${path}`;

  return {
    cssVar,
    jsVar: formatJSVar(jsPath),
    value,
    percentageValue,
    decimalValue: decimalValue.toFixed(2),
  };
});

export const OpacityTokens = () => {
  return (
    <TokenGrid
      caption="system opacity tokens"
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
