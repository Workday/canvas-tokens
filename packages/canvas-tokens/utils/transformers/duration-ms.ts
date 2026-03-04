import {DesignToken} from 'style-dictionary';

type Transformer = (token: DesignToken) => string;

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that
 * transforms duration tokens to include millisecond suffix
 * @param {*} Token - style dictionary token object.
 * @returns duration value with 'ms' suffix
 */
export const durationMs: Transformer = ({value}) => {
  return `${value}ms`;
};
