import * as math from 'mathjs';
import {Formatter, TransformedToken, formatHelpers} from 'style-dictionary';

/**
 * Style Dictionary format function that creates token type definitions with JSDoc.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatJSToTypes: Formatter = ({dictionary, file, options}) => {
  const {originalValues} = options;
  const headerContent = formatHelpers.fileHeader({file});

  const placeholders = Object.keys(dictionary.properties)
    .map(k => `**${k}**`)
    .join('\n');

  let content = placeholders;

  const replaceInContent: ReplaceFn = (pattern, newValue) => {
    content = content.replace(pattern, newValue);
    return content;
  };

  recursivelyCreateFileStructure({
    originalValues,
    tokens: dictionary.properties,
    allTokens: dictionary.allTokens,
    content,
    replaceInContent,
  });

  return headerContent + content;
};

const startingText = 'export declare const';

type ReplaceFn = (pattern: string, newText: string) => string;

type HelperArgs = {
  allTokens: Record<string, any>[];
  originalValues: Record<string, any>;
  tokens: Record<string, any>;
  depth?: number;
  content: string;
  replaceInContent: ReplaceFn;
};

const recursivelyCreateFileStructure = ({
  allTokens,
  originalValues,
  tokens,
  content,
  replaceInContent,
  depth = 0,
}: HelperArgs) => {
  let updatedContent = content;
  const entries = Object.entries(tokens);

  entries.forEach(([key, values]) => {
    const original = originalValues[key];
    const spaces = '  '.repeat(depth);

    if (typeof values === 'string') {
      const token = allTokens?.find(
        token => `--cnvs-${token.path.join('-').toLowerCase()}` === values
      );

      const jsDocText = generateJSDoc(token?.original || original, token?.value, values, depth);

      const innerText = depth
        ? `${spaces}"${key}": "${values}",`
        : `${startingText} ${key}: "${values}";\n`;
      const fullInnerText = jsDocText + innerText;

      updatedContent = replaceInContent(`**${key}**`, fullInnerText);
      return;
    }

    const placeholders = Object.keys(values)
      .map(k => `**${k}**`)
      .join('\n');

    const innerText = !depth
      ? `${startingText} ${key}: {\n${placeholders}\n};\n`
      : `${spaces}"${key}": {\n${placeholders}\n${spaces}},`;

    updatedContent = replaceInContent(`**${key}**`, innerText);

    recursivelyCreateFileStructure({
      allTokens,
      originalValues: original,
      tokens: values,
      depth: depth + 1,
      content: updatedContent,
      replaceInContent,
    });
  });
};

/**
 * Utility function to generate JS Doc with value and comment
 * @param {Object} original - Style Dictionary token.
 * @param {number} depth - Value of iteration to generate side spaces.
 * @returns JS Doc content as a string
 */
const generateJSDoc = (
  original: TransformedToken,
  actualValue: string,
  tokenName: string,
  depth: number
) => {
  const spaces = '  '.repeat(depth);
  const extraSpaces = spaces + ' ';
  const newJSDocLineStart = `\n${extraSpaces}* `;
  const {value, comment, deprecated, deprecatedComment} = original;

  const computedValue =
    typeof actualValue === 'string'
      ? actualValue.includes('rem') &&
        [' * ', ' / ', ' + ', ' - '].some(sign => actualValue.includes(sign)) &&
        !actualValue.includes('oklch')
        ? math.evaluate(actualValue.replace(/rem/g, ''))
        : actualValue.replace(/rem/g, '')
      : null;

  const pxValue = computedValue ? computedValue * 16 + 'px' : '';
  const computedValueText =
    computedValue && computedValue !== value ? ` (${computedValue}rem | ${pxValue})` : '';

  const valueText =
    typeof value === 'object'
      ? typeof actualValue === 'string'
        ? actualValue
        : JSON.stringify(value)
      : value
      ? newJSDocLineStart + `**value**: \`${value}\`` + computedValueText
      : '';

  const deprecatedText = deprecated
    ? newJSDocLineStart + newJSDocLineStart + `@deprecated ${deprecatedComment || ''}`
    : '';

  const updatedComment = comment
    ? newJSDocLineStart + newJSDocLineStart + comment.replace(/; /g, newJSDocLineStart)
    : '';

  const tokenText = tokenName
    ? newJSDocLineStart + newJSDocLineStart + `**CSS Var**: \`${tokenName}\``
    : '';

  const text = valueText + tokenText + updatedComment + deprecatedText + `\n${extraSpaces}`;

  return `${spaces}/**${text}*/\n`;
};
