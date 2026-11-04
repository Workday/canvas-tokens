import StyleDictionary from 'style-dictionary';
import {fileHeader} from 'style-dictionary/utils';

import {generateRoot} from './src/formats/generateRoot';
import {transforms} from './transforms';
import * as filters from './filters';

const SANA_CANVAS_THEME_SELECTOR = '[data-theme="sana-canvas"';
const SANA_CANVAS_LABS_THEME_SELECTOR = '[data-theme~="wdt"][data-theme~="sana-canvas"]';

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
          filter: token => token.filePath.includes('/component/'),
          options: {prefix: 'cnvs', outputReferences: true},
        },
        {
          destination: 'sana/_variables.css',
          format: 'styles/root',
          filter: filters.isSanaTokens,
          options: {
            prefix: 'cnvs',
            outputReferences: true,
            themeSelector: SANA_CANVAS_THEME_SELECTOR,
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
      ],
    },
    'labs-css': {
      transformGroup: 'css',
      transforms: ['duration', 'px2rem', 'toOKLCH', 'gradient', 'css/name/base'],
      buildPath: '../canvas-tokens-web-labs/css',
      files: [
        {
          destination: 'sana-canvas/base.css',
          format: 'styles/root',
          filter: token => token.filePath.includes('/base/') && !token.$deprecated,
          options: {
            prefix: 'wdt',
            themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
            outputReferences: true,
          },
        },
        {
          destination: 'sana-canvas/brand.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/brand/') && token.path[1] !== 'action' && !token.$deprecated,
          options: {
            prefix: 'wdt',
            themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
            outputReferences: true,
          },
        },
        {
          destination: 'sana-canvas/component.css',
          format: 'styles/root',
          filter: token => token.filePath.includes('/component/') && !token.$deprecated,
          options: {
            prefix: 'wdt',
            themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
            outputReferences: true,
          },
        },
        {
          destination: 'sana-canvas/system.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/system/') &&
            !token.$deprecated &&
            token.$type !== 'typography',
          options: {
            prefix: 'wdt',
            themeSelector: SANA_CANVAS_LABS_THEME_SELECTOR,
            outputReferences: true,
          },
        },
        {
          destination: 'index.css',
          format: 'styles/index',
          options: {
            imports: [
              './sana-canvas/base.css',
              './sana-canvas/brand.css',
              './sana-canvas/system.css',
              './sana-canvas/component.css',
            ],
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

StyleDictionary.registerFormat({
  name: 'styles/index',
  format: async ({file, options}) => {
    const {imports} = options;
    const header = await fileHeader({file});
    return header + imports.map((i: string) => `@import "${i}";\n`).join('');
  },
});

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
