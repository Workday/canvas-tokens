import {describe, expect, it} from 'vitest';
import {addTokenToFiles, buildToken, nestDashedVariants} from '../tokens.js';

describe('tokens', () => {
  describe('buildToken', () => {
    it('builds a minimal token with only $value', () => {
      expect(buildToken({value: 8})).toEqual({$value: 8});
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
      expect(buildToken({value: 1, extensions: {}})).toEqual({$value: 1});
    });
  });

  describe('addTokenToFiles', () => {
    it('creates nested token paths', () => {
      const files = new Map<string, Record<string, unknown>>();

      addTokenToFiles(files, 'system/color/accent.json', ['primary', 'default'], {$value: '#000'});
      addTokenToFiles(files, 'system/color/accent.json', ['positive', 'default'], {$value: '#0f0'});

      expect(files.get('system/color/accent.json')).toEqual({
        primary: {default: {$value: '#000'}},
        positive: {default: {$value: '#0f0'}},
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
    it('nests dashed names under the undashed token as default and state', () => {
      expect(
        nestDashedVariants({
          input: {$value: '{brand.neutral.A500}'},
          'input-hover': {$value: '{brand.neutral.A700}'},
          strong: {$value: '{brand.neutral.A200}'},
        })
      ).toEqual({
        input: {
          default: {$value: '{brand.neutral.A500}'},
          hover: {$value: '{brand.neutral.A700}'},
        },
        strong: {$value: '{brand.neutral.A200}'},
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
