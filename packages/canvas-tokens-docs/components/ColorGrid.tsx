import * as React from 'react';
import {TokenGrid, formatJSVar} from './TokenGrid';

const sortMap: Record<string, number> = {
  softest: 0,
  softer: 1,
  soft: 2,
  default: 3,
  strong: 4,
  stronger: 5,
  strongest: 6,
};

const purposeMap: Record<string, string> = {
  'system.color.bg.default': 'Main page background',
  'system.color.bg.transparent.default': 'Transparent background',
  'system.color.bg.transparent.strong': 'Transparent background for inverse hover states',
  'system.color.bg.transparent.stronger': 'Transparent background for inverse active states',
  'system.color.bg.translucent': 'Darkest transparent background',
  'system.color.bg.overlay': 'Overlay background for modal dialogs',
  'system.color.bg.primary.soft': 'Disabled primary (blue) background',
  'system.color.bg.primary.default': 'Primary (blue) default background',
  'system.color.bg.primary.strong': 'Primary (blue) hover background',
  'system.color.bg.primary.stronger': 'Primary (blue) active background',
  'system.color.bg.caution.softer': 'Caution subtle background',
  'system.color.bg.caution.default': 'Caution default background',
  'system.color.bg.caution.strong': 'Caution hover background',
  'system.color.bg.caution.stronger': 'Caution active background',
  'system.color.bg.critical.softer': 'Error disabled background',
  'system.color.bg.critical.default': 'Error default background',
  'system.color.bg.critical.strong': 'Error hover background',
  'system.color.bg.positive.softer': 'Success surface background',
  'system.color.bg.positive.default': 'Success default background',
  'system.color.bg.positive.strong': 'Success hover background',
  'system.color.bg.positive.stronger': 'Success active background',
  'system.color.bg.muted.softer': 'Muted background (subtle). Light containers.',
  'system.color.bg.muted.soft': 'Muted background (soft). Form backgrounds.',
  'system.color.bg.muted.default': 'Muted background (default). Input fields, inactive elements.',
  'system.color.bg.muted.strong': 'Muted strong background. Switch toggles, loading indicators.',
  'system.color.bg.alt.softer': 'Disabled input background',
  'system.color.bg.alt.soft': 'Alternative page background, disabled secondary surfaces',
  'system.color.bg.alt.default': 'Secondary surface background',
  'system.color.bg.alt.strong': 'Secondary hover background',
  'system.color.bg.alt.stronger': 'Secondary active background',
  'system.color.bg.contrast.default': 'Contrast background (default), like Tooltip background.',
  'system.color.bg.contrast.strong':
    'Contrast background for high-contrast text container background',
  'system.color.fg.default': 'Body foreground',
  'system.color.fg.strong': 'Headings',
  'system.color.fg.stronger': 'Display titles',
  'system.color.fg.primary.default': 'Link foreground',
  'system.color.fg.primary.strong': 'Link foreground hover',
  'system.color.fg.caution.default': 'Caution foreground',
  'system.color.fg.critical.default': 'Error foreground',
  'system.color.fg.inverse': 'Inverse (white) foreground',
  'system.color.fg.disabled': 'Disabled foreground',
  'system.color.fg.muted.soft': 'Muted foreground (soft)',
  'system.color.fg.muted.default': 'Muted foreground (default)',
  'system.color.fg.muted.strong': 'Muted foreground (strong)',
  'system.color.fg.muted.stronger': 'Muted foreground (stronger)',
  'system.color.border.contrast.default':
    'Contrast border for card outline, divider on light surfaces',
  'system.color.border.contrast.strong': 'High-contrast outlines or focus states border',
  'system.color.border.primary.default': 'Primary active input border',
  'system.color.border.caution.default': 'Warning border (inner)',
  'system.color.border.caution.strong': 'Warning border (outer)',
  'system.color.border.critical.default': 'Error border',
  'system.color.border.inverse': 'Inverse border for containers with contrast background.',
  'system.color.border.transparent': 'Transparent border or border color placeholder',
  'system.color.border.ai': 'AI-related components border',
  'system.color.border.input.disabled': 'Disabled input border',
  'system.color.border.input.default': 'Default input border',
  'system.color.border.input.strong': 'Hover input border',
  'system.color.border.input.inverse': 'Inverse input border',
  'system.color.border.divider':
    'Divider/separator border, like table rows, content separators, etc.',
  'system.color.border.container': 'Container border (card/table edge).',
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
    purpose: purposeMap[jsVarName],
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
  const defaultHeadings = ['Swatch', 'Value'];
  if (type === 'css') {
    defaultHeadings.splice(1, 0, 'CSS Variable');
  } else if (type === 'javascript') {
    defaultHeadings.splice(1, 0, 'JS Variable');
  } else if (type === 'system') {
    defaultHeadings.splice(1, 0, 'CSS Variable', 'JS Variable');
    defaultHeadings.push('Use Case');
  } else {
    defaultHeadings.splice(1, 0, 'CSS Variable', 'JS Variable');
  }
  return defaultHeadings;
}

const deprecatedTokens = ['sys-color-static-orange', 'sys-color-static-gold'];

const handleDeprecatedTokenClass = (token: string) => {
  console.log('token', token);
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
          {variableType !== 'javascript' && (
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel isDeprecated={handleDeprecatedTokenClass(token.cssVar)}>
                {token.cssVar}
              </TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
          )}
          {variableType !== 'css' && (
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel>{token.jsVar}</TokenGrid.MonospaceLabel>
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
