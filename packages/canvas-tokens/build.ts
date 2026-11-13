import fs from 'fs';
import StyleDictionary from 'style-dictionary';
import {fileHeader} from 'style-dictionary/utils';

import {generateRoot} from './src/formats/generateRoot';
import {generateJsLevelIndex, generateJsTokenIndex} from './src/formats/generateJsImports';
import {generateJsTokens} from './src/formats/generateJsTokens';
import {generateJsTokenFn} from './src/formats/generateJsTokenFn';

import {transforms} from './transforms';
import {cssFiles, getDocsJsFiles, getJsFiles, getLabsJsFiles, labsCssFiles} from './files';

const jsTransforms = [
  'js/name',
  'duration',
  'px2rem',
  'toOKLCH',
  'gradient',
  'cubicBezier/css',
  'shadow/css/shorthand',
];

const config = new StyleDictionary({
  source: ['src/tokens/dtcg/**/*.json'],
  log: {verbosity: 'silent'},
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['duration', 'px2rem', 'toOKLCH', 'gradient', 'css/name'],
      buildPath: '../canvas-tokens-web/css',
      files: cssFiles,
    },
    'labs-css': {
      transformGroup: 'css',
      transforms: ['duration', 'px2rem', 'toOKLCH', 'gradient', 'css/name/base'],
      buildPath: '../canvas-tokens-web-labs/css',
      files: labsCssFiles,
    },
    es6: {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web/dist/es6',
      files: getJsFiles('es6'),
    },
    commonjs: {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web/dist/common-js',
      files: getJsFiles('commonjs'),
    },
    'labs-es6': {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web-labs/dist/es6',
      files: getLabsJsFiles('es6'),
    },
    'labs-commonjs': {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web-labs/dist/common-js',
      files: getLabsJsFiles('commonjs'),
    },
    docs: {
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-docs/data/tokens',
      files: getDocsJsFiles(),
    },
  },
});

StyleDictionary.registerFormat({
  name: 'styles/root',
  format: generateRoot,
});

StyleDictionary.registerFormat({
  name: 'styles/index',
  format: async ({file, options}) => {
    const {imports} = options;
    const header = await fileHeader({file});
    return header + imports.map((i: string) => `@import "${i}";\n`).join('');
  },
});

StyleDictionary.registerFormat({
  name: 'javascript/level-index',
  format: generateJsLevelIndex,
});

StyleDictionary.registerFormat({
  name: 'javascript/token-index',
  format: generateJsTokenIndex,
});

StyleDictionary.registerFormat({
  name: 'javascript/css-var',
  format: generateJsTokens,
});

StyleDictionary.registerFormat({
  name: 'javascript/token-fn',
  format: generateJsTokenFn,
});

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();

  // The `import` condition of the package exports points at these files, so Node must read them as ESM
  fs.writeFileSync('../canvas-tokens-web/dist/es6/package.json', '{"type": "module"}\n');

  // The labs package is `"type": "module"`, so its CommonJS files must say otherwise
  fs.writeFileSync(
    '../canvas-tokens-web-labs/dist/common-js/package.json',
    '{"type": "commonjs"}\n'
  );
};

build().catch(error => {
  console.error(error);
});
