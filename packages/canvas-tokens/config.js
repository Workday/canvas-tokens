
module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "scss",
      buildPath: "../canvas-tokens-web/dist/colors/",
      files: [
        {
          destination: "css/_variables.css",
          format: "css/variables"
        }
      ]
    },
    sass: {
      transformGroup: "scss",
      buildPath: "../canvas-tokens-web/dist/colors/",
      files: [
        {
          destination: "sass/_variables.scss",
          format: "scss/variables"
        }
      ]
    },
    less: {
      transformGroup: "less",
      buildPath: "../canvas-tokens-web/dist/colors/",
      files: [
        {
          destination: "less/_variables.less",
          format: "less/variables"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "../canvas-tokens-web/dist/colors/",
      files: [
        {
          destination: "js/colors.js",
          format: "javascript/es6"
        }
      ]
    },
    ts: {
      transformGroup: "js",
      buildPath: "../canvas-tokens-web/dist/colors/",
      files: [
        {
          destination: "ts/colors.ts",
          format: "custom/format/ts"
        }
      ]
    }
  }
}
