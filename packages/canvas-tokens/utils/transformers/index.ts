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
    transformer: token => {
      return token.original.value.replace(/{[\w\.]*}/g, (a: string) => {
        const cssVar = `var(--cnvs-${a.replace(/{|}/g, '').replace(/\./g, '-')})`;

        return cssVar.includes('palette') ? `from ${cssVar} l c h ` : ' ' + cssVar;
      });
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
      const expr = `${value}`.replace('0.25rem', '4');
      return `${math.evaluate(expr)}px`;
    },
  },
  // transform function that changes a value to its CSS var name
  'value/variables': {
    type: 'value',
    transitive: true,
    transformer: ({path}) => `--cnvs-${path.join('-')}`,
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
