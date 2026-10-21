import {TransformedToken} from 'style-dictionary';

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
    filter: (token: TransformedToken) =>
      typeof token.original.$value === 'object' && token.original.$value.colorSpace === 'oklch',
    transform: (token: TransformedToken) =>
      `oklch(${token.original.$value.components.join(' ')} / ${
        typeof token.original.$value.alpha === 'number' ? token.original.$value.alpha : 1
      })`,
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
      //   console.log(token);
      if (!token.filePath.includes('brand')) {
        const level = token.filePath.match(/dtcg\/(\w*)\//)?.[1];
        const tokenPrefix = level ? `${level.replace('system', 'sys')}-` : '';
        const palette = token.filePath.includes('base/palette.json') ? 'palette-' : '';
        return `${tokenPrefix}${palette}${token.name}`;
      }
      return token.name;
    },
  },
] as const;

type Stop = {
  color: string;
  position: number;
};
