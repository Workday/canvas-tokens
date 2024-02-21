import {Formatter, formatHelpers} from 'style-dictionary';
import {jsFileHeader} from './helpers/jsFileHeader';

/**
 * Style Dictionary format function that creates common-js file structure.
 * This structure contains separated exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options can contain `withoutModule` property js module header should not be generated.
 * @returns file content as a string
 */
export const formatToInlineCommonJSModule: Formatter = ({dictionary, file, options}) => {
  const headerContent = !options.withoutModule
    ? jsFileHeader({file})
    : formatHelpers.fileHeader({file});
  return dictionary.allTokens.reduce((acc: string, {name, path}) => {
    const cssVarName = path.join('-');
    acc += `exports.${name} = "--cnvs-${cssVarName}";\n`;
    return acc;
  }, headerContent);
};

/**
 * Style Dictionary format function that creates es6 file structure.
 * This structure contains separated exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatToInlineES6Module: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  return dictionary.allTokens.reduce((acc: string, {name, path}) => {
    const cssVarName = path.join('-');
    acc += `export const ${name} = "--cnvs-${cssVarName}";\n`;
    return acc;
  }, headerContent);
};

/**
 * Style Dictionary format function that creates ts file structure.
 * This structure contains separated exports of each token with `as const`.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatInlineTypes: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  return dictionary.allTokens.reduce((acc: string, {name, path}) => {
    const cssVarName = path.join('-');
    acc += `export declare const ${name} = "--cnvs-${cssVarName}" as const;\n`;
    return acc;
  }, headerContent);
};

/**
 * Style Dictionary format function that create token objects with common-js exports.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options can contain `withoutModule` property js module header should not be generated.
 * @returns file content as a string
 */
export const formatCommonToObjects: Formatter = ({dictionary, file, options}) => {
  const headerContent = !options.withoutModule
    ? jsFileHeader({file})
    : formatHelpers.fileHeader({file});
  return Object.entries(dictionary.properties).reduce((acc: string, [key, values]) => {
    return (acc += `exports.${key} = ` + JSON.stringify(values, null, 2) + ';\n');
  }, headerContent);
};

/**
 * Style Dictionary format function that create token objects with es6 exports.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatES6ToObjects: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  return Object.entries(dictionary.properties).reduce((acc: string, [key, values]) => {
    return (acc += `export const ${key} = ` + JSON.stringify(values, null, 2) + ';\n');
  }, headerContent);
};

/**
 * Style Dictionary format function that create the export index file for es6 folder.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatES6Exports: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  const packages = Object.keys(dictionary.properties).map(i => (i === 'sys' ? 'system' : i));
  const imports = packages.reduce((acc, item) => {
    return (acc += `import * as ${item} from "./${item}";\n`);
  }, headerContent);
  return imports + `export {${packages}}`;
};

/**
 * Style Dictionary format function that create the export index file for common-js folder.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCommonJSExports: Formatter = ({dictionary, file}) => {
  const headerContent = jsFileHeader({file});
  return Object.keys(dictionary.properties).reduce((acc, item) => {
    const fullItem = item === 'sys' ? 'system' : item;
    return (acc += `var ${fullItem} = require("./${fullItem}");\nexports.${fullItem} = ${fullItem};\n`);
  }, headerContent);
};
