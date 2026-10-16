import StyleDictionary, {TransformedToken} from 'style-dictionary';

import {generateRoot} from './src/formats/generateRoot';
import {transforms} from './transforms';

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
          filter: token =>
            token.filePath.includes('/base/') && token.path[0] !== 'dark' && !checkExcluded(token),
          options: {prefix: 'cnvs'},
        },
        {
          destination: 'brand/_variables.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/brand/') && !['dark', 'action'].includes(token.path[1]),
          options: {prefix: 'cnvs', outputReferences: true},
        },
        {
          destination: 'system/_variables.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/system/') &&
            token.$type !== 'typography' &&
            !token.name.includes('color-chart') &&
            !checkExcluded(token),
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
          filter: token =>
            token.$type !== 'typography' &&
            token.path[0] !== 'dark' &&
            !['dark', 'action'].includes(token.path[1]) &&
            token.$extensions?.['sana.canvas.tokens']?.themes?.canvas,
          options: {prefix: 'cnvs', outputReferences: true, theme: 'sana-canvas'},
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
  return token?.$extensions?.['sana.canvas.tokens']?.themes?.canvas?.excluded === true;
};

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
