import {DesignToken} from 'style-dictionary';
import chroma from 'chroma-js';

/**
 * [Style Dictionary custom transform function] (https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms hex token value to hsla.
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const transformHexToHsla = ({value}: DesignToken) => {
  const roundValue = (value: string | number) => Math.round(parseFloat(`${value}`) * 10) / 10;

  const color = (value as string).replace('#', '');
  const hslaColors = chroma(color).hsl();
  const hslaColorString = `hsla(${roundValue(hslaColors[0] || 0)}, ${roundValue(
    hslaColors[1] * 100
  )}%, ${roundValue(hslaColors[2] * 100)}%, 1)`;
  return hslaColorString;
};

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's name to camel case.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token name
 */
export const transformNameToCamelCase = ({path}: DesignToken) => {
  const [number, name] = path.slice().reverse();
  const [first, second] = name.split('-');
  const secondPart = second ? second.charAt(0).toUpperCase() + second.slice(1) : '';
  return `${first}${secondPart}${number}`;
};
