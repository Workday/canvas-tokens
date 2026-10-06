import StyleDictionary from 'style-dictionary';
import {FormatFn, TransformedToken} from 'style-dictionary/types';
import {outputReferencesTransformed} from 'style-dictionary/utils';
import {isMathExpression, isNotComposite, isSysColor} from '../filters';
import {flatOklchValue} from '../transformers/flatOklch';
import {transformMath} from '../transformers/transformMath';

/**
 * References are output based on the original token value. Values changed by the `oklch` and `math`
 * transforms keep their references (`oklch(from {palette} l c h / {opacity})`, `calc({unit} * 2)`),
 * so the transformed original value is used as a template to output them as variables.
 */
const withTransformedTemplate = (token: TransformedToken): TransformedToken => {
  const {value: originalValue} = token.original;

  if (typeof originalValue !== 'string') return token;

  const getTemplate = () => {
    if (isSysColor(token)) return flatOklchValue(originalValue);
    if (isMathExpression({...token, value: originalValue})) {
      return transformMath({...token, value: originalValue}, {}, {}) as string;
    }
  };

  const template = getTemplate();

  return template ? {...token, original: {...token.original, value: template}} : token;
};

/**
 * Style Dictionary format function that merge two formats: for composite tokens and regular tokens.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options must contains
 * `formats` property with 2 mergebale format names in array, first to handle composite tokens, second - for regular tokens.
 * `level` property as 'brand' or 'sys' to filter tokens based on levels
 * @returns file content as a string
 */
export const mergeStyleReferences: FormatFn = async ({options, dictionary, ...rest}) => {
  const {
    formats: [compositeFormat, defaultFormat, shadowFormat],
    level,
  } = options;

  const filteredTokens = dictionary.allTokens.filter(
    ({path: [ctg]}: TransformedToken) => ctg === level
  );

  const shadowTokens = filteredTokens.filter(({path}: TransformedToken) => path[1] === 'depth');

  const shadowContent = (await StyleDictionary.hooks.formats[shadowFormat]({
    dictionary: {...dictionary, allTokens: shadowTokens},
    options,
    ...rest,
  })) as string;

  const compositeTokensContent = (await StyleDictionary.hooks.formats[compositeFormat]({
    dictionary: {...dictionary, allTokens: filteredTokens},
    options,
    ...rest,
  })) as string;

  const defaultContent = (await StyleDictionary.hooks.formats[defaultFormat]({
    dictionary: {
      ...dictionary,
      allTokens: filteredTokens.filter(isNotComposite).map(withTransformedTemplate),
    },
    options: {outputReferences: outputReferencesTransformed},
    ...rest,
  })) as string;

  if (shadowContent && defaultContent.includes(':root')) {
    return (
      defaultContent.replace(':root {\n', ':root {\n' + shadowContent + '\n') +
      '\n' +
      compositeTokensContent
    );
  }

  return defaultContent + shadowContent + '\n\n' + compositeTokensContent;
};
