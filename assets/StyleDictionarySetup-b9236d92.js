import{j as n,a as o,F as s}from"./jsx-runtime-86dfebf6.js";import{M as l,U as a}from"./index-fe986cc6.js";import"./index-586dd939.js";import{u as i}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-e0eb6041.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function t(r){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",a:"a",p:"p",code:"code",h3:"h3",pre:"pre"},i(),r.components);return o(s,{children:[n(l,{title:"Maintaining/Style Dictionary/_Overview"}),`
`,o(a,{children:[n(e.h1,{id:"style-dictionary-setup",children:"Style Dictionary Setup"}),n(e.h2,{id:"table-of-contents",children:"Table of Contents"}),o(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#overview",children:"Overview"})}),`
`,n(e.li,{children:n(e.a,{href:"#build-configuration",children:"Build Configuration"})}),`
`,n(e.li,{children:n(e.a,{href:"#registration-process",children:"Registration Process"})}),`
`,n(e.li,{children:n(e.a,{href:"#token-level-configuration",children:"Token Level Configuration"})}),`
`]}),n(e.h2,{id:"overview",children:"Overview"}),o(e.p,{children:["This document describes the workflow for ",n(e.a,{href:"https://styledictionary.com/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Style Dictionary"}),` setup in
the canvas-tokens package.`]}),o(e.p,{children:["The ",n(e.code,{children:"build.ts"}),` file serves as the main entry point for the Style Dictionary build process. It
configures and orchestrates the entire token transformation pipeline.`]}),o(e.p,{children:["The build process uses a custom configuration helper (",n(e.code,{children:"setConfig"}),`) that generates the Style
Dictionary config object, minimizing duplication by centralizing settings across platforms and token
levels. This helper also supports advanced customization, such as merging multiple formatters, and
enables dynamic naming for formatters, transforms, or output file paths based on platform or level
(e.g., using patterns like `,n(e.code,{children:"{platform}/{level}"})," to organize outputs)."]}),n(e.h2,{id:"build-configuration",children:"Build Configuration"}),n(e.p,{children:"The build configuration provides the the following options."}),o(e.p,{children:[`| Option           | Description                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source Files     | Token JSON files located in `,n(e.code,{children:"tokens/**/*.json"}),". ",n(e.a,{href:"https://workday.github.io/canvas-tokens/?path=/docs/maintaining-token-json-structure--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"More"}),` |
| Platforms        | Multiple output formats including `,n(e.code,{children:"css"}),", ",n(e.code,{children:"scss"}),", ",n(e.code,{children:"less"}),", ",n(e.code,{children:"es6"}),", and ",n(e.code,{children:"common-js"}),`.                                                                   |
| Token Levels     | Three levels of tokens: `,n(e.code,{children:"base"}),", ",n(e.code,{children:"brand"}),", and ",n(e.code,{children:"sys"}),` (system).                                                                                       |
| Platform Options | Options for each platform. `,n(e.a,{href:"https://styledictionary.com/docs/configuration#platform-options",target:"_blank",rel:"nofollow noopener noreferrer",children:"More"}),"                                                 |"]}),n(e.h3,{id:"example",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`const config = setConfig({
  source: ['tokens/**/*.json'],
  platforms: ['css', 'scss', 'less', 'es6', 'common-js'],
  levels: ['base', 'brand', 'sys'],
    platformOptions: {
    'css, scss, less': {
      buildPath: '../canvas-tokens-web/',
      ...other options
    },
    ...other platform options
  },
});
`})}),n(e.h2,{id:"registration-process",children:"Registration Process"}),n(e.p,{children:"The build file registers all custom components with Style Dictionary:"}),o(e.p,{children:[`| Component        | Description                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Formats          | Custom formatters that generate file content are registered via `,n(e.code,{children:"StyleDictionary.registerFormat()"}),`.                                                    |
| Filters          | Custom matchers that determine which tokens to include/exclude are registered via `,n(e.code,{children:"StyleDictionary.registerFilter()"}),`.                                  |
| Transforms       | Custom transformers that modify token values or names are registered via `,n(e.code,{children:"StyleDictionary.registerTransform()"}),`.                                        |
| Transform Groups | Pre-defined groups of transforms (e.g., `,n(e.code,{children:"web"})," transform group, used for CSS transforms) are registered via ",n(e.code,{children:"StyleDictionary.registerTransformGroup()"}),". |"]}),n(e.h2,{id:"token-level-configuration",children:"Token Level Configuration"}),n(e.p,{children:"The configuration uses modifiers to create different file outputs for different token levels:"}),n(e.p,{children:`| Token Level         | Description                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Base Tokens         | Generate simple variable files with code tokens only.                                                             |
| Brand/System Tokens | Generate composite files that merge regular tokens, composite tokens (typography/composition), and shadow tokens. |`}),o(e.p,{children:["The build process supports multiple file extensions per platform (e.g., ",n(e.code,{children:".sass"})," and ",n(e.code,{children:".scss"}),` for SCSS
platform) and can generate both JavaScript and TypeScript declaration files.`]})]})]})}function b(r={}){const{wrapper:e}=Object.assign({},i(),r.components);return e?n(e,Object.assign({},r,{children:n(t,r)})):t(r)}export{b as default};
