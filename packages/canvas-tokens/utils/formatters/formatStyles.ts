import {Formatter} from 'style-dictionary';
import {formattedCompositeStyles} from './helpers/formattedCompositeStyles';

/**
 * Style Dictionary format function that create classes with CSS variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCSSComposite: Formatter = ({dictionary, platform}) => {
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
export const formatLessComposite: Formatter = ({dictionary, platform}) => {
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
export const formatSassComposite: Formatter = ({dictionary, platform}) => {
  const {prefix} = platform;
  return formattedCompositeStyles({
    format: (str: string) => `$${prefix}${str}`,
    dictionary,
  });
};
