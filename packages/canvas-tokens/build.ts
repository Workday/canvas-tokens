import StyleDictionary from 'style-dictionary';
import * as filters from './utils/filters';
import {formats} from './utils/formatters';
import {transforms} from './utils/transformers';
import {setConfig} from './utils/setConfig';

const config = setConfig({
  source: ['tokens/**/*.json'],
  platforms: ['css', 'scss', 'less', 'es6', 'common-js'],
  levels: ['base', 'brand', 'sys'],
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
          level: ['brand', 'sys'],
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
          level: ['brand', 'sys'],
          extensions: ['js'],
          format: 'merge/objects',
          combineWith: ['{platform}/objects'],
        },
        {
          level: ['brand', 'sys'],
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

StyleDictionary.registerTransformGroup({
  name: 'web',
  transforms: [
    'name/cti/kebab',
    'value/flatten-border',
    'value/flatten-oklch',
    'value/hex-to-var',
    'value/shadow/flat-sys',
    'value/breakpoints/px',
    'value/wrapped-font-family',
    'value/math',
    'value/letter-spacing/px2rem',
    'value/font-weight/numbers',
    'value/line-height/px2rem',
  ],
});

StyleDictionary.extend(config).buildAllPlatforms();
