import {FormatFn} from 'style-dictionary/types';
import {formattedCompositeStyles} from './helpers/formattedCompositeStyles';

/**
 * Style Dictionary format function that create classes with CSS variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCSSComposite: FormatFn = ({dictionary, platform}) => {
  const {prefix} = platform;
  return formattedCompositeStyles({
    format: (str: string) => `var(--${prefix}${str})`,
    dictionary,
  });
};

/**
 * Style Dictionary format function that create classes with Less variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatLessComposite: FormatFn = ({dictionary, platform}) => {
  const {prefix} = platform;
  return formattedCompositeStyles({
    format: (str: string) => `@${prefix}${str}`,
    dictionary,
  });
};

/**
 * Style Dictionary format function that create classes with Sass variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatSassComposite: FormatFn = ({dictionary, platform}) => {
  const {prefix} = platform;
  return formattedCompositeStyles({
    format: (str: string) => `$${prefix}${str}`,
    dictionary,
  });
};
