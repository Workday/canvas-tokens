const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');
const {formatToBasicTS, formatToInlineModule} = require('./sd-utils/formats');
const {transformHexToHsla, transformNameToCamelCase} = require('./sd-utils/transforms');

// Setup format to create ts file with type declarations
StyleDictionary.registerFormat({
  name: 'ts/basic',
  formatter: formatToBasicTS,
});

// Setup format to create common-js file
StyleDictionary.registerFormat({
  name: 'js/module',
  formatter: formatToInlineModule,
});

// Setup transform to change hex token value to hsla
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `value/hsla`,
  transformer: transformHexToHsla,
});

// Setup transform to change token name to camel case
StyleDictionary.registerTransform({
  type: `name`,
  transitive: true,
  name: `name/camel`,
  transformer: transformNameToCamelCase,
});

// Setup transform to change token value to css variable
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `value/variables`,
  transformer: ({path}) => {
    return `var(--canvas-${path.join('-')})`;
  },
});

// Setup header generation for custom files
StyleDictionary.registerFileHeader({
  name: 'file/header',
  fileHeader: () => {
    return [`Do not edit directly`, `Generated on ${new Date(Date.now())}`];
  },
});

StyleDictionary.buildAllPlatforms();
