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
    expect(files.get('brand/common.json')).toMatchObject({
      brand: {
        common: {
          focus: {
            $type: 'color',
          },
        },
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
    const common = files.get('brand/common.json');

    expect(common).toMatchObject({
      brand: {
        common: {
          focus: {
            $type: 'color',
          },
        },
      },
    });
    expect(common?.brand?.common).not.toHaveProperty('inverse');
    expect(common?.brand?.common).not.toHaveProperty('contrast');
    expect(common?.brand?.common).not.toHaveProperty('inner');
    expect(common?.brand?.common).not.toHaveProperty('outer');
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
      fg: {
        default: {
          $type: 'color',
        },
      },
    });
  });

  it('omits tenant palette colors', () => {
    const colorsCollectionId = 'col-colors';
    const files = generateVariableTokens(
      createPayload(
        [
          createVariable({
            id: 'neutral-100',
            name: 'neutral/100',
            variableCollectionId: colorsCollectionId,
            valuesByMode: {[lightModeId]: {r: 0.9, g: 0.9, b: 0.9, a: 1}},
          }),
          createVariable({
            id: 'tenant-airbnb-25',
            name: 'tenant/airbnb/25',
            variableCollectionId: colorsCollectionId,
            valuesByMode: {[lightModeId]: {r: 1, g: 0.9, b: 0.9, a: 1}},
          }),
          createVariable({
            id: 'dark-tenant-airbnb-25',
            name: 'dark/tenant/airbnb/25',
            variableCollectionId: colorsCollectionId,
            valuesByMode: {[lightModeId]: {r: 0.2, g: 0.1, b: 0.1, a: 1}},
          }),
        ],
        {
          [colorsCollectionId]: createCollection(colorsCollectionId, 'Colors'),
        }
      )
    );
    const palette = files.get('base/palette.json');

    expect(palette).toHaveProperty('neutral.100');
    expect(palette).not.toHaveProperty('tenant');
    expect(palette?.dark ?? {}).not.toHaveProperty('tenant');
  });

  it('keeps brand references as the main value for theme color tokens', () => {
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

    expect(accent?.accent?.primary.$value).toBe('{brand.positive.600}');
    expect(accent?.accent?.positive.$value).toBe('{brand.positive.600}');
    expect(accent?.accent?.primary.$extensions).toBeUndefined();
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

    expect(files.get('brand/common.json')?.brand?.common?.focus.$value).toBe('{brand.primary.500}');
  });

  it('keeps motion easing names dashed instead of nesting them', () => {
    const motionCollectionId = 'col-motion';
    const files = generateVariableTokens(
      createPayload(
        [
          createVariable({
            id: 'easing-a-100',
            name: 'easing/a-100',
            variableCollectionId: motionCollectionId,
            resolvedType: 'FLOAT',
            valuesByMode: {[lightModeId]: 0.2},
          }),
          createVariable({
            id: 'easing-a-200',
            name: 'easing/a-200',
            variableCollectionId: motionCollectionId,
            resolvedType: 'FLOAT',
            valuesByMode: {[lightModeId]: 0.4},
          }),
        ],
        {
          [motionCollectionId]: createCollection(motionCollectionId, 'Motion'),
        }
      )
    );
    const easing = files.get('base/motion.json')?.easing;

    expect(easing).toHaveProperty('a-100');
    expect(easing).toHaveProperty('a-200');
    expect(easing).not.toHaveProperty('a');
  });
});
