import {DesignToken} from 'style-dictionary';

type Transformer = (token: DesignToken) => string;

const mappedFontWeight = {
  Light: '300',
  Regular: '400',
  Medium: '500',
  Bold: '700',
};

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that
 * transforms the string values to number
 * @param {*} Token - style dictionary token object.
 * @returns updated token value
 */
export const mapFontWeight: Transformer = ({value}) => {
  return mappedFontWeight[value as keyof typeof mappedFontWeight];
};
