import {describe, expect, it} from 'vitest';
import {
  figmaTypeToDtcg,
  formatEasingValue,
  formatNumericValue,
  rgbaToOklchColor,
  roundNumber,
  roundOpacity,
  valueWithUnit,
} from '../format.js';

describe('format', () => {
  describe('roundNumber', () => {
    it('rounds finite numbers and normalizes zero', () => {
      expect(roundNumber(1.23456)).toBe(1.2346);
      expect(roundNumber(-0)).toBe(0);
      expect(roundNumber(Number.NaN)).toBeNaN();
    });
  });

  describe('roundOpacity and valueWithUnit', () => {
    it('formats opacity and dimension values', () => {
      expect(roundOpacity(0.456)).toBe(0.46);
      expect(valueWithUnit(16, 'px')).toEqual({value: 16, unit: 'px'});
    });
  });

  describe('rgbaToOklchColor', () => {
    it('converts rgba values to oklch tokens', () => {
      expect(rgbaToOklchColor({r: 1, g: 1, b: 1, a: 1})).toMatchObject({
        colorSpace: 'oklch',
        hex: '#ffffff',
        components: [1, 0, 0],
      });
    });

    it('normalizes achromatic colors to zero chroma and hue', () => {
      expect(rgbaToOklchColor({r: 1, g: 1, b: 1, a: 0.02})).toEqual({
        colorSpace: 'oklch',
        components: [1, 0, 0],
        hex: '#ffffff05',
        alpha: 0.02,
      });
      expect(rgbaToOklchColor({r: 0, g: 0, b: 0, a: 0.5})).toMatchObject({
        colorSpace: 'oklch',
        components: [0, 0, 0],
        hex: '#00000080',
        alpha: 0.5,
      });
    });
  });

  describe('formatNumericValue', () => {
    it('formats timing, opacity, dimension, and plain numbers', () => {
      expect(formatNumericValue(0.25, {resolvedType: 'TIMING', name: 'motion/fast'})).toEqual({
        value: 250,
        unit: 'ms',
      });
      expect(
        formatNumericValue(50, {resolvedType: 'FLOAT', name: 'opacity/medium', scopes: ['OPACITY']})
      ).toBe(0.5);
      expect(
        formatNumericValue(16, {
          resolvedType: 'FLOAT',
          name: 'size/md',
          scopes: ['WIDTH_HEIGHT'],
        })
      ).toEqual({value: 16, unit: 'px'});
      expect(formatNumericValue(0, {resolvedType: 'FLOAT', name: 'size/0', scopes: []})).toBe(0);
      expect(formatNumericValue(2, {resolvedType: 'FLOAT', name: 'depth/2', scopes: []})).toBe(2);
    });
  });

  describe('formatEasingValue', () => {
    it('returns strings unchanged and formats bezier values', () => {
      expect(formatEasingValue('ease-in-out')).toBe('ease-in-out');
      expect(
        formatEasingValue({
          bezierValues: {p1x: 0.2, p1y: 0, p2x: 0.4, p2y: 1},
        })
      ).toBe('cubic-bezier(0.2, 0, 0.4, 1)');
    });
  });

  describe('figmaTypeToDtcg', () => {
    it('maps figma types to dtcg types', () => {
      expect(figmaTypeToDtcg('COLOR', '#fff')).toBe('color');
      expect(figmaTypeToDtcg('FLOAT', {value: 16, unit: 'px'})).toBe('dimension');
      expect(figmaTypeToDtcg('FLOAT', 2)).toBe('number');
      expect(figmaTypeToDtcg('STRING', 'Inter')).toBe('fontFamily');
      expect(figmaTypeToDtcg('TIMING', 0.2)).toBe('duration');
      expect(figmaTypeToDtcg('EASING', 'ease')).toBe('cubicBezier');
      expect(figmaTypeToDtcg('UNKNOWN', null)).toBeUndefined();
    });
  });
});
