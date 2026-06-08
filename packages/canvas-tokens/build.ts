import StyleDictionary from 'style-dictionary';
import * as filters from './utils/filters';
import {formats} from './utils/formatters';
import {transforms} from './utils/transformers';
import {setConfig} from './utils/setConfig';

const config = setConfig({
  source: ['tokens/**/*.json'],
  platforms: ['css', 'scss', 'less', 'es6', 'common-js', 'docs', 'legacy'],
  levels: ['base', 'brand', 'sys', 'component', 'main', 'deprecated'],
  platformOptions: {
    'css, scss, less': {
      buildPath: '../canvas-tokens-web/',
      transformGroup: 'web',
      fileName: '{platform}/{level}/_variables',
      prefix: 'cnvs-',
      format: '{platform}/variables',
      modifiers: [
        {
          level: ['base'],
          filterByLevel: true,
          filter: filters.filterCodeTokens,
        },
        {
          level: ['brand', 'sys', 'component'],
          format: 'merge/refs',
          combineWith: ['{platform}/composite', '{platform}/variables', '{platform}/shadow'],
          options: {
            outputReferences: true,
          },
          filter: filters.filterActionTokens,
        },
      ],
    },
    scss: {
      extensions: ['sass', 'scss'],
    },
    'es6, common-js': {
      buildPath: '../canvas-tokens-web/dist/',
      transformGroup: 'js',
      transforms: ['value/flatten-border', 'value/shadow/flat-sys', 'name/camel'],
      fileName: '{platform}/{level}/index',
      extensions: ['js', 'd.ts'],
      modifiers: [
        {
          level: ['base'],
          extensions: ['js'],
          format: 'js/{platform}',
          filterByLevel: true,
          filter: filters.filterCodeTokens,
        },
        {
          level: ['base'],
          extensions: ['d.ts'],
          format: 'ts/inline',
          filterByLevel: true,
          filter: filters.filterCodeTokens,
        },
        {
          level: ['brand', 'sys', 'component'],
          extensions: ['js'],
          format: 'merge/objects',
          combineWith: ['{platform}/objects'],
        },
        {
          level: ['brand', 'sys', 'component'],
          extensions: ['d.ts'],
          format: 'merge/types',
          combineWith: ['merge/objects', 'ts/jsdoc-object'],
        },
        {
          level: ['base'],
          destination: '{platform}/index',
          extensions: ['js'],
          format: '{platform}/packages-export',
        },
        {
          level: ['base'],
          destination: '{platform}/index',
          extensions: ['d.ts'],
          format: 'es6/packages-export',
        },
      ],
    },
    legacy: {
      buildPath: '../canvas-tokens-web/css/legacy/',
      transformGroup: 'legacy-web',
      fileName: '{level}',
      prefix: 'cnvs-',
      format: 'css/variables',
      extensions: ['css'],
      modifiers: [
        {
          level: ['base', 'brand', 'sys', 'component'],
          filter: filters.isOldValues,
          filterByLevel: true,
        },
      ],
    },
    docs: {
      buildPath: '../canvas-tokens-docs/lib/tokens/',
      extensions: ['json', 'csv'],
      fileName: '{level}/index',
      modifiers: [
        {
          level: ['deprecated'],
          extensions: ['json'],
          format: 'json/tokens-info-export',
          filter: filters.isDeprecated,
        },
        {
          level: ['deprecated'],
          extensions: ['csv'],
          format: 'csv/tokens-info-export',
          filter: filters.isDeprecated,
        },
        {
          level: ['main'],
          extensions: ['json'],
          format: 'json/tokens-info-export',
          filter: filters.isNotDeprecated,
        },
        {
          level: ['main'],
          extensions: ['csv'],
          format: 'csv/tokens-info-export',
          filter: filters.isNotDeprecated,
        },
      ],
    },
  },
});

const sanaConfig = setConfig({
  source: ['tokens/**/*.json', 'theme/sana.json'],
  platforms: ['css', 'scss', 'less', 'es6', 'common-js'],
  levels: ['base', 'brand', 'sys'],
  platformOptions: {
    'css, scss, less': {
      buildPath: '../canvas-tokens-web/',
      transformGroup: 'sana-web',
      fileName: '{platform}/sana/_variables',
      prefix: 'cnvs-',
      modifiers: [
        {
          level: ['base', 'brand', 'sys'],
          filter: token => filters.isSanaTheme(token) && token.type !== 'typography',
          format: '{platform}/theme',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    scss: {
      extensions: ['sass', 'scss'],
    },
    'es6, common-js': {
      buildPath: '../canvas-tokens-web/dist/',
      transformGroup: 'sana-js',
      fileName: '{platform}/{level}/sana',
      extensions: ['js', 'd.ts'],
      modifiers: [
        {
          level: ['base', 'brand', 'sys'],
          extensions: ['js'],
          format: 'js/{platform}/sana-object',
          filterByLevel: true,
          filter: filters.isSanaTheme,
        },
        {
          level: ['base', 'brand', 'sys'],
          extensions: ['d.ts'],
          format: 'ts/sana-object',
          filterByLevel: true,
          filter: filters.isSanaTheme,
        },
      ],
    },
  },
});

// Setup format to create ts file with type declarations
Object.entries(formats).forEach(([key, value]) => {
  StyleDictionary.registerFormat({
    name: key,
    formatter: value,
  });
});

Object.entries(filters).forEach(([key, value]) => {
  StyleDictionary.registerFilter({
    name: key,
    matcher: value,
  });
});

Object.entries(transforms).forEach(([key, value]) => {
  StyleDictionary.registerTransform({
    name: key,
    ...value,
  });
});

const webTransforms = [
  'name/cti/kebab',
  'value/duration/ms',
  'value/flatten-border',
  'value/flatten-oklch',
  'value/shadow/flat-sys',
  'value/breakpoints/px',
  'value/wrapped-font-family',
  'value/math',
  'value/opacity',
  'value/letter-spacing/px2rem',
  'value/font-weight/numbers',
  'value/line-height/px2rem',
];

const sanaJSTransforms = [
  'value/duration/ms',
  'value/flatten-border',
  'value/shadow/flat-sys',
  'value/breakpoints/px',
  'value/wrapped-font-family',
  'value/math',
  'value/opacity',
  'value/letter-spacing/px2rem',
  'value/font-weight/numbers',
  'value/line-height/px2rem',
  'oklch/flatten',
  'name/camel',
];

StyleDictionary.registerTransformGroup({
  name: 'sana-js',
  transforms: sanaJSTransforms,
});

StyleDictionary.registerTransformGroup({
  name: 'web',
  transforms: webTransforms,
});

StyleDictionary.registerTransformGroup({
  name: 'sana-web',
  transforms: [...webTransforms, 'oklch/flatten'],
});

StyleDictionary.registerTransformGroup({
  name: 'legacy-web',
  transforms: [...webTransforms, 'value/deprecated-values'],
});

StyleDictionary.registerTransformGroup({
  name: 'docs',
  transforms: [],
});

StyleDictionary.extend(config).buildAllPlatforms();
StyleDictionary.extend(sanaConfig).buildAllPlatforms();
