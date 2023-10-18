import * as React from 'react';
import {TokenGrid} from './TokenGrid';

export interface ColorSwatch {
  value: string;
  varName: string;
}

/** builds color swatch objects for ColorGrid */
export function buildColorSwatch(varName: string): ColorSwatch {
  // Get the CSS var's value from the :root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    value,
    varName,
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
    return {backgroundImage: `var(${token.varName})`};
    // everything else can be a background color
  } else {
    return {backgroundColor: `var(${token.varName})`};
  }
}

/** A configuration of TokenGrid to quickly build tables for colors */
export function ColorGrid(props: ColorGridProps) {
  return (
    <TokenGrid
      caption={formatName(props.name)}
      headings={['Swatch', 'CSS Variable', 'Value']}
      rows={props.palette}
    >
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Swatch style={getSwatchStyles(token)} />
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.varName}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
          <TokenGrid.RowItem>
            <TokenGrid.MonospaceLabel>{token.value}</TokenGrid.MonospaceLabel>
          </TokenGrid.RowItem>
        </>
      )}
    </TokenGrid>
  );
}
