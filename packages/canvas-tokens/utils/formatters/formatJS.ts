import {Formatter, formatHelpers} from 'style-dictionary';
import {jsFileHeader} from './helpers/jsFileHeader';
import {commonJSExports} from './helpers/commonJSExports';

/**
 * Style Dictionary format function that creates common-js file structure.
 * This structure contains separated exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options can contains `withoutModule` property js module header should not be generated.
 * @returns file content as a string
 */
export const formatToInlineModule: Formatter = ({dictionary, file, options}) => {
  const headerContent = !options.withoutModule
    ? jsFileHeader({file})
    : formatHelpers.fileHeader({file});
  return dictionary.allTokens.reduce((acc: string, {name, value}) => {
    acc += `exports.${name} = "${value}";\n`;
    return acc;
  }, headerContent);
};

/**
 * Style Dictionary format function that create token objects with common-js exports.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options can contains `withoutModule` property js module header should not be generated.
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
  return Object.keys(dictionary.properties).reduce((acc, item) => {
    return (acc += `export * from "./${item}";\n`);
  }, headerContent);
};

/**
 * Style Dictionary format function that create the export index file for common-js folder.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCommonJSExports: Formatter = ({dictionary, file}) => {
  const headerContent = commonJSExports({file});
  return Object.keys(dictionary.properties).reduce((acc, item) => {
    return (acc += `__exportStar(require("./${item}"), exports);\n`);
  }, headerContent);
};
