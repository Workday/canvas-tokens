import {Dictionary, TransformedToken} from 'style-dictionary';
import {camelCase} from 'case-anything';
import * as math from 'mathjs';
import {isMathExpression, isComposite} from '../../filters';

type ChangeValueFunction = (token: TransformedToken) => Record<string, any> | string;

interface FormatterHelperArgs {
  format: 'sys' | 'brand';
  dictionary: Dictionary;
  changeValueFn: ChangeValueFunction;
}

type CompositeHelper = (args: FormatterHelperArgs) => Record<string, any>;

/**
 * Style Dictionary format helper that transform dictionary properties object to the level specific object. All keys are changed to camel case and values to CSS variables.
 * @param {HelperArgs} HelperArgs - arguments of format helper function, includes properties:
 * `dictionary` as tyle Dictionary dictionary object,
 * `format`: 'sys' or 'brand' value.
 * @returns updated token object with cameled case keys and a css variable name as value.
 */

export const formattedObjectInnerValues: CompositeHelper = ({
  format,
  dictionary,
  changeValueFn,
}) => {
  const parsed = dictionary.properties[format];
  const filteredTokens = dictionary.allTokens.filter(
    ({path: [ctg]}) => ctg !== 'base' && ctg === format
  );

  return filteredTokens.reduce((acc: Record<string, any>, {path}: TransformedToken) => {
    const passedPath = path.slice(1);

    setProperty({
      src: parsed,
      output: acc,
      path: passedPath,
      changeValueFn,
    });

    return acc;
  }, {});
};

type RecursionHelperArgs = {
  src: Record<string, any>;
  output: Record<string, any>;
  path: string[];
  changeValueFn: ChangeValueFunction;
};

/**
 * Recursive utility function that iterates through a src object and fills output object with the updated value.
 * @param {RecursionHelperArgs} RecursionHelperArgs - arguments of the recursive function:
 * `src`: src object containing all token info;
 * `output`: 'new object to fill;
 * `path`: the path token array to iterate through
 * `valueFn` function that changing token value.
 */

const setProperty = ({src, output, path, changeValueFn}: RecursionHelperArgs): void => {
  const [head, ...rest] = path;
  const key = camelCase(head);

  // set empty object as value if inner object doesn't exist yet
  if (!output[key]) {
    output[key] = {};
  }

  // stop iterate if it's end of path and apply function to change token
  if (!rest.length) {
    const token = src.value ? src : src[head];
    output[key] = changeValueFn(token);
    return;
  }

  setProperty({
    src: src[head],
    output: output[key],
    path: rest,
    changeValueFn,
  });
};

// ** UTILITIES **

/**
 * Utility function to change token composite values to css var and keys to camel case and regular token value to CSS var name
 * @param {Object} token the token object
 * @param {Function} getRefs: style dictionary getReferences function
 * @returns the updated token composite value
 */
export const changeValuesToCSSVars = (
  token: TransformedToken,
  getRefs: Dictionary['getReferences']
): Record<string, string> | string => {
  const originalValue = token.original.value;

  if (isComposite(token) && typeof originalValue !== 'string') {
    return Object.entries<string>(originalValue).reduce(
      (acc: Record<string, string>, [key, value]: string[]) => {
        // composite values have single reference
        const [ref] = getRefs(value);
        const name = camelCase(key);
        return {...acc, [name]: `--cnvs-${ref.path.join('-')}`};
      },
      {}
    );
  }

  return `--cnvs-${token.path.join('-')}`;
};

/**
 * Utility function to return token original values
 * @param {Object} token the token object
 * @param {Function} getRefs: style dictionary getReferences function
 * @returns the updated token composite value
 */
type ReturnValues = {value: string; comment?: string; raw?: TransformedToken['original']};
export const getOriginalValues = (
  token: TransformedToken
): Record<string, ReturnValues> | ReturnValues => {
  const {value: tokenValue, comment, original} = token;

  if (isComposite(token) && typeof tokenValue !== 'string') {
    return Object.entries<string>(tokenValue).reduce(
      (acc: Record<string, ReturnValues>, [key, value]: string[]) => {
        const name = camelCase(key);
        return {
          ...acc,
          [name]: {value: resolveMathExpressions(value), comment, raw: original.value},
        };
      },
      {}
    );
  }

  return {value: resolveMathExpressions(tokenValue), comment, raw: original.value};
};

const resolveMathExpressions = (value: string): string => {
  if (isMathExpression({value} as TransformedToken)) {
    const cleanExpression = value.replace(/rem/g, '');
    return `${math.evaluate(cleanExpression)}rem`;
  }

  return value;
};
