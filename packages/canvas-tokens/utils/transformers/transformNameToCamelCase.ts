import {camelCase} from 'case-anything';
import {DesignToken} from 'style-dictionary/types/DesignToken';

type Transformer = (token: DesignToken) => string;

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's name to camel case.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token name
 */
export const transformNameToCamelCase: Transformer = ({path}) => {
  const lowLevelCategories = ['unit', 'level'];
  const lowLevelPattern = new RegExp(`${lowLevelCategories.join('|')}`);

  const isLowLevelToken = lowLevelPattern.test(path[1]);
  const isPalette = path.includes('palette');

  if (isLowLevelToken) {
    return camelCase(path.join('-'));
  }

  const tokenName = path.slice(1);

  if (isPalette) {
    const filteredPath = tokenName.filter((i: string) => i !== 'palette');
    return camelCase(filteredPath.join('-'));
  }

  return camelCase(tokenName.join('-'));
};
