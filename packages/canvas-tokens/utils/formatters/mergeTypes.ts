import StyleDictionary, {Formatter} from 'style-dictionary';

/**
 * Style Dictionary format function that transform default format to type file.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options must contains
 * `formats` property with mergebale format names in array, first is the main format to generate tokens, all other will be added into first one as formats option.
 * @returns file content as a string
 */

export const mergeTypes: Formatter = params => {
  const {options} = params;
  const {
    formats: [defaultFormat, ...restFormats],
  } = options;

  const content = StyleDictionary.format[defaultFormat]({
    ...params,
    options: {...options, formats: restFormats},
  });

  return content;
};
