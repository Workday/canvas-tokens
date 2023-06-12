module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: '../canvas-tokens-web/dist/colors/',
      prefix: 'canvas-',
      files: [
        {
          destination: 'css/_variables-hex.css',
          format: 'css/variables',
        },
      ],
    },
    'css-hsla': {
      transformGroup: 'css',
      buildPath: '../canvas-tokens-web/dist/colors/',
      transforms: ['name/cti/kebab', 'value/hsla'],
      prefix: 'canvas-',
      files: [
        {
          destination: 'css/_variables-hsla.css',
          format: 'css/variables',
        },
      ],
    },
    sass: {
      transformGroup: 'scss',
      buildPath: '../canvas-tokens-web/dist/colors/',
      prefix: 'canvas-',
      files: [
        {
          destination: 'sass/_variables-hex.scss',
          format: 'scss/variables',
        },
        {
          destination: 'sass/_variables-hex.sass',
          format: 'scss/variables',
        },
      ],
    },
    'sass-hsla': {
      transformGroup: 'scss',
      buildPath: '../canvas-tokens-web/dist/colors/',
      transforms: ['name/cti/kebab', 'value/hsla'],
      prefix: 'canvas-',
      files: [
        {
          destination: 'sass/_variables-hsla.scss',
          format: 'scss/variables',
        },
        {
          destination: 'sass/_variables-hsla.sass',
          format: 'scss/variables',
        },
      ],
    },
    less: {
      transformGroup: 'less',
      buildPath: '../canvas-tokens-web/dist/colors/',
      prefix: 'canvas-',
      files: [
        {
          destination: 'less/_variables-hex.less',
          format: 'less/variables',
        },
      ],
    },
    'less-hsla': {
      transformGroup: 'less',
      buildPath: '../canvas-tokens-web/dist/colors/',
      transforms: ['name/cti/kebab', 'value/hsla'],
      prefix: 'canvas-',
      files: [
        {
          destination: 'less/_variables-hsla.less',
          format: 'less/variables',
        },
      ],
    },
    'es6-hsla': {
      transformGroup: 'js',
      transforms: ['value/hsla', 'name/camel'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'es6/colors-hsla.js',
          format: 'javascript/es6',
        },
        {
          destination: 'es6/colors-hsla.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
    'es6-hex': {
      transformGroup: 'js',
      transforms: ['name/camel'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'es6/colors-hex.js',
          format: 'javascript/es6',
        },
        {
          destination: 'es6/colors-hex.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
    es6: {
      transformGroup: 'js',
      transforms: ['name/camel', 'value/variables'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'es6/colors.js',
          format: 'javascript/es6',
        },
        {
          destination: 'es6/colors.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
    commonjs: {
      transformGroup: 'js',
      transforms: ['name/camel', 'value/variables'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'common-js/colors.js',
          format: 'js/module',
          options: {
            fileHeader: 'file/header',
          },
        },
        {
          destination: 'common-js/colors.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
    'commonjs-hex': {
      transformGroup: 'js',
      transforms: ['name/camel'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'common-js/colors-hex.js',
          format: 'js/module',
          options: {
            fileHeader: 'file/header',
          },
        },
        {
          destination: 'common-js/colors-hex.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
    'commonjs-hsla': {
      transformGroup: 'js',
      transforms: ['value/hsla', 'name/camel'],
      buildPath: '../canvas-tokens-web/dist/colors/',
      files: [
        {
          destination: 'common-js/colors-hsla.js',
          format: 'js/module',
          options: {
            fileHeader: 'file/header',
          },
        },
        {
          destination: 'common-js/colors-hsla.d.ts',
          format: 'ts/basic',
          options: {
            fileHeader: 'file/header',
          },
        },
      ],
    },
  },
};
