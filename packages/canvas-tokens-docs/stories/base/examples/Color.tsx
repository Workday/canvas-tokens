import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';

import {Stack} from '../../../components/Stack';
import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';

const colorPaletteNames = [
  'neutral',
  'red',
  'orange',
  'amber',
  'green',
  'teal',
  'blue',
  'purple',
  'magenta',
  'azure',
  'coral',
  'indigo',
  'slate',
] as const;

const deprecatedColorPaletteNames = [
  'berrySmoothie',
  'blackPepper',
  'blackberry',
  'blueberry',
  'cantaloupe',
  'cappuccino',
  'chiliMango',
  'cinnamon',
  'coconut',
  'extendedDragonFruit',
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
    // Exclude deprecated color palette names (whole word match)
    if (
      colorRegExp.test(key) &&
      !deprecatedColorPaletteNames.some(deprecatedName => {
        const wholeWordRegex = new RegExp(`^${deprecatedName}(?=\\d|$)`);
        return wholeWordRegex.test(key);
      })
    ) {
      const name = key.replace(/\d+/, '');

      const swatch = buildColorSwatch(tokens[key as keyof typeof tokens], `base.${key}`);

      if (name in palettes) {
        palettes[name].push(swatch);
      } else {
        palettes[name] = [swatch];
      }

      palettes[name] = palettes[name].sort((a, b) => {
        const aNumber = parseInt(a.cssVar.split('-').reverse()[0]);
        const bNumber = parseInt(b.cssVar.split('-').reverse()[0]);
        return aNumber > bNumber ? 1 : -1;
      });
    }
  }
  return Object.entries(palettes);
}

const baseColorPalettes = buildPalettes(base);

const allColorPalettes = baseColorPalettes.filter(([name]) =>
  colorPaletteNames.includes(name as (typeof colorPaletteNames)[number])
);

export const BaseColorTokens = () => {
  return (
    <Stack>
      {allColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

export const ColorTokens = () => {
  return (
    <Stack>
      {baseColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

/** Deprecated base palette tokens — same table layout as `DeprecatedTokens` (TokenGrid + swatches). */
export {DeprecatedTokens as DeprecatedColorTokens} from './DeprecatedTokens';
