import {Formatter} from 'style-dictionary';

/**
 * [Style Dictionary custom format function](https://amzn.github.io/style-dictionary/#/formats?id=custom-formats) that creates typescript file structure.
 * This structure contains type definitions with type value as an actual token value.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatToBasicTS: Formatter = ({dictionary, options}) => {
  const header = typeof options.fileHeader === 'function' ? options.fileHeader([]) : [];
  let fileContent = '// ' + header.join('\n// ') + '\n\n';
  dictionary.allTokens.forEach(({name, value}) => {
    fileContent = fileContent + `export declare const ${name} = "${value}";\n`;
  });
  return fileContent;
};

/**
 * Style Dictionary format function that creates common-js file structure.
 * This structure contains separated exports of each token.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatToInlineModule: Formatter = ({dictionary, options}) => {
  const header = typeof options.fileHeader === 'function' ? options.fileHeader([]) : [];
  const headerContent = '// ' + header.join('\n// ') + '\n\n';

  let fileContent =
    headerContent +
    `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\n\n`;

  dictionary.allTokens.forEach(({name, value}) => {
    fileContent = fileContent + `exports.${name} = "${value}";\n`;
  });

  return fileContent;
};
