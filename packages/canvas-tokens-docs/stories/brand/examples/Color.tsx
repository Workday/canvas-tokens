import * as React from 'react';
import * as brandTokens from '@workday/canvas-tokens-web/dist/es6/brand';

import {ColorGrid, buildColorSwatch} from '../../../components/ColorGrid';
import {Stack} from '../../../components/Stack';

// Token groups to display (new naming convention)
const tokenGroups = ['primary', 'neutral', 'critical', 'caution', 'positive'] as const;

// Groups that use object structure (not numeric keys)
const objectGroups = ['action', 'gradient', 'common'] as const;

// Deprecated tokens to filter out from common
const deprecatedCommonTokens = ['focusOutline', 'errorInner', 'alertInner', 'alertOuter'];

// Build palettes from flat exports (e.g., primary25, primary50, etc.)
const numericPalettes = tokenGroups.map(group => {
  const values = Object.entries(brandTokens)
    .filter(([key, value]) => {
      // Match tokens like primary25, primary50, primaryA25, etc.
      const regex = new RegExp(`^${group}(\\d+|[Aa]\\d+)$`);
      return regex.test(key) && typeof value === 'string';
    })
    .map(([key, varName]) => buildColorSwatch(varName as string, `brand.${key}`));

  return {
    name: group,
    values,
  };
});

// Build palettes from object exports (action, gradient, common)
const objectPalettes = objectGroups.map(group => {
  const tokens = brandTokens[group as keyof typeof brandTokens];
  if (typeof tokens !== 'object' || tokens === null) {
    return {name: group, values: []};
  }

  const values = Object.entries(tokens)
    .filter(([tokenName]) => {
      // Filter out deprecated common tokens
      if (group === 'common') {
        return !deprecatedCommonTokens.includes(tokenName);
      }
      return true;
    })
    .map(([tokenName, varName]) =>
      buildColorSwatch(varName as string, `brand.${group}.${tokenName}`)
    );

  return {
    name: group,
    values,
  };
});

const palettes = [...numericPalettes, ...objectPalettes];

export const ColorTokens = () => {
  return (
    <Stack>
      {palettes.map(palette => (
        <ColorGrid key={palette.name} name={palette.name} palette={palette.values} />
      ))}
    </Stack>
  );
};
