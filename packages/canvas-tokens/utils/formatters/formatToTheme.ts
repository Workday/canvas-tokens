import {Formatter} from 'style-dictionary';
import {getCSSVarNameFromRef} from './helpers/cssVar';

const getValue = (value: any, originalValue: any, type: 'css' | 'sass' | 'less') => {
  if (typeof originalValue === 'string' && originalValue.startsWith('{')) {
    if (
      !originalValue.includes('oklch') &&
      [' + ', ' - ', ' * ', ' / '].some(char => originalValue.includes(char))
    ) {
      return `calc(${getCSSVarNameFromRef(originalValue, type)})`;
    }

    return getCSSVarNameFromRef(originalValue, type);
  }

  return value;
};

/**
 * Style Dictionary format function that creates theme file structure.
 * @param {*} FormatterArguments - Style Dictionary formatter object containing `dictionary`, `options`, `file` and `platform` properties.
 * @returns file content as a string
 */
export const formatCSSTheme: Formatter = ({dictionary}) => {
  return `[data-theme="sana"] {
    ${dictionary.allTokens
      .map(
        token =>
          `--cnvs-${token.path.join('-').toLowerCase()}: ${getValue(
            token.value,
            token.original.value,
            'css'
          )};`
      )
      .join('\n\t')}
}`;
};

export const formatSassTheme: Formatter = ({dictionary}) => {
  return `[data-theme="sana"] {
    ${dictionary.allTokens
      .map(
        token =>
          `$cnvs-${token.path.join('-').toLowerCase()}: ${getValue(
            token.value,
            token.original.value,
            'sass'
          )};`
      )
      .join('\n\t')}
}`;
};

export const formatLessTheme: Formatter = ({dictionary}) => {
  return `[data-theme="sana"] {
    ${dictionary.allTokens
      .map(
        token =>
          `@cnvs-${token.path.join('-').toLowerCase()}: ${getValue(
            token.value,
            token.original.value,
            'less'
          )};`
      )
      .join('\n\t')}
}`;
};
