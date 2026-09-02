import {beforeEach, describe, expect, it, vi} from 'vitest';

const fsMocks = vi.hoisted(() => ({
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
  mkdirSync: vi.fn(),
  rmSync: vi.fn(),
}));

vi.mock('fs', () => ({
  default: fsMocks,
}));

import {
  clearOutputDir,
  mergeFileMaps,
  readInputDir,
  readInputFile,
  sortInputFiles,
  writeOutputFiles,
} from '../file.js';

describe('file', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('readInputDir', () => {
    it('returns json files from the input directory', () => {
      fsMocks.existsSync.mockReturnValue(true);
      fsMocks.readdirSync.mockReturnValue(['base.json', 'tokens.json', 'readme.md']);

      expect(readInputDir('figma-raw-tokens')).toEqual(['base.json', 'tokens.json']);
      expect(fsMocks.existsSync.mock.calls[0][0]).toMatch(/figma-raw-tokens$/);
    });

    it('throws when the directory is missing', () => {
      fsMocks.existsSync.mockReturnValue(false);

      expect(() => readInputDir('missing')).toThrow('Missing missing directory.');
    });

    it('throws when no json files are found', () => {
      fsMocks.existsSync.mockReturnValue(true);
      fsMocks.readdirSync.mockReturnValue(['readme.md']);

      expect(() => readInputDir('figma-raw-tokens')).toThrow('No JSON files found in figma-raw-tokens.');
    });
  });

  describe('sortInputFiles', () => {
    it('places base.json first and sorts the rest alphabetically', () => {
      expect(sortInputFiles(['tokens.json', 'base.json', 'alpha.json'])).toEqual([
        'base.json',
        'alpha.json',
        'tokens.json',
      ]);
    });
  });

  describe('readInputFile', () => {
    it('parses json and sets library name from the file name', () => {
      fsMocks.readFileSync.mockReturnValue(
        JSON.stringify({library: {name: 'placeholder'}, meta: {variables: {}}})
      );

      const payload = readInputFile('base.json', 'figma-raw-tokens');

      expect(payload.library.name).toBe('base');
      expect(fsMocks.readFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/figma-raw-tokens\/base\.json$/),
        'utf8'
      );
    });
  });

  describe('clearOutputDir', () => {
    it('removes the output directory when it exists', () => {
      fsMocks.existsSync.mockReturnValue(true);

      clearOutputDir('packages/canvas-tokens/dtcg/tokens');

      expect(fsMocks.rmSync).toHaveBeenCalledWith(
        expect.stringMatching(/packages\/canvas-tokens\/dtcg\/tokens$/),
        {
          recursive: true,
          force: true,
        }
      );
    });

    it('does nothing when the output directory is missing', () => {
      fsMocks.existsSync.mockReturnValue(false);

      clearOutputDir('packages/canvas-tokens/dtcg/tokens');

      expect(fsMocks.rmSync).not.toHaveBeenCalled();
    });
  });

  describe('mergeFileMaps', () => {
    it('merges token contents for the same file path', () => {
      const target = new Map([['base/palette.json', {red: {$value: '#f00'}}]]);
      const source = new Map([['base/palette.json', {blue: {$value: '#00f'}}], ['base/size.json', {sm: {$value: 8}}]]);

      mergeFileMaps(target, source);

      expect(target.get('base/palette.json')).toEqual({
        red: {$value: '#f00'},
        blue: {$value: '#00f'},
      });
      expect(target.get('base/size.json')).toEqual({sm: {$value: 8}});
    });
  });

  describe('writeOutputFiles', () => {
    it('writes merged json files to disk', () => {
      fsMocks.existsSync.mockReturnValue(false);
      const fileMap = new Map([['system/gap.json', {sm: {$value: 8}}]]);

      writeOutputFiles(fileMap, 'packages/canvas-tokens/dtcg/tokens');

      expect(fsMocks.mkdirSync).toHaveBeenCalledWith(
        expect.stringMatching(/packages\/canvas-tokens\/dtcg\/tokens\/system$/),
        {
          recursive: true,
        }
      );
      expect(fsMocks.writeFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/packages\/canvas-tokens\/dtcg\/tokens\/system\/gap\.json$/),
        `${JSON.stringify({sm: {$value: 8}}, null, 2)}\n`,
        'utf8'
      );
    });

    it('overwrites existing file contents on disk', () => {
      fsMocks.existsSync.mockReturnValue(true);

      writeOutputFiles(new Map([['system/gap.json', {sm: {$value: 8}}]]), 'out');

      expect(fsMocks.readFileSync).not.toHaveBeenCalled();
      expect(fsMocks.writeFileSync).toHaveBeenCalledWith(
        expect.stringMatching(/out\/system\/gap\.json$/),
        `${JSON.stringify({sm: {$value: 8}}, null, 2)}\n`,
        'utf8'
      );
    });
  });
});
