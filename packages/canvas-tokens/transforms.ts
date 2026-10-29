import {TransformedToken} from 'style-dictionary';
import {camelCase} from 'case-anything';

import {getOklchValue} from './utils';
import {isOklchToken} from './filters';

export const transforms = [
  // Transform for duration tokens in the base/motion category
  {
    type: `value`,
    transitive: true,
    name: `duration`,
    filter: (token: TransformedToken) =>
      token.filePath.includes('base/motion') && token.$type === 'duration',
    transform: (token: TransformedToken) => `${token.$value.value}ms`,
  },
  // Transform for pixel values to rem units in the base category
  {
    type: `value`,
    transitive: true,
    name: `px2rem`,
    filter: (token: TransformedToken) =>
      typeof token.original.$value === 'object' &&
      token.original.$value.unit === 'px' &&
      !token.name.includes('breakpoint'),
    transform: (token: TransformedToken) => `${token.original.$value.value / 16}rem`,
  },
  {
    type: `value`,
    transitive: true,
    name: `toOKLCH`,
    filter: isOklchToken,
    transform: getOklchValue,
  },
  // Transform gradients
  {
    type: `value`,
    transitive: true,
    name: `gradient`,
    filter: (token: TransformedToken) => token.$type === 'gradient',
    transform: (token: TransformedToken) => {
      const angle = token.$extensions?.['sana.canvas.tokens']?.angle ?? 0;
      const stops = token.original.$value
        .map(({color, position}: Stop) => `${color} ${position * 100}%`)
        .join(', ');

      token.original.$value = `linear-gradient(${angle}, ${stops})`;
      return `linear-gradient(${angle}, ${stops})`;
    },
  },
  // transform name to include full name
  {
    type: `name`,
    transitive: true,
    name: `css/name`,
    transform: (token: TransformedToken) => {
      if (!token.filePath.includes('brand')) {
        const level = token.filePath.match(/dtcg\/(\w*)\//)?.[1];
        const tokenPrefix = level ? `${level.replace('system', 'sys')}-` : '';
        const palette = token.filePath.includes('base/palette.json') ? 'palette-' : '';
        return `${tokenPrefix}${palette}${token.name}`;
      }

      return token.name;
    },
  },
  // transform name to include full name for js
  {
    type: `name`,
    transitive: true,
    name: `js/name`,
    transform: (token: TransformedToken) => {
      if (token.filePath.includes('brand')) {
        return camelCase(token.name.replace('Brand', ''));
      }

      return camelCase(token.name);
    },
  },
] as const;

type Stop = {
  color: string;
  position: number;
};
