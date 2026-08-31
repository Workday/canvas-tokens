import {describe, expect, it} from 'vitest';
import {
  addTokenToFiles,
  buildToken,
  getBrandTokenPath,
  getFileWrapperKey,
  getTokenPath,
  nestDashedVariants,
} from '../tokens.js';

describe('tokens', () => {
  describe('buildToken', () => {
    it('builds a minimal token with only $value', () => {
      expect(buildToken({value: 8} as Parameters<typeof buildToken>)).toEqual({$value: 8});
    });

    it('includes optional token fields when provided', () => {
      expect(
        buildToken({
          value: '{brand.primary.600}',
          type: 'color',
          description: 'Primary accent',
          extensions: {'sana.canvas.tokens': {modes: {dark: {$value: '{brand.dark.primary.600}'}}}},
        })
      ).toEqual({
        $value: '{brand.primary.600}',
        $type: 'color',
        $description: 'Primary accent',
        $extensions: {'sana.canvas.tokens': {modes: {dark: {$value: '{brand.dark.primary.600}'}}}},
      });
    });

    it('omits empty extensions', () => {
      expect(buildToken({value: 1, extensions: {}} as Parameters<typeof buildToken>)).toEqual({
        $value: 1,
      });
    });
  });

  describe('getFileWrapperKey', () => {
    it('returns the file name for wrapped system and base files', () => {
      expect(getFileWrapperKey('system/gap.json')).toBe('gap');
      expect(getFileWrapperKey('base/size.json')).toBe('size');
      expect(getFileWrapperKey('system/depth.json')).toBe('depth');
    });

    it('returns the color file name for system color tokens', () => {
      expect(getFileWrapperKey('system/color/bg.json')).toBe('bg');
      expect(getFileWrapperKey('system/color/accent.json')).toBe('accent');
    });

    it('returns undefined for unwrapped files', () => {
      expect(getFileWrapperKey('system/type.json')).toBeUndefined();
      expect(getFileWrapperKey('base/palette.json')).toBeUndefined();
    });
  });

  describe('getTokenPath', () => {
    it('wraps system color and spacing tokens with the file name', () => {
      expect(getTokenPath('system/color/bg.json', ['alt'])).toEqual(['bg', 'alt']);
      expect(getTokenPath('system/gap.json', ['sm'])).toEqual(['gap', 'sm']);
    });
  });

  describe('getBrandTokenPath', () => {
    it('wraps brand file paths with brand and the file name', () => {
      expect(getBrandTokenPath('brand/action.json', ['base'])).toEqual(['brand', 'action', 'base']);
      expect(getBrandTokenPath('brand/dark/neutral.json', ['975'])).toEqual([
        'brand',
        'dark',
        'neutral',
        '975',
      ]);
      expect(getBrandTokenPath('brand/common.json', ['focus'])).toEqual([
        'brand',
        'common',
        'focus',
      ]);
    });
  });

  describe('addTokenToFiles', () => {
    it('wraps brand tokens with brand and the file name', () => {
      const files = new Map<string, Record<string, unknown>>();

      addTokenToFiles(files, 'brand/action.json', ['base'], {$value: '#000'});
      addTokenToFiles(files, 'brand/dark/action.json', ['accent'], {$value: '#fff'});

      expect(files.get('brand/action.json')).toEqual({
        brand: {
          action: {
            base: {$value: '#000'},
          },
        },
      });
      expect(files.get('brand/dark/action.json')).toEqual({
        brand: {
          dark: {
            action: {
              accent: {$value: '#fff'},
            },
          },
        },
      });
    });

    it('creates nested token paths', () => {
      const files = new Map<string, Record<string, unknown>>();

      addTokenToFiles(files, 'system/color/accent.json', ['primary', 'default'], {$value: '#000'});
      addTokenToFiles(files, 'system/color/accent.json', ['positive', 'default'], {$value: '#0f0'});

      expect(files.get('system/color/accent.json')).toEqual({
        accent: {
          primary: {default: {$value: '#000'}},
          positive: {default: {$value: '#0f0'}},
        },
      });
    });

    it('replaces intermediate nodes that already contain a token leaf', () => {
      const files = new Map<string, Record<string, unknown>>([
        ['base/type.json', {heading: {$value: 'old'}}],
      ]);

      addTokenToFiles(files, 'base/type.json', ['heading', 'lg'], {$value: 'new'});

      expect(files.get('base/type.json')).toEqual({
        heading: {lg: {$value: 'new'}},
      });
    });
  });

  describe('nestDashedVariants', () => {
    it('nests dashed names under the undashed token as $root and state', () => {
      expect(
        nestDashedVariants({
          input: {$value: '{brand.neutral.A500}'},
          'input-hover': {$value: '{brand.neutral.A700}'},
          strong: {$value: '{brand.neutral.A200}'},
        })
      ).toEqual({
        input: {
          $root: {$value: '{brand.neutral.A500}'},
          hover: {$value: '{brand.neutral.A700}'},
        },
        strong: {$value: '{brand.neutral.A200}'},
      });
    });

    it('promotes a default variant to $root when the group has other variants', () => {
      expect(
        nestDashedVariants({
          muted: {
            default: {$value: '{brand.neutral.600}'},
            soft: {$value: '{brand.neutral.400}'},
          },
          default: {$value: '{brand.neutral.A800}'},
          strong: {$value: '{brand.neutral.A900}'},
        })
      ).toEqual({
        $root: {$value: '{brand.neutral.A800}'},
        muted: {
          $root: {$value: '{brand.neutral.600}'},
          soft: {$value: '{brand.neutral.400}'},
        },
        strong: {$value: '{brand.neutral.A900}'},
      });
    });

    it('leaves a lone default token unchanged', () => {
      expect(
        nestDashedVariants({
          default: {$value: '{white}'},
        })
      ).toEqual({
        default: {$value: '{white}'},
      });
    });

    it('nests dashed siblings that share a prefix', () => {
      expect(
        nestDashedVariants({
          'caution-inner': {$value: '{brand.caution.400}'},
          'caution-outer': {$value: '{brand.caution.500}'},
        })
      ).toEqual({
        caution: {
          inner: {$value: '{brand.caution.400}'},
          outer: {$value: '{brand.caution.500}'},
        },
      });
    });

    it('leaves lone dashed group names unchanged', () => {
      const azureCoral = {1: {$value: '{azure.900}'}};

      expect(nestDashedVariants({'azure-coral': azureCoral})).toEqual({
        'azure-coral': azureCoral,
      });
    });
  });
});
