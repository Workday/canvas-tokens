import{M as i,U as c}from"./index-09aeb0aa.js";import"./Depth-9beb78c2.js";import{j as s,a as n,F as d}from"./jsx-runtime-86dfebf6.js";import{u as r}from"./index-2ef8b458.js";import"./iframe-ea0b6fa6.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";import"./index-30e3091f.js";function a(t){const e=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre",ul:"ul",li:"li"},r(),t.components);return n(d,{children:[s(i,{title:"Docs/System Tokens/Overview"}),`
`,n(c,{children:[s(e.h1,{id:"system-tokens",children:"System Tokens"}),n(e.p,{children:["System tokens are ",s(e.strong,{children:"themed variables"}),` intended to provide application-wide theming. They are not
connected to brand tokens, which are tenant-specific.`]}),s(e.h2,{id:"usage",children:"Usage"}),n(e.p,{children:[`System tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well. This is discussed further in the
`,s(e.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike JavaScript variables, CSS custom
properties (variables) need to be wrapped in `,s(e.code,{children:"var()"}),` to be valid. If you're new to CSS variables, it
might take a bit for that to feel intuitive.`]}),n(e.blockquote,{children:[`
`,s(e.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`var(\${system.depth[2]})\`,
  padding: \`var(\${system.space.x4})\`,
};
`})}),s(e.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),s(e.pre,{children:s(e.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';

.card {
  background-color: var(--cnvs-sys-depth-2);
  padding: var(--cnvs-sys-space-x4);
}
`})}),s(e.h2,{id:"tokens",children:"Tokens"}),s(e.p,{children:`There are several token collections within system tokens. You can find more documentation on them at
the links below.`}),n(e.ul,{children:[`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-depth--docs",children:"Depth"})}),`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-shape--docs",children:"Shape"})}),`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-space--docs",children:"Space"})}),`
`,n(e.li,{children:[s(e.a,{href:"/docs/docs-system-tokens-type--docs",children:"Type"}),`
`,n(e.ul,{children:[`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-type--docs#type-level",children:"Type Level"})}),`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-type--docs#font-family",children:"Font Family"})}),`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-type--docs#font-size",children:"Font Size"})}),`
`,s(e.li,{children:s(e.a,{href:"/docs/docs-system-tokens-type--docs#font-weight",children:"Font Weight"})}),`
`]}),`
`]}),`
`]})]})]})}function l(t={}){const{wrapper:e}=Object.assign({},r(),t.components);return e?s(e,{...t,children:s(a,{...t})}):a(t)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const o={title:"Docs/System Tokens/Overview",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:l};const _=["__page"];export{_ as __namedExportsOrder,h as __page,o as default};
//# sourceMappingURL=Overview.stories-f31c5739.js.map
