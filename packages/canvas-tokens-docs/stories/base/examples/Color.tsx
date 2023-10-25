import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';

import {Stack} from '../../../components/Stack';
import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';

const colorPaletteNames = [
  'berrySmoothie',
  'blackPepper',
  'blackberry',
  'blueberry',
  'cantaloupe',
  'cappuccino',
  'chiliMango',
  'cinnamon',
  'coconut',
  'frenchVanilla',
  'fruitPunch',
  'grapeSoda',
  'greenApple',
  'islandPunch',
  'jewel',
  'juicyPear',
  'kiwi',
  'licorice',
  'peach',
  'plum',
  'pomegranate',
  'rootBeer',
  'soap',
  'sourLemon',
  'toastedMarshmallow',
  'toothpaste',
  'watermelon',
] as const;

const colorRegExp = new RegExp(colorPaletteNames.join('|'));

function buildPalettes(tokens: object) {
  const palettes: Record<string, ColorSwatch[]> = {};
  for (const key in tokens) {
    // If it's a color token
    if (colorRegExp.test(key)) {
      const name = key.replace(/\d+/, '');
      const swatch = buildColorSwatch(tokens[key as keyof typeof tokens], `base.${key}`);
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

const primaryPaletteNames = ['blueberry'];
const primaryColorPalettes = baseColorPalettes.filter(([name]) =>
  primaryPaletteNames.includes(name)
);

export const PrimaryColorTokens = () => {
  return (
    <Stack>
      {primaryColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

const neutralPaletteNames = ['blackPepper', 'licorice', 'soap', 'frenchVanilla'];
const neutralColorPalettes = baseColorPalettes.filter(([name]) =>
  neutralPaletteNames.includes(name)
);

export const NeutralColorTokens = () => {
  return (
    <Stack>
      {neutralColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

const typePaletteNames = ['blackPepper', 'licorice', 'frenchVanilla', 'blueberry'];
const typeColorPalettes = baseColorPalettes.filter(([name]) => typePaletteNames.includes(name));

export const TypeColorTokens = () => {
  return (
    <Stack>
      {typeColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

const statusPaletteNames = ['greenApple', 'cinnamon', 'cantaloupe'];
const statusColorPalettes = baseColorPalettes.filter(([name]) => statusPaletteNames.includes(name));

export const StatusColorTokens = () => {
  return (
    <Stack>
      {statusColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

const otherPaletteNames = primaryPaletteNames.concat(
  neutralPaletteNames,
  typePaletteNames,
  statusPaletteNames
);
const otherColorPalettes = baseColorPalettes.filter(([name]) => !otherPaletteNames.includes(name));

export const OtherColorTokens = () => {
  return (
    <Stack>
      {otherColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};
