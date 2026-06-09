import * as React from 'react';
import {sana as baseSana} from '@workday/canvas-tokens-web/dist/es6/base/sana';
import {sana as brandSana} from '@workday/canvas-tokens-web/dist/es6/brand/sana';
import {sana as systemSana} from '@workday/canvas-tokens-web/dist/es6/system/sana';

import {Stack} from '../../../components/Stack';
import {ColorGrid, ColorSwatch} from '../../../components/ColorGrid';
import {formatJSVar} from '../../../components/TokenGrid';

/**
 * Sana token values are pre-wrapped with `var()` and include a fallback OKLCH value, e.g.
 *   "var(--cnvs-sys-color-color-bg-default, oklch(1 0 0 / 1))"
 *
 * This helper parses the var() expression so we can render swatches and values
 * without requiring the consuming page to query computed styles.
 */
const SANA_VAR_REGEX = /^var\((--[a-z0-9-]+),\s*(.*)\)$/i;

function parseSanaVar(sanaValue: string) {
  const match = sanaValue.match(SANA_VAR_REGEX);
  if (!match) {
    return {cssVar: sanaValue, fallback: sanaValue};
  }
  return {cssVar: match[1], fallback: match[2]};
}

function buildSanaSwatch(sanaValue: string, jsVarName: string): ColorSwatch {
  const {cssVar, fallback} = parseSanaVar(sanaValue);
  return {
    cssVar,
    jsVar: formatJSVar(jsVarName),
    value: fallback,
  };
}

/** Wraps content in a `data-theme="sana"` container so CSS variables resolve to the sana values. */
const SanaTheme = ({children}: {children: React.ReactNode}) => (
  <div data-theme="sana">{children}</div>
);

function shadeSort(a: ColorSwatch, b: ColorSwatch) {
  const aShade = a.cssVar.split('-').at(-1) || '';
  const bShade = b.cssVar.split('-').at(-1) || '';
  const aNum = parseInt(aShade.replace(/^a/i, ''), 10);
  const bNum = parseInt(bShade.replace(/^a/i, ''), 10);
  const aIsAlpha = /^a\d/i.test(aShade) ? 1 : 0;
  const bIsAlpha = /^a\d/i.test(bShade) ? 1 : 0;
  if (aIsAlpha !== bIsAlpha) return aIsAlpha - bIsAlpha;
  return aNum - bNum;
}

/* -------------------------------------------------------------------------- */
/*                                Base palette                                */
/* -------------------------------------------------------------------------- */

function groupBaseSanaTokens() {
  const palettes: Record<string, ColorSwatch[]> = {};

  for (const [key, value] of Object.entries(baseSana)) {
    if (typeof value !== 'string') continue;

    const {cssVar} = parseSanaVar(value);
    if (!cssVar.startsWith('--cnvs-base-palette-')) continue;

    const name = key.replace(/(A?\d+)$/, '');
    if (!name) continue;

    const swatch = buildSanaSwatch(value, `base.sana.${key}`);

    if (!(name in palettes)) {
      palettes[name] = [];
    }
    palettes[name].push(swatch);
  }

  for (const name of Object.keys(palettes)) {
    palettes[name].sort(shadeSort);
  }

  return Object.entries(palettes).sort(([a], [b]) => a.localeCompare(b));
}

const baseSanaPalettes = groupBaseSanaTokens();

export const BaseSanaColors = () => (
  <SanaTheme>
    <Stack>
      {baseSanaPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  </SanaTheme>
);

/* -------------------------------------------------------------------------- */
/*                                Brand palette                               */
/* -------------------------------------------------------------------------- */

function groupBrandSanaTokens() {
  const palettes: Record<string, ColorSwatch[]> = {};

  for (const [key, value] of Object.entries(brandSana)) {
    if (typeof value !== 'string') continue;
    const name = key.replace(/(A?\d+)$/, '');
    if (!name) continue;

    const swatch = buildSanaSwatch(value, `brand.sana.${key}`);

    if (!(name in palettes)) {
      palettes[name] = [];
    }
    palettes[name].push(swatch);
  }

  for (const name of Object.keys(palettes)) {
    palettes[name].sort(shadeSort);
  }

  return Object.entries(palettes).sort(([a], [b]) => a.localeCompare(b));
}

const brandSanaPalettes = groupBrandSanaTokens();

export const BrandSanaColors = () => (
  <SanaTheme>
    <Stack>
      {brandSanaPalettes.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  </SanaTheme>
);

/* -------------------------------------------------------------------------- */
/*                               System palette                               */
/* -------------------------------------------------------------------------- */

/** Recursively walks the nested system sana export and yields each color token. */
function* walkSystemColorTokens(
  node: unknown,
  path: string[] = []
): Generator<{path: string[]; value: string}> {
  if (typeof node === 'string') {
    yield {path, value: node};
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, child] of Object.entries(node)) {
      yield* walkSystemColorTokens(child, [...path, key]);
    }
  }
}

function buildSystemSanaGroups() {
  const groups: Record<string, ColorSwatch[]> = {};

  const root = (systemSana.color as unknown as {color?: Record<string, unknown>})?.color;
  if (!root) return [];

  for (const [groupName, groupNode] of Object.entries(root)) {
    const swatches: ColorSwatch[] = [];
    for (const {path, value} of walkSystemColorTokens(groupNode)) {
      const jsPath = ['system', 'sana', 'color', 'color', groupName, ...path].join('.');
      swatches.push(buildSanaSwatch(value, jsPath));
    }
    if (swatches.length) {
      groups[groupName] = swatches;
    }
  }

  return Object.entries(groups);
}

const systemSanaGroups = buildSystemSanaGroups();

export const SystemSanaColors = () => (
  <SanaTheme>
    <Stack>
      {systemSanaGroups.map(([name, palette]) => (
        <ColorGrid key={name} name={name} palette={palette} />
      ))}
    </Stack>
  </SanaTheme>
);
