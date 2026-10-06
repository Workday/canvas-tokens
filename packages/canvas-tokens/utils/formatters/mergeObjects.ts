import StyleDictionary from 'style-dictionary';
import {Config, FormatFn, LocalOptions, TransformedToken} from 'style-dictionary/types';
import {getReferences} from 'style-dictionary/utils';
import {
  formattedObjectInnerValues,
  changeValuesToCSSVars,
  getOriginalValues,
} from './helpers/formattedObjectInnerValues';

interface ExtendedOptions extends Config, LocalOptions {
  formats: (string | FormatFn)[];
  level: 'brand' | 'sys';
}

/**
 * Style Dictionary format function that merge formattedObjectValue helper with js object format.
 * This merge format allows to handle composite token generation.
 * formattedObjectValue changes token value will be set to css variable name
 * and properties structure that used for object generation in format.
 * For brand level this format will generate a single brand object.
 * For sys level it will generate separated objects for each token type.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options must contains
 * `formats` property with a format name in array which handles token generation
 * `level` property as 'brand' or 'sys' to filter tokens based on levels
 * @returns file content as a string
 */
export const mergeObjects: FormatFn = async ({dictionary, options, ...rest}) => {
  const {
    formats: [defaultFormat],
    level,
  } = options as ExtendedOptions;

  const properties = formattedObjectInnerValues({
    format: level,
    dictionary,
    changeValueFn: (token: TransformedToken) =>
      changeValuesToCSSVars(token, (value: string) =>
        getReferences(value, dictionary.unfilteredTokens ?? dictionary.tokens)
      ),
  });

  const originalValues = formattedObjectInnerValues({
    format: level,
    dictionary,
    changeValueFn: getOriginalValues,
  });

  const params = {
    dictionary: {...dictionary, tokens: properties},
    options: {
      ...options,
      originalValues,
    },
    ...rest,
  };

  const content =
    typeof defaultFormat === 'string'
      ? StyleDictionary.hooks.formats[defaultFormat](params)
      : defaultFormat(params);

  return content;
};
