import StyleDictionary from 'style-dictionary';
import {fileHeader} from 'style-dictionary/utils';

import {generateRoot} from './src/formats/generateRoot';
import {transforms} from './transforms';
import * as filters from './filters';

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
            themeSelector: 'sana-canvas',
          },
        },
        {
          destination: 'sana/_variables-dark.css',
          format: 'styles/root',
          filter: filters.isSanaDarkTokens,
          options: {
            prefix: 'cnvs',
            outputReferences: true,
            themeSelector: 'sana-canvas',
            modeSelector: 'dark',
          },
        },
        {
          destination: 'index.css',
          format: 'styles/index',
        },
      ],
    },
    cssV5: {
      transformGroup: 'css',
      transforms: ['duration', 'px2rem', 'toOKLCH', 'gradient', 'css/name/base'],
      buildPath: '../canvas-tokens-web/css/wdt',
      files: [
        {
          destination: 'base.css',
          format: 'styles/root',
          filter: token => token.filePath.includes('/base/') && !token.$deprecated,
          options: {prefix: 'wdt', themeSelector: 'wdt', outputReferences: true},
        },
        {
          destination: 'brand.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/brand/') && token.path[1] !== 'action' && !token.$deprecated,
          options: {prefix: 'wdt', themeSelector: 'wdt', outputReferences: true},
        },
        {
          destination: 'component.css',
          format: 'styles/root',
          filter: token => token.filePath.includes('/component/') && !token.$deprecated,
          options: {prefix: 'wdt', themeSelector: 'wdt', outputReferences: true},
        },
        {
          destination: 'system.css',
          format: 'styles/root',
          filter: token =>
            token.filePath.includes('/system/') &&
            !token.$deprecated &&
            token.$type !== 'typography',
          options: {prefix: 'wdt', themeSelector: 'wdt', outputReferences: true},
        },
        {
          destination: 'index.css',
          format: 'styles/index',
          options: {flatFolder: true},
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
    const {flatFolder} = options;
    const header = await fileHeader({file});
    const folderImports = [
      '@import "./base/_variables.css";',
      '@import "./brand/_variables.css";',
      '@import "./system/_variables.css";',
      '@import "./component/_variables.css";',
      '@import "./sana/_variables.css";',
      '@import "./sana/_variables-dark.css";',
    ];

    const flatImports = [
      '@import "./base.css";',
      '@import "./brand.css";',
      '@import "./system.css";',
      '@import "./component.css";',
    ];

    const imports = flatFolder ? flatImports : folderImports;

    return header + imports.join('\n') + '\n';
  },
});

transforms.forEach(transform => StyleDictionary.registerTransform(transform));

const build = async () => {
  await config.buildAllPlatforms();
};

build().catch(error => {
  console.error(error);
});
