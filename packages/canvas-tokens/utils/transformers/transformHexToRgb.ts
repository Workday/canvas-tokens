import {DesignToken} from 'style-dictionary';
import chroma from 'chroma-js';

type Transformer = (token: DesignToken) => string;

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that
 * transforms the token's hex value to rgba
 * @param {*} Token - style dictionary token object.
 * @returns updated token name
 */
export const transformHexToRgb: Transformer = ({value}) => {
  return `rgba(${chroma(value).rgba()})`;
};
