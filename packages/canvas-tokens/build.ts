import StyleDictionary from 'style-dictionary';
import {formatToBasicTS, formatToInlineModule} from './sd-utils/formats';
import {transformHexToHsla, transformNameToCamelCase} from './sd-utils/transforms';
import config from './config';

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

StyleDictionary.extend(config).buildAllPlatforms();
