import * as React from 'react';
import {TokenGrid, formatJSVar} from './TokenGrid';
import {formatName} from './ColorGrid';

const sortMap: Record<string, number> = {
  softer: 0,
  soft: 1,
  default: 2,
  strong: 3,
  stronger: 4,
};

export function sortSystemColorPalette(a: DeprecatedColorSwatch, b: DeprecatedColorSwatch) {
  const aLevel = a.cssVar.split('-').at(-1) || '';
  const bLevel = b.cssVar.split('-').at(-1) || '';
  const first = aLevel in sortMap ? sortMap[aLevel] : Infinity;
  const second = bLevel in sortMap ? sortMap[bLevel] : Infinity;
  return first - second;
}

export function buildPalette(prefix: string, tokens: Record<string, string>) {
  return Object.entries(tokens).map(([value, varName]) =>
    buildDeprecatedColorSwatch(varName, `${prefix}.${value}`)
  );
}

export function buildPaletteGroup(
  prefix: string,
  tokens: object,
  sortFn?: (a: DeprecatedColorSwatch, b: DeprecatedColorSwatch) => number
) {
  return Object.entries(tokens)
    .flatMap(([key, value]) => {
      if (typeof value === 'string') {
        return buildDeprecatedColorSwatch(value, `${prefix}.${key}`);
      } else {
        const palette = buildPalette(`${prefix}.${key}`, value);
        return sortFn ? palette.sort(sortFn) : palette;
      }
    })
}

export interface DeprecatedColorSwatch {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  newCSSVar: string;
  /** The new token value */
  newJsVar: React.ReactNode;
}

/** builds color swatch objects for ColorGrid */
export function buildDeprecatedColorSwatch(
  varName: string,
  jsVarName: string,
  newJsVar?: string
): DeprecatedColorSwatch {
  // Get the CSS var's value from the :root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    newCSSVar: value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
    newJsVar: formatJSVar(jsVarName),
  };
}

type VariableType = 'css' | 'javascript' | 'all';

interface DeprecatedColorGridProps {
  name: string;
  palette: DeprecatedColorSwatch[];
  variableType?: VariableType;
}

function getSwatchStyles(token: DeprecatedColorSwatch) {
  // update the property to support linear gradients
  // which need to be a background image instead of background color
  const property = token.newCSSVar.startsWith('linear-gradient(')
    ? 'backgroundImage'
    : 'backgroundColor';
  return {[property]: `var(${token.cssVar})`};
}

function getHeadings(type: VariableType) {
  const defaultHeadings = ['Swatch', 'New CSS Variable', 'New JS Variable'];
  if (type === 'css') {
    defaultHeadings.splice(1, 0, 'Deprecated CSS Variable Name');
  } else if (type === 'javascript') {
    defaultHeadings.splice(1, 0, 'Deprecated JS Variable Name');
  } else {
    defaultHeadings.splice(1, 0, 'Deprecated CSS Variable Name', 'Deprecated JS Variable Name');
  }
  return defaultHeadings;
}

/** A configuration of TokenGrid to quickly build tables for colors */
export function DeprecatedColorGrid({
  name,
  variableType = 'all',
  palette,
}: DeprecatedColorGridProps) {
  return (
    <TokenGrid caption={formatName(name)} headings={getHeadings(variableType)} rows={palette}>
      {token => {
        return (
          <>
            <TokenGrid.RowItem>
              <TokenGrid.Swatch style={getSwatchStyles(token)} />
            </TokenGrid.RowItem>
            {variableType === 'css' ||
              ('all' && (
                <TokenGrid.RowItem>
                  <TokenGrid.MonospaceLabel isDeprecated>{token.cssVar}</TokenGrid.MonospaceLabel>
                </TokenGrid.RowItem>
              ))}
            {variableType === 'javascript' ||
              ('all' && (
                <TokenGrid.RowItem>
                  <TokenGrid.MonospaceLabel isDeprecated>{token.jsVar}</TokenGrid.MonospaceLabel>
                </TokenGrid.RowItem>
              ))}
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel>
                {token.newCSSVar || 'transparent'}
              </TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel>{token.newJsVar || 'transparent'}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
          </>
        );
      }}
    </TokenGrid>
  );
}
