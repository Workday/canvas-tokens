import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import deprecatedSysTokens from '../../../../../canvas-tokens/tokens/deprecated/web/sys.json';

import {
  sortSystemColorPalette,
  ColorSwatch,
  buildColorSwatch,
} from '../../../../components/ColorGrid';
import {TokenGrid, formatJSVar} from '../../../../components/TokenGrid';
import {formatName} from '../../../../components/ColorGrid';

// Helper to safely get nested object properties
function safeGet(obj: any, path: string) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

// Helper to recursively extract deprecated color tokens and their replacement values
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
      // Check if this is a deprecated token with a value field
      if ('value' in value && 'deprecated' in value && value.deprecated === true) {
        // Extract the replacement token from the value field
        // Format: "{sys.color.brand.surface.primary.default}" -> "sys.color.brand.surface.primary.default"
        const replacementValue = value.value as string;
        if (replacementValue.startsWith('{') && replacementValue.endsWith('}')) {
          const replacementToken = replacementValue.slice(1, -1);
          map.set(currentPath, replacementToken);
        }
      } else {
        // Recursively process nested objects
        extractDeprecatedColorTokens(value, currentPath, map);
      }
    }
  }

  return map;
}

// Create a mapping of deprecated token paths to replacement token paths
// We pass the color object and prefix with "color." so paths are like "color.icon.caution.default"
const deprecatedColorTokenMap = extractDeprecatedColorTokens(
  deprecatedSysTokens.sys?.color || {},
  'color'
);

// Helper to get the token value from the deprecated JSON
function getDeprecatedTokenValue(tokenPath: string): string | undefined {
  // Remove "system." or "sys." prefix to match the JSON structure
  // "system.color.bg.transparent" -> "color.bg.transparent"
  const pathWithoutPrefix = tokenPath.replace(/^(system|sys)\./, '');
  
  // Remove "color." prefix since we're starting at sys.color
  // "color.bg.transparent" -> "bg.transparent"
  const pathWithoutColor = pathWithoutPrefix.replace(/^color\./, '');
  
  // Navigate through the deprecated JSON structure
  const pathParts = pathWithoutColor.split('.');
  let current: any = deprecatedSysTokens.sys?.color;
  
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  // Check if this is a deprecated token with a value
  if (current && typeof current === 'object' && 'deprecated' in current && current.deprecated === true && 'value' in current) {
    const value = current.value as string;
    // Extract token reference from value like "{sys.color.surface.transparent}"
    if (value.startsWith('{') && value.endsWith('}')) {
      return value.slice(1, -1);
    }
  }
  
  return undefined;
}

// Helper to get replacement token for a deprecated token path
function getReplacementToken(deprecatedPath: string): string | undefined {
  // First, try to get the value directly from the deprecated JSON
  const replacement = getDeprecatedTokenValue(deprecatedPath);
  if (replacement) {
    return replacement;
  }
  
  // Fallback to the map (for backwards compatibility)
  const pathWithoutPrefix = deprecatedPath.replace(/^(system|sys)\./, '');
  if (deprecatedColorTokenMap.has(pathWithoutPrefix)) {
    return deprecatedColorTokenMap.get(pathWithoutPrefix);
  }
  
  return undefined;
}

// Helper to build tokens with original JS path stored
function buildDeprecatedTokenWithPath(
  prefix: string,
  tokens: Record<string, string>
): (ColorSwatch & {originalJsPath: string})[] {
  return Object.entries(tokens).map(([value, varName]) => {
    const jsPath = `${prefix}.${value}`;
    const swatch = buildColorSwatch(varName, jsPath);
    return {
      ...swatch,
      originalJsPath: jsPath,
    };
  });
}

function buildDeprecatedTokenGroupWithPath(
  prefix: string,
  tokens: object,
  sortFn?: (a: ColorSwatch, b: ColorSwatch) => number
): (ColorSwatch & {originalJsPath: string})[] {
  return Object.entries(tokens)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        const jsPath = `${prefix}.${key}`;
        const swatch = buildColorSwatch(value, jsPath);
        return {
          ...swatch,
          originalJsPath: jsPath,
        };
      } else {
        const palette = buildDeprecatedTokenWithPath(`${prefix}.${key}`, value);
        if (sortFn) {
          return palette.sort(sortFn);
        }
        return palette;
      }
    })
    .flat();
}

// Build all deprecated tokens with original JS paths
const bgPrimaryPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.primary',
  safeGet(system.color, 'bg.primary') || {},
  sortSystemColorPalette
);

const bgTransparentPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.transparent',
  safeGet(system.color, 'bg.transparent') || {},
  sortSystemColorPalette
);

const bgOverlayPaletteWithPath = buildDeprecatedTokenWithPath('system.color.bg', {
  overlay: safeGet(system.color, 'bg.overlay'),
  translucent: safeGet(system.color, 'bg.translucent'),
});

const bgAltPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.alt',
  safeGet(system.color, 'bg.alt') || {},
  sortSystemColorPalette
);

const bgMutedPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.muted',
  safeGet(system.color, 'bg.muted') || {},
  sortSystemColorPalette
);

const bgContrastPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.contrast',
  safeGet(system.color, 'bg.contrast') || {},
  sortSystemColorPalette
);

const bgStatusPalettesWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg',
  {
    critical: safeGet(system.color, 'bg.critical') || {},
    caution: safeGet(system.color, 'bg.caution') || {},
    positive: safeGet(system.color, 'bg.positive') || {},
    info: safeGet(system.color, 'bg.info') || {},
  },
  sortSystemColorPalette
);

const bgAIPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.bg.ai',
  safeGet(system.color, 'bg.ai') || {},
  sortSystemColorPalette
);

const textPaletteWithPath = buildDeprecatedTokenWithPath('system.color.text', {
  default: safeGet(system.color, 'text.default'),
  strong: safeGet(system.color, 'text.strong'),
  stronger: safeGet(system.color, 'text.stronger'),
  disabled: safeGet(system.color, 'text.disabled'),
  hint: safeGet(system.color, 'text.hint'),
  inverse: safeGet(system.color, 'text.inverse'),
});

const textStatusPalettesWithPath = buildDeprecatedTokenGroupWithPath(
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

const textAIPaletteWithPath = buildDeprecatedTokenWithPath('system.color.text', {
  ai: safeGet(system.color, 'text.ai'),
});

const iconPaletteWithPath = buildDeprecatedTokenWithPath('system.color.icon', {
  default: safeGet(system.color, 'icon.default'),
  soft: safeGet(system.color, 'icon.soft'),
  strong: safeGet(system.color, 'icon.strong'),
  inverse: safeGet(system.color, 'icon.inverse'),
  disabled: safeGet(system.color, 'icon.disabled'),
});

const iconStatusPalettesWithPath = buildDeprecatedTokenGroupWithPath(
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

const shadowPaletteWithPath = buildDeprecatedTokenWithPath('system.color.shadow', {
  '1': safeGet(system.color, 'shadow.1'),
  '2': safeGet(system.color, 'shadow.2'),
  default: safeGet(system.color, 'shadow.default'),
});

const staticPalettesWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.static',
  safeGet(system.color, 'static') || {},
  sortSystemColorPalette
);

// Deprecated fg (foreground) tokens
const fgStatusPalettesWithPath = buildDeprecatedTokenGroupWithPath(
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

// Deprecated border tokens
const borderPaletteWithPath = buildDeprecatedTokenWithPath('system.color.border', {
  ai: safeGet(system.color, 'border.ai'),
  contrast: safeGet(system.color, 'border.contrast'),
  critical: safeGet(system.color, 'border.critical'),
  caution: safeGet(system.color, 'border.caution'),
  divider: safeGet(system.color, 'border.divider'),
  primary: safeGet(system.color, 'border.primary'),
  container: safeGet(system.color, 'border.container'),
});

const borderInputPaletteWithPath = buildDeprecatedTokenGroupWithPath(
  'system.color.border.input',
  safeGet(system.color, 'border.input') || {},
  sortSystemColorPalette
);

// Combine all deprecated tokens and add replacement information
const allDeprecatedTokens: (ColorSwatch & {replacement?: string; originalJsPath: string})[] = [
  ...bgPrimaryPaletteWithPath,
  ...bgTransparentPaletteWithPath,
  ...bgOverlayPaletteWithPath,
  ...bgAltPaletteWithPath,
  ...bgMutedPaletteWithPath,
  ...bgContrastPaletteWithPath,
  ...bgStatusPalettesWithPath,
  ...bgAIPaletteWithPath,
  ...textPaletteWithPath,
  ...textStatusPalettesWithPath,
  ...textAIPaletteWithPath,
  ...iconPaletteWithPath,
  ...iconStatusPalettesWithPath,
  ...fgStatusPalettesWithPath,
  ...borderPaletteWithPath,
  ...borderInputPaletteWithPath,
  ...shadowPaletteWithPath,
  ...staticPalettesWithPath,
]
  .filter(token => token.value)
  .map(token => {
    // Use the stored original JS path
    const jsVarPath = token.originalJsPath;
    
    // Get replacement token
    const replacement = getReplacementToken(jsVarPath);
    
    return {
      ...token,
      replacement,
    };
  });

export const DeprecatedColorTokens = () => {
  return (
    <TokenGrid
      caption={formatName('Deprecated Color Tokens')}
      headings={['Swatch', 'CSS Variable', 'JS Variable', 'Value', 'Replacement']}
      rows={allDeprecatedTokens}
    >
      {token => {
        const getSwatchStyles = () => {
          const property = token.value?.startsWith('linear-gradient(')
            ? 'backgroundImage'
            : 'backgroundColor';
          return {[property]: `var(${token.cssVar})`};
        };

        return (
          <>
            <TokenGrid.RowItem>
              <TokenGrid.Swatch style={getSwatchStyles()} />
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel isDeprecated>{token.cssVar}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel isDeprecated>{token.jsVar}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <span>{token.value || 'none'}</span>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              {token.replacement ? (
                <TokenGrid.MonospaceLabel>{formatJSVar(token.replacement)}</TokenGrid.MonospaceLabel>
              ) : (
                <span>—</span>
              )}
            </TokenGrid.RowItem>
          </>
        );
      }}
    </TokenGrid>
  );
};
