import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import deprecatedSysTokens from '../../../../../canvas-tokens/tokens/deprecated/web/sys.json';

import {
  buildPalette,
  buildPaletteGroup,
  ColorGrid,
  sortSystemColorPalette,
  ColorSwatch,
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

// Helper to get replacement token for a deprecated token path
function getReplacementToken(deprecatedPath: string): string | undefined {
  // The map uses paths like "color.bg.primary.softest" or "color.icon.caution.default"
  // Our tokens use paths like "system.color.bg.primary.softest" or "system.color.icon.caution.default"
  
  // Remove "system." or "sys." prefix to match the map structure
  // "system.color.icon.caution.default" -> "color.icon.caution.default"
  const pathWithoutPrefix = deprecatedPath.replace(/^(system|sys)\./, '');
  
  // Try exact match
  if (deprecatedColorTokenMap.has(pathWithoutPrefix)) {
    return deprecatedColorTokenMap.get(pathWithoutPrefix);
  }
  
  // If the path already starts with "color.", try it directly
  if (deprecatedPath.startsWith('color.')) {
    if (deprecatedColorTokenMap.has(deprecatedPath)) {
      return deprecatedColorTokenMap.get(deprecatedPath);
    }
  }
  
  return undefined;
}

// Deprecated bg tokens
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
}).filter(token => token.value);

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

// Deprecated text tokens
const textPalette = buildPalette('system.color.text', {
  default: safeGet(system.color, 'text.default'),
  strong: safeGet(system.color, 'text.strong'),
  stronger: safeGet(system.color, 'text.stronger'),
  disabled: safeGet(system.color, 'text.disabled'),
  hint: safeGet(system.color, 'text.hint'),
  inverse: safeGet(system.color, 'text.inverse'),
}).filter(token => token.value);

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
).filter(token => token.value);

const textAIPalette = buildPalette('system.color.text', {
  ai: safeGet(system.color, 'text.ai'),
}).filter(token => token.value);

// Deprecated icon tokens
const iconPalette = buildPalette('system.color.icon', {
  default: safeGet(system.color, 'icon.default'),
  soft: safeGet(system.color, 'icon.soft'),
  strong: safeGet(system.color, 'icon.strong'),
  inverse: safeGet(system.color, 'icon.inverse'),
  disabled: safeGet(system.color, 'icon.disabled'),
}).filter(token => token.value);

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
).filter(token => token.value);

// Deprecated shadow tokens (shadow.1, shadow.2, shadow.default - NOT shadow.base/ambient which are new)
const shadowPalette = buildPalette('system.color.shadow', {
  '1': safeGet(system.color, 'shadow.1'),
  '2': safeGet(system.color, 'shadow.2'),
  default: safeGet(system.color, 'shadow.default'),
}).filter(token => token.value);

// Deprecated static tokens
const staticPalettes = buildPaletteGroup(
  'system.color.static',
  safeGet(system.color, 'static') || {},
  sortSystemColorPalette
).filter(token => token.value);

// Helper to extract the original JS variable path from a ReactNode
function extractJSVarPath(jsVar: React.ReactNode): string {
  if (typeof jsVar === 'string') {
    return jsVar;
  }
  if (React.isValidElement(jsVar)) {
    // formatJSVar creates spans with dots and wbr tags
    // We need to extract the text content
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (React.isValidElement(node)) {
        if (node.props.children) {
          if (Array.isArray(node.props.children)) {
            return node.props.children.map(extractText).join('');
          }
          return extractText(node.props.children);
        }
      }
      return '';
    };
    return extractText(jsVar);
  }
  return '';
}

// Combine all deprecated tokens and add replacement information
const allDeprecatedTokens: (ColorSwatch & {replacement?: string; jsVarPath?: string})[] = [
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
  ...shadowPalette,
  ...staticPalettes,
]
  .filter(token => token.value)
  .map(token => {
    // Extract the JS variable path from the ReactNode
    const jsVarPath = extractJSVarPath(token.jsVar);
    
    // Get replacement token - try different path formats
    let replacement = getReplacementToken(jsVarPath);
    
    // If not found, try with "sys." prefix instead of "system."
    if (!replacement) {
      const pathWithSys = jsVarPath.replace(/^system\./, 'sys.');
      replacement = getReplacementToken(pathWithSys);
    }
    
    // If still not found, try removing "system." prefix
    if (!replacement) {
      const pathWithoutSystem = jsVarPath.replace(/^system\./, '');
      replacement = getReplacementToken(pathWithoutSystem);
    }
    
    return {
      ...token,
      replacement,
      jsVarPath,
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
