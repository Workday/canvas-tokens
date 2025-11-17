import * as React from 'react';
import {BaseToken} from './tokenUtils';

/**
 * Token interface for size-related tokens.
 * Extends BaseToken with calculated and pixel values.
 */
export interface SizeToken extends BaseToken {
  /** The value of the CSS token after calculating the base unit times the multiplier */
  calculatedValue: string;
  /** The value of the CSS token after converting rem to pixels */
  pxValue: string;
}

/**
 * Token interface for opacity tokens.
 * Extends BaseToken with opacity-specific value.
 */
export interface OpacityToken extends BaseToken {
  /** The numeric opacity value */
  opacityValue: string;
}

/**
 * Token interface for deprecated size tokens (font-size, line-height).
 * Extends BaseToken with pixel value conversion.
 */
export interface DeprecatedSizeToken extends BaseToken {
  /** The value of the CSS token after converting rem to pixels */
  pxValue: string;
}

/**
 * Token interface for simple base tokens.
 * Alias for BaseToken for clarity.
 */
export interface SimpleBaseToken extends BaseToken {}

