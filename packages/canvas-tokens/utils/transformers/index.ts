import {Transform} from 'style-dictionary';
import * as math from 'mathjs';
import * as filter from '../filters';
import {flatShadow} from './flatShadow';
import {flatRGBAColor} from './flatRGBAColor';
import {mapFontWeight} from './mapFontWeight';
import {transformMath} from './transformMath';
import {transformNameToCamelCase} from './transformNameToCamelCase';
import {transformHexToRgb} from './transformHexToRgb';

export const transforms: Record<string, Transform> = {
  'value/deprecated': {
    type: 'value',
    transitive: true,
    matcher: filter.isDeprecated,
    transformer: ({value, fallback}) => {
      return fallback || value;
    },
  },
  // transform function that changes any hex color value to rgba
  // not used now in web
  'value/hex-to-rgba': {
    type: 'value',
    transitive: true,
    matcher: filter.isHexColor,
    transformer: transformHexToRgb,
  },
  'value/shadow/flat-sys': {
    type: 'value',
    transitive: true,
    matcher: filter.isSysShadow,
    transformer: flatShadow,
  },
  // transform function that changes the shadow object as value to the single line string
  'value/font-weight/numbers': {
    type: 'value',
    transitive: true,
    matcher: filter.isBaseFontWeight,
    transformer: mapFontWeight,
  },
  'value/line-height/px2rem': {
    type: 'value',
    transitive: true,
    matcher: filter.isPxLineHeight,
    transformer: ({value}) => `${parseFloat(value) / 16}rem`,
  },
  // transform function that removes doubled rgba for tokens with references
  // not used now in web
  'value/flatten-rgba': {
    type: 'value',
    transitive: true,
    matcher: filter.isSysColor,
    transformer: flatRGBAColor,
  },
  //  transform function that removes doubled rgba for tokens with references
  'value/flatten-oklch': {
    type: 'value',
    transitive: true,
    matcher: filter.isSysColor,
    transformer: ({original: {value}}) => {
      // eslint-disable-next-line no-useless-escape
      const updatedValue = value.replace(/{[\w\.]*}/g, (a: string) =>
        a.includes('palette') ? `from ${a} l c h ` : ' ' + a
      );
      return value.includes('{base.opacity.0}') ? 'transparent' : updatedValue;
    },
  },
  'value/opacity': {
    type: 'value',
    transitive: true,
    matcher: filter.isBaseOpacity,
    transformer: ({value}) => `${value / 100}`,
  },
  'value/breakpoints/px': {
    type: 'value',
    transitive: true,
    matcher: filter.isBreakpoints,
    transformer: ({value}) => {
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
    transformer: ({path}) => {
      // Convert each path segment from camelCase to kebab-case
      const kebabPath = path.map(segment =>
        segment.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      );
      return `--cnvs-${kebabPath.join('-')}`;
    },
  },
  // transform function that adds qoutes to font family values
  'value/wrapped-font-family': {
    type: 'value',
    transitive: true,
    matcher: filter.isBaseFontFamily,
    transformer: ({value}) => `"${value}"`,
  },
  // transform function that adds em to letter spacing values
  'value/letter-spacing/px2rem': {
    type: 'value',
    transitive: true,
    matcher: filter.isLetterSpacing,
    transformer: ({value}) => `${value / 16}rem`,
  },
  // transform function that changes any border object value to its single line string
  'value/flatten-border': {
    type: 'value',
    transitive: true,
    matcher: filter.isBorder,
    transformer: ({value: {color, width, style}}) => `${width} ${style} ${color}`,
  },
  // transform function that resolves math values:
  // calculates base tokens and adds `calc` to sys tokens
  'value/math': {
    type: 'value',
    transitive: true,
    matcher: filter.isMathExpression,
    transformer: transformMath,
  },
  // transform names to camel case
  'name/camel': {
    type: 'name',
    transformer: transformNameToCamelCase,
  },
};
