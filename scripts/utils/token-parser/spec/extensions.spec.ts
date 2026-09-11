import {describe, expect, it, vi} from 'vitest';
import {buildBrandThemeExtensions, buildModeExtensions, mergeExtensions} from '../extensions.js';
import {colorsCollectionId, createCollection, createVariable, darkModeId, lightModeId} from './fixtures.js';

describe('extensions', () => {
  describe('buildModeExtensions', () => {
    it('returns dark mode extensions when values differ', () => {
      const variable = createVariable({
        valuesByMode: {
          [lightModeId]: {r: 1, g: 1, b: 1, a: 1},
          [darkModeId]: {r: 0, g: 0, b: 0, a: 1},
        },
      });
      const collection = createCollection(colorsCollectionId, 'Theme', [
        {modeId: lightModeId, name: 'Light'},
        {modeId: darkModeId, name: 'Dark'},
      ]);
      const context = {
        getModeValue: vi.fn((_, modeId) => variable.valuesByMode[modeId as keyof typeof variable.valuesByMode]),
        resolveValue: vi.fn((rawValue, variableArg, modeId) =>
          modeId === darkModeId ? '{brand.dark.neutral.975}' : '{brand.neutral.975}'
        ),
      };

      expect(buildModeExtensions(variable, collection, context)).toEqual({
        'sana.canvas.tokens': {
          modes: {
            dark: {
              $value: '{brand.dark.neutral.975}',
            },
          },
        },
      });
    });

    it('returns undefined when dark mode is missing or values match', () => {
      const variable = createVariable();
      const lightOnlyCollection = createCollection(colorsCollectionId, 'Theme');
      const context = {
        getModeValue: vi.fn(() => ({r: 1, g: 1, b: 1, a: 1})),
        resolveValue: vi.fn(() => '{brand.neutral.975}'),
      };

      expect(buildModeExtensions(variable, lightOnlyCollection, context)).toBeUndefined();

      const darkCollection = createCollection(colorsCollectionId, 'Theme', [
        {modeId: lightModeId, name: 'Light'},
        {modeId: darkModeId, name: 'Dark'},
      ]);

      expect(buildModeExtensions(variable, darkCollection, context)).toBeUndefined();
    });
  });

  describe('buildBrandThemeExtensions', () => {
    it('omits brand theme overrides that match the default value', () => {
      const variable = createVariable({id: 'theme-var', name: 'accent/primary'});
      const brandExtension = {
        modes: [
          {modeId: lightModeId, name: 'Light'},
          {modeId: darkModeId, name: 'Dark'},
        ],
        variableOverrides: {
          'theme-var': {
            [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-light'},
            [darkModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-dark'},
          },
        },
      };
      const collection = createCollection(colorsCollectionId, 'Theme', [
        {modeId: lightModeId, name: 'Light'},
        {modeId: darkModeId, name: 'Dark'},
      ]);
      const context = {
        getModeValue: vi.fn((_, modeId) =>
          modeId === darkModeId
            ? {type: 'VARIABLE_ALIAS', id: 'dark-default'}
            : {type: 'VARIABLE_ALIAS', id: 'light-default'}
        ),
        resolveValue: vi.fn((_, __, modeId) =>
          modeId === darkModeId ? '{brand.dark.primary.600}' : '{brand.primary.600}'
        ),
      };

      expect(
        buildBrandThemeExtensions(
          variable,
          brandExtension,
          context,
          collection,
          '{brand.primary.600}'
        )
      ).toBeUndefined();
    });

    it('builds brand theme overrides only when values differ', () => {
      const variable = createVariable({id: 'theme-var', name: 'accent/primary'});
      const brandExtension = {
        modes: [
          {modeId: lightModeId, name: 'Light'},
          {modeId: darkModeId, name: 'Dark'},
        ],
        variableOverrides: {
          'theme-var': {
            [lightModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-light'},
            [darkModeId]: {type: 'VARIABLE_ALIAS', id: 'brand-dark'},
          },
        },
      };
      const collection = createCollection(colorsCollectionId, 'Theme', [
        {modeId: lightModeId, name: 'Light'},
        {modeId: darkModeId, name: 'Dark'},
      ]);
      const context = {
        getModeValue: vi.fn((_, modeId) =>
          modeId === darkModeId
            ? {type: 'VARIABLE_ALIAS', id: 'dark-default'}
            : {type: 'VARIABLE_ALIAS', id: 'light-default'}
        ),
        resolveValue: vi.fn((rawValue, _, modeId) => {
          if (modeId === darkModeId && rawValue?.id === 'dark-default') {
            return '{brand.dark.primary.600}';
          }
          return modeId === darkModeId ? '{brand.dark.primary.700}' : '{brand.primary.600}';
        }),
      };

      expect(
        buildBrandThemeExtensions(
          variable,
          brandExtension,
          context,
          collection,
          '{brand.primary.500}'
        )
      ).toEqual({
        'sana.canvas.tokens': {
          themes: {
            brand: {
              light: {$value: '{brand.primary.600}'},
              dark: {$value: '{brand.dark.primary.700}'},
            },
          },
        },
      });
    });

    it('returns undefined when there are no overrides', () => {
      const variable = createVariable({id: 'theme-var'});
      const collection = createCollection(colorsCollectionId, 'Theme');

      expect(
        buildBrandThemeExtensions(
          variable,
          {modes: [], variableOverrides: {}},
          {resolveValue: vi.fn(), getModeValue: vi.fn()},
          collection,
          '{brand.primary.600}'
        )
      ).toBeUndefined();
    });
  });

  describe('mergeExtensions', () => {
    it('merges mode and theme extensions', () => {
      const modeExtensions = {
        'sana.canvas.tokens': {
          modes: {dark: {$value: '{brand.dark.neutral.975}'}},
        },
      };
      const themeExtensions = {
        'sana.canvas.tokens': {
          themes: {brand: {light: {$value: '{brand.primary.600}'}}},
        },
      };

      expect(mergeExtensions(modeExtensions, themeExtensions)).toEqual({
        'sana.canvas.tokens': {
          modes: {dark: {$value: '{brand.dark.neutral.975}'}},
          themes: {brand: {light: {$value: '{brand.primary.600}'}}},
        },
      });
    });

    it('omits empty modes and themes', () => {
      expect(
        mergeExtensions({
          'sana.canvas.tokens': {
            modes: {dark: {$value: '{brand.dark.neutral.975}'}},
          },
        })
      ).toEqual({
        'sana.canvas.tokens': {
          modes: {dark: {$value: '{brand.dark.neutral.975}'}},
        },
      });
    });

    it('returns undefined when nothing is provided', () => {
      expect(mergeExtensions(undefined, undefined)).toBeUndefined();
    });
  });
});
