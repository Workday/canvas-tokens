import{j as n,a as i,F as r}from"./jsx-runtime-50e9c51e.js";import{M as c}from"./index-579a8f4b.js";import{u as t}from"./index-bda0bad7.js";import"./index-ebeaab24.js";import"./iframe-7938f978.js";import"../sb-preview/runtime.js";import"./index-073301bc.js";import"./index-356e4a49.js";function a(e){const s=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",h4:"h4"},t(),e.components);return i(r,{children:[`
`,`
`,n(c,{title:"Docs/Getting Started"}),`
`,n(s.h1,{id:"canvas-tokens-web",children:"Canvas Tokens Web"}),`
`,n(s.p,{children:"This package provides Canvas design tokens for web applications."}),`
`,n(s.h2,{id:"design-tokens",children:"Design Tokens"}),`
`,n(s.p,{children:`Design tokens are a mechanism to encapsulate and share design data such as color, space, typography,
shape, etc. across platforms. Our Canvas Tokens infrastructure is designed to connect these tokens
to Figma and our product platforms: web, iOS, and Android.`}),`
`,n(s.h2,{id:"getting-started",children:"Getting Started"}),`
`,n(s.h3,{id:"installation",children:"Installation"}),`
`,n(s.pre,{children:n(s.code,{className:"language-sh",children:`npm install @workday/canvas-tokens-web
`})}),`
`,n(s.h3,{id:"usage",children:"Usage"}),`
`,n(s.h4,{id:"importing-css-variables",children:"Importing CSS Variables"}),`
`,n(s.p,{children:"CSS variables can be imported directly into CSS files,"}),`
`,n(s.pre,{children:n(s.code,{className:"language-css",children:`/* index.css */
@import '@workday/canvas-tokens-web/dist/css/base/_variables.css';
@import '@workday/canvas-tokens-web/dist/css/system/_variables.css';
@import '@workday/canvas-tokens-web/dist/css/brand/_variables.css';
`})}),`
`,n(s.p,{children:"or in JavaScript / TypeScript files."}),`
`,n(s.pre,{children:n(s.code,{className:"language-ts",children:`// index.js
import '@workday/canvas-tokens-web/dist/css/base/_variables.css';
import '@workday/canvas-tokens-web/dist/css/system/_variables.css';
import '@workday/canvas-tokens-web/dist/css/brand/_variables.css';
`})}),`
`,n(s.h4,{id:"css",children:"CSS"}),`
`,n(s.pre,{children:n(s.code,{className:"language-css",children:`.card {
  padding: var(--cnvs-sys-space-x4);
}
`})}),`
`,n(s.h4,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),`
`,n(s.pre,{children:n(s.code,{className:"language-ts",children:`import {system} from '@workday/canvas-tokens-web';

const cardStyles = {
  padding: \`var(\${system.space.x4})\`,
};
`})})]})}function v(e={}){const{wrapper:s}=Object.assign({},t(),e.components);return s?n(s,Object.assign({},e,{children:n(a,e)})):a(e)}export{v as default};
//# sourceMappingURL=GettingStarted-c88cb5bf.js.map
