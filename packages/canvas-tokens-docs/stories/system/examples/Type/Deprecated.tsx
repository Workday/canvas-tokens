import * as React from 'react';
import {system} from '@workday/canvas-tokens-web';
import deprecatedSysTokens from '../../../../../canvas-tokens/tokens/deprecated/web/sys.json';

import {TokenGrid, formatJSVar} from '../../../../components/TokenGrid';
import {Stack} from '../../../../components/Stack';

interface TypeToken {
  /** The name of the CSS class */
  cssClass: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual value object of the token */
  value: object;
  /** The formatted values for CSS Vars to render the type sample */
  formattedValues: object;
  /** Replacement tokens */
  replacement?: string;
}

function getCSSVarValue(varName: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).replace(/"/g, '');
}

function formatTypeValues(values: object) {
  let formattedValues = {};
  for (const key in values) {
    if (key in values) {
      const tokenRef = values[key as keyof typeof values] as string;
      // Extract the CSS variable name from token reference like "{sys.font-size.subtext.small}"
      if (tokenRef && tokenRef.startsWith('{') && tokenRef.endsWith('}')) {
        const tokenPath = tokenRef.slice(1, -1);
        // Convert token path to CSS variable name
        // "sys.font-size.subtext.small" -> "--cnvs-sys-font-size-subtext-small"
        const cssVarName = `--cnvs-${tokenPath.replace(/\./g, '-')}`;
        formattedValues = {...formattedValues, [key]: `var(${cssVarName})`};
      }
    }
  }
  return formattedValues;
}

function formatTypeLevelValues(values: object) {
  let formattedValues = {};
  for (const key in values) {
    if (key in values) {
      formattedValues = {...formattedValues, [key]: `var(${values[key as keyof typeof values]})`};
    }
  }
  return formattedValues;
}

// Helper to convert deprecated size names to t-shirt sizes
function convertSizeName(size: string): string {
  const sizeMap: Record<string, string> = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
  };
  return sizeMap[size] || size;
}

// Helper to get the replacement tokens from the deprecated JSON
function getDeprecatedTypeTokenReplacement(tokenPath: string, sizeName?: string): string | undefined {
  // Remove "system." or "sys." prefix to match the JSON structure
  // "system.type.subtext.small" -> "type.subtext.small"
  const pathWithoutPrefix = tokenPath.replace(/^(system|sys)\./, '');
  
  // Navigate through the deprecated JSON structure
  const pathParts = pathWithoutPrefix.split('.');
  let current: any = deprecatedSysTokens.sys;
  
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  // Check if this is a deprecated token with a value object
  if (current && typeof current === 'object' && 'deprecated' in current && current.deprecated === true && 'value' in current) {
    const value = current.value as object;
    // Extract individual token references from the value object and convert size names
    // Format: { "font-size": "{sys.font-size.subtext.small}", ... }
    const replacements: string[] = [];
    for (const key in value) {
      const tokenRef = value[key as keyof typeof value] as string;
      if (tokenRef && tokenRef.startsWith('{') && tokenRef.endsWith('}')) {
        let tokenPath = tokenRef.slice(1, -1);
        // Convert deprecated size names in the token path (small -> sm, medium -> md, large -> lg)
        tokenPath = tokenPath.replace(/\.(small|medium|large)(\.|$)/g, (match, size) => {
          return `.${convertSizeName(size)}${match.endsWith('.') ? '.' : ''}`;
        });
        replacements.push(`${key}: ${tokenPath}`);
      }
    }
    
    // Also add the replacement type token with t-shirt size if we have a size name
    if (sizeName && deprecatedSizeNames.includes(sizeName)) {
      const level = pathParts[1]; // e.g., "subtext", "body", etc.
      const newSize = convertSizeName(sizeName);
      replacements.unshift(`Use sys.type.${level}.${newSize} or individual tokens`);
    }
    
    return replacements.length > 0 ? replacements.join(', ') : undefined;
  }
  
  // If not found in deprecated JSON but we have a size name, provide generic replacement
  if (sizeName && deprecatedSizeNames.includes(sizeName)) {
    const level = pathParts[1];
    const newSize = convertSizeName(sizeName);
    return `Use sys.type.${level}.${newSize} or individual tokens (sys.font-size.${level}.${newSize}, sys.line-height.${level}.${newSize}, etc.)`;
  }
  
  return undefined;
}

// Deprecated size names (not t-shirt sizes)
const deprecatedSizeNames = ['small', 'medium', 'large'];

// Build deprecated type tokens from system.type (if they still exist)
const deprecatedTypeTokensFromSystem: TypeToken[] = [];
Object.keys(system.type).forEach(level => {
  const levelData = system.type[level as keyof typeof system.type];
  if (typeof levelData === 'object' && levelData !== null) {
    Object.entries(levelData).forEach(([size, values]) => {
      // Check if this is a deprecated size name
      if (deprecatedSizeNames.includes(size)) {
        const tokenPath = `sys.type.${level}.${size}`;
        const replacement = getDeprecatedTypeTokenReplacement(tokenPath, size);
        
        deprecatedTypeTokensFromSystem.push({
          cssClass: `.cnvs-sys-type-${level}-${size}`,
          jsVar: formatJSVar(`system.type.${level}.${size}`),
          value: values as object,
          formattedValues: formatTypeLevelValues(values as object),
          replacement,
        });
      }
    });
  }
});

// Build deprecated type tokens from the deprecated JSON
const deprecatedTypeTokensFromJSON: TypeToken[] = [];
const deprecatedTypeData = deprecatedSysTokens.sys?.type;

if (deprecatedTypeData) {
  for (const level in deprecatedTypeData) {
    const levelData = deprecatedTypeData[level as keyof typeof deprecatedTypeData];
    if (typeof levelData === 'object' && levelData !== null) {
      for (const size in levelData) {
        const tokenData = levelData[size as keyof typeof levelData];
        if (
          typeof tokenData === 'object' &&
          tokenData !== null &&
          'deprecated' in tokenData &&
          tokenData.deprecated === true &&
          'value' in tokenData
        ) {
          const value = tokenData.value as object;
          const tokenPath = `sys.type.${level}.${size}`;
          const replacement = getDeprecatedTypeTokenReplacement(tokenPath, size);
          
          deprecatedTypeTokensFromJSON.push({
            cssClass: `.cnvs-sys-type-${level}-${size}`,
            jsVar: formatJSVar(`system.type.${level}.${size}`),
            value: value,
            formattedValues: formatTypeValues(value),
            replacement,
          });
        }
      }
    }
  }
}

// Combine tokens from system.type and deprecated JSON, avoiding duplicates
const allDeprecatedTokens = [...deprecatedTypeTokensFromSystem];
const existingPaths = new Set(deprecatedTypeTokensFromSystem.map(t => t.cssClass));

deprecatedTypeTokensFromJSON.forEach(token => {
  if (!existingPaths.has(token.cssClass)) {
    allDeprecatedTokens.push(token);
    existingPaths.add(token.cssClass);
  }
});

const deprecatedTypeTokens = allDeprecatedTokens;

export const DeprecatedTypeTokens = () => {
  return (
    <Stack>
      <TokenGrid
        caption="Deprecated Type Tokens"
        headings={['Sample', 'CSS Class', 'JS Variable', 'CSS Variables (Values)', 'Replacement']}
        rows={deprecatedTypeTokens}
      >
        {token => (
          <>
            <TokenGrid.RowItem>
              <span style={{...token.formattedValues, fontFamily: 'var(--cnvs-base-font-family-50)'}}>
                Canvas
              </span>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel isDeprecated>{token.cssClass}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              <TokenGrid.MonospaceLabel isDeprecated>{token.jsVar}</TokenGrid.MonospaceLabel>
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              {Object.entries(token.value).map(([key, value], index) => (
                <div key={index}>
                  {key}: {value} ({getCSSVarValue(value as string)})
                </div>
              ))}
            </TokenGrid.RowItem>
            <TokenGrid.RowItem>
              {token.replacement ? (
                <TokenGrid.MonospaceLabel>{token.replacement}</TokenGrid.MonospaceLabel>
              ) : (
                <span>—</span>
              )}
            </TokenGrid.RowItem>
          </>
        )}
      </TokenGrid>
    </Stack>
  );
};
