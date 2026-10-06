import StyleDictionary from 'style-dictionary';
import {FormatFn} from 'style-dictionary/types';

/**
 * Style Dictionary format function that transform default format to type file.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * options must contains
 * `formats` property with mergebale format names in array, first is the main format to generate tokens, all other will be added into first one as formats option.
 * @returns file content as a string
 */

export const mergeTypes: FormatFn = async params => {
  const {options} = params;
  const {
    formats: [defaultFormat, ...restFormats],
  } = options;

  const content = await StyleDictionary.hooks.formats[defaultFormat]({
    ...params,
    options: {...options, formats: restFormats},
  });

  return content;
};
