import StyleDictionary, {Formatter, Options} from 'style-dictionary';
import {formattedObjectValue} from './helpers/formattedObjectValue';

interface ExtendedOptions extends Options {
  formats: string | Formatter[];
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
export const mergeObjects: Formatter = ({dictionary, options, ...rest}) => {
  const {
    formats: [defaultFormat],
    level,
  } = options as ExtendedOptions;

  const properties = formattedObjectValue({
    format: level,
    dictionary: {
      ...dictionary,
      getReferences: value => dictionary.getReferences(value),
    },
  });

  const params = {
    dictionary: {...dictionary, properties},
    options,
    ...rest,
  };

  return typeof defaultFormat === 'string'
    ? StyleDictionary.format[defaultFormat](params)
    : defaultFormat(params);
};
