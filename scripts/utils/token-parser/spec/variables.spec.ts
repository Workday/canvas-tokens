import {describe, expect, it} from 'vitest';
import {generateVariableTokens} from '../variables.js';
import {
  brandCollectionId,
  createCollection,
  createPayload,
  createVariable,
  lightModeId,
  themeCollectionId,
} from './fixtures.js';

describe('generateVariableTokens', () => {
  it('routes theme focus tokens to the brand folder', () => {
    const variable = createVariable({
      id: 'focus-primary',
      name: 'focus/primary',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {r: 0, g: 0, b: 1, a: 1},
      },
    });
    const files = generateVariableTokens(
      createPayload([variable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(files.has('system/color/focus.json')).toBe(false);
    expect(files.get('brand/focus.json')).toMatchObject({
      primary: {
        $type: 'color',
      },
    });
  });

  it('omits inverse, contrast, inner, and outer from brand focus tokens', () => {
    const files = generateVariableTokens(
      createPayload(
        ['inverse', 'contrast', 'inner', 'outer', 'primary'].map((name, index) =>
          createVariable({
            id: `focus-${name}`,
            name: `focus/${name}`,
            variableCollectionId: themeCollectionId,
            resolvedType: name === 'inner' || name === 'outer' ? 'FLOAT' : 'COLOR',
            valuesByMode: {
              [lightModeId]: name === 'inner' || name === 'outer' ? 2 : {r: 0, g: 0, b: 1, a: 1},
            },
            key: `focus-${name}-${index}`,
          })
        ),
        {
          [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
        }
      )
    );
    const focus = files.get('brand/focus.json');

    expect(focus).toMatchObject({
      primary: {
        $type: 'color',
      },
    });
    expect(focus).not.toHaveProperty('inverse');
    expect(focus).not.toHaveProperty('contrast');
    expect(focus).not.toHaveProperty('inner');
    expect(focus).not.toHaveProperty('outer');
  });

  it('keeps other theme color tokens in system/color', () => {
    const variable = createVariable({
      id: 'fg-default',
      name: 'fg/default',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {r: 0, g: 0, b: 0, a: 1},
      },
    });
    const files = generateVariableTokens(
      createPayload([variable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(files.get('system/color/fg.json')).toMatchObject({
      default: {
        $type: 'color',
      },
    });
  });

  it('uses inner palette values only for color tokens with brand themes', () => {
    const palette = createVariable({
      id: 'green-600',
      key: 'green-600',
      name: 'green/600',
    });
    const brandPositive = createVariable({
      id: 'brand-positive-600',
      key: 'brand-positive-600',
      name: 'brand/positive/600',
      variableCollectionId: brandCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'green-600'},
      },
    });
    const withThemes = createVariable({
      id: 'accent-primary',
      name: 'accent/primary',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'green-600'},
      },
    });
    const withoutThemes = createVariable({
      id: 'accent-positive',
      name: 'accent/positive',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'green-600'},
      },
    });
    const files = generateVariableTokens(
      createPayload([palette, brandPositive, withThemes, withoutThemes], {
        [brandCollectionId]: createCollection(brandCollectionId, 'Brand'),
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
        'col-brand-ext': {
          id: 'col-brand-ext',
          name: 'Brand',
          isExtension: true,
          modes: [{modeId: lightModeId, name: 'Light'}],
          variableOverrides: {
            'accent-primary': {
              [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-positive-600'},
            },
          },
        },
      })
    );
    const accent = files.get('system/color/accent.json');

    expect(accent?.primary.$value).toBe('{green.600}');
    expect(accent?.positive.$value).toBe('{brand.positive.600}');
  });

  it('keeps brand references as the main value for focus tokens', () => {
    const palette = createVariable({
      id: 'blue-500',
      key: 'blue-500',
      name: 'blue/500',
    });
    const brandPrimary = createVariable({
      id: 'brand-primary-500',
      key: 'brand-primary-500',
      name: 'brand/primary/500',
      variableCollectionId: brandCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'blue-500'},
      },
    });
    const focusPrimary = createVariable({
      id: 'focus-primary',
      name: 'focus/primary',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'blue-500'},
      },
    });
    const files = generateVariableTokens(
      createPayload([palette, brandPrimary, focusPrimary], {
        [brandCollectionId]: createCollection(brandCollectionId, 'Brand'),
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
        'col-brand-ext': {
          id: 'col-brand-ext',
          name: 'Brand',
          isExtension: true,
          modes: [{modeId: lightModeId, name: 'Light'}],
          variableOverrides: {
            'focus-primary': {
              [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-primary-500'},
            },
          },
        },
      })
    );

    expect(files.get('brand/focus.json')?.primary.$value).toBe('{brand.primary.500}');
  });
});
