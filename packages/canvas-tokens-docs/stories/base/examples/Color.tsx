import * as React from 'react';
import {base} from '@workday/canvas-tokens-web';

import {Stack} from '../../../components/Stack';
import {ColorGrid, buildColorSwatch, ColorSwatch} from '../../../components/ColorGrid';
import {DeprecatedColorGrid} from '../../../components/DeprecatedColorGrid';
import {formatJSVar} from '../../../components/TokenGrid';

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
function buildPalettes(tokens: object, isDeprecated: boolean) {
  const palettes: Record<string, ColorSwatch[]> = {};

  for (const key in tokens) {
    // If it's a color token

    if (isDeprecated ? deprecatedColorRegExp.test(key) : colorRegExp.test(key)) {
      const name = key.replace(/\d+/, '');

      // console.log(tokens[key as keyof typeof tokens]);
      const swatch = buildColorSwatch(tokens[key as keyof typeof tokens], `base.${key}`);
      console.log(swatch);
      // console.log('swatch', swatch);
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

const baseColorPalettes = buildPalettes(base, false);
const deprecatedColorPalette = buildPalettes(base, true);

const flatBaseColors = baseColorPalettes.map(([name, palette]) => palette).flat();
deprecatedColorPalette.map(([name, palette]) => {
  palette.map(swatch => {
    const found = flatBaseColors.find(el => el.value === swatch.value);
    console.log(found?.value && found);
    swatch.newValue = <span>{found?.jsVar}</span>;
  });
});

export const ColorTokens = () => {
  return (
    <Stack>
      foo
      {baseColorPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  );
};

export const DeprecatedColorTokens = () => {
  return (
    <Stack>
      foo
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
