import {describe, expect, it} from 'vitest';
import {createContext} from '../context.js';
import {
  brandCollectionId,
  colorsCollectionId,
  createCollection,
  createPayload,
  createVariable,
  darkModeId,
  lightModeId,
  themeCollectionId,
} from './fixtures.js';

describe('context', () => {
  it('resolves color values to oklch tokens', () => {
    const variable = createVariable();
    const context = createContext(createPayload([variable]));

    expect(context.resolveValue({r: 1, g: 0, b: 0, a: 1}, variable, lightModeId)).toMatchObject({
      colorSpace: 'oklch',
      hex: '#ff0000',
    });
  });

  it('remaps white and black palette references to neutral endpoints', () => {
    const white = createVariable({
      id: 'white',
      key: 'white-key',
      name: 'white',
      valuesByMode: {[lightModeId]: {r: 1, g: 1, b: 1, a: 1}},
    });
    const black = createVariable({
      id: 'black',
      key: 'black-key',
      name: 'black',
      valuesByMode: {[lightModeId]: {r: 0, g: 0, b: 0, a: 1}},
    });
    const whiteAlias = createVariable({
      id: 'white-alias',
      key: 'white-alias-key',
      name: 'fg/on-contrast',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'white'},
      },
    });
    const blackAlias = createVariable({
      id: 'black-alias',
      key: 'black-alias-key',
      name: 'fg/default',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'black'},
      },
    });
    const context = createContext(
      createPayload([white, black, whiteAlias, blackAlias], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(context.resolveValue(whiteAlias.valuesByMode[lightModeId], whiteAlias, lightModeId)).toBe(
      '{neutral.0}'
    );
    expect(context.resolveValue(blackAlias.valuesByMode[lightModeId], blackAlias, lightModeId)).toBe(
      '{neutral.1000}'
    );
  });

  it('resolves variable aliases using collection-specific reference formatting', () => {
    const target = createVariable({
      id: 'target',
      key: 'target-key',
      name: 'neutral/100',
      variableCollectionId: colorsCollectionId,
    });
    const source = createVariable({
      id: 'source',
      key: 'source-key',
      name: 'neutral/200',
      variableCollectionId: colorsCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'target'},
      },
    });
    const context = createContext(createPayload([target, source]));

    expect(context.resolveValue(source.valuesByMode[lightModeId], source, lightModeId)).toBe(
      '{neutral.100}'
    );
  });

  it('uses registered output paths for cross-collection aliases', () => {
    const baseVariable = createVariable({
      id: 'base-size',
      key: 'base-size',
      name: 'size/md',
      resolvedType: 'FLOAT',
      scopes: ['WIDTH_HEIGHT'],
      valuesByMode: {[lightModeId]: 16},
    });
    const themeVariable = createVariable({
      id: 'theme-size',
      key: 'theme-size',
      name: 'gap/md',
      variableCollectionId: themeCollectionId,
      resolvedType: 'FLOAT',
      scopes: ['GAP'],
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'base-size'},
      },
    });
    const context = createContext(
      createPayload([baseVariable, themeVariable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    context.registerOutputPath('base-size', 'size.md');

    expect(
      context.resolveValue(themeVariable.valuesByMode[lightModeId], themeVariable, lightModeId)
    ).toBe('{size.md}');
  });

  it('extends context state across payloads for later alias resolution', () => {
    const baseVariable = createVariable({
      id: 'base-neutral',
      key: 'base-neutral',
      name: 'neutral/975',
      valuesByMode: {[lightModeId]: {r: 0.1, g: 0.1, b: 0.1, a: 1}},
    });
    const themeVariable = createVariable({
      id: 'theme-primary',
      key: 'theme-primary',
      name: 'primary/default',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'base-neutral'},
      },
    });

    const baseContext = createContext(createPayload([baseVariable]));
    const themeOnlyContext = createContext(
      createPayload([themeVariable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(
      themeOnlyContext.resolveValue(themeVariable.valuesByMode[lightModeId], themeVariable, lightModeId)
    ).toBeUndefined();

    baseContext.extend(
      createPayload([themeVariable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(
      baseContext.resolveValue(themeVariable.valuesByMode[lightModeId], themeVariable, lightModeId)
    ).toBe('{neutral.975}');
  });

  it('resolves brand aliases to inner palette values instead of self-references', () => {
    const palette = createVariable({
      id: 'amber-25',
      key: 'amber-25',
      name: 'amber/25',
    });
    const brandCaution = createVariable({
      id: 'brand-caution-25',
      key: 'brand-caution-25',
      name: 'brand/caution/25',
      variableCollectionId: brandCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'amber-25'},
      },
    });
    const brandAction = createVariable({
      id: 'brand-action-base',
      key: 'brand-action-base',
      name: 'brand/action/base',
      variableCollectionId: brandCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-caution-25'},
      },
    });
    const themeAccent = createVariable({
      id: 'theme-accent',
      key: 'theme-accent',
      name: 'accent/caution',
      variableCollectionId: themeCollectionId,
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'amber-25'},
      },
    });
    const context = createContext(
      createPayload([palette, brandCaution, brandAction, themeAccent], {
        [brandCollectionId]: createCollection(brandCollectionId, 'Brand'),
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(
      context.resolveValue(brandCaution.valuesByMode[lightModeId], brandCaution, lightModeId)
    ).toBe('{amber.25}');
    expect(
      context.resolveValue(brandAction.valuesByMode[lightModeId], brandAction, lightModeId)
    ).toBe('{brand.caution.25}');
    expect(
      context.resolveValue(themeAccent.valuesByMode[lightModeId], themeAccent, lightModeId)
    ).toBe('{brand.caution.25}');
    expect(
      context.resolveValue(themeAccent.valuesByMode[lightModeId], themeAccent, lightModeId, {
        useInnerValue: true,
      })
    ).toBe('{amber.25}');
    expect(
      context.resolveValue(themeAccent.valuesByMode[lightModeId], themeAccent, lightModeId, {
        allowAliasLookup: true,
      })
    ).toBe('{brand.caution.25}');
  });

  it('reads mode values using fallback modes and supports zero values', () => {
    const variable = createVariable({
      valuesByMode: {
        [lightModeId]: 0,
        [darkModeId]: 1,
      },
    });
    const context = createContext(
      createPayload([variable], {
        [colorsCollectionId]: createCollection(colorsCollectionId, 'Colors', [
          {modeId: lightModeId, name: 'Light'},
          {modeId: darkModeId, name: 'Dark'},
        ]),
      })
    );

    expect(context.getModeValue(variable, lightModeId)).toBe(0);
    expect(context.getModeValue(variable, 'missing-mode')).toBe(0);
  });

  it('resolves style bound variables to theme type token paths', () => {
    const themeVariable = createVariable({
      id: 'type-font-size-body-md',
      name: 'type/font/size/body/md',
      variableCollectionId: themeCollectionId,
      resolvedType: 'FLOAT',
      valuesByMode: {
        [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'base-size'},
      },
    });
    const baseVariable = createVariable({
      id: 'base-size',
      name: 'size/225',
      resolvedType: 'FLOAT',
      valuesByMode: {[lightModeId]: 18},
    });
    const context = createContext(
      createPayload([baseVariable, themeVariable], {
        [themeCollectionId]: createCollection(themeCollectionId, 'Theme'),
      })
    );

    expect(context.resolveStyleBoundVariable('type-font-size-body-md')).toBe('{font-size.body.md}');
    expect(context.resolveBoundVariable('type-font-size-body-md')).toBe('{size.225}');
  });
});
