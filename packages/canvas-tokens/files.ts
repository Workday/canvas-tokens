import fs from 'fs';
import {TransformedToken, Filter, File} from 'style-dictionary/types';
import {camelCase} from 'case-anything';

import * as filters from './filters';
import {isInlineTokenFile} from './utils';
import type {LevelIndexOptions, TokenIndexOptions} from './src/formats/generateJsImports';
import type {TokenFnOptions} from './src/formats/generateJsTokenFn';

const COMPOSITE_TOKENS = ['typography'];
const SANA_CANVAS_LIGHT_THEME_SELECTOR =
  '[data-theme="sana-canvas"],\n[data-theme="sana-canvas"][data-color-mode="light"],\n[data-theme="sana-canvas"] [data-color-mode="light"]';

const SANA_CANVAS_THEME_SELECTOR = `[data-theme="sana-canvas"]`;

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
      compositeTokens: COMPOSITE_TOKENS,
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
    options: {
      prefix: 'cnvs',
      outputReferences: true,
      themeSelector: SANA_CANVAS_LIGHT_THEME_SELECTOR,
    },
  },
  {
    destination: 'sana/_variables-dark.css',
    format: 'styles/root',
    filter: filters.isSanaDarkTokens,
    options: {
      prefix: 'cnvs',
      outputReferences: true,
      themeSelector: SANA_CANVAS_THEME_SELECTOR,
      modeSelector: 'dark',
    },
  },
  {
    destination: 'index.css',
    format: 'styles/index',
    options: {
      imports: [
        './base/_variables.css',
        './brand/_variables.css',
        './system/_variables.css',
        './component/_variables.css',
        './sana/_variables.css',
        './sana/_variables-dark.css',
      ],
    },
  },
];

/** Labs CSS Files */

const LABS_THEME_SELECTOR = '[data-theme~="wdt"]';
const SANA_CANVAS_LABS_THEME_SELECTOR = `${LABS_THEME_SELECTOR}[data-theme~="sana-canvas"]`;

const isBaseToken = (token: TransformedToken) =>
  token.filePath.includes('/base/') && !token.$deprecated;
const isBrandToken = (token: TransformedToken) =>
  token.filePath.includes('/brand/') && !token.$deprecated;
const isComponentToken = (token: TransformedToken) =>
  token.filePath.includes('/component/') && !token.$deprecated;
const isSystemColorToken = (token: TransformedToken) =>
  token.filePath.includes('/system/color/') && !token.$deprecated;
const isSystemToken = (token: TransformedToken) =>
  token.filePath.includes('/system/') && !isSystemColorToken(token) && !token.$deprecated;

const isDarkToken = (token: TransformedToken) =>
  filters.isSanaDarkTokens(token) && !token.$deprecated;

/** Tokens that do not depend on the theme are scoped to `wdt`, the others to `wdt` and `sana-canvas` */
const labsFile = (
  destination: string,
  filter: Filter['filter'],
  options: Record<string, unknown> = {}
): File => ({
  destination: `${destination}.css`,
  format: 'styles/root',
  filter,
  options: {
    outputReferences: true,
    prefix: 'wdt',
    omitDefault: true,
    themeSelector: LABS_THEME_SELECTOR,
    ...options,
  },
});

/** Brand and system color tokens are of the sana-canvas theme and of the light mode, so they can be overridden */
const sanaCanvasLightFile = (name: string, filter: Filter['filter']) =>
  labsFile(`sana-canvas/${name}`, filter, {
    themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
    lightScope: true,
  });

export const labsCssFiles = [
  labsFile('wdt/base', isBaseToken),
  labsFile('wdt/component', isComponentToken),
  labsFile('wdt/system', isSystemToken),
  sanaCanvasLightFile('brand', isBrandToken),
  sanaCanvasLightFile('color', isSystemColorToken),
  labsFile('sana-canvas/dark', isDarkToken, {
    themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
    modeSelector: 'dark',
  }),
  {
    destination: 'index.css',
    format: 'styles/index',
    options: {
      imports: [
        './wdt/base.css',
        './wdt/component.css',
        './wdt/system.css',
        './sana-canvas/brand.css',
        './sana-canvas/color.css',
        './sana-canvas/dark.css',
      ],
    },
  },
];

/** JS Files */

/** Token files that must not be built into the JS output */
const EXCLUDED_JS_FILES = ['base/shadow.json'];
const isExcludedFromJs = (token: TransformedToken) =>
  EXCLUDED_JS_FILES.some(file => token.filePath.endsWith(file));

const tokenFiles = fs
  .readdirSync('src/tokens/dtcg', {recursive: true})
  .filter(
    file => typeof file === 'string' && file.endsWith('.json') && !EXCLUDED_JS_FILES.includes(file)
  ) as string[];

export const getJsFiles = (platform: 'es6' | 'commonjs') => [
  ...getTokenFiles(platform),
  ...getIndexFiles(platform),
  ...getTokenFnFiles(platform, {}, token => !isExcludedFromJs(token)),
];

/**
 * Generate the `token` function file with platform-specific syntax
 * and the corresponding TypeScript declaration file
 * @param platform The target platform for the generated files ('es6' or 'commonjs')
 * @param options Overrides of the format options, e.g. the prefix and names of the labs package
 * @param filter Limits the tokens the function accepts
 */
function getTokenFnFiles(
  platform: 'es6' | 'commonjs',
  options: Partial<TokenFnOptions> = {},
  filter?: Filter['filter']
): File[] {
  const FORMAT = 'javascript/token-fn';
  const common = {prefix: 'cnvs', compositeTokens: COMPOSITE_TOKENS, ...options};

  return [
    {destination: 'token.js', format: FORMAT, filter, options: {...common, syntaxStyle: platform}},
    {
      destination: 'token.d.ts',
      format: FORMAT,
      filter,
      options: {...common, syntaxStyle: 'ts', includeJsDocs: true},
    },
  ];
}

/**
 * Labs JS files: the `token` function of the simple `--wdt-` names, without deprecated tokens,
 * and the package index re-exporting it
 */
export const getLabsJsFiles = (platform: 'es6' | 'commonjs'): File[] => {
  const files = ['labs/token.json'];

  return [
    ...getTokenFnFiles(platform, {prefix: 'wdt', simpleNames: true}, token => !token.$deprecated),
    {
      destination: 'index.js',
      format: 'javascript/token-index',
      options: {syntaxStyle: platform, files} satisfies TokenIndexOptions,
    },
    {
      destination: 'index.d.ts',
      format: 'javascript/token-index',
      options: {syntaxStyle: 'ts', files} satisfies TokenIndexOptions,
    },
  ];
};

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
        options: {
          prefix: PREFIX,
          syntaxStyle: platform,
          style,
          includeJsDocs: true,
          compositeTokens: COMPOSITE_TOKENS,
        },
      },
      {
        destination: file.replace('.json', '.d.ts'),
        filter,
        format: FORMAT,
        options: {
          prefix: PREFIX,
          syntaxStyle: 'ts',
          style,
          includeJsDocs: true,
          compositeTokens: COMPOSITE_TOKENS,
        },
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

/** Ties each index format to the options it requires */
type IndexFile =
  | {destination: string; format: 'javascript/level-index'; options: LevelIndexOptions}
  | {destination: string; format: 'javascript/token-index'; options: TokenIndexOptions};

/**
 * Generate index files for the specified platform ('es6' or 'commonjs')
 * including index files for tokens on each token level and the root index files
 * and the corresponding TypeScript declaration files
 * @param platform The target platform for the generated index files ('es6' or 'commonjs')
 */
function getIndexFiles(platform: 'es6' | 'commonjs'): IndexFile[] {
  const LEVELS = ['base', 'brand', 'system', 'component'];

  const files = LEVELS.flatMap((level): IndexFile[] => {
    const files = tokenFiles.filter(f => f.startsWith(`${level}/`));
    const groups = level === 'system' ? {color: getColorGroup(files)} : undefined;
    return [
      {
        destination: `${level}/index.js`,
        format: 'javascript/token-index',
        options: {syntaxStyle: platform, files, groups},
      },
      {
        destination: `${level}/index.d.ts`,
        format: 'javascript/token-index',
        options: {syntaxStyle: 'ts', files, groups},
      },
    ];
  });

  const rootFile: IndexFile = {
    destination: 'index.js',
    format: 'javascript/level-index',
    options: {syntaxStyle: platform, levels: LEVELS, withTokenFn: true},
  };

  const rootTSFile: IndexFile = {
    destination: 'index.d.ts',
    format: 'javascript/level-index',
    options: {syntaxStyle: 'ts', levels: LEVELS, withTokenFn: true},
  };

  // `system/color` is spread over several files, so it gets its own entry point
  // exporting the color groups (`accent`, `surface`, ...) directly (the `@workday/canvas-tokens-web/color` import)
  const colorFiles = tokenFiles.filter(f => f.startsWith('system/color/'));
  const colorGroups = {color: getColorGroup(colorFiles)};
  const colorIndexFiles: IndexFile[] = [
    {
      destination: 'system/color.js',
      format: 'javascript/token-index',
      options: {syntaxStyle: platform, files: colorFiles, groups: colorGroups, flatten: true},
    },
    {
      destination: 'system/color.d.ts',
      format: 'javascript/token-index',
      options: {syntaxStyle: 'ts', files: colorFiles, groups: colorGroups, flatten: true},
    },
  ];

  return [...files, ...colorIndexFiles, rootFile, rootTSFile];
}

/**
 * Get the JavaScript files for the documentation platform.
 * Each file default-exports an array of the transformed tokens, and `index.js` imports them all
 * into one object nested by the file path
 */
export function getDocsJsFiles(): File[] {
  const FORMAT = 'javascript/token-array';

  return [
    ...tokenFiles.map(file => ({
      destination: file.replace('.json', '.js'),
      filter: (token: TransformedToken) => token.filePath.endsWith(file),
      format: FORMAT,
    })),
    {
      destination: 'index.js',
      format: 'javascript/docs-index',
      options: {imports: tokenFiles.map(file => file.replace('.json', '.js'))},
    },
  ];
}
