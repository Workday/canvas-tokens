import * as React from 'react';
import {TokenGrid, formatJSVar} from './TokenGrid';

const sortMap: Record<string, number> = {
  softer: 0,
  soft: 1,
  default: 2,
  strong: 3,
  stronger: 4,
};

export function sortSystemColorPalette(a: ColorSwatch, b: ColorSwatch) {
  const aLevel = a.cssVar.split('-').at(-1) || '';
  const bLevel = b.cssVar.split('-').at(-1) || '';
  const first = aLevel in sortMap ? sortMap[aLevel] : Infinity;
  const second = bLevel in sortMap ? sortMap[bLevel] : Infinity;
  return first - second;
}

export function buildPalette(prefix: string, tokens: Record<string, string>) {
  return Object.entries(tokens).map(([value, varName]) =>
    buildColorSwatch(varName, `${prefix}.${value}`)
  );
}

export function buildPaletteGroup(
  prefix: string,
  tokens: object,
  sortFn?: (a: ColorSwatch, b: ColorSwatch) => number
) {
  return Object.entries(tokens)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return buildColorSwatch(value, `${prefix}.${key}`);
      } else {
        const palette = buildPalette(`${prefix}.${key}`, value);
        if (sortFn) {
          return palette.sort(sortFn);
        }
        return palette;
      }
    })
    .flat();
}

export interface ColorSwatch {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

/** builds color swatch objects for ColorGrid */
export function buildColorSwatch(varName: string, jsVarName: string): ColorSwatch {
  // Get the CSS var's value from the :root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  // console.log(value);
  return {
    value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
  };
}

type VariableType = 'css' | 'javascript' | 'all';

export interface ColorGridProps {
  name: string;
  palette: ColorSwatch[];
  variableType?: VariableType;
}

/** transform 'camelCase' names into 'spaced case' */
export function formatName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
}

function getSwatchStyles(token: ColorSwatch) {
  // update the property to support linear gradients
  // which need to be a background image instead of background color
  const property = token.value.startsWith('linear-gradient(')
    ? 'backgroundImage'
    : 'backgroundColor';
  return {[property]: `var(${token.cssVar})`};
}

function getHeadings(type: VariableType) {
  const defaultHeadings = ['Swatch', 'Value'];
  if (type === 'css') {
    defaultHeadings.splice(1, 0, 'CSS Variable');
  } else if (type === 'javascript') {
    defaultHeadings.splice(1, 0, 'JS Variable');
  } else {
    defaultHeadings.splice(1, 0, 'CSS Variable', 'JS Variable');
  }
  return defaultHeadings;
}

/** A configuration of TokenGrid to quickly build tables for colors */
export function ColorGrid({name, variableType = 'all', palette}: ColorGridProps) {
  return (
    <TokenGrid caption={formatName(name)} headings={getHeadings(variableType)} rows={palette}>
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Swatch style={getSwatchStyles(token)} />
          </TokenGrid.RowItem>
          {variableType === 'css' ||
            ('all' && (
              <TokenGrid.RowItem>
                <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
              </TokenGrid.RowItem>
            ))}
          {variableType === 'javascript' ||
            ('all' && (
              <TokenGrid.RowItem>
                <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
              </TokenGrid.RowItem>
            ))}
          <TokenGrid.RowItem>
            <span>{token.value || 'transparent'}</span>
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
