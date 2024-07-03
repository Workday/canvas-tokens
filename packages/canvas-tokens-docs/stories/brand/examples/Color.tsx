import * as React from 'react';
import {brand} from '@workday/canvas-tokens-web';

import {ColorGrid, buildColorSwatch} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

const palettes = Object.keys(brand).map(key => {
  const tokens = brand[key as keyof typeof brand];
  const values = Object.entries(tokens).map(([value, varName]) =>
    buildColorSwatch(varName, `brand.${key}.${value}`)
  );
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
