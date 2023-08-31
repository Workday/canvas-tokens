import {setConfig} from '../setConfig';
import mockOptions from './mockOptions';

describe('setConfig', () => {
  it('should return an object with given source', () => {
    const result = setConfig(mockOptions);
    expect(result.source).toStrictEqual(['tokens/**/*.json']);
  });

  it('should contain default parser', () => {
    const result = setConfig(mockOptions);
    expect(result.parsers).toHaveLength(1);
  });

  it('should creates css platform settings', () => {
    const result = setConfig(mockOptions);
    expect(result.platforms).toHaveProperty('css');
  });

  it('should add platform as a default transform group', () => {
    const result = setConfig(mockOptions);
    expect(result.platforms.css.transformGroup).toBe('css');
  });

  it('should be able to set transform group', () => {
    const result = setConfig(mockOptions);
    expect(result.platforms.es6.transformGroup).toBe('js');
  });

  it('should add a build path for all platforms', () => {
    const result = setConfig(mockOptions);
    expect(result.platforms.css.buildPath).toBe('../canvas-tokens-web/dist/');
    expect(result.platforms.es6.buildPath).toBe('../canvas-tokens-web/dist/');
  });

  it('should not generate file if there is no modifiers', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.less.files;
    expect(expectedFiles).toHaveLength(0);
  });

  it('should file based on modifiers', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.css.files || [];
    expect(expectedFiles).toHaveLength(3);
  });

  it('should generate file based on modifiers with platform specific info', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.css.files || [];
    const firstFile = expectedFiles[0];

    expect(firstFile.format).toBe('css/variables');
    expect(firstFile.destination).toBe('base/css/_variables.css');
  });

  it('should generate file based on modifiers and add formats if there is merge format', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.css.files || [];
    const secondFile = expectedFiles[1];

    expect(secondFile.format).toBe('merge/test');
    expect(secondFile.destination).toBe('brand/css/_variables.css');
    expect(secondFile.options?.formats).toStrictEqual(['css/variables']);
    expect(secondFile.options?.outputReferences).toBe(true);
  });

  it('should file based on modifiers for each extension', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.es6.files || [];
    expect(expectedFiles).toHaveLength(2);
  });

  it('should have filter if modifier has filterByLevel as true', () => {
    const result = setConfig(mockOptions);
    const expectedFiles = result.platforms.es6.files || [];
    const firstFile = expectedFiles[0];

    expect(firstFile).toHaveProperty('filter');
  });
});
