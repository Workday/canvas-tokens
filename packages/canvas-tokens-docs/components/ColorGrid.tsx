import * as React from 'react';
import {TokenGrid, formatJSVar} from './TokenGrid';
import {systemColorCommentMap} from './systemTokenComments';

const sortMap: Record<string, number> = {
  softest: 0,
  softer: 1,
  soft: 2,
  default: 3,
  strong: 4,
  stronger: 5,
  strongest: 6,
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
  /** The purpose of the token */
  purpose?: string;
}

/** builds color swatch objects for ColorGrid */
export function buildColorSwatch(varName: string, jsVarName: string): ColorSwatch {
  // Get the CSS var's value from the :root element
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
    purpose: systemColorCommentMap[jsVarName],
  };
}

type VariableType = 'css' | 'javascript' | 'all' | 'system';

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
  const defaultHeadings = ['Swatch', 'Usage', 'Value'];
  if (type === 'css') {
    defaultHeadings[1] = 'CSS Variable';
  } else if (type === 'javascript') {
    defaultHeadings[1] = 'JS Variable';
  } else if (type === 'system') {
    defaultHeadings[1] = 'Usage';
    defaultHeadings.push('Description');
  } else {
    defaultHeadings[1] = 'Usage';
  }
  return defaultHeadings;
}

const deprecatedTokens = ['sys-color-static-orange', 'sys-color-static-gold'];

const handleDeprecatedTokenClass = (token: string) => {
  return deprecatedTokens.some(deprecatedToken => token.includes(deprecatedToken));
};

/** A configuration of TokenGrid to quickly build tables for colors */
export function ColorGrid({name, variableType = 'all', palette}: ColorGridProps) {
  return (
    <TokenGrid caption={formatName(name)} headings={getHeadings(variableType)} rows={palette}>
      {token => (
        <>
          <TokenGrid.RowItem>
            <TokenGrid.Swatch style={getSwatchStyles(token)} />
          </TokenGrid.RowItem>
          {(variableType !== 'javascript' || variableType !== 'css') && (
            <TokenGrid.RowItem>
              {variableType !== 'javascript' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <span>CSS</span>
                  <TokenGrid.MonospaceLabel isDeprecated={handleDeprecatedTokenClass(token.cssVar)}>
                    {token.cssVar}
                  </TokenGrid.MonospaceLabel>
                </div>
              )}
              {variableType !== 'css' && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  <span>JS</span>
                  <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
                </div>
              )}
            </TokenGrid.RowItem>
          )}
          <TokenGrid.RowItem>
            <span>{token.value || 'none'}</span>
          </TokenGrid.RowItem>
          {variableType === 'system' && (
            <TokenGrid.RowItem>
              <span>{token.purpose}</span>
            </TokenGrid.RowItem>
          )}
        </>
      )}
    </TokenGrid>
  );
}
