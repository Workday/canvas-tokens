import{j as s,a as t,F as i}from"./jsx-runtime-50e9c51e.js";import{M as c}from"./index-26031658.js";import{u as r}from"./index-bda0bad7.js";import"./index-ebeaab24.js";import"./iframe-03b69a7e.js";import"../sb-preview/runtime.js";import"./index-073301bc.js";import"./index-356e4a49.js";function a(e){const n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",h4:"h4"},r(),e.components);return t(i,{children:[`
`,`
`,s(c,{title:"Docs/Getting Started"}),`
`,s(n.h1,{id:"canvas-tokens-web",children:"Canvas Tokens Web"}),`
`,s(n.p,{children:"This package provides Canvas design tokens for web applications."}),`
`,s(n.h2,{id:"design-tokens",children:"Design Tokens"}),`
`,s(n.p,{children:`Design tokens are a mechanism to encapsulate and share design data such as color, space, typography,
shape, etc. across platforms. Our Canvas Tokens infrastructure is designed to connect these tokens
to Figma and our product platforms: web, iOS, and Android.`}),`
`,s(n.h2,{id:"getting-started",children:"Getting Started"}),`
`,s(n.h3,{id:"installation",children:"Installation"}),`
`,s(n.pre,{children:s(n.code,{className:"language-sh",children:`npm install @workday/canvas-tokens-web
`})}),`
`,s(n.h3,{id:"usage",children:"Usage"}),`
`,s(n.h4,{id:"importing-css-variables",children:"Importing CSS Variables"}),`
`,s(n.p,{children:"CSS variables can be imported directly into CSS files,"}),`
`,s(n.pre,{children:s(n.code,{className:"language-css",children:`/* index.css */
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),`
`,s(n.p,{children:"or in JavaScript / TypeScript files."}),`
`,s(n.pre,{children:s(n.code,{className:"language-ts",children:`// index.js
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),`
`,s(n.h4,{id:"css",children:"CSS"}),`
`,s(n.pre,{children:s(n.code,{className:"language-css",children:`.card {
  padding: var(--cnvs-sys-space-x4);
}
`})}),`
`,s(n.h4,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),`
`,s(n.pre,{children:s(n.code,{className:"language-ts",children:`import {system} from '@workday/canvas-tokens-web';

const cardStyles = {
  padding: \`var(\${system.space.x4})\`,
};
`})})]})}function v(e={}){const{wrapper:n}=Object.assign({},r(),e.components);return n?s(n,Object.assign({},e,{children:s(a,e)})):a(e)}export{v as default};
//# sourceMappingURL=GettingStarted-457299ed.js.map
