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
  'pink',
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
    // If it's a color token

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

function buildDeprecatedPalettes(tokens: object) {
  const palettes: Record<string, DeprecatedColorSwatch[]> = {};

  for (const key in tokens) {
    // If it's a color token

    if (deprecatedColorRegExp.test(key)) {
      const name = key.replace(/\d+/, '');

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
      {deprecatedColorPalette.map(([name, palette]) => {
        return <DeprecatedColorGrid key={name} name={name} palette={palette} />;
      })}
    </Stack>
  );
};

const primaryPaletteNames = ['blue'];
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

const aiPaletteNames = ['extendedDragonFruit'];
const aiColorPalettes = baseColorPalettes.filter(([name]) => aiPaletteNames.includes(name));

const otherPaletteNames = primaryPaletteNames.concat(
  neutralPaletteNames,
  typePaletteNames,
  statusPaletteNames,
  aiPaletteNames
);
export const AIColorTokens = () => {
  return (
    <Stack>
      {aiColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

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
