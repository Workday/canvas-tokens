import * as React from 'react';
import {brand} from '@workday/canvas-tokens-web';

import {ColorGrid, buildColorSwatch} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

const getRecursivelyPathNames = (tokens: object, prefix = 'brand'): string[] => {
  function recurse(obj: any, path: string[]): string[] {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Recurse further with extended path
        return recurse(value, [...path, key]);
      } else {
        // At the leaf node, join the full token path
        return [[...path, key].join('.')];
      }
    });
  }
  return recurse(tokens, [prefix]);
};

const palettes = Object.keys(brand).map(key => {
  const tokens = getRecursivelyPathNames(brand);
  const values = tokens
    .filter(path => path.startsWith(`brand.${key}`))
    .map(path => buildColorSwatch(path, path));

  return {
    name: key,
    values,
  };
});

export const ColorTokens = () => {
  return (
    <Stack>
      {palettes.map(palette => (
        <ColorGrid key={palette.name} name={palette.name} palette={palette.values} />
      ))}
    </Stack>
  );
};
