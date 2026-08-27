import {describe, expect, it} from 'vitest';
import {
  findDarkMode,
  findLightMode,
  flattenFontPath,
  flattenThemeTypePath,
  getThemeCategory,
  getThemePathSegments,
  isDarkMode,
  isPxToken,
  isSizeZeroToken,
  toSlug,
  toTokenPath,
} from '../naming.js';

describe('naming', () => {
  describe('toSlug', () => {
    it('normalizes names to kebab-case slugs', () => {
      expect(toSlug('  Brand / Primary ')).toBe('brand-primary');
    });
  });

  describe('mode helpers', () => {
    it('detects dark and light modes', () => {
      expect(isDarkMode({name: 'Dark'})).toBe(true);
      expect(findLightMode({modes: [{modeId: '1', name: 'Light'}, {modeId: '2', name: 'Dark'}]})).toEqual({
        modeId: '1',
        name: 'Light',
      });
      expect(findDarkMode({modes: [{modeId: '1', name: 'Light'}, {modeId: '2', name: 'Dark'}]})).toEqual({
        modeId: '2',
        name: 'Dark',
      });
    });
  });

  describe('toTokenPath', () => {
    it('joins hyphenated font segments', () => {
      expect(toTokenPath('font/size/lg')).toEqual(['font-size', 'lg']);
      expect(toTokenPath('line/height/default')).toEqual(['line-height', 'default']);
    });

    it('preserves other path segments', () => {
      expect(toTokenPath('brand/primary/600')).toEqual(['brand', 'primary', '600']);
    });
  });

  describe('flattenFontPath', () => {
    it('flattens font paths and theme type paths', () => {
      expect(flattenFontPath('font/weight/bold')).toEqual(['font-weight', 'bold']);
      expect(flattenFontPath('line/height/default')).toEqual(['line-height', 'default']);
      expect(flattenThemeTypePath('type/font/size/lg')).toEqual(['font-size', 'lg']);
    });
  });

  describe('token name helpers', () => {
    it('detects px and zero-size tokens', () => {
      expect(isPxToken('padding/sm/px')).toBe(true);
      expect(isSizeZeroToken('size/0')).toBe(true);
    });

    it('extracts theme category and path segments', () => {
      const variable = {name: 'accent/primary/default'};

      expect(getThemeCategory(variable)).toBe('accent');
      expect(getThemePathSegments(variable)).toEqual(['primary', 'default']);
    });
  });
});
