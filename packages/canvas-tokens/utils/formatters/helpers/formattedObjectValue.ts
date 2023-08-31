import {Dictionary, TransformedToken, TransformedTokens} from 'style-dictionary';
import {camelCase} from 'case-anything';
import {isComposite} from '../../filters';

type HelperArgs = {
  format: 'sys' | 'brand';
  dictionary: Dictionary;
};

type CompositeHelper = (args: HelperArgs) => Record<string, any>;

/**
 * Style Dictionary format helper that transform dictionary properties object to the level specific object. All keys are changed to camel case and values to CSS variables.
 * @param {HelperArgs} HelperArgs - arguments of format helper function, includes properties:
 * `dictionary` as tyle Dictionary dictionary object,
 * `format`: 'sys' or 'brand' value.
 * @returns updated token object with cameled case keys and a css variable name as value.
 */

export const formattedObjectValue: CompositeHelper = ({format, dictionary}) => {
  const parsed = getParsed(dictionary.properties, format);
  const filteredTokens = dictionary.allTokens.filter(
    ({path: [ctg]}) => ctg !== 'base' && ctg === format
  );

  return filteredTokens.reduce((acc: Record<string, any>, {path}: TransformedToken) => {
    const passedPath = format === 'sys' ? path.slice(1) : path;

    setProperty({
      src: parsed,
      output: acc,
      path: passedPath,
      valueFn: token => {
        const originalValue = token.original.value;
        // only change composite values
        return isComposite(token) && typeof originalValue !== 'string'
          ? updateCompositeValues(originalValue, dictionary.getReferences)
          : token.value;
      },
    });

    return acc;
  }, {});
};

type RecursionHelperArgs = {
  src: Record<string, any>;
  output: Record<string, any>;
  path: string[];
  valueFn: Dictionary['getReferences'];
};

/**
 * Recursive utility function that iterates through a src object and fills output object with the updated value.
 * @param {RecursionHelperArgs} RecursionHelperArgs - arguments of the recursive function:
 * `src`: src object containing all token info;
 * `output`: 'new object to fill;
 * `path`: the path token array to iterate through
 * `valueFn` function that changing token value.
 */

const setProperty = ({src, output, path, valueFn}: RecursionHelperArgs): void => {
  const [head, ...rest] = path;
  const key = camelCase(head);

  // set empty object as value if inner object doesn't exist yet
  if (!output[key]) {
    output[key] = {};
  }

  // stop iterate if it's end of path and apply function to change token
  if (!rest.length) {
    output[key] = valueFn(src.value ? src : src[head]);
    return;
  }

  setProperty({
    src: src[head],
    output: output[key],
    path: rest,
    valueFn,
  });
};

/**
 * Utility function to change token composite values to css var and keys to camel case
 * @param {Object} token the token object
 * @param {Function} getRefs: style dictionary getReferences function
 * @returns the updated token composite value
 */
const updateCompositeValues = (
  values: Record<string, string>,
  getRefs: Dictionary['getReferences']
) =>
  Object.entries(values).reduce((acc: Record<string, string>, [key, value]: string[]) => {
    // composite values have single reference
    const [ref] = getRefs(value);
    const name = camelCase(key);
    return {...acc, [name]: `--cnvs-${ref.path.join('-')}`};
  }, {});

/**
 * Utility function to get the level-specific token object
 * @param {TransformedTokens} properties the style dictionary properties object
 * @param {string} level: 'brand' or 'sys' value
 * @returns the correct token object
 */
const getParsed = (properties: TransformedTokens, level?: 'brand' | 'sys'): Record<string, any> => {
  switch (level) {
    case 'sys':
      return properties.sys;
    case 'brand':
      return {brand: properties.brand};
    default:
      return {};
  }
};
