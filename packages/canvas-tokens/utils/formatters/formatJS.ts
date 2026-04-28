import {Formatter, formatHelpers} from 'style-dictionary';
import {jsFileHeader} from './helpers/jsFileHeader';
import {recursivelyFlatObjectValue} from './helpers/recursivelyFlatObjectValue';
import {getCSSVarName, getLegacyEntries} from './helpers/cssVar';

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

  const legacyEntries: {name: string; value: string}[] = getLegacyEntries(dictionary.allTokens);

  const body = dictionary.allTokens.reduce((acc: string, token) => {
    const cssVarName = getCSSVarName(token.path);
    acc += `exports.${token.name} = "${cssVarName}";\n`;

    return acc;
  }, '');

  const legacyBlock = legacyEntries.length
    ? `\nexports.legacy = {\n${legacyEntries
        .map(({name, value}) => `  ${name}: "${value}"`)
        .join(',\n')}\n};\n`
    : '';

  return headerContent + body + legacyBlock;
};

/**
 * Style Dictionary format function that creates es6 file structure.
 * This structure contains separated exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatToInlineES6Module: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  const legacyEntries = getLegacyEntries(dictionary.allTokens);

  const body = dictionary.allTokens.reduce((acc: string, token) => {
    const cssVarName = getCSSVarName(token.path);
    acc += `export const ${token.name} = "${cssVarName}";\n`;
    return acc;
  }, '');

  const legacyBlock = legacyEntries.length
    ? `\nexport const legacy = {\n${legacyEntries
        .map(({name, value}) => `  ${name}: "${value}"`)
        .join(',\n')}\n};\n`
    : '';

  return headerContent + body + legacyBlock;
};

/**
 * Style Dictionary format function that creates ts file structure.
 * This structure contains separated type exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatInlineTypes: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  const legacyEntries = getLegacyEntries(dictionary.allTokens);

  const body = dictionary.allTokens.reduce((acc: string, token) => {
    const cssVarName = getCSSVarName(token.path);
    acc += `export declare const ${token.name} = "${cssVarName}";\n`;
    return acc;
  }, '');

  const legacyBlock = legacyEntries.length
    ? `\nexport declare const legacy = {\n${legacyEntries
        .map(({name, value}) => `  ${name}: "${value}"`)
        .join(',\n')}\n};\n`
    : '';

  return headerContent + body + legacyBlock;
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

  const mainTokens = recursivelyFlatObjectValue({tokens: dictionary.properties});
  const body = mainTokens
    ? Object.entries(mainTokens).reduce((acc: string, [key, values]) => {
        return (acc += `exports.${key} = ` + JSON.stringify(values, null, 2) + ';\n');
      }, headerContent)
    : '';

  const legacyTokens = recursivelyFlatObjectValue({
    tokens: dictionary.properties,
    isFallback: true,
  });
  const legacyBlock = legacyTokens
    ? `exports.legacy = ${JSON.stringify(legacyTokens, null, 2)};\n`
    : '';

  return body + legacyBlock;
};

/**
 * Style Dictionary format function that create token objects with es6 exports.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatES6ToObjects: Formatter = ({dictionary, file}) => {
  const headerContent = formatHelpers.fileHeader({file});
  const mainTokens = recursivelyFlatObjectValue({tokens: dictionary.properties});

  const body = mainTokens
    ? Object.entries(mainTokens).reduce((acc: string, [key, values]) => {
        return (acc += `export const ${key} = ` + JSON.stringify(values, null, 2) + ';\n');
      }, headerContent)
    : '';

  const legacyTokens = recursivelyFlatObjectValue({
    tokens: dictionary.properties,
    isFallback: true,
  });
  const legacyBlock = legacyTokens
    ? `export const legacy = ${JSON.stringify(legacyTokens, null, 2)};\n`
    : '';

  return body + legacyBlock;
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
