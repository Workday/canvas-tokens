import {DesignToken} from 'style-dictionary';

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's composite shadow value to single string.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const flatShadow = (token: DesignToken): string => {
  const flatValue = token.value.map(({x, y, blur, color, spread}: any) => {
    return `${x} ${y} ${blur} ${spread} ${color}`;
  });

  return flatValue.join(', ');
};
