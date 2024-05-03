import {DesignToken} from 'style-dictionary';

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's composite shadow value to single string.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const flatShadow = ({value}: DesignToken): string => {
  const flatValue = value.map(({x, y, blur, spread, color}: any) => {
    const numbers = [x, y, blur, spread].map(i => (i > 0 ? `${parseInt(i) / 16}rem` : i)).join(' ');

    return `${numbers} ${color}`;
  });

  return flatValue.join(', ');
};
