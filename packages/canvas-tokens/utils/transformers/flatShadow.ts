import {DesignToken} from 'style-dictionary';
import * as math from 'mathjs';

import {flattenOklchInString} from './flatOklchColor';

const transformNumber = (number: string | number) => {
  const isString = typeof number === 'string';
  const mathSigns = ['+', '-', '*', '/'];

  const cleanedNumber = isString ? number.replace(/rem/g, '').replace(/px/g, '') : number;

  const isRem = isString && number.includes('rem');

  const finalvalue =
    typeof cleanedNumber === 'string' &&
    mathSigns.some(sign => cleanedNumber.includes(` ${sign} `)) &&
    !cleanedNumber.includes('var')
      ? math.evaluate(cleanedNumber)
      : cleanedNumber;

  const numericValue = isRem
    ? parseFloat(String(finalvalue))
    : parseFloat(String(finalvalue)) / 16;

  if (numericValue === 0) {
    return '0';
  }

  return `${numericValue}rem`;
};

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's composite shadow value to single string.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const flatShadow = ({value}: DesignToken): string => {
  const flatValue = value.map(({x, y, blur, spread, color}: any) => {
    const xNumber = transformNumber(x);
    const yNumber = transformNumber(y);
    const blurNumber = transformNumber(blur);
    const spreadNumber = transformNumber(spread);

    const numbers = [xNumber, yNumber, blurNumber, spreadNumber].join(' ');

    return `${numbers} ${flattenOklchInString(color)}`;
  });

  return flattenOklchInString(flatValue.join(', '));
};
