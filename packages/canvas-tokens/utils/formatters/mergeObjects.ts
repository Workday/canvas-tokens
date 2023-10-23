import StyleDictionary, {Formatter, Options, TransformedToken} from 'style-dictionary';
import {
  formattedObjectInnerValues,
  changeValuesToCSSVars,
  getOriginalValues,
} from './helpers/formattedObjectInnerValues';

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

  const properties = formattedObjectInnerValues({
    format: level,
    dictionary,
    changeValueFn: (token: TransformedToken) =>
      changeValuesToCSSVars(token, value => dictionary.getReferences(value)),
  });

  const originalValues = formattedObjectInnerValues({
    format: level,
    dictionary,
    changeValueFn: getOriginalValues,
  });

  const params = {
    dictionary: {...dictionary, properties},
    options: {...options, originalValues},
    ...rest,
  };

  return typeof defaultFormat === 'string'
    ? StyleDictionary.format[defaultFormat](params)
    : defaultFormat(params);
};
