import{M as i,U as c}from"./index-0d073df7.js";import{C as d}from"./Color-c72d6c68.js";import{j as n,a as r,F as l}from"./jsx-runtime-86dfebf6.js";import{u as s}from"./index-2ef8b458.js";import"./iframe-2d738cd7.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./ColorGrid-e7d69f13.js";import"./index-586dd939.js";import"./index-f65af720.js";function t(o){const e=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre"},s(),o.components);return r(l,{children:[n(i,{title:"Docs/Brand Tokens"}),`
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
`]}),n(d,{})]})]})}function p(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?n(e,{...o,children:n(t,{...o})}):t(o)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const a={title:"Docs/Brand Tokens",tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:p};const x=["__page"];export{x as __namedExportsOrder,h as __page,a as default};
//# sourceMappingURL=Brand.stories-7adf1a9e.js.map
