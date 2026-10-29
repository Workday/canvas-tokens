import fs from 'fs';
import {TransformedToken} from 'style-dictionary';
import {camelCase} from 'case-anything';

import * as filters from './filters';
import {isInlineTokenFile} from './utils';

/** CSS Files */
export const cssFiles = [
  {
    destination: 'base/_variables.css',
    format: 'styles/root',
    filter: filters.isOldBaseTokens,
    options: {prefix: 'cnvs', useThemeValues: 'canvas'},
  },
  {
    destination: 'brand/_variables.css',
    format: 'styles/root',
    filter: filters.isOldBrandTokens,
    options: {prefix: 'cnvs', outputReferences: true},
  },
  {
    destination: 'system/_variables.css',
    format: 'styles/root',
    filter: filters.isOldSystemTokens,
    options: {
      prefix: 'cnvs',
      outputReferences: true,
      compositeTokens: ['typography'],
      useThemeValues: 'canvas',
    },
  },
  {
    destination: 'component/_variables.css',
    format: 'styles/root',
    filter: (token: TransformedToken) => token.filePath.includes('/component/'),
    options: {prefix: 'cnvs', outputReferences: true},
  },
  {
    destination: 'sana/_variables.css',
    format: 'styles/root',
    filter: filters.isSanaTokens,
    options: {prefix: 'cnvs', outputReferences: true, themeSelector: 'sana-canvas'},
  },
  {
    destination: 'sana/_variables-dark.css',
    format: 'styles/root',
    filter: filters.isSanaDarkTokens,
    options: {
      prefix: 'cnvs',
      outputReferences: true,
      themeSelector: 'sana-canvas',
      modeSelector: 'dark',
    },
  },
  {
    destination: 'index.css',
    format: 'styles/index',
  },
];

/** JS Files */

const tokenFiles = fs
  .readdirSync('src/tokens/dtcg', {recursive: true})
  .filter(file => typeof file === 'string' && file.endsWith('.json')) as string[];

export const getJsFiles = (platform: 'es6' | 'commonjs') => [
  ...getTokenFiles(platform),
  ...getIndexFiles(platform),
];

/**
 * Generate tokens JS files with platform-specific syntax
 * and the corresponding TypeScript declaration files
 * @param platform The target platform for the generated files ('es6' or 'commonjs')
 * */
function getTokenFiles(platform: 'es6' | 'commonjs') {
  const FORMAT = 'javascript/css-var';
  const PREFIX = 'cnvs';

  return tokenFiles.flatMap(file => {
    const filter = (token: TransformedToken) =>
      token.filePath.endsWith(file) && token.path[0] !== 'dark';
    const style = isInlineTokenFile(file) ? 'inline' : 'module';

    return [
      {
        destination: file.replace('.json', '.js'),
        filter,
        format: FORMAT,
        options: {prefix: PREFIX, syntaxStyle: platform, style, includeJsDocs: true},
      },
      {
        destination: file.replace('.json', '.d.ts'),
        filter,
        format: FORMAT,
        options: {prefix: PREFIX, syntaxStyle: 'ts', style, includeJsDocs: true},
      },
    ];
  });
}

/** Color files exported together as `system.color`, with the names each of them defines */
function getColorGroup(files: string[]) {
  return files
    .filter(file => file.startsWith('system/color/'))
    .map(file => {
      const tokens = JSON.parse(fs.readFileSync(`src/tokens/dtcg/${file}`, 'utf8'));
      return {file, names: Object.keys(tokens.color ?? {}).map(name => camelCase(name))};
    });
}

/**
 * Generate index files for the specified platform ('es6' or 'commonjs')
 * including index files for tokens on each token level and the root index files
 * and the corresponding TypeScript declaration files
 * @param platform The target platform for the generated index files ('es6' or 'commonjs')
 */
function getIndexFiles(platform: 'es6' | 'commonjs') {
  const LEVELS = ['base', 'brand', 'system', 'component'];
  const FORMAT = 'javascript/imports';

  const files = LEVELS.flatMap(level => {
    const files = tokenFiles.filter(f => f.startsWith(`${level}/`));
    const groups = level === 'system' ? {color: getColorGroup(files)} : undefined;
    return [
      {
        destination: `${level}/index.js`,
        format: FORMAT,
        options: {syntaxStyle: platform, files, groups},
      },
      {
        destination: `${level}/index.d.ts`,
        format: FORMAT,
        options: {syntaxStyle: 'ts', files, groups},
      },
    ];
  });

  const rootFile = {
    destination: 'index.js',
    format: FORMAT,
    options: {syntaxStyle: platform, levels: LEVELS},
  };

  const rootTSFile = {
    destination: 'index.d.ts',
    format: FORMAT,
    options: {syntaxStyle: 'ts', levels: LEVELS},
  };

  return [...files, rootFile, rootTSFile];
}
