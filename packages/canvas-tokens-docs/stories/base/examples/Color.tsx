import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';

import {Stack} from '../../../components/Stack';
import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';
import {
  DeprecatedColorGrid,
  DeprecatedColorSwatch,
  buildDeprecatedColorSwatch,
} from '../../../components/DeprecatedColorGrid';

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
const deprecatedColorRegExp = new RegExp(deprecatedColorPaletteNames.join('|'));
function buildPalettes(tokens: object) {
  const palettes: Record<string, ColorSwatch[]> = {};

  for (const key in tokens) {
    // Exclude deprecated color palette names
    if (
      colorRegExp.test(key) &&
      !deprecatedColorPaletteNames.some(deprecatedName => key.startsWith(deprecatedName))
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

function buildDeprecatedPalettes(tokens: object) {
  const palettes: Record<string, DeprecatedColorSwatch[]> = {};

  for (const key in tokens) {
    // If it's a color token

    if (deprecatedColorRegExp.test(key)) {
      const name = key.replace(/\d+/, '');

      console.log(key);

      const swatch = buildDeprecatedColorSwatch(tokens[key as keyof typeof tokens], `base.${key}`);

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

const deprecatedColorPalette = buildDeprecatedPalettes(base);

const flatBaseColors = baseColorPalettes.map(([name, palette]) => palette).flat();

deprecatedColorPalette.map(([name, palette]) => {
  palette.map(swatch => {
    const found = flatBaseColors.find(el => el.value === swatch.newCSSVar);
    swatch.newJsVar = <span>{found?.jsVar}</span>;
    swatch.newCSSVar = found?.cssVar || '';
  });
});

const allColorPalettes = baseColorPalettes.filter(
  ([name]) => {
    console.log(name);
    return colorPaletteNames.indexOf(name as (typeof colorPaletteNames)[number]) !== -1;
  }
  // colorPaletteNames.indexOf(name as (typeof colorPaletteNames)[number])
);

export const BaseColorTokens = () => {
  return (
    <Stack>
      foo
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

export const DeprecatedColorTokens = () => {
  return (
    <Stack>
      {deprecatedColorPalette.map(([name, palette]) => (
        <DeprecatedColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};
