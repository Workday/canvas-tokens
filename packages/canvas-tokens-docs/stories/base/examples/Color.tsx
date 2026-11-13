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

const colorRegExp = new RegExp(colorPaletteNames.join('|'));
function buildPalettes(tokens: object) {
  const palettes: Record<string, ColorSwatch[]> = {};

  for (const key in tokens) {
    if (colorRegExp.test(key)) {
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
