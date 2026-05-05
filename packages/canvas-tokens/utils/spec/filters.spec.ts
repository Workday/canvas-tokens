import * as filters from '../filters';

describe('filters', () => {
  describe('isOldValues', () => {
    it('returns true when token has deprecatedValues and the second path segment is not "type"', () => {
      expect(
        filters.isOldValues({
          path: ['brand', 'primary', '700'],
          original: {value: 'x', deprecatedValues: {v2: 'base.palette.blue.600'}},
        } as any)
      ).toBe(true);
    });

    it('returns false when path[1] is "type" even if deprecatedValues are present', () => {
      expect(
        filters.isOldValues({
          path: ['sys', 'type', 'body'],
          original: {value: 'x', deprecatedValues: {v2: 'base.type.old'}},
        } as any)
      ).toBe(false);
    });

    it('returns false when deprecatedValues are absent', () => {
      expect(
        filters.isOldValues({
          path: ['brand', 'primary', '700'],
          original: {value: 'x'},
        } as any)
      ).toBe(false);
    });
  });
});
