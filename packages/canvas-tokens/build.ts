import StyleDictionary, {TransformedToken} from 'style-dictionary';

import {generateRoot} from './src/formats/generateRoot';
import {transforms} from './transforms';

const isOldBaseTokens = (token: TransformedToken) =>
  token.filePath.includes('/base/') && token.path[0] !== 'dark' && !checkExcluded(token);

const isOldBrandTokens = (token: TransformedToken) =>
  token.filePath.includes('/brand/') && !['dark', 'action'].includes(token.path[1]);

const isOldSystemTokens = (token: TransformedToken) =>
  token.filePath.includes('/system/') &&
  token.$type !== 'typography' &&
  !token.name.includes('color-chart') &&
  !checkExcluded(token);

const isSanaTokens = (token: TransformedToken) =>
  token.$type !== 'typography' &&
  token.path[0] !== 'dark' &&
  !['dark', 'action'].includes(token.path[1]) &&
  token.$extensions?.['sana.canvas.tokens']?.themes?.canvas;

const config = new StyleDictionary({
  source: ['src/tokens/dtcg/**/*.json'],
  log: {verbosity: 'silent'},
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['duration', 'px2rem', 'toOKLCH', 'gradient', 'css/name'],
      buildPath: '../canvas-tokens-web/css',
      files: [
        {
          destination: 'base/_variables.css',
          format: 'styles/root',
          filter: isOldBaseTokens,
          options: {prefix: 'cnvs', useThemeValues: 'canvas'},
        },
        {
          destination: 'brand/_variables.css',
          format: 'styles/root',
          filter: isOldBrandTokens,
          options: {prefix: 'cnvs', outputReferences: true},
        },
        {
          destination: 'system/_variables.css',
          format: 'styles/root',
          filter: isOldSystemTokens,
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
          filter: token => token.filePath.includes('/component/'),
          options: {prefix: 'cnvs', outputReferences: true},
        },
        {
          destination: 'sana/_variables.css',
          format: 'styles/root',
          filter: isSanaTokens,
          options: {
            prefix: 'cnvs',
            outputReferences: true,
            themeSelector: 'sana-canvas',
          },
        },
      ],
    },
  },
});

StyleDictionary.registerFormat({
  name: 'styles/root',
  format: generateRoot,
});

const checkExcluded = (token: TransformedToken) => {
  return token?.$extensions?.['sana.canvas.tokens']?.themes?.canvas?.$excluded === true;
};

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
