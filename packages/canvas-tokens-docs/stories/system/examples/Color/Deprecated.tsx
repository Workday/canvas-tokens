import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import deprecatedSysTokens from '../../../../../canvas-tokens/tokens/deprecated/web/sys.json';

import {
  sortSystemColorPalette,
  ColorSwatch,
  buildPalette,
  buildPaletteGroup,
  formatName,
  getSwatchStyles,
} from '../../../../components/ColorGrid';
import {TokenGrid, formatJSVar} from '../../../../components/TokenGrid';

// Helper to safely get nested object properties
function safeGet(obj: any, path: string) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

// Recursively extract deprecated color tokens and their replacement values from the deprecated JSON
function extractDeprecatedColorTokens(
  obj: any,
  prefix: string = '',
  map: Map<string, string> = new Map()
): Map<string, string> {
  if (typeof obj !== 'object' || obj === null) {
    return map;
  }
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if ('value' in value && 'deprecated' in value && value.deprecated === true) {
        const replacementValue = value.value as string;
        if (replacementValue.startsWith('{') && replacementValue.endsWith('}')) {
          map.set(currentPath, replacementValue.slice(1, -1));
        }
      } else {
        extractDeprecatedColorTokens(value, currentPath, map);
      }
    }
  }
  return map;
}

const deprecatedColorTokenMap = extractDeprecatedColorTokens(
  deprecatedSysTokens.sys?.color || {},
  'color'
);

function getDeprecatedTokenValue(tokenPath: string): string | undefined {
  const pathWithoutColor = tokenPath
    .replace(/^(system|sys)\./, '')
    .replace(/^color\./, '');

  const pathParts = pathWithoutColor.split('.');
  let current: any = deprecatedSysTokens.sys?.color;

  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  if (
    current &&
    typeof current === 'object' &&
    'deprecated' in current &&
    current.deprecated === true &&
    'value' in current
  ) {
    const value = current.value as string;
    if (value.startsWith('{') && value.endsWith('}')) {
      return value.slice(1, -1);
    }
  }
  return undefined;
}

function getReplacementToken(deprecatedPath: string): string | undefined {
  const direct = getDeprecatedTokenValue(deprecatedPath);
  if (direct) return direct;

  const pathWithoutPrefix = deprecatedPath.replace(/^(system|sys)\./, '');
  return deprecatedColorTokenMap.get(pathWithoutPrefix);
}

// Palettes — using the shared buildPalette / buildPaletteGroup from ColorGrid
const bgPrimaryPalette = buildPaletteGroup(
  'system.color.bg.primary',
  safeGet(system.color, 'bg.primary') || {},
  sortSystemColorPalette
);

const bgTransparentPalette = buildPaletteGroup(
  'system.color.bg.transparent',
  safeGet(system.color, 'bg.transparent') || {},
  sortSystemColorPalette
);

const bgOverlayPalette = buildPalette('system.color.bg', {
  overlay: safeGet(system.color, 'bg.overlay'),
  translucent: safeGet(system.color, 'bg.translucent'),
});

const bgAltPalette = buildPaletteGroup(
  'system.color.bg.alt',
  safeGet(system.color, 'bg.alt') || {},
  sortSystemColorPalette
);

const bgMutedPalette = buildPaletteGroup(
  'system.color.bg.muted',
  safeGet(system.color, 'bg.muted') || {},
  sortSystemColorPalette
);

const bgContrastPalette = buildPaletteGroup(
  'system.color.bg.contrast',
  safeGet(system.color, 'bg.contrast') || {},
  sortSystemColorPalette
);

const bgStatusPalettes = buildPaletteGroup(
  'system.color.bg',
  {
    critical: safeGet(system.color, 'bg.critical') || {},
    caution: safeGet(system.color, 'bg.caution') || {},
    positive: safeGet(system.color, 'bg.positive') || {},
    info: safeGet(system.color, 'bg.info') || {},
  },
  sortSystemColorPalette
);

const bgAIPalette = buildPaletteGroup(
  'system.color.bg.ai',
  safeGet(system.color, 'bg.ai') || {},
  sortSystemColorPalette
);

const textPalette = buildPalette('system.color.text', {
  default: safeGet(system.color, 'text.default'),
  strong: safeGet(system.color, 'text.strong'),
  stronger: safeGet(system.color, 'text.stronger'),
  disabled: safeGet(system.color, 'text.disabled'),
  hint: safeGet(system.color, 'text.hint'),
  inverse: safeGet(system.color, 'text.inverse'),
});

const textStatusPalettes = buildPaletteGroup(
  'system.color.text',
  {
    critical: safeGet(system.color, 'text.critical') || {},
    caution: safeGet(system.color, 'text.caution') || {},
    positive: safeGet(system.color, 'text.positive') || {},
    primary: safeGet(system.color, 'text.primary') || {},
    info: safeGet(system.color, 'text.info') || {},
  },
  sortSystemColorPalette
);

const textAIPalette = buildPalette('system.color.text', {
  ai: safeGet(system.color, 'text.ai'),
});

const iconPalette = buildPalette('system.color.icon', {
  default: safeGet(system.color, 'icon.default'),
  soft: safeGet(system.color, 'icon.soft'),
  strong: safeGet(system.color, 'icon.strong'),
  inverse: safeGet(system.color, 'icon.inverse'),
  disabled: safeGet(system.color, 'icon.disabled'),
});

const iconStatusPalettes = buildPaletteGroup(
  'system.color.icon',
  {
    primary: safeGet(system.color, 'icon.primary') || {},
    critical: safeGet(system.color, 'icon.critical') || {},
    caution: safeGet(system.color, 'icon.caution') || {},
    positive: safeGet(system.color, 'icon.positive') || {},
    info: safeGet(system.color, 'icon.info') || {},
  },
  sortSystemColorPalette
);

const shadowPalette = buildPalette('system.color.shadow', {
  '1': safeGet(system.color, 'shadow.1'),
  '2': safeGet(system.color, 'shadow.2'),
  default: safeGet(system.color, 'shadow.default'),
});

const staticPalettes = buildPaletteGroup(
  'system.color.static',
  safeGet(system.color, 'static') || {},
  sortSystemColorPalette
);

const fgStatusPalettes = buildPaletteGroup(
  'system.color.fg',
  {
    critical: safeGet(system.color, 'fg.critical') || {},
    muted: safeGet(system.color, 'fg.muted') || {},
    primary: safeGet(system.color, 'fg.primary') || {},
    caution: safeGet(system.color, 'fg.caution') || {},
    info: safeGet(system.color, 'fg.info') || {},
    positive: safeGet(system.color, 'fg.positive') || {},
  },
  sortSystemColorPalette
);

const borderPalette = buildPalette('system.color.border', {
  ai: safeGet(system.color, 'border.ai'),
  contrast: safeGet(system.color, 'border.contrast'),
  critical: safeGet(system.color, 'border.critical'),
  caution: safeGet(system.color, 'border.caution'),
  divider: safeGet(system.color, 'border.divider'),
  primary: safeGet(system.color, 'border.primary'),
  container: safeGet(system.color, 'border.container'),
});

const borderInputPalette = buildPaletteGroup(
  'system.color.border.input',
  safeGet(system.color, 'border.input') || {},
  sortSystemColorPalette
);

// Combine all deprecated tokens and annotate each with its replacement
const allDeprecatedTokens: (ColorSwatch & {replacement?: string})[] = [
  ...bgPrimaryPalette,
  ...bgTransparentPalette,
  ...bgOverlayPalette,
  ...bgAltPalette,
  ...bgMutedPalette,
  ...bgContrastPalette,
  ...bgStatusPalettes,
  ...bgAIPalette,
  ...textPalette,
  ...textStatusPalettes,
  ...textAIPalette,
  ...iconPalette,
  ...iconStatusPalettes,
  ...fgStatusPalettes,
  ...borderPalette,
  ...borderInputPalette,
  ...shadowPalette,
  ...staticPalettes,
]
  .filter(token => token.value)
  .map(token => ({
    ...token,
    replacement: getReplacementToken(token.jsVarRaw),
  }));

export const DeprecatedColorTokens = () => (
  <TokenGrid
    caption={formatName('Deprecated Color Tokens')}
    headings={['Swatch', 'Variables', 'Value', 'Replacement']}
    rows={allDeprecatedTokens}
  >
    {token => (
      <>
        {/* Swatch */}
        <TokenGrid.RowItem>
          <TokenGrid.Swatch style={getSwatchStyles(token)} />
        </TokenGrid.RowItem>

        {/* CSS + JS variables stacked in one column */}
        <TokenGrid.RowItem>
          <div className="token-grid__var-row">
            <span className="token-grid__var-badge">CSS</span>
            <TokenGrid.MonospaceLabel isDeprecated copyText={token.cssVar}>
              {token.cssVar}
            </TokenGrid.MonospaceLabel>
          </div>
          <div className="token-grid__var-row">
            <span className="token-grid__var-badge">JS</span>
            <TokenGrid.MonospaceLabel isDeprecated copyText={token.jsVarRaw}>
              {token.jsVar}
            </TokenGrid.MonospaceLabel>
          </div>
        </TokenGrid.RowItem>

        {/* Computed value */}
        <TokenGrid.RowItem>
          <TokenGrid.MonospaceLabel>{token.value || 'none'}</TokenGrid.MonospaceLabel>
        </TokenGrid.RowItem>

        {/* Replacement token */}
        <TokenGrid.RowItem>
          {token.replacement ? (
            <TokenGrid.MonospaceLabel copyText={token.replacement}>
              {formatJSVar(token.replacement)}
            </TokenGrid.MonospaceLabel>
          ) : (
            <span>—</span>
          )}
        </TokenGrid.RowItem>
      </>
    )}
  </TokenGrid>
);
