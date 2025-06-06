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
    content,
    replaceInContent,
  });

  return headerContent + content;
};

const startingText = 'export declare const';

type ReplaceFn = (pattern: string, newText: string) => string;

type HelperArgs = {
  originalValues: Record<string, any>;
  tokens: Record<string, any>;
  depth?: number;
  content: string;
  replaceInContent: ReplaceFn;
};

const recursivelyCreateFileStructure = ({
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
      const jsDocText = generateJSDoc(original, depth);

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
const generateJSDoc = (original: TransformedToken, depth: number) => {
  const spaces = '  '.repeat(depth);
  const extraSpaces = spaces + ' ';
  const newJSDocLineStart = `\n${extraSpaces}* `;
  const {value, comment, raw} = original;

  const pxValue = `${value}`.includes('rem') ? parseFloat(value) * 16 : null;
  const valueText = value + (pxValue ? ` (${pxValue}px)` : '');
  const tokenValue =
    typeof raw === 'string'
      ? 'token: ' + raw.replace(/^{(.+)}$/, (_: any, b: any) => b).replace('palette.', '')
      : '';

  const updatedComment = comment?.replace(/; /g, newJSDocLineStart);
  const text = comment
    ? newJSDocLineStart +
      valueText +
      newJSDocLineStart +
      newJSDocLineStart +
      tokenValue +
      newJSDocLineStart +
      newJSDocLineStart +
      updatedComment +
      `\n${extraSpaces}`
    : ` ${valueText} `;

  return `${spaces}/**${text}*/\n`;
};
