import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';

import {Stack} from '../../../components/Stack';
import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';

const colorPaletteNames = [
  'cinnamon',
  'peach',
  'chiliMango',
  'cantaloupe',
  'sourLemon',
  'juicyPear',
  'kiwi',
  'greenApple',
  'watermelon',
  'jewel',
  'toothpaste',
  'blueberry',
  'plum',
  'berrySmoothie',
  'blackberry',
  'islandPunch',
  'grapeSoda',
  'pomegranate',
  'fruitPunch',
  'rootBeer',
  'toastedMarshmallow',
  'coconut',
  'capuccino', // Misspelled
  'licorice',
  'soap',
  'frenchVanilla',
  'blackPepper',
] as const;

const colorRegExp = new RegExp(colorPaletteNames.join('|'));

function buildPalettes(tokens: object) {
  const palettes: Record<string, ColorSwatch[]> = {};
  for (const key in tokens) {
    // If it's a color token
    if (colorRegExp.test(key)) {
      const name = key.replace(/\d+/, '');
      const swatch = buildColorSwatch(tokens[key as keyof typeof tokens]);
      if (name in palettes) {
        palettes[name].push(swatch);
      } else {
        palettes[name] = [swatch];
      }
    }
  }
  return Object.entries(palettes);
}

const baseColorPalettes = buildPalettes(base);

export const ColorTokens = () => {
  return (
    <Stack>
      {baseColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};
