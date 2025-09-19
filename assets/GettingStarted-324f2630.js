import{a as s,j as n,F as c}from"./jsx-runtime-86dfebf6.js";import{M as d,U as l}from"./index-e4b9c8c4.js";import{u as i}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-cfd21a50.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-91af8003.js";import"./index-356e4a49.js";const r=({img:a,link:e,linkText:t})=>s("a",{href:e,className:"announcement-banner","aria-label":t,children:[n("img",{alt:t,src:a,width:"100%"}),n("span",{className:"cnvs-sys-type-subtext-large",children:t})]});try{r.displayName="AnnouncementBanner",r.__docgenInfo={description:"",displayName:"AnnouncementBanner",props:{img:{defaultValue:null,description:"",name:"img",required:!0,type:{name:"any"}},link:{defaultValue:null,description:"",name:"link",required:!0,type:{name:"any"}},linkText:{defaultValue:null,description:"",name:"linkText",required:!0,type:{name:"any"}}}}}catch{}const p=""+new URL("v3-banner-b282d166.png",import.meta.url).href;function o(a){const e=Object.assign({h1:"h1",h2:"h2",p:"p",blockquote:"blockquote",strong:"strong",code:"code",a:"a",h3:"h3",pre:"pre",h4:"h4"},i(),a.components);return s(c,{children:[n(d,{title:"Docs/Getting Started"}),`
`,s(l,{children:[n(e.h1,{id:"canvas-tokens-web",children:"Canvas Tokens Web"}),n(r,{img:p,link:"https://workday.github.io/canvas-tokens/?path=/docs/guides-upgrade-guides-v3-overview--docs",linkText:"View Upgrade Guide v3"}),n(e.h2,{id:"getting-started",children:"Getting Started"}),n(e.p,{children:`Canvas design tokens are used throughout our Canvas components. Whether you're using them directly
or indirectly, you'll want to understand what they are and how they work. This doc will get up and
running quickly and answer basic questions along the way.`}),s(e.blockquote,{children:[`
`,n(e.p,{children:n(e.strong,{children:"What's a design token?"})}),`
`,n(e.p,{children:`Design tokens are a mechanism to encapsulate and share design data such as color, space,
typography, shape, etc. across platforms. Our Canvas Tokens infrastructure connects these tokens
to Figma and our product platforms: web, iOS, and Android.`}),`
`]}),s(e.p,{children:["Our tokens live in a single package but are organized into three types: ",n(e.code,{children:"base"}),", ",n(e.code,{children:"brand"}),`, and
`,n(e.code,{children:"system"}),". ",n(e.a,{href:"?path=/docs/docs-base-tokens--docs",children:"Base tokens"}),` are the foundation of our token system
and exist to provide the values for our brand and system tokens.
`,n(e.a,{href:"?path=/docs/docs-brand-tokens--docs",children:"Brand tokens"}),` are themeable tokens intended for brand / tenant
customization. `,n(e.a,{href:"?path=/docs/docs-system-tokens-overview--docs",children:"System tokens"}),` are themeable tokens
intended for application-wide customization.`]}),n(e.h3,{id:"installation",children:"Installation"}),n(e.pre,{children:n(e.code,{className:"language-sh",children:`npm install @workday/canvas-tokens-web
`})}),n(e.h3,{id:"usage",children:"Usage"}),n(e.p,{children:`Canvas Tokens can be consumed as either JavaScript variables or as CSS variables and class names.
The JavaScript token values reference CSS variable names, so if you're using JS tokens, you'll also
need to import the CSS variables in your application.`}),n(e.h4,{id:"importing-css-variables",children:"Importing CSS Variables"}),n(e.p,{children:`You should import our CSS variables at the top-level of your application to prevent duplicate
imports and avoid unintentional overwrites. You can import these variables in a native CSS file or
in a JavaScript / TypeScript file as shown in the examples below.`}),n(e.pre,{children:n(e.code,{className:"language-css",children:`/* index.css */
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`// index.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})}),n(e.h4,{id:"css",children:"CSS"}),n(e.pre,{children:n(e.code,{className:"language-css",children:`.card {
  padding: var(--cnvs-sys-space-x4);
}
`})}),n(e.h4,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`import {system} from '@workday/canvas-tokens-web';

const cardStyles = {
  padding: \`var(\${system.space.x4})\`,
};
`})}),n(e.h2,{id:"usage-in-storybook",children:"Usage in Storybook"}),s(e.p,{children:["If you'd like to import these tokens in Storybook, it's best to add them to ",n(e.code,{children:".storybook/preview.ts"}),`.
This will ensure they're available in every story.`]}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`// .storybook/preview.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
`})})]})]})}function f(a={}){const{wrapper:e}=Object.assign({},i(),a.components);return e?n(e,Object.assign({},a,{children:n(o,a)})):o(a)}export{f as default};
//# sourceMappingURL=GettingStarted-324f2630.js.map
