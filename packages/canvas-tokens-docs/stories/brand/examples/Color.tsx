import * as React from 'react';
import * as brandTokens from '@workday/canvas-tokens-web/dist/es6/brand';
import deprecatedBrandTokens from '../../../../canvas-tokens/tokens/deprecated/web/brand.json';

import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';
import {TokenGrid, formatJSVar} from '../../../components/TokenGrid';
import {formatName} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

// Token groups to display (new naming convention)
const tokenGroups = ['primary', 'neutral', 'critical', 'caution', 'positive'] as const;

// Groups that use object structure (not numeric keys)
const objectGroups = ['action', 'gradient', 'common'] as const;

// Deprecated tokens to filter out from common
const deprecatedCommonTokens = ['focusOutline', 'errorInner', 'alertInner', 'alertOuter'];

// Build palettes from flat exports (e.g., primary25, primary50, etc.)
const numericPalettes = tokenGroups.map(group => {
  const values = Object.entries(brandTokens)
    .filter(([key, value]) => {
      // Match tokens like primary25, primary50, primaryA25, etc.
      const regex = new RegExp(`^${group}(\\d+|[Aa]\\d+)$`);
      return regex.test(key) && typeof value === 'string';
    })
    .map(([key, varName]) => buildColorSwatch(varName as string, `brand.${key}`));

  return {
    name: group,
    values,
  };
});

// Build palettes from object exports (action, gradient, common)
const objectPalettes = objectGroups.map(group => {
  const tokens = brandTokens[group as keyof typeof brandTokens];
  if (typeof tokens !== 'object' || tokens === null) {
    return {name: group, values: []};
  }

  const values = Object.entries(tokens)
    .filter(([tokenName]) => {
      // Filter out deprecated common tokens
      if (group === 'common') {
        return !deprecatedCommonTokens.includes(tokenName);
      }
      return true;
    })
    .flatMap(([tokenName, tokenValue]) => {
      // Handle nested objects (e.g., caution.inner, caution.outer)
      if (typeof tokenValue === 'object' && tokenValue !== null && !Array.isArray(tokenValue)) {
        return Object.entries(tokenValue).map(([nestedName, varName]) =>
          buildColorSwatch(varName as string, `brand.${group}.${tokenName}.${nestedName}`)
        );
      }
      // Handle flat tokens (e.g., focus, critical)
      return [buildColorSwatch(tokenValue as string, `brand.${group}.${tokenName}`)];
    });

  return {
    name: group,
    values,
  };
});

const palettes = [...numericPalettes, ...objectPalettes];

// Deprecated token groups (replaced by critical, caution, positive)
const deprecatedGroups = ['error', 'alert', 'success'] as const;

// Helper to build deprecated tokens with original JS path stored
function buildDeprecatedBrandTokenWithPath(
  varName: string,
  jsVarName: string
): ColorSwatch & {originalJsPath: string} {
  const swatch = buildColorSwatch(varName, jsVarName);
  return {
    ...swatch,
    originalJsPath: jsVarName,
  };
}

// Build deprecated group palettes (error, alert, success)
const deprecatedGroupPalettes = deprecatedGroups.map(group => {
  const tokens = brandTokens[group as keyof typeof brandTokens];
  if (typeof tokens !== 'object' || tokens === null) {
    return {name: group, values: []};
  }

  const values = Object.entries(tokens).map(([tokenName, varName]) =>
    buildDeprecatedBrandTokenWithPath(varName as string, `brand.${group}.${tokenName}`)
  );

  return {name: group, values};
});

// Build deprecated tokens from primary/neutral (base, lightest, etc.)
const deprecatedNamedTokenPalettes = (['primary', 'neutral'] as const).map(group => {
  const tokens = brandTokens[group as keyof typeof brandTokens];
  if (typeof tokens !== 'object' || tokens === null) {
    return {name: `${group} (deprecated)`, values: []};
  }

  const values = Object.entries(tokens).map(([tokenName, varName]) =>
    buildDeprecatedBrandTokenWithPath(varName as string, `brand.${group}.${tokenName}`)
  );

  return {name: `${group} (deprecated)`, values};
});

// Deprecated common tokens
const deprecatedCommonPalette = {
  name: 'common (deprecated)',
  values: Object.entries(brandTokens.common)
    .filter(([tokenName]) => deprecatedCommonTokens.includes(tokenName))
    .map(([tokenName, varName]) =>
      buildDeprecatedBrandTokenWithPath(varName as string, `brand.common.${tokenName}`)
    ),
};

const deprecatedPalettes = [
  ...deprecatedGroupPalettes,
  ...deprecatedNamedTokenPalettes,
  deprecatedCommonPalette,
];

// Helper to convert camelCase to kebab-case
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

// Helper to get the token value from the deprecated JSON
function getDeprecatedBrandTokenValue(tokenPath: string): string | undefined {
  // Remove "brand." prefix to match the JSON structure
  // "brand.primary.base" -> "primary.base"
  const pathWithoutBrand = tokenPath.replace(/^brand\./, '');
  
  // Navigate through the deprecated JSON structure
  const pathParts = pathWithoutBrand.split('.');
  let current: any = deprecatedBrandTokens.brand;
  
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    
    // For common tokens, convert camelCase to kebab-case (e.g., focusOutline -> focus-outline)
    // The path is like "common.focusOutline", so when we're at "common", the next part needs conversion
    let lookupKey = part;
    if (part === 'common' && i + 1 < pathParts.length) {
      // Convert the next part from camelCase to kebab-case
      lookupKey = part;
      // Navigate to common first
      if (current && typeof current === 'object' && lookupKey in current) {
        current = current[lookupKey];
        // Now convert the next part and look it up
        const nextPart = pathParts[i + 1];
        const kebabKey = camelToKebab(nextPart);
        if (current && typeof current === 'object' && kebabKey in current) {
          current = current[kebabKey];
          i++; // Skip the next part since we already processed it
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
    // Extract token reference from value like "{brand.primary.600}"
    if (value.startsWith('{') && value.endsWith('}')) {
      return value.slice(1, -1);
    }
  }
  
  return undefined;
}


export const ColorTokens = () => {
  return (
    <Stack>
      {palettes.map(palette => (
        <ColorGrid key={palette.name} name={palette.name} palette={palette.values} />
      ))}
    </Stack>
  );
};

export const DeprecatedBrandTokens = () => {
  return (
    <Stack>
      {deprecatedPalettes.map(palette => {
        // Add replacement information to tokens
        const tokensWithReplacements = palette.values.map(token => {
          // Use the stored original JS path
          const jsVarPath = (token as any).originalJsPath;
          
          // Get replacement token from deprecated JSON
          const replacement = getDeprecatedBrandTokenValue(jsVarPath);
          
          return {
            ...token,
            replacement,
          };
        });

        return (
          <TokenGrid
            key={palette.name}
            caption={formatName(palette.name)}
            headings={['Swatch', 'CSS Variable', 'JS Variable', 'Value', 'Replacement']}
            rows={tokensWithReplacements}
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

