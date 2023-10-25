import{M as i,U as c}from"./index-b62f1b43.js";import{C as l}from"./Color-8895c70c.js";import{j as n,a,F as d}from"./jsx-runtime-50e9c51e.js";import{u as s}from"./index-bda0bad7.js";import"./iframe-e6300db7.js";import"../sb-preview/runtime.js";import"./index-ebeaab24.js";import"./index-073301bc.js";import"./index-356e4a49.js";import"./index-d9b80eff.js";import"./index-73dcd5d2.js";function o(r){const e=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre"},s(),r.components);return a(d,{children:[n(i,{title:"Docs/Brand Tokens"}),`
`,a(c,{children:[n(e.h1,{id:"brand-tokens",children:"Brand Tokens"}),a(e.p,{children:["Brand tokens are ",n(e.strong,{children:"themed variables"}),` designated for brand / tenant-level customization. They are
not connected to system tokens, which are intended to be application-wide. They're used for our
buttons, focus rings, errors, and banners.`]}),n(e.h2,{id:"usage",children:"Usage"}),a(e.p,{children:[`Brand tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well. This is discussed further in the
`,n(e.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike JavaScript variables, CSS custom
properties (variables) need to be wrapped in `,n(e.code,{children:"var()"}),` to be valid. If you're new to CSS variables, it
might take a bit for that to feel intuitive.`]}),a(e.blockquote,{children:[`
`,n(e.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import {brand} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${brand.primary.base})\`,
  color: \`var(\${brand.primary.accent})\`,
};
`})}),n(e.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),n(e.pre,{children:n(e.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';

.button {
  background-color: var(--cnvs-brand-primary-base);
  color: var(--cnvs-brand-primary-accent);
}
`})}),n(e.h2,{id:"colors",children:"Colors"}),n(e.p,{children:"Currently, tenant theming is scoped to color."}),n(l,{})]})]})}function p(r={}){const{wrapper:e}=Object.assign({},s(),r.components);return e?n(e,{...r,children:n(o,{...r})}):o(r)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const t={title:"Docs/Brand Tokens",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:p};const _=["__page"];export{_ as __namedExportsOrder,m as __page,t as default};
//# sourceMappingURL=Brand.stories-6b6c1c29.js.map
