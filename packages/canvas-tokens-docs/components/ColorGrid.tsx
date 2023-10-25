import * as React from 'react';
import {TokenGrid, formatJSVar} from './TokenGrid';

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
  return {
    value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
  };
}

interface ColorGridProps {
  name: string;
  palette: ColorSwatch[];
}

/** transform 'camelCase' names into 'spaced case' */
function formatName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
}

function getSwatchStyles(token: ColorSwatch) {
  // linear gradients need to be background images
  if (token.value.startsWith('linear-gradient(')) {
    return {backgroundImage: `var(${token.cssVar})`};
    // everything else can be a background color
  } else {
    return {backgroundColor: `var(${token.cssVar})`};
  }
}

/** A configuration of TokenGrid to quickly build tables for colors */
export function ColorGrid(props: ColorGridProps) {
  return (
    <TokenGrid
      caption={formatName(props.name)}
      headings={['Swatch', 'CSS Variable', 'JS Variable', 'Value']}
      rows={props.palette}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Swatch style={getSwatchStyles(token)} />
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.cssVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <span>{token.value}</span>
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
