import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as c,U as d}from"./index-QYG3jjN8.js";import{R as t}from"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";const i=({img:n,link:s,linkText:a})=>t.createElement("a",{href:s,className:"announcement-banner","aria-label":a},t.createElement("img",{alt:a,src:n,width:"100%"}),t.createElement("span",{className:"cnvs-sys-type-subtext-lg"},a));i.__docgenInfo={description:"",methods:[],displayName:"AnnouncementBanner"};const l=""+new URL("v5-banner-DImrRypT.png",import.meta.url).href;function o(n){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Docs/Getting Started"}),`
`,e.jsxs(d,{children:[e.jsx(s.h1,{id:"canvas-tokens-web",children:"Canvas Tokens Web"}),e.jsx(i,{img:l,link:"https://workday.github.io/canvas-tokens/?path=/docs/guides-upgrade-guides-v5-overview--docs",linkText:"View Upgrade Guide v5"}),e.jsx(s.h2,{id:"getting-started",children:"Getting Started"}),e.jsx(s.p,{children:`Canvas design tokens are used throughout our Canvas components. Whether you're using them directly
or indirectly, you'll want to understand what they are and how they work. This doc will get up and
running quickly and answer basic questions along the way.`}),e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"What's a design token?"})}),`
`,e.jsx(s.p,{children:`Design tokens are a mechanism to encapsulate and share design data such as color, space,
typography, shape, etc. across platforms. Our Canvas Tokens infrastructure connects these tokens
to Figma and our product platforms: web, iOS, and Android.`}),`
`]}),e.jsxs(s.p,{children:["Our tokens live in a single package but are organized into three types: ",e.jsx(s.code,{children:"base"}),", ",e.jsx(s.code,{children:"brand"}),`, and
`,e.jsx(s.code,{children:"system"}),". ",e.jsx(s.a,{href:"?path=/docs/docs-base-tokens--docs",children:"Base tokens"}),` are the foundation of our token system
and exist to provide the values for our brand and system tokens.
`,e.jsx(s.a,{href:"?path=/docs/docs-brand-tokens--docs",children:"Brand tokens"}),` are themeable tokens intended for brand / tenant
customization. `,e.jsx(s.a,{href:"?path=/docs/docs-system-tokens-overview--docs",children:"System tokens"}),` are themeable tokens
intended for application-wide customization.`]}),e.jsx(s.h3,{id:"installation",children:"Installation"}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-sh",children:`npm install @workday/canvas-tokens-web
`})}),e.jsx(s.h3,{id:"usage",children:"Usage"}),e.jsx(s.p,{children:`Canvas Tokens can be consumed as either JavaScript variables or as CSS variables and class names.
The JavaScript token values reference CSS variable names, so if you're using JS tokens, you'll also
need to import the CSS variables in your application.`}),e.jsx(s.h4,{id:"importing-css-variables",children:"Importing CSS Variables"}),e.jsx(s.p,{children:`You should import our CSS variables at the top-level of your application to prevent duplicate
imports and avoid unintentional overwrites. You can import these variables in a native CSS file or
in a JavaScript / TypeScript file as shown in the examples below.`}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`/* index.css */
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"}),` These should only be imported once at the root level of an application to ensure global
theming.`]}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// index.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),e.jsx(s.h4,{id:"css",children:"CSS"}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`.card {
  padding: var(--cnvs-sys-space-x4);
}
`})}),e.jsx(s.h4,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`import {system} from '@workday/canvas-tokens-web';

const cardStyles = {
  padding: \`var(\${system.space.x4})\`,
};
`})}),e.jsx(s.h2,{id:"usage-in-storybook",children:"Usage in Storybook"}),e.jsxs(s.p,{children:["If you'd like to import these tokens in Storybook, it's best to add them to ",e.jsx(s.code,{children:".storybook/preview.ts"}),`.
This will ensure they're available in every story.`]}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// .storybook/preview.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})})]})]})}function j(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(o,{...n})}):o(n)}export{j as default};
