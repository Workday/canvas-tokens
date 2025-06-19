import * as React from 'react';
import {DeprecatedTokenGrid, formatJSVar} from './TokenGrid/DeprecatedTokenGird';
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
    buildColorSwatch(varName, `${prefix}.${value}`)
  );
}

export function buildPaletteGroup(
  prefix: string,
  tokens: object,
  sortFn?: (a: DeprecatedColorSwatch, b: DeprecatedColorSwatch) => number
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

export interface DeprecatedColorSwatch {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
  /** The new token value */
  newValue: React.ReactNode;
}

/** builds color swatch objects for ColorGrid */
export function buildDeprecatedColorSwatch(
  varName: string,
  jsVarName: string,
  newValue?: string
): DeprecatedColorSwatch {
  // Get the CSS var's value from the :root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
    newValue: formatJSVar(jsVarName),
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
  const property = token.value.startsWith('linear-gradient(')
    ? 'backgroundImage'
    : 'backgroundColor';
  return {[property]: `var(${token.cssVar})`};
}

function getHeadings(type: VariableType) {
  const defaultHeadings = ['Swatch', 'New Value', 'Use This JS Variable Instead'];
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
    <DeprecatedTokenGrid
      caption={formatName(name)}
      headings={getHeadings(variableType)}
      rows={palette}
    >
      {token => {
        return (
          <>
            <DeprecatedTokenGrid.RowItem>
              <DeprecatedTokenGrid.Swatch style={getSwatchStyles(token)} />
            </DeprecatedTokenGrid.RowItem>
            {variableType === 'css' ||
              ('all' && (
                <DeprecatedTokenGrid.RowItem>
                  <DeprecatedTokenGrid.MonospaceLabel>
                    {token.cssVar}
                  </DeprecatedTokenGrid.MonospaceLabel>
                </DeprecatedTokenGrid.RowItem>
              ))}
            {variableType === 'javascript' ||
              ('all' && (
                <DeprecatedTokenGrid.RowItem>
                  <DeprecatedTokenGrid.MonospaceLabel>
                    {token.jsVar}
                  </DeprecatedTokenGrid.MonospaceLabel>
                </DeprecatedTokenGrid.RowItem>
              ))}
            <DeprecatedTokenGrid.RowItem>
              <span>{token.value || 'transparent'}</span>
            </DeprecatedTokenGrid.RowItem>
            <DeprecatedTokenGrid.RowItem>
              <span>{token.newValue || 'transparent'}</span>
            </DeprecatedTokenGrid.RowItem>
          </>
        );
      }}
    </DeprecatedTokenGrid>
  );
}
