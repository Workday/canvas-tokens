import {Formatter} from 'style-dictionary';
import {
  formatToInlineModule,
  formatES6ToObjects,
  formatCommonToObjects,
  formatES6Exports,
  formatCommonJSExports,
} from './formatJS';
import {formatCSSComposite, formatLessComposite, formatSassComposite} from './formatStyles';
import {mergeObjects} from './mergeObjects';
import {mergeTypes} from './mergeTypes';
import {mergeStyleReferences} from './mergeStyleReferences';

export const formats: Record<string, Formatter> = {
  // formatter creating the inline common-js file structure
  // with separated variables of tokens
  'javascript/common-js': formatToInlineModule,
  // formatter creating the es6 file structure
  // with tokens united in objects
  'es6/objects': formatES6ToObjects,
  // formatter creating the common-js file structure
  // with tokens united in objects
  'common-js/objects': formatCommonToObjects,
  // formatter creating es6 export structure
  'es6/packages-export': formatES6Exports,
  // formatter creating common js export structure
  'common-js/packages-export': formatCommonJSExports,
  // formatter creating the css file structure
  // with composite tokens as a class
  'css/composite': formatCSSComposite,
  // formatter creating the sass file structure
  // with composite tokens as a class
  'scss/composite': formatSassComposite,
  // formatter creating the less file structure
  // with composite tokens as a class
  'less/composite': formatLessComposite,
  // formatter merging default format for platform
  // with format helper transforming properties to the specific object
  'merge/objects': mergeObjects,
  // formatter restructuring default format generated file
  // to create types file based on a default structure and values
  'merge/types': mergeTypes,
  // formatter merging default format for regular tokens
  // with format for composite tokens
  'merge/refs': mergeStyleReferences,
};
