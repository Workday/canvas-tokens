import{M as i,U as c}from"./index-cygeWmm5.js";import{C as d}from"./Color-BV1RSWHm.js";import{j as n,a as r,F as l}from"./jsx-runtime-CJPOobNs.js";import{useMDXComponents as s}from"./index-DoV7cT2f.js";import"./iframe-CrcroC0R.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-B8Arh_2W.js";import"./index-QF83YFrf.js";import"./index-ChsGqxH_.js";import"./index-BRq5TIsn.js";import"./index-DyTWsQK6.js";import"./index-DrFu-skq.js";import"./ColorGrid-Bs-sg3ak.js";import"./index-DdDtHz5p.js";import"./index-CVZl71qS.js";function a(o){const e=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre"},s(),o.components);return r(l,{children:[n(i,{title:"Docs/Brand/Brand Tokens (New)"}),`
`,r(c,{children:[n(e.h1,{id:"brand-tokens",children:"Brand Tokens"}),r(e.p,{children:["Brand tokens are ",n(e.strong,{children:"themed variables"}),` designated for brand / tenant-level customization. They are
not connected to system tokens, which are intended to be application-wide. They're used for our
buttons, focus rings, errors, and banners.`]}),n(e.h2,{id:"usage",children:"Usage"}),r(e.p,{children:[`Brand tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well. This is discussed further in the
`,n(e.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike JavaScript variables, CSS custom
properties (variables) need to be wrapped in `,n(e.code,{children:"var()"}),` to be valid. If you're new to CSS variables, it
might take a bit for that to feel intuitive.`]}),r(e.blockquote,{children:[`
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
`})}),n(e.h2,{id:"colors",children:"Colors"}),n(e.p,{children:"Currently, tenant theming is scoped to color."}),r(e.blockquote,{children:[`
`,r(e.p,{children:[n(e.strong,{children:"Note:"})," ",n(e.code,{children:"--cnvs-brand-action-**"})," should be used with caution. Defining brand primary colors should cover most of the theming use cases. However, in situations where you want more granular control over actions like ",n(e.code,{children:"PrimaryButton"}),", you can define different colors for the action tokens. By Default, the action tokens map to our ",n(e.code,{children:"--cnvs-brand-primary-**"})," tokens."]}),`
`]}),n(d,{})]})]})}function p(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?n(e,{...o,children:n(a,{...o})}):a(o)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const t={title:"Docs/Brand/Brand Tokens (New)",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:p};const D=["__page"];export{D as __namedExportsOrder,m as __page,t as default};
