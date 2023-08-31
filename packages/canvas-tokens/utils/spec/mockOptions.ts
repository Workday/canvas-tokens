export default {
  source: ['tokens/**/*.json'],
  platforms: ['css', 'es6', 'less'],
  levels: ['base', 'brand', 'sys'],
  platformOptions: {
    '*': {
      buildPath: '../canvas-tokens-web/dist/',
    },
    css: {
      fileName: '{level}/{platform}/_variables',
      prefix: 'cnvs-',
      format: '{platform}/variables',
      modifiers: [
        {
          level: ['base'],
          filterByLevel: true,
        },
        {
          level: ['brand', 'sys'],
          format: 'merge/test',
          combineWith: ['{platform}/variables'],
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    less: {
      fileName: '{level}/less/_variables',
      prefix: 'cnvs-',
      format: 'less/variables',
    },
    es6: {
      transformGroup: 'js',
      transforms: ['value/variables', 'name/camel'],
      fileName: '{level}/{platform}/tokens',
      extensions: ['js', 'd.ts'],
      modifiers: [
        {
          level: ['base'],
          format: 'javascript/{platform}',
          filterByLevel: true,
        },
      ],
    },
  },
};
