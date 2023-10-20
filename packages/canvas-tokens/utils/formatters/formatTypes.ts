import {Formatter, formatHelpers} from 'style-dictionary';

/**
 * Style Dictionary format function that create token type definitions with jsDoc.
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
const endingText = 'as const;\n';

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
    const extraSpaces = spaces + ' ';

    if (typeof values === 'string') {
      const pxVal = original.value.includes('rem') ? parseFloat(original.value) * 16 : null;
      const commentText = original.comment
        ? `\n${extraSpaces}* ${original.comment}\n${extraSpaces}*`
        : '';
      const valueText = ` ${original.value}${pxVal ? ` (${pxVal}px)` : ''} `;
      const jsDocText = `${spaces}/**${commentText}${valueText}${
        original.comment ? '\n' + extraSpaces : ''
      }*/\n`;
      const innerText = depth
        ? `${spaces}${key}: "${values}",`
        : `${startingText} ${key} = "${values}" ${endingText}`;
      const fullInnerText = jsDocText + innerText;

      updatedContent = replaceInContent(`**${key}**`, fullInnerText);
      return;
    }

    const placeholders = Object.keys(values)
      .map(k => `**${k}**`)
      .join('\n');

    const innerText = !depth
      ? `${startingText} ${key} = {\n${placeholders}\n} ${endingText}`
      : `${spaces}${key}: {\n${placeholders}\n${spaces}},`;

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
