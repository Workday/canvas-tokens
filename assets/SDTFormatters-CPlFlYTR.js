import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as o,U as i}from"./index-QYG3jjN8.js";import"./index-CsXqVosM.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function s(t){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Maintaining/Style Dictionary/Formatters"}),`
`,e.jsxs(i,{children:[e.jsx(n.h1,{id:"formatters",children:"Formatters"}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," This page is outdated and will be updated soon to match the changes made in v5."]}),`
`]}),e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#overview",children:"Overview"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#format",children:"Format"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#merge",children:"Merge"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#merge-formatters",children:"Merge Formatters"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#mergeobjects",children:"merge/objects"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#mergerefs",children:"merge/refs"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#mergetypes",children:"merge/types"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#direct-transformation-formatters",children:"Direct Transformation Formatters"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#javascripttypescript-formatters",children:"JavaScript/TypeScript Formatters"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#css-formatters",children:"CSS Formatters"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#tokens-info-formatters",children:"Tokens Info Formatters"})}),`
`]}),`
`]}),`
`]}),e.jsx(n.h2,{id:"overview",children:"Overview"}),e.jsx(n.p,{children:`Formatters define how design tokens are transformed into distributable files for various platforms
and development environments. They take the intermediate Style Dictionary dictionary object and
produce the platform-specific string output for source files, such as CSS, JavaScript,
and TypeScript.`}),e.jsx(n.p,{children:"Formatters are essential for:"}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Translating token dictionaries into code files for their target environment (CSS, JS, etc.)."}),`
`,e.jsx(n.li,{children:`Structuring and organizing the generated output to match platform expectations and best
practices.`}),`
`,e.jsx(n.li,{children:"Ensuring correct syntax, export style, and type information for each file type."}),`
`,e.jsx(n.li,{children:"Supporting both fine-grained (per-token) and composite (object/grouped) outputs."}),`
`]}),e.jsxs(n.p,{children:["There are two principal types of formatter functions: ",e.jsx(n.code,{children:"format"})," and ",e.jsx(n.code,{children:"merge"}),"."]}),e.jsx(n.h3,{id:"format",children:"Format"}),e.jsxs(n.p,{children:["Directly convert token JSON data into the file content. Each ",e.jsx(n.code,{children:"format"}),` function is responsible for
creating one style of output for a group of tokens, such as generating individual exports or nesting
tokens as objects. Examples include transforming tokens into JS Docs, token object structures, or
inline CSS variable declarations.`]}),e.jsx(n.h3,{id:"merge",children:"Merge"}),e.jsxs(n.p,{children:["Orchestrate how multiple formatters combine to produce a final, unified output file. A ",e.jsx(n.code,{children:"merge"}),`
formatter calls several formatters in sequence and joins their outputs, making it possible to
compose files that blend different token kinds (e.g., regular, composite, shadow) while preserving
the correct structure and syntax.`]}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"utils/formatters/index.ts"}),` module is the main export surface, mapping all available formatters
by name for use in build scripts and integrations.`]}),e.jsx(n.h2,{id:"merge-formatters",children:"Merge Formatters"}),e.jsx(n.p,{children:`Merge formatters are responsible for producing complex outputs—such as an ES or CommonJS module that
combines multiple categories of tokens—by invoking other formatters and merging their results. They
enable the build process to produce layered or composite files, tailored for different platforms,
with minimal redundancy.`}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Formatter"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"merge/objects"})}),e.jsx(n.td,{children:"Merges multiple token groups into JavaScript objects, mapping nested token structures into code."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"merge/refs"})}),e.jsx(n.td,{children:"Combines several types of formatter output (composite, default, shadow) into one file."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"merge/types"})}),e.jsx(n.td,{children:"Converts default format output into a TypeScript declaration file."})]})]})]}),e.jsx(n.p,{children:"Below is a detailed description of each merge formatter."}),e.jsx(n.h3,{id:"mergeobjects",children:"merge/objects"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"mergeObjects.ts"}),`. Merges multiple token groups into JavaScript objects, mapping nested
token structures into code. Handles creation of composite token objects by:`]}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Rewriting token values as CSS variable names"}),`
`,e.jsx(n.li,{children:"Preserving the original values for type generation in TypeScript"}),`
`,e.jsxs(n.li,{children:["Applying the correct formatter (e.g., ",e.jsx(n.code,{children:"es6/objects"}),", ",e.jsx(n.code,{children:"common-js/objects"}),`) to generate appropriate
file structure`]}),`
`]}),e.jsx(n.h3,{id:"mergerefs",children:"merge/refs"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"mergeStyleReferences.ts"}),". Combines several types of formatter output into one file:"]}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The composite token formatter (for typography/composition tokens)"}),`
`,e.jsx(n.li,{children:"The default formatter (for standard tokens containing references)"}),`
`,e.jsx(n.li,{children:"The shadow formatter (for depth or shadow tokens)"}),`
`]}),e.jsx(n.p,{children:`Merges all three to create a comprehensive file, typically used by CSS platforms to
provide a complete set of variables and references in a single generated stylesheet.`}),e.jsx(n.h3,{id:"mergetypes",children:"merge/types"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"mergeTypes.ts"}),`. Converts default format output into a TypeScript declaration file.
Accepts a base formatter and applies additional format transformations before assembling the type
declarations with correct structure and documentation.`]}),e.jsx(n.h2,{id:"direct-transformation-formatters",children:"Direct Transformation Formatters"}),e.jsx(n.p,{children:`This section documents the core direct transformation formatters. Each formatter takes Style
Dictionary token input and returns content in the form best suited for its target runtime, language,
or platform.`}),e.jsx(n.h3,{id:"javascripttypescript-formatters",children:"JavaScript/TypeScript Formatters"}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Formatter"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"common-js/objects"})}),e.jsx(n.td,{children:"Creates a CommonJS module with nested token objects."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"common-js/packages-export"})}),e.jsx(n.td,{children:"Creates a CommonJS index barrel file re-exporting all token package modules."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"es6/objects"})}),e.jsx(n.td,{children:"Produces an ES6 module with tokens grouped into nested JavaScript objects."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"es6/packages-export"})}),e.jsx(n.td,{children:"Generates an ES6 index barrel file exporting all token package modules."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"js/common-js"})}),e.jsx(n.td,{children:"Creates a CommonJS module where each token is exported as a separate constant."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"js/es6"})}),e.jsx(n.td,{children:"Generates an ES6 module where each token is exported as a constant."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ts/inline"})}),e.jsx(n.td,{children:"Outputs a TypeScript declaration file (.d.ts) with constant exports for each token."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ts/jsdoc-object"})}),e.jsx(n.td,{children:"Outputs a TypeScript declaration file with tokens as nested objects with JSDoc annotations."})]})]})]}),e.jsx(n.p,{children:"Below is a detailed description of each JavaScript/TypeScript formatter."}),e.jsx(n.h4,{id:"common-jsobjects",children:"common-js/objects"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatCommonToObjects"}),`. Creates a CommonJS module with nested token objects that mirror
their path structures, based on the `,e.jsx(n.code,{children:"properties"}),` object. Used to generate "brand" and "system"
objects for CommonJS consumers.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h4,{id:"common-jspackages-export",children:"common-js/packages-export"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatCommonJSExports"}),`. Creates a CommonJS index barrel file that re-exports all token
package modules, for simplified imports and compatibility within CommonJS systems.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// output
\`'use strict';
Object.defineProperty(exports, '__esModule', {value: true});

var base = require('./base/index.js');
exports.base = base;
var brand = require('./brand/index.js');
exports.brand = brand;
var system = require('./system/index.js');
exports.system = system;\`;
`})}),e.jsx(n.h4,{id:"es6objects",children:"es6/objects"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatES6ToObjects"}),`. Produces an ES6 module in which tokens are grouped into nested
JavaScript objects, reflecting their token paths. It uses the `,e.jsx(n.code,{children:"properties"}),` field from the Style
Dictionary output. This format is preferred for assembling "brand" and "system" objects and enables
hierarchical access patterns.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h4,{id:"es6packages-export",children:"es6/packages-export"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatES6Exports"}),`. Generates an ES6 index barrel file, exporting all token package
modules (such as base, brand, and system) for broader consumption. Paths include the explicit
`,e.jsx(n.code,{children:".js"})," extension, so the output also works in native ESM without a bundler."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// output
\`export * from './base/index.js';
export * from './brand/index.js';
export * from './system/index.js';\`;
`})}),e.jsx(n.h4,{id:"jscommon-js",children:"js/common-js"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatToInlineCommonJSModule"}),`. Creates a CommonJS module where each token is exported as
a separate constant, with the value being its CSS variable name. This format is used for generating
distributable CommonJS files.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h4,{id:"jses6",children:"js/es6"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatToInlineES6Module"}),`. Generates an ES6 module where each token is exported as a
constant with its CSS variable identifier as the value. Ideal for consuming in ES module
environments.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h4,{id:"tsinline",children:"ts/inline"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatInlineTypes"}),`. Outputs a TypeScript declaration file (.d.ts) with constant exports
for each token. If a token is deprecated, an appropriate annotation is included. Mainly used for
type-safe consumption in TS projects.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// input
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
`})}),e.jsx(n.h4,{id:"tsjsdoc-object",children:"ts/jsdoc-object"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatJSToTypes"}),`. Outputs a TypeScript declaration file where tokens are declared as
nested objects, with each token property annotated by JSDoc. These comments include value details,
descriptions, and references—improving documentation and type safety.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h3,{id:"css-formatters",children:"CSS Formatters"}),e.jsx(n.p,{children:`These formatters generate stylesheet code for CSS, enabling consumption of tokens
in design systems and UI frameworks.`}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Formatter"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"css/composite"})}),e.jsx(n.td,{children:"Outputs CSS classes for composite tokens using CSS variables."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"css/shadow"})}),e.jsx(n.td,{children:"Defines CSS custom properties for shadow or depth tokens."})]})]})]}),e.jsx(n.p,{children:"Below is a detailed description of each CSS formatter."}),e.jsx(n.h4,{id:"csscomposite",children:"css/composite"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatCSSComposite"}),`. Outputs CSS classes for composite tokens, like typography or border
sets, using CSS variables for their values.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h4,{id:"cssshadow",children:"css/shadow"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatCSSShadow"}),`. Defines CSS custom properties for shadow or depth tokens, enabling
consistent reuse and theming for elevation styles.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
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
`})}),e.jsx(n.h2,{id:"tokens-info-formatters",children:"Tokens Info Formatters"}),e.jsx(n.h4,{id:"jsontokens-info-export",children:"json/tokens-info-export"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatTokensInfoExport"}),`. Outputs an array of objects with detailed information about
each token as prettified JSON.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: "#ffefee",
      filePath: "tokens/all.json",
      isSource: true,
      original: { value: "#ffefee" },
      name: "cinnamon100",
      attributes: {},
      path: ["base", "palette", "cinnamon", "100"],
    },
  ],
}

// output
\`[
  {
    "name": "base.palette.cinnamon.100",
    "level": "base",
    "value": "#ffefee",
    "computedValue": "#ffefee",
    "fallback": "#ffefee",
    "fallbackValue": undefined,
    "deprecatedComment": undefined
  }
]\`
`})}),e.jsx(n.h4,{id:"csvtokens-info-export",children:"csv/tokens-info-export"}),e.jsxs(n.p,{children:["Located in ",e.jsx(n.code,{children:"formatTokensInfoExportCSV"}),`. Outputs a CSV file with one row per token and columns for
key metadata.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  allTokens: [
    {
      value: "#ffefee",
      filePath: "tokens/all.json",
      isSource: true,
      original: { value: "#ffefee" },
      name: "cinnamon100",
      attributes: {},
      path: ["base", "palette", "cinnamon", "100"],
    },
  ],
}

// output
\`name,level,value,computedValue,fallback,fallbackValue,deprecatedComment
base.palette.cinnamon.100,base,#ffefee,#ffefee,#ffefee,,\`
`})})]})]})}function b(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{b as default};
