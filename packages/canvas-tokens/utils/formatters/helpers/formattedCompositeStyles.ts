import {Dictionary, TransformedToken} from 'style-dictionary';
import {isComposite} from '../../filters';
import {resolveRef} from '../../tokenStudioParser';

interface HelperDictionary extends Partial<Dictionary> {
  allTokens: TransformedToken[];
}

type HelperArgs = {
  dictionary: HelperDictionary;
  format: (str: string) => string;
};

type CompositeHelper = (args: HelperArgs) => string;

/**
 * Style Dictionary format helper that transform composite token into css class rule set.
 * @param {Object} HelperArgs - arguments of format helper function, includes properties:
 * `dictionary` as tyle Dictionary dictionary object,
 * `format` as transform functions for sub values of the composite token.
 * @param {string} HelperArgs.dictionary - Style Dictionary dictionary object.
 * @param {function} HelperArgs.format - transform functions for sub values of the composite token
 * @returns array with css class rule sets as string
 */

export const formattedCompositeStyles: CompositeHelper = ({dictionary, format}) => {
  const compositeTokens = dictionary.allTokens.filter(isComposite);

  const classes = compositeTokens.map(token => {
    return (
      `.${token.name} {\n` +
      Object.keys(token.value).reduce((acc, key) => {
        const originalValue = token.original.value[key];
        const resolvedRefs = resolveRef(originalValue, (_, partial) =>
          // convert dot.case to kebab-case
          format(partial.replace(/\./g, '-'))
        );

        acc += `  ${key}: ${resolvedRefs};\n`;
        return acc;
      }, '') +
      '}'
    );
  });

  return classes.join('\n\n');
};
