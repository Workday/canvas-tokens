import * as React from 'react';
import * as baseTokens from '@workday/canvas-tokens-web/dist/es6/base';
import { system} from '@workday/canvas-tokens-web';
import deprecatedBaseTokens from '../../../../canvas-tokens/tokens/deprecated/base.json';

import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';
import {buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';
import {formatName} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

// Helper to build deprecated tokens with original JS path stored
function buildDeprecatedBaseTokenWithPath(
  varName: string,
  jsVarName: string
): ColorSwatch & {originalJsPath: string} {
  const swatch = buildColorSwatch(varName, jsVarName);
  return {
    ...swatch,
    originalJsPath: jsVarName,
  };
}

// Helper to get the token value from the deprecated JSON
function getDeprecatedBaseTokenValue(tokenPath: string): string | undefined {
  // Remove "base." prefix to match the JSON structure
  // "base.unit" -> "unit"
  const pathWithoutBase = tokenPath.replace(/^base\./, '');
  
  // Navigate through the deprecated JSON structure
  const pathParts = pathWithoutBase.split('.');
  let current: any = deprecatedBaseTokens.base;
  
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    
    // For palette tokens, convert camelCase to kebab-case (e.g., greenApple -> green-apple)
    let lookupKey = part;
    if (part === 'palette' && i + 1 < pathParts.length) {
      // Navigate to palette first
      if (current && typeof current === 'object' && lookupKey in current) {
        current = current[lookupKey];
        // Now convert the next part from camelCase to kebab-case
        const nextPart = pathParts[i + 1];
        const kebabKey = nextPart
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .toLowerCase();
        if (current && typeof current === 'object' && kebabKey in current) {
          current = current[kebabKey];
          i++; // Skip the next part since we already processed it
          // Continue with the rest of the path (e.g., "100", "200")
          continue;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    } else {
      // Normal lookup
      if (current && typeof current === 'object' && lookupKey in current) {
        current = current[lookupKey];
      } else {
        return undefined;
      }
    }
  }
  
  // Check if this is a deprecated token with a value
  if (current && typeof current === 'object' && 'deprecated' in current && current.deprecated === true && 'value' in current) {
    const value = current.value as string;
    // Extract token reference from value like "{base.baseline}"
    if (value.startsWith('{') && value.endsWith('}')) {
      return value.slice(1, -1);
    }
  }
  
  return undefined;
}

// Deprecated unit token
const deprecatedUnitTokens = [
  buildDeprecatedBaseTokenWithPath(baseTokens.baseUnit, 'base.unit'),
];

// Deprecated opacity tokens
const deprecatedOpacityTokens = [
  buildDeprecatedBaseTokenWithPath(baseTokens.opacity100, 'base.opacity.100'),
  buildDeprecatedBaseTokenWithPath(baseTokens.opacity250, 'base.opacity.250'),
  buildDeprecatedBaseTokenWithPath(baseTokens.opacity300, 'base.opacity.300'),
  buildDeprecatedBaseTokenWithPath(baseTokens.opacity500, 'base.opacity.500'),
];

// Deprecated palette color tokens
const deprecatedPaletteNames = [
  'cinnamon',
  'peach',
  'chiliMango',
  'cantaloupe',
  'sourLemon',
  'juicyPear',
  'kiwi',
  'greenApple',
  'watermelon',
  'jewel',
  'toothpaste',
  'blueberry',
  'plum',
  'berrySmoothie',
  'blackberry',
  'islandPunch',
  'grapeSoda',
  'pomegranate',
  'fruitPunch',
  'rootBeer',
  'toastedMarshmallow',
  'licorice',
  'soap',
  'frenchVanilla',
  'blackPepper',
  'coconut',
  'cappuccino',
] as const;

// Build deprecated palette palettes
const deprecatedPalettePalettes = deprecatedPaletteNames.map(paletteName => {
  // Find all tokens for this palette (e.g., cinnamon100, cinnamon200, etc.)
  const tokens = Object.entries(baseTokens)
    .filter(([key]) => {
      // Match tokens like cinnamon100, cinnamon200, etc.
      const regex = new RegExp(`^${paletteName}(\\d+)$`);
      return regex.test(key) && typeof baseTokens[key as keyof typeof baseTokens] === 'string';
    })
    .map(([key, varName]) =>
      buildDeprecatedBaseTokenWithPath(varName as string, `base.palette.${paletteName}.${key.replace(paletteName, '')}`)
    );

  return {
    name: paletteName,
    values: tokens,
  };
});

// Extended palette (dragon-fruit)
const deprecatedExtendedPalette = {
  name: 'extended.dragonFruit',
  values: Object.entries(baseTokens)
    .filter(([key]) => {
      const regex = /^extendedDragonFruit(\d+)$/;
      return regex.test(key) && typeof baseTokens[key as keyof typeof baseTokens] === 'string';
    })
    .map(([key, varName]) => {
      const number = key.replace('extendedDragonFruit', '');
      return buildDeprecatedBaseTokenWithPath(
        varName as string,
        `base.extended.palette.dragon-fruit.${number}`
      );
    }),
};

const deprecatedPalettes = [
  {name: 'unit', values: deprecatedUnitTokens},
  {name: 'opacity', values: deprecatedOpacityTokens},
  ...deprecatedPalettePalettes,
  deprecatedExtendedPalette,
].filter(palette => palette.values.length > 0);

function getPixelValue(value: string) {
  // Strip 'rem' from the string, convert to a number, and multiply by 16
  const pxValue = Number(value.replace('rem', '')) * 16;
  return `${pxValue}px`;
}

export const DeprecatedBaseTokens = () => {
  return (
    <Stack>
      {deprecatedPalettes.map(palette => {
        // Add replacement information to tokens
        const tokensWithReplacements = palette.values.map(token => {
          // Use the stored original JS path
          const jsVarPath = (token as any).originalJsPath;
          
          // Get replacement token from deprecated JSON
          const replacement = getDeprecatedBaseTokenValue(jsVarPath);
          
          // Get computed value for unit token to calculate pixel value
          let pxValue: string | undefined;
          if (palette.name === 'unit') {
            const value = getComputedStyle(document.documentElement).getPropertyValue(token.cssVar);
            pxValue = getPixelValue(value);
          }
          
          return {
            ...token,
            replacement,
            pxValue,
          };
        });

        // Determine headings based on palette type
        const headings = palette.name === 'unit'
          ? ['Sample', 'CSS Variable', 'JS Variable', 'Value', 'Pixel Value', 'Replacement']
          : ['Swatch', 'CSS Variable', 'JS Variable', 'Value', 'Replacement'];

        return (
          <TokenGrid
            key={palette.name}
            caption={formatName(palette.name)}
            headings={headings}
            rows={tokensWithReplacements}
          >
            {token => {
              // For unit token, show a size sample instead of swatch
              if (palette.name === 'unit') {
                return (
                  <>
                    <TokenGrid.RowItem>
                      <TokenGrid.Sample
                        style={{
                          width: `var(${token.cssVar})`,
                          backgroundColor: `var(${system.color.bg.primary.default})`,
                        }}
                      />
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
                      <span>{(token as any).pxValue || '—'}</span>
                    </TokenGrid.RowItem>
                    <TokenGrid.RowItem>
                      {(token as any).replacement ? (
                        <TokenGrid.MonospaceLabel>{formatJSVar((token as any).replacement)}</TokenGrid.MonospaceLabel>
                      ) : (
                        <span>—</span>
                      )}
                    </TokenGrid.RowItem>
                  </>
                );
              }

              // For opacity tokens, add a background color so opacity is visible
              if (palette.name === 'opacity') {
                return (
                  <>
                    <TokenGrid.RowItem>
                      <TokenGrid.Swatch
                        style={{
                          backgroundColor: `var(${system.color.bg.primary.default})`,
                          opacity: `var(${token.cssVar})`,
                        }}
                      />
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
                      {(token as any).replacement ? (
                        <TokenGrid.MonospaceLabel>{formatJSVar((token as any).replacement)}</TokenGrid.MonospaceLabel>
                      ) : (
                        <span>—</span>
                      )}
                    </TokenGrid.RowItem>
                  </>
                );
              }

              // For color tokens, show swatch normally
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
                    {(token as any).replacement ? (
                      <TokenGrid.MonospaceLabel>{formatJSVar((token as any).replacement)}</TokenGrid.MonospaceLabel>
                    ) : (
                      <span>—</span>
                    )}
                  </TokenGrid.RowItem>
                </>
              );
            }}
          </TokenGrid>
        );
      })}
    </Stack>
  );
};
