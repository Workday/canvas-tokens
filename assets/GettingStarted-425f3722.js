import{j as s,a,F as r}from"./jsx-runtime-50e9c51e.js";import{M as i,U as c}from"./index-c78ac9b1.js";import{u as o}from"./index-bda0bad7.js";import"./index-ebeaab24.js";import"./iframe-f7f2472e.js";import"../sb-preview/runtime.js";import"./index-073301bc.js";import"./index-356e4a49.js";function t(n){const e=Object.assign({h1:"h1",p:"p",h2:"h2",blockquote:"blockquote",strong:"strong",code:"code",a:"a",h3:"h3",pre:"pre",h4:"h4"},o(),n.components);return a(r,{children:[s(i,{title:"Docs/Getting Started"}),`
`,a(c,{children:[s(e.h1,{id:"canvas-tokens-web",children:"Canvas Tokens Web"}),s(e.p,{children:"This package provides Canvas design tokens for web applications."}),s(e.h2,{id:"getting-started",children:"Getting Started"}),s(e.p,{children:`Canvas design tokens are used throughout our Canvas components. Whether you're using them directly
or indirectly, you'll want to understand what they are and how they work. This doc will get up and
running quickly and answer basic questions along the way.`}),a(e.blockquote,{children:[`
`,s(e.p,{children:s(e.strong,{children:"What's a design token?"})}),`
`,s(e.p,{children:`Design tokens are a mechanism to encapsulate and share design data such as color, space,
typography, shape, etc. across platforms. Our Canvas Tokens infrastructure connects these tokens
to Figma and our product platforms: web, iOS, and Android.`}),`
`]}),a(e.p,{children:["Our tokens live in a single package but are organized into three types: ",s(e.code,{children:"base"}),", ",s(e.code,{children:"brand"}),`, and
`,s(e.code,{children:"system"}),". ",s(e.a,{href:"?path=/docs/docs-base-tokens--docs",children:"Base tokens"}),` are the foundation of our token system
and exist to provide the values for our brand and system tokens.
`,s(e.a,{href:"?path=/docs/docs-brand-tokens--docs",children:"Brand tokens"}),` are themeable tokens intended for brand / tenant
customization. `,s(e.a,{href:"?path=/docs/docs-system-tokens-overview--docs",children:"System tokens"}),` are themeable tokens
intended for application-wide customization.`]}),s(e.h3,{id:"installation",children:"Installation"}),s(e.pre,{children:s(e.code,{className:"language-sh",children:`npm install @workday/canvas-tokens-web
`})}),s(e.h3,{id:"usage",children:"Usage"}),s(e.p,{children:`Canvas Tokens can be consumed as either JavaScript variables or as CSS variables and class names.
The JavaScript token values reference CSS variable names, so if you're using JS tokens, you'll also
need to import the CSS variables in your application.`}),s(e.h4,{id:"importing-css-variables",children:"Importing CSS Variables"}),s(e.p,{children:`You should import our CSS variables at the top-level of your application to prevent duplicate
imports and avoid unintentional overwrites. You can import these variables in a native CSS file or
in a JavaScript / TypeScript file as shown in the examples below.`}),s(e.pre,{children:s(e.code,{className:"language-css",children:`/* index.css */
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`// index.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),s(e.h4,{id:"css",children:"CSS"}),s(e.pre,{children:s(e.code,{className:"language-css",children:`.card {
  padding: var(--cnvs-sys-space-x4);
}
`})}),s(e.h4,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`import {system} from '@workday/canvas-tokens-web';

const cardStyles = {
  padding: \`var(\${system.space.x4})\`,
};
`})}),s(e.h2,{id:"usage-in-storybook",children:"Usage in Storybook"}),a(e.p,{children:["If you'd like to import these tokens in Storybook, it's best to add them to ",s(e.code,{children:".storybook/preview.ts"}),`.
This will ensure they're available in every story.`]}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`// .storybook/preview.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})})]})]})}function v(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?s(e,Object.assign({},n,{children:s(t,n)})):t(n)}export{v as default};
//# sourceMappingURL=GettingStarted-425f3722.js.map
