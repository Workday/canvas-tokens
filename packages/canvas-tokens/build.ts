import fs from 'fs';
import StyleDictionary from 'style-dictionary';
import {fileHeader} from 'style-dictionary/utils';

import {generateRoot} from './src/formats/generateRoot';
import {generateJsLevelIndex, generateJsTokenIndex} from './src/formats/generateJsImports';
import {generateJsTokens} from './src/formats/generateJsTokens';
import {generateJsTokenFn} from './src/formats/generateJsTokenFn';

import {transforms} from './transforms';
import {cssFiles, getJsFiles, getLabsJsFiles, labsCssFiles} from './files';

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

/**
 * Resolvers that ignore `exports` (TypeScript `moduleResolution: node`) look for
 * `<package>/<subpath>/package.json`, so each subpath of the exports map gets a stub pointing at its files
 */
const writeSubpathStubs = () => {
  const webPath = '../canvas-tokens-web';
  const {exports} = JSON.parse(fs.readFileSync(`${webPath}/package.json`, 'utf8'));

  Object.entries<any>(exports)
    .filter(([subpath, entry]) => subpath !== '.' && typeof entry === 'object')
    .forEach(([subpath, {import: esm, require: cjs}]) => {
      const dir = `${webPath}/${subpath.slice(2)}`;
      const toStubPath = (file: string) => `../${file.slice(2)}`;

      fs.mkdirSync(dir, {recursive: true});
      fs.writeFileSync(
        `${dir}/package.json`,
        JSON.stringify(
          {
            main: toStubPath(cjs.default),
            module: toStubPath(esm.default),
            types: toStubPath(esm.types),
          },
          null,
          2
        ) + '\n'
      );
    });
};

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
