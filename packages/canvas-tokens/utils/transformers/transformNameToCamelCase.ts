import {camelCase} from 'case-anything';
import {DesignToken} from 'style-dictionary/types/DesignToken';

type Transformer = (token: DesignToken) => string;

/**
 * [Style Dictionary custom transform function](https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms) that transforms the token's name to camel case.
 * It uses second and third level of path to generate new token name
 * @param {*} Token - style dictionary token object.
 * @returns updated token name
 */
export const transformNameToCamelCase: Transformer = token => {
  const fullName = token.path;
  const [_, ...nameWithCategory] = fullName;
  const [category, ...tokenName] = nameWithCategory;
  const isLowLevelToken = ['unit', 'level'].includes(category);
  const value = isLowLevelToken ? fullName : category === 'palette' ? tokenName : nameWithCategory;
  return camelCase(value.join('-'));
};
