import StyleDictionary from 'style-dictionary';
import {formats} from './utils/formatters';
import {transforms} from './utils/transformers';
import * as filters from './utils/filters';
import {setConfig} from './utils/setConfig';

const config = setConfig({
  source: ['tokens/**/*.json'],
  platforms: ['css', 'scss', 'less', 'es6', 'common-js'],
  levels: ['base', 'brand', 'sys'],
  platformOptions: {
    '*': {
      buildPath: '../canvas-tokens-web/dist/',
    },
    'css, scss, less': {
      transformGroup: 'web',
      fileName: '{platform}/{level}/_variables',
      prefix: 'cnvs-',
      format: '{platform}/variables',
      modifiers: [
        {
          level: ['base'],
          filterByLevel: true,
        },
        {
          level: ['brand', 'sys'],
          format: 'merge/refs',
          combineWith: ['{platform}/composite', '{platform}/variables'],
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
      transformGroup: 'js',
      transforms: ['value/variables', 'name/camel'],
      fileName: '{platform}/{level}/index',
      extensions: ['js', 'd.ts'],
      modifiers: [
        {
          level: ['base'],
          extensions: ['js'],
          format: 'javascript/{platform}',
          filterByLevel: true,
        },
        {
          level: ['base'],
          extensions: ['d.ts'],
          format: 'merge/types',
          combineWith: ['javascript/{platform}'],
          filterByLevel: true,
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
          combineWith: ['merge/objects', '{platform}/objects'],
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
    'value/flatten-base-shadow',
    'value/hex-to-rgba',
    'value/wrapped-font-family',
    'value/math',
    'value/spacing-em',
    'value/flatten-rgba',
  ],
});

StyleDictionary.extend(config).buildAllPlatforms();
