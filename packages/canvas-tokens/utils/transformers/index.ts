import * as math from 'mathjs';
import {Transform} from 'style-dictionary/types';

import * as filter from '../filters';

import {durationMs} from './duration-ms';
import {generateNewTokenFallback} from './generateNewTokenFallback';
import {flatOklchValue} from './flatOklch';
import {flatRGBAColor} from './flatRGBAColor';
import {flatShadow} from './flatShadow';
import {mapFontWeight} from './mapFontWeight';
import {transformHexToRgb} from './transformHexToRgb';
import {transformMath} from './transformMath';
import {transformNameToCamelCase} from './transformNameToCamelCase';

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

export const transforms: Record<string, DistributiveOmit<Transform, 'name'>> = {
  'oklch/flatten': {
    type: 'value',
    transitive: true,
    filter: ({value}) =>
      typeof value === 'object' &&
      'components' in value &&
      typeof value.components === 'object' &&
      value.components.length === 3,
    transform: ({value}) => {
      return `oklch(${value.components.join(' ')} / ${value.alpha})`;
    },
  },
  // transform function that generates fallback as deprecated values for a new token
  'value/deprecated-values': {
    type: 'value',
    transitive: true,
    filter: filter.isOldValues,
    transform: generateNewTokenFallback,
  },
  // transform function that changes any hex color value to rgba
  // not used now in web
  'value/hex-to-rgba': {
    type: 'value',
    transitive: true,
    filter: filter.isHexColor,
    transform: transformHexToRgb,
  },
  'value/shadow/flat-sys': {
    type: 'value',
    transitive: true,
    filter: filter.isSysShadow,
    transform: flatShadow,
  },
  // transform function that changes the shadow object as value to the single line string
  'value/font-weight/numbers': {
    type: 'value',
    transitive: true,
    filter: filter.isBaseFontWeight,
    transform: mapFontWeight,
  },
  'value/line-height/px2rem': {
    type: 'value',
    transitive: true,
    filter: filter.isPxLineHeight,
    transform: ({value}) => `${parseFloat(value) / 16}rem`,
  },
  // transform function that removes doubled rgba for tokens with references
  // not used now in web
  'value/flatten-rgba': {
    type: 'value',
    transitive: true,
    filter: filter.isSysColor,
    transform: flatRGBAColor,
  },
  //  transform function that removes doubled rgba for tokens with references
  'value/flatten-oklch': {
    type: 'value',
    transitive: true,
    filter: filter.isSysColor,
    transform: ({original: {value}}) => flatOklchValue(value),
  },
  'value/opacity': {
    type: 'value',
    transitive: true,
    filter: filter.isBaseOpacity,
    transform: ({value}) => `${value / 100}`,
  },
  'value/breakpoints/px': {
    type: 'value',
    transitive: true,
    filter: filter.isBreakpoints,
    transform: ({value}) => {
      if (value.includes('var')) return value;

      const isRem = value.includes('rem');
      const expression = isRem ? value.replace('rem', '') : value;
      const mathValue = math.evaluate(expression);
      return isRem ? `${mathValue * 16}px` : mathValue;
    },
  },
  // transform function that changes a value to its CSS var name
  'value/variables': {
    type: 'value',
    transitive: true,
    transform: ({path}) => `--cnvs-${path.join('-')}`,
  },
  // transform function that adds qoutes to font family values
  'value/wrapped-font-family': {
    type: 'value',
    transitive: true,
    filter: filter.isBaseFontFamily,
    transform: ({value}) => `"${value}"`,
  },
  // transform function that adds em to letter spacing values
  'value/letter-spacing/px2rem': {
    type: 'value',
    transitive: true,
    filter: filter.isLetterSpacing,
    transform: ({value}) => `${value / 16}rem`,
  },
  // transform function that changes any border object value to its single line string
  'value/flatten-border': {
    type: 'value',
    transitive: true,
    filter: filter.isBorder,
    transform: ({value: {color, width, style}}) => `${width} ${style} ${color}`,
  },
  // transform function that adds ms suffix to duration values
  'value/duration/ms': {
    type: 'value',
    transitive: true,
    filter: filter.isBaseDuration,
    transform: durationMs,
  },
  // transform function that resolves math values:
  // calculates base tokens and adds `calc` to sys tokens
  'value/math': {
    type: 'value',
    transitive: true,
    filter: filter.isMathExpression,
    transform: transformMath,
  },
  // transform names to camel case
  'name/canvas-camel': {
    type: 'name',
    transform: transformNameToCamelCase,
  },
};
