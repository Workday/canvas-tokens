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
  /** The formatted name of the JS variable (React node with word-break hints) */
  jsVar: React.ReactNode;
  /** The raw JS variable name string (used for copy-to-clipboard and lookups) */
  jsVarRaw: string;
  /** The actual string value of the token */
  value: string;
  /** The purpose of the token */
  purpose?: string;
}

/** Builds color swatch objects for ColorGrid */
export function buildColorSwatch(varName: string, jsVarName: string): ColorSwatch {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return {
    value,
    cssVar: varName,
    jsVar: formatJSVar(jsVarName),
    jsVarRaw: jsVarName,
    purpose: systemColorCommentMap[jsVarName],
  };
}

/** Returns the correct style property for a color swatch, handling linear-gradient tokens */
export function getSwatchStyles(token: Pick<ColorSwatch, 'cssVar' | 'value'>) {
  const property = token.value.trim().startsWith('linear-gradient(')
    ? 'backgroundImage'
    : 'backgroundColor';
  return {[property]: `var(${token.cssVar})`};
}

type VariableType = 'css' | 'javascript' | 'all' | 'system';

export interface ColorGridProps {
  name: string;
  palette: ColorSwatch[];
  variableType?: VariableType;
}

/** Transform 'camelCase' names into 'spaced case' */
export function formatName(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
}

function getShortName(cssVar: string) {
  return cssVar.replace(/^--cnvs-sys-/, '').replace(/^--cnvs-base-/, '');
}

function getHeadings(type: VariableType) {
  if (type === 'system') {
    return ['Swatch', 'Token', 'Variables', 'Value'];
  }
  if (type === 'css') {
    return ['Swatch', 'CSS Variable', 'Value'];
  }
  if (type === 'javascript') {
    return ['Swatch', 'JS Variable', 'Value'];
  }
  return ['Swatch', 'Usage', 'Value'];
}

const deprecatedTokens = ['sys-color-static-orange', 'sys-color-static-gold'];

const handleDeprecatedTokenClass = (token: string) => {
  return deprecatedTokens.some(deprecatedToken => token.includes(deprecatedToken));
};

/** A configuration of TokenGrid to quickly build tables for colors */
export function ColorGrid({name, variableType = 'all', palette}: ColorGridProps) {
  return (
    <TokenGrid caption={formatName(name)} headings={getHeadings(variableType)} rows={palette}>
      {token => {
        const isDeprecated = handleDeprecatedTokenClass(token.cssVar);

        if (variableType === 'system') {
          return (
            <>
              {/* Swatch */}
              <TokenGrid.RowItem>
                <TokenGrid.Swatch style={getSwatchStyles(token)} />
              </TokenGrid.RowItem>

              {/* Token name + description */}
              <TokenGrid.RowItem>
                <p className="token-grid__token-name">{getShortName(token.cssVar)}</p>
                {token.purpose && (
                  <p className="token-grid__token-desc">{token.purpose}</p>
                )}
              </TokenGrid.RowItem>

              {/* CSS + JS variables, stacked with copy buttons */}
              <TokenGrid.RowItem>
                <div className="token-grid__var-row">
                  <span className="token-grid__var-badge">CSS</span>
                  <TokenGrid.MonospaceLabel isDeprecated={isDeprecated} copyText={token.cssVar}>
                    {token.cssVar}
                  </TokenGrid.MonospaceLabel>
                </div>
                <div className="token-grid__var-row">
                  <span className="token-grid__var-badge">JS</span>
                  <TokenGrid.MonospaceLabel copyText={token.jsVarRaw}>
                    {token.jsVar}
                  </TokenGrid.MonospaceLabel>
                </div>
              </TokenGrid.RowItem>

              {/* Computed value — display only, no copy affordance */}
              <TokenGrid.RowItem>
                <TokenGrid.MonospaceLabel>
                  {token.value || 'none'}
                </TokenGrid.MonospaceLabel>
              </TokenGrid.RowItem>
            </>
          );
        }

        // Default / css / javascript layouts (non-system) — preserve existing behaviour
        return (
          <>
            <TokenGrid.RowItem>
              <TokenGrid.Swatch style={getSwatchStyles(token)} />
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              {variableType !== 'javascript' && (
                <div className="token-grid__var-row">
                  {variableType === 'all' && <span className="token-grid__var-badge">CSS</span>}
                  <TokenGrid.MonospaceLabel isDeprecated={isDeprecated} copyText={token.cssVar}>
                    {token.cssVar}
                  </TokenGrid.MonospaceLabel>
                </div>
              )}
              {variableType !== 'css' && (
                <div className="token-grid__var-row">
                  {variableType === 'all' && <span className="token-grid__var-badge">JS</span>}
                  <TokenGrid.MonospaceLabel copyText={token.jsVarRaw}>
                    {token.jsVar}
                  </TokenGrid.MonospaceLabel>
                </div>
              )}
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <span>{token.value || 'none'}</span>
            </TokenGrid.RowItem>
          </>
        );
      }}
    </TokenGrid>
  );
}
