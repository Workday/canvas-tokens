import * as React from 'react';
import '@workday/canvas-tokens-web/dist/css/brand/_variables.css';
import {brand} from '@workday/canvas-tokens-web';

import {ColorGrid, buildColorSwatch} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

const primary = Object.values(brand.primary).map(varName => buildColorSwatch(varName));
const neutral = Object.values(brand.neutral).map(varName => buildColorSwatch(varName));
const alert = Object.values(brand.alert).map(varName => buildColorSwatch(varName));
const error = Object.values(brand.error).map(varName => buildColorSwatch(varName));
const success = Object.values(brand.success).map(varName => buildColorSwatch(varName));

const palettes = [
  {name: 'primary', values: primary},
  {name: 'neutral', values: neutral},
  {name: 'alert', values: alert},
  {name: 'error', values: error},
  {name: 'success', values: success},
];

export const ColorTokens = () => {
  return (
    <Stack>
      {palettes.map(palette => (
        <ColorGrid key={palette.name} name={palette.name} palette={palette.values} />
      ))}
    </Stack>
  );
};
