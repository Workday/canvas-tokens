import {Formatter} from 'style-dictionary';
import {isSysShadow} from '../filters';

/**
 * Style Dictionary format function that create classes with CSS variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCSSShadow: Formatter = ({dictionary}) => {
  return dictionary.allTokens
    .filter(isSysShadow)
    .map(token => `  --${token.name}: ${token.value}; /* ${token.comment} */`)
    .join('\n');
};

/**
 * Style Dictionary format function that create classes with Less variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatLessShadow: Formatter = ({dictionary}) => {
  return dictionary.allTokens
    .filter(isSysShadow)
    .map(token => `@${token.name}: ${token.value}; // ${token.comment}`)
    .join('\n');
};

/**
 * Style Dictionary format function that create classes with Sass variables.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatSassShadow: Formatter = ({dictionary}) => {
  return dictionary.allTokens
    .filter(isSysShadow)
    .map(token => `$${token.name}: ${token.value}; // ${token.comment}`)
    .join('\n');
};
