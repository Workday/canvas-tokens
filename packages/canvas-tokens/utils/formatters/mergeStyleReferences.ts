import StyleDictionary, {Formatter, TransformedToken} from 'style-dictionary';
import {isNotComposite} from '../filters';

/**
 * Style Dictionary format function that merge two formats: for composite tokens and regular tokens.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options must contains
 * `formats` property with 2 mergebale format names in array, first to handle composite tokens, second - for regular tokens.
 * `level` property as 'brand' or 'sys' to filter tokens based on levels
 * @returns file content as a string
 */
export const mergeStyleReferences: Formatter = ({options, dictionary, ...rest}) => {
  const {
    formats: [compositeFormat, defaultFormat, shadowFormat],
    level,
  } = options;

  const filteredTokens = dictionary.allTokens.filter(
    ({path: [ctg]}: TransformedToken) => ctg === level
  );

  const shadowTokens = filteredTokens.filter(({path}: TransformedToken) => path[1] === 'depth');

  const shadowContent = StyleDictionary.format[shadowFormat]({
    dictionary: {...dictionary, allTokens: shadowTokens},
    options,
    ...rest,
  });

  const compositeTokensContent = StyleDictionary.format[compositeFormat]({
    dictionary: {...dictionary, allTokens: filteredTokens},
    options,
    ...rest,
  });

  const defaultContent = StyleDictionary.format[defaultFormat]({
    dictionary: {
      ...dictionary,
      allTokens: filteredTokens.filter(isNotComposite),
    },
    options: {outputReferences: true},
    ...rest,
  });

  if (shadowContent && defaultContent.includes(':root')) {
    return (
      defaultContent.replace(':root {\n', ':root {\n' + shadowContent + '\n') +
      '\n' +
      compositeTokensContent
    );
  }

  return defaultContent + shadowContent + '\n\n' + compositeTokensContent;
};
