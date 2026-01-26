import{j as n,a as t,F as i}from"./jsx-runtime-86dfebf6.js";import{M as a,U as c}from"./index-57585e15.js";import"./index-bd8a2091.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-f1635929.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function s(r){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",a:"a",p:"p",ol:"ol",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h4:"h4",pre:"pre"},o(),r.components);return t(i,{children:[n(a,{title:"Maintaining/Style Dictionary/Formatters"}),`
`,t(c,{children:[n(e.h1,{id:"formatters",children:"Formatters"}),n(e.h2,{id:"table-of-contents",children:"Table of Contents"}),t(e.ul,{children:[`
`,t(e.li,{children:[n(e.a,{href:"#overview",children:"Overview"}),`
`,t(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#format",children:"Format"})}),`
`,n(e.li,{children:n(e.a,{href:"#merge",children:"Merge"})}),`
`]}),`
`]}),`
`,t(e.li,{children:[n(e.a,{href:"#merge-formatters",children:"Merge Formatters"}),`
`,t(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#mergeobjects",children:"merge/objects"})}),`
`,n(e.li,{children:n(e.a,{href:"#mergerefs",children:"merge/refs"})}),`
`,n(e.li,{children:n(e.a,{href:"#mergetypes",children:"merge/types"})}),`
`]}),`
`]}),`
`,t(e.li,{children:[n(e.a,{href:"#direct-transformation-formatters",children:"Direct Transformation Formatters"}),`
`,t(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#javascripttypescript-formatters",children:"JavaScript/TypeScript Formatters"})}),`
`,n(e.li,{children:n(e.a,{href:"#cssscssless-formatters",children:"CSS/SCSS/LESS Formatters"})}),`
`]}),`
`]}),`
`]}),n(e.h2,{id:"overview",children:"Overview"}),n(e.p,{children:`Formatters define how design tokens are transformed into distributable files for various platforms
and development environments. They take the intermediate Style Dictionary dictionary object and
produce the platform-specific string output for source files, such as CSS, SCSS, LESS, JavaScript,
and TypeScript.`}),n(e.p,{children:"Formatters are essential for:"}),t(e.ol,{children:[`
`,n(e.li,{children:"Translating token dictionaries into code files for their target environment (CSS, JS, etc.)."}),`
`,n(e.li,{children:`Structuring and organizing the generated output to match platform expectations and best
practices.`}),`
`,n(e.li,{children:"Ensuring correct syntax, export style, and type information for each file type."}),`
`,n(e.li,{children:"Supporting both fine-grained (per-token) and composite (object/grouped) outputs."}),`
`]}),t(e.p,{children:["There are two principal types of formatter functions: ",n(e.code,{children:"format"})," and ",n(e.code,{children:"merge"}),"."]}),n(e.h3,{id:"format",children:"Format"}),t(e.p,{children:["Directly convert token JSON data into the file content. Each ",n(e.code,{children:"format"}),` function is responsible for
creating one style of output for a group of tokens, such as generating individual exports or nesting
tokens as objects. Examples include transforming tokens into JS Docs, token object structures, or
inline CSS variable declarations.`]}),n(e.h3,{id:"merge",children:"Merge"}),t(e.p,{children:["Orchestrate how multiple formatters combine to produce a final, unified output file. A ",n(e.code,{children:"merge"}),`
formatter calls several formatters in sequence and joins their outputs, making it possible to
compose files that blend different token kinds (e.g., regular, composite, shadow) while preserving
the correct structure and syntax.`]}),t(e.p,{children:["The ",n(e.code,{children:"utils/formatters/index.ts"}),` module is the main export surface, mapping all available formatters
by name for use in build scripts and integrations.`]}),n(e.h2,{id:"merge-formatters",children:"Merge Formatters"}),n(e.p,{children:`Merge formatters are responsible for producing complex outputs—such as an ES or CommonJS module that
combines multiple categories of tokens—by invoking other formatters and merging their results. They
enable the build process to produce layered or composite files, tailored for different platforms,
with minimal redundancy.`}),t(e.table,{children:[n(e.thead,{children:t(e.tr,{children:[n(e.th,{children:"Formatter"}),n(e.th,{children:"Description"})]})}),t(e.tbody,{children:[t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"merge/objects"})}),n(e.td,{children:"Merges multiple token groups into JavaScript objects, mapping nested token structures into code."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"merge/refs"})}),n(e.td,{children:"Combines several types of formatter output (composite, default, shadow) into one file."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"merge/types"})}),n(e.td,{children:"Converts default format output into a TypeScript declaration file."})]})]})]}),n(e.p,{children:"Below is a detailed description of each merge formatter."}),n(e.h3,{id:"mergeobjects",children:"merge/objects"}),t(e.p,{children:["Located in ",n(e.code,{children:"mergeObjects.ts"}),`. Merges multiple token groups into JavaScript objects, mapping nested
token structures into code. Handles creation of composite token objects by:`]}),t(e.ul,{children:[`
`,n(e.li,{children:"Rewriting token values as CSS variable names"}),`
`,n(e.li,{children:"Preserving the original values for type generation in TypeScript"}),`
`,t(e.li,{children:["Applying the correct formatter (e.g., ",n(e.code,{children:"es6/objects"}),", ",n(e.code,{children:"common-js/objects"}),`) to generate appropriate
file structure`]}),`
`]}),n(e.h3,{id:"mergerefs",children:"merge/refs"}),t(e.p,{children:["Located in ",n(e.code,{children:"mergeStyleReferences.ts"}),". Combines several types of formatter output into one file:"]}),t(e.ul,{children:[`
`,n(e.li,{children:"The composite token formatter (for typography/composition tokens)"}),`
`,n(e.li,{children:"The default formatter (for standard tokens containing references)"}),`
`,n(e.li,{children:"The shadow formatter (for depth or shadow tokens)"}),`
`]}),n(e.p,{children:`Merges all three to create a comprehensive file, typically used by CSS/SCSS/LESS platforms to
provide a complete set of variables and references in a single generated stylesheet.`}),n(e.h3,{id:"mergetypes",children:"merge/types"}),t(e.p,{children:["Located in ",n(e.code,{children:"mergeTypes.ts"}),`. Converts default format output into a TypeScript declaration file.
Accepts a base formatter and applies additional format transformations before assembling the type
declarations with correct structure and documentation.`]}),n(e.h2,{id:"direct-transformation-formatters",children:"Direct Transformation Formatters"}),n(e.p,{children:`This section documents the core direct transformation formatters. Each formatter takes Style
Dictionary token input and returns content in the form best suited for its target runtime, language,
or platform.`}),n(e.h3,{id:"javascripttypescript-formatters",children:"JavaScript/TypeScript Formatters"}),t(e.table,{children:[n(e.thead,{children:t(e.tr,{children:[n(e.th,{children:"Formatter"}),n(e.th,{children:"Description"})]})}),t(e.tbody,{children:[t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"common-js/objects"})}),n(e.td,{children:"Creates a CommonJS module with nested token objects."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"common-js/packages-export"})}),n(e.td,{children:"Creates a CommonJS index barrel file re-exporting all token package modules."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"es6/objects"})}),n(e.td,{children:"Produces an ES6 module with tokens grouped into nested JavaScript objects."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"es6/packages-export"})}),n(e.td,{children:"Generates an ES6 index barrel file exporting all token package modules."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"js/common-js"})}),n(e.td,{children:"Creates a CommonJS module where each token is exported as a separate constant."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"js/es6"})}),n(e.td,{children:"Generates an ES6 module where each token is exported as a constant."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"ts/inline"})}),n(e.td,{children:"Outputs a TypeScript declaration file (.d.ts) with constant exports for each token."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"ts/jsdoc-object"})}),n(e.td,{children:"Outputs a TypeScript declaration file with tokens as nested objects with JSDoc annotations."})]})]})]}),n(e.p,{children:"Below is a detailed description of each JavaScript/TypeScript formatter."}),n(e.h4,{id:"common-jsobjects",children:"common-js/objects"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatCommonToObjects"}),`. Creates a CommonJS module with nested token objects that mirror
their path structures, based on the `,n(e.code,{children:"properties"}),` object. Used to generate "brand" and "system"
objects for CommonJS consumers.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  properties: {
    opacity: {
      disabled: '--cnvs-sys-opacity-disabled'
    },
    space: {
      x1: '--cnvs-sys-space-x1'
    }
  }
}

// output
\`'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

exports.opacity = {
  disabled: '--cnvs-sys-opacity-disabled',
};

exports.space = {
  x1: '--cnvs-sys-space-x1',
};\`;
`})}),n(e.h4,{id:"common-jspackages-export",children:"common-js/packages-export"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatCommonJSExports"}),`. Creates a CommonJS index barrel file that re-exports all token
package modules, for simplified imports and compatibility within CommonJS systems.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// output
\`'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var base = require('./base');
exports.base = base;
var brand = require('./brand');
exports.brand = brand;
var system = require('./system');
exports.system = system;\`;
`})}),n(e.h4,{id:"es6objects",children:"es6/objects"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatES6ToObjects"}),`. Produces an ES6 module in which tokens are grouped into nested
JavaScript objects, reflecting their token paths. It uses the `,n(e.code,{children:"properties"}),` field from the Style
Dictionary output. This format is preferred for assembling "brand" and "system" objects and enables
hierarchical access patterns.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  properties: {
    opacity: {
      disabled: '--cnvs-sys-opacity-disabled'
    },
    space: {
      x1: '--cnvs-sys-space-x1'
    }
  }
}

// output
\`export const opacity = {
  disabled: '--cnvs-sys-opacity-disabled',
};

export const space = {
  x1: '--cnvs-sys-space-x1',
};\`;
`})}),n(e.h4,{id:"es6packages-export",children:"es6/packages-export"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatES6Exports"}),`. Generates an ES6 index barrel file, exporting all token package
modules (such as base, brand, and system) for broader consumption.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// output
\`export * from './base';
export * from './brand';
export * from './system';\`;
`})}),n(e.h4,{id:"jscommon-js",children:"js/common-js"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatToInlineCommonJSModule"}),`. Creates a CommonJS module where each token is exported as
a separate constant, with the value being its CSS variable name. This format is used for generating
distributable CommonJS files.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  "allTokens": [
    {
      "name": "cinnamon100",
      "value": "#ffefee",
      "path": ["base", "palette", "cinnamon", "100"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#ffefee"}
    },
    {
      "name": "cinnamon200",
      "value": "#fcc9c5",
      "path": ["base", "palette", "cinnamon", "200"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#fcc9c5"}
    }
  ]
}

// output
\`"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.cinnamon100 = "--cnvs-base-palette-cinnamon-100";
exports.cinnamon200 = "--cnvs-base-palette-cinnamon-200";\`
`})}),n(e.h4,{id:"jses6",children:"js/es6"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatToInlineES6Module"}),`. Generates an ES6 module where each token is exported as a
constant with its CSS variable identifier as the value. Ideal for consuming in ES module
environments.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  "allTokens": [
    {
      "name": "cinnamon100",
      "value": "#ffefee",
      "path": ["base", "palette", "cinnamon", "100"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#ffefee"}
    },
    {
      "name": "cinnamon200",
      "value": "#fcc9c5",
      "path": ["base", "palette", "cinnamon", "200"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#fcc9c5"}
    }
  ]
}

// output
\`export const cinnamon100 = "--cnvs-base-palette-cinnamon-100";
export const cinnamon200 = "--cnvs-base-palette-cinnamon-200";\`
`})}),n(e.h4,{id:"tsinline",children:"ts/inline"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatInlineTypes"}),`. Outputs a TypeScript declaration file (.d.ts) with constant exports
for each token. If a token is deprecated, an appropriate annotation is included. Mainly used for
type-safe consumption in TS projects.`]}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`// input
{
  "allTokens": [
    {
      "name": "cinnamon100",
      "value": "#ffefee",
      "path": ["base", "palette", "cinnamon", "100"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#ffefee"}
    },
    {
      "name": "cinnamon200",
      "value": "#fcc9c5",
      "path": ["base", "palette", "cinnamon", "200"],
      "filePath": "",
      "isSource": true,
      "original": {"value": "#fcc9c5"}
    }
  ]
}

// output
\`export declare const cinnamon100: "--cnvs-base-palette-cinnamon-100";
export declare const cinnamon200: "--cnvs-base-palette-cinnamon-200";\`
`})}),n(e.h4,{id:"tsjsdoc-object",children:"ts/jsdoc-object"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatJSToTypes"}),`. Outputs a TypeScript declaration file where tokens are declared as
nested objects, with each token property annotated by JSDoc. These comments include value details,
descriptions, and references—improving documentation and type safety.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  options: {
    originalValues: {
      opacity: {
        disabled: {
          comment: 'Disabled opacity',
          value: '0.4',
          raw: '{base.opacity.400}',
        },
      },
    },
  },
  dictionary: {
    properties: {
      opacity: {
        disabled: '--cnvs-base-opacity-disabled',
      },
    },
  },
}

// output
\`export declare const opacity: {/**
   * 0.4
   *
   * token: base.opacity.400
   *
   * Disabled opacity
   * "disabled": "--cnvs-base-opacity-disabled",
};\`;
`})}),n(e.h3,{id:"cssscssless-formatters",children:"CSS/SCSS/LESS Formatters"}),n(e.p,{children:`These formatters generate stylesheet code for various preprocessors, enabling consumption of tokens
in design systems and UI frameworks.`}),t(e.table,{children:[n(e.thead,{children:t(e.tr,{children:[n(e.th,{children:"Formatter"}),n(e.th,{children:"Description"})]})}),t(e.tbody,{children:[t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"css/composite"})}),n(e.td,{children:"Outputs CSS classes for composite tokens using CSS variables."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"css/shadow"})}),n(e.td,{children:"Defines CSS custom properties for shadow or depth tokens."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"less/composite"})}),n(e.td,{children:"Outputs Less classes for composite tokens using Less variables."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"less/shadow"})}),n(e.td,{children:"Generates Less variables for shadow tokens."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"scss/composite"})}),n(e.td,{children:"Emits SCSS classes for composite tokens using Sass variables."})]}),t(e.tr,{children:[n(e.td,{children:n(e.code,{children:"scss/shadow"})}),n(e.td,{children:"Outputs Sass variables for shadow tokens."})]})]})]}),n(e.p,{children:"Below is a detailed description of each CSS/SCSS/LESS formatter."}),n(e.h4,{id:"csscomposite",children:"css/composite"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatCSSComposite"}),`. Outputs CSS classes for composite tokens, like typography or border
sets, using CSS variables for their values.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: {border: '0.0625rem solid rgba(162,171,180,1)'},
      type: 'composition',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {value: {border: '{sys.line.disabled}'}, type: 'composition'},
      name: 'cnvs-sys-border-input-disabled',
      attributes: {},
      path: ['sys', 'border', 'input', 'disabled'],
    },
  ],
}

// output
\`.cnvs-sys-border-input-disabled {
  border: var(--cnvs-sys-line-disabled);
}\`
`})}),n(e.h4,{id:"cssshadow",children:"css/shadow"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatCSSShadow"}),`. Defines CSS custom properties for shadow or depth tokens, enabling
consistent reuse and theming for elevation styles.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: '0 4px 16px rgba(0, 0, 0, 0.1)',
      type: 'shadow',
      filePath: 'tokens/all.json',
      isSource: true,
      name: 'cnvs-sys-depth-1',
      attributes: {},
      path: ['sys', 'depth', '1'],
    },
  ],
}

// output
\`--cnvs-sys-depth-1: 0 4px 16px rgba(0, 0, 0, 0.1); // Small shadow\`
`})}),n(e.h4,{id:"lesscomposite",children:"less/composite"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatLessComposite"}),". Outputs Less classes for composite tokens, using ",n(e.code,{children:"@cnvs-*"}),` Less
variables within the generated class blocks.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: {border: '0.0625rem solid rgba(162,171,180,1)'},
      type: 'composition',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {value: {border: '{sys.line.disabled}'}, type: 'composition'},
      name: 'cnvs-sys-border-input-disabled',
      attributes: {},
      path: ['sys', 'border', 'input', 'disabled'],
    },
  ],
}

// output
\`.cnvs-sys-border-input-disabled {
  border: @cnvs-sys-line-disabled;
}\`
`})}),n(e.h4,{id:"lessshadow",children:"less/shadow"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatLessShadow"}),`. Generates Less variables for shadow tokens, supporting shadow and
elevation styling across Less-based projects.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: '0 4px 16px rgba(0, 0, 0, 0.1)',
      type: 'shadow',
      filePath: 'tokens/all.json',
      isSource: true,
      name: 'cnvs-sys-depth-1',
      attributes: {},
      path: ['sys', 'depth', '1'],
    },
  ],
}

// output
\`@cnvs-sys-depth-1: 0 4px 16px rgba(0, 0, 0, 0.1); // Small shadow\`
`})}),n(e.h4,{id:"scsscomposite",children:"scss/composite"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatSassComposite"}),`. Emits SCSS classes for composite tokens, referencing the
appropriate `,n(e.code,{children:"$cnvs-*"})," Sass variables for their values."]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: {border: '0.0625rem solid rgba(162,171,180,1)'},
      type: 'composition',
      filePath: 'tokens/all.json',
      isSource: true,
      original: {value: {border: '{sys.line.disabled}'}, type: 'composition'},
      name: 'cnvs-sys-border-input-disabled',
      attributes: {},
      path: ['sys', 'border', 'input', 'disabled'],
    },
  ],
}

// output
\`.cnvs-sys-border-input-disabled {
  border: $cnvs-sys-line-disabled;
}\`
`})}),n(e.h4,{id:"scssshadow",children:"scss/shadow"}),t(e.p,{children:["Located in ",n(e.code,{children:"formatSassShadow"}),`. Outputs Sass variables for shadow tokens, making elevation designs
accessible in SCSS.`]}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: '0 4px 16px rgba(0, 0, 0, 0.1)',
      type: 'shadow',
      filePath: 'tokens/all.json',
      isSource: true,
      name: 'cnvs-sys-depth-1',
      attributes: {},
      path: ['sys', 'depth', '1'],
    },
  ],
}

// output
\`$cnvs-sys-depth-1: 0 4px 16px rgba(0, 0, 0, 0.1); // Small shadow\`
`})})]})]})}function v(r={}){const{wrapper:e}=Object.assign({},o(),r.components);return e?n(e,Object.assign({},r,{children:n(s,r)})):s(r)}export{v as default};
