import * as React from 'react';
import '@workday/canvas-tokens-web/dist/css/brand/_variables.css';
import {brand} from '@workday/canvas-tokens-web';

import {ColorGrid, buildColorSwatch} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

const palettes = Object.keys(brand).map(key => {
  const tokens = brand[key as keyof typeof brand];
  const values = Object.values(tokens).map(varName => buildColorSwatch(varName));
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
