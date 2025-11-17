import * as React from 'react';
import {formatJSVar} from '../../../../components/TokenGrid';

/**
 * Base token interface that all token types extend.
 * Provides the common structure for CSS variable, JS variable, and value.
 */
export interface BaseToken {
  /** The name of the CSS variable */
  cssVar: string;
  /** The formatted name of the JS variable */
  jsVar: React.ReactNode;
  /** The actual string value of the token */
  value: string;
}

/**
 * Configuration for building tokens from base token object
 */
export interface TokenBuilderConfig {
  /** Array of keys to extract from the base object */
  keys: string[];
  /** Prefix for the property name (e.g., 'size', 'opacity', 'fontSize') */
  propertyPrefix: string;
  /** Prefix for the JS variable path (e.g., 'base.size', 'base.opacity') */
  jsPathPrefix: string;
  /** Optional function to transform the value */
  valueTransformer?: (value: string) => string;
  /** Optional function to compute additional properties */
  computeProperties?: (value: string, key: string) => Record<string, any>;
}

/**
 * Extracts tokens from the base object based on the provided configuration.
 *
 * @param base - The base tokens object from @workday/canvas-tokens-web
 * @param config - Configuration for building tokens
 * @returns Array of tokens with CSS variable, JS variable, value, and any computed properties
 *
 * @example
 * ```ts
 * const sizeTokens = buildTokensFromBase(base, {
 *   keys: ['0', '25', '50'],
 *   propertyPrefix: 'size',
 *   jsPathPrefix: 'base.size',
 *   computeProperties: (value) => ({
 *     pxValue: remToPx(value),
 *   }),
 * });
 * ```
 */
export function buildTokensFromBase<T extends BaseToken>(
  base: Record<string, any>,
  config: TokenBuilderConfig
): T[] {
  const {keys, propertyPrefix, jsPathPrefix, valueTransformer, computeProperties} = config;

  // Build the token map from base object
  const tokenMap: Record<string, string> = {};
  keys.forEach(key => {
    const propName = `${propertyPrefix}${key}` as keyof typeof base;
    if (propName in base) {
      tokenMap[key] = base[propName] as string;
    }
  });

  // Transform to token array
  return Object.entries(tokenMap).map(([key, varName]) => {
    const cssValue = getComputedStyle(document.documentElement).getPropertyValue(varName);
    const transformedValue = valueTransformer ? valueTransformer(cssValue) : cssValue;

    const token: any = {
      cssVar: varName,
      jsVar: formatJSVar(`${jsPathPrefix}.${key}`),
      value: cssValue,
      ...(computeProperties ? computeProperties(cssValue, key) : {}),
    };

    // Apply value transformation if provided
    if (valueTransformer && transformedValue !== cssValue) {
      token.transformedValue = transformedValue;
    }

    return token as T;
  });
}

/**
 * Converts a rem value to pixels.
 * Assumes 1rem = 16px (standard browser default).
 *
 * @param value - CSS value in rem format (e.g., "1.5rem")
 * @returns Pixel value as string (e.g., "24px")
 *
 * @example
 * ```ts
 * remToPx("1.5rem") // returns "24px"
 * remToPx("0.5rem") // returns "8px"
 * ```
 */
export function remToPx(value: string): string {
  const remMatch = value.match(/([\d.]+)rem/);
  if (remMatch) {
    const remValue = parseFloat(remMatch[1]);
    return `${remValue * 16}px`;
  }
  return value;
}

/**
 * Extracts the numeric rem value from a CSS value string.
 *
 * @param value - CSS value that may contain rem units or calc expressions
 * @returns Numeric rem value, or 0 if not found
 *
 * @example
 * ```ts
 * extractRemValue("1.5rem") // returns 1.5
 * extractRemValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns 1.0 (0.5 * 2)
 * ```
 */
export function extractRemValue(value: string): number {
  // Try to extract from calc expressions like "calc(var(--cnvs-base-baseline) * 2.00)"
  const multiplierMatch = value.match(/\*\s*([\d.]+)/);
  if (multiplierMatch) {
    const multiplier = parseFloat(multiplierMatch[1]);
    // base.baseline is 0.5rem, so multiply by 0.5 to get the final rem value
    return multiplier * 0.5;
  }
  // Try to parse as a direct rem value
  const remMatch = value.match(/([\d.]+)rem/);
  if (remMatch) {
    return parseFloat(remMatch[1]);
  }
  return 0;
}

/**
 * Calculates the pixel value from a rem-based CSS value.
 * Handles both direct rem values and calc expressions.
 *
 * @param value - CSS value in rem format or calc expression
 * @returns Pixel value as string
 *
 * @example
 * ```ts
 * calculatePxValue("1.5rem") // returns "24px"
 * calculatePxValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns "16px"
 * ```
 */
export function calculatePxValue(value: string): string {
  const remValue = extractRemValue(value);
  return `${remValue * 16}px`;
}

/**
 * Calculates the rem value from a calc expression or direct rem value.
 *
 * @param value - CSS value in rem format or calc expression
 * @returns Rem value as string
 *
 * @example
 * ```ts
 * calculateRemValue("calc(var(--cnvs-base-baseline) * 2.00)") // returns "1rem"
 * calculateRemValue("1.5rem") // returns "1.5rem"
 * ```
 */
export function calculateRemValue(value: string): string {
  const remValue = extractRemValue(value);
  return `${remValue}rem`;
}

