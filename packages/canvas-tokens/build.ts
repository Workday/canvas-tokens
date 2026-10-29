import StyleDictionary from 'style-dictionary';
import {fileHeader} from 'style-dictionary/utils';

import {generateRoot} from './src/formats/generateRoot';
import {generateJsImports} from './src/formats/generateJsImports';
import {generateJsTokens} from './src/formats/generateJsTokens';

import {transforms} from './transforms';
import {cssFiles, getJsFiles} from './files';

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
    es6: {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web/dist/es6',
      files: getJsFiles('es6'),
    },
    commonjs: {
      transformGroup: 'js',
      transforms: jsTransforms,
      buildPath: '../canvas-tokens-web/dist/commonjs',
      files: getJsFiles('commonjs'),
    },
  },
});

StyleDictionary.registerFormat({
  name: 'styles/root',
  format: generateRoot,
});

StyleDictionary.registerFormat({
  name: 'styles/index',
  format: async ({file}) => {
    const header = await fileHeader({file});
    const imports = [
      '@import "./base/_variables.css";',
      '@import "./brand/_variables.css";',
      '@import "./system/_variables.css";',
      '@import "./component/_variables.css";',
      '@import "./sana/_variables.css";',
      '@import "./sana/_variables-dark.css";',
    ];

    return header + imports.join('\n') + '\n';
  },
});

StyleDictionary.registerFormat({
  name: 'javascript/imports',
  format: generateJsImports,
});

StyleDictionary.registerFormat({
  name: 'javascript/css-var',
  format: generateJsTokens,
});

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
