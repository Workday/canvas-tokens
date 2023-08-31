import {Transform} from 'style-dictionary';
import * as math from 'mathjs';

type Transformer = Transform['transformer'];

/**
 * [Style Dictionary custom transform function] (https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms hex token value to hsla.
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const transformMath: Transformer = ({value, path: [level]}) => {
  const expression = value.replace(/rem/g, '');
  return level === 'base' ? `${math.evaluate(expression)}rem` : `calc(${value})`;
};
