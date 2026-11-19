import {TransformedToken} from 'style-dictionary';
import {camelCase} from 'case-anything';

import {getOklchValue} from './utils';
import {isOklchToken} from './filters';

type Dimension = {value: number; unit: string} | number | string;
type ShadowLayer = {
  offsetX: Dimension;
  offsetY: Dimension;
  blur: Dimension;
  spread: Dimension;
  color: string;
};

// Converts a DTCG dimension ({value, unit}) to a CSS length; px becomes rem.
const toCssLength = (dimension: Dimension): string => {
  if (typeof dimension !== 'object') {
    return String(dimension);
  }
  const {value, unit} = dimension;
  if (value === 0) {
    return '0';
  }
  return unit === 'px' ? `${value / 16}rem` : `${value}${unit}`;
};

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
  {
    type: `name`,
    transitive: true,
    name: `css/name/base`,
    transform: (token: TransformedToken) =>
      token.filePath.includes('/base/') && !token.filePath.includes('palette')
        ? `base-${token.name}`
        : token.name,
  },
  // transform name to include full name for js
  {
    type: `name`,
    transitive: true,
    name: `js/name`,
    transform: (token: TransformedToken) => {
      const name = token.filePath.includes('brand')
        ? token.name.replace(/^brand/i, '')
        : token.name;

      return camelCase(name);
    },
  },
  // transform depth tokens
  {
    type: `value`,
    transitive: true,
    name: `css/depth`,
    filter: (token: TransformedToken) =>
      token.$type === 'shadow' && token.path.includes('depth'),
    transform: (token: TransformedToken) => {
      const layers: ShadowLayer[] = Array.isArray(token.$value)
        ? token.$value
        : [token.$value];

      return layers
        .map(
          ({offsetX, offsetY, blur, spread, color}) =>
            `${toCssLength(offsetX)} ${toCssLength(offsetY)} ${toCssLength(blur)} ${toCssLength(spread)} ${color}`
        )
        .join(', ');
    },
  },
] as const;

type Stop = {
  color: string;
  position: number;
};
