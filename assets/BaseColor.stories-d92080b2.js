import{M as i,U as l}from"./index-d36e52b4.js";import{B as c}from"./Color-1773a3cb.js";import{j as t,a as n,F as d}from"./jsx-runtime-86dfebf6.js";import{u as s}from"./index-2ef8b458.js";import"./iframe-30d5c690.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./index-f496e44c.js";import"./index-dee94dba.js";import"./ColorGrid-02eb65c2.js";import"./index-bd8a2091.js";function r(o){const e=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre",hr:"hr"},s(),o.components);return n(d,{children:[t(i,{title:"Docs/Base Tokens/Color"}),`
`,n(l,{children:[t(e.h1,{id:"base-color-tokens",children:"Base Color Tokens"}),n(e.p,{children:[`Base tokens are the foundation of our token system. They provide the core values for our brand and
system tokens. Base tokens are `,t(e.strong,{children:"not themed variables"}),`, so you should generally opt to use system
and brand tokens first. However, if you're not concerned with theming a particular property, using a
base token directly is an acceptable option.`]}),t(e.h2,{id:"usage",children:"Usage"}),n(e.p,{children:[`Base tokens can be consumed as a JavaScript / TypeScript object. Each token value references a CSS
variable, so you'll need to have the CSS variables imported in your application as well. This is
discussed further in the `,t(e.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike
JavaScript variables, CSS custom properties (variables) need to be wrapped in `,t(e.code,{children:"var()"}),` to be valid.
If you're new to CSS variables, it might take a bit for that to feel intuitive.`]}),n(e.blockquote,{children:[`
`,t(e.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),t(e.pre,{children:t(e.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import {base} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${base.blue400})\`,
  color: \`var(\${base.neutral0})\`,
};
`})}),t(e.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),t(e.pre,{children:t(e.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';

.button {
  background-color: var(--cnvs-base-palette-blue-400);
  color: var(--cnvs-base-palette-neutral-0);
}
`})}),t(e.hr,{}),t(e.h2,{id:"color",children:"Color"}),t(e.p,{children:`Base colors provide the core palettes that make up our UI. There are thirteen palettes in total and
they don't have any inherent contextual meaning on when and where they should be used.`}),t("br",{}),t(c,{})]})]})}function p(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?t(e,{...o,children:t(r,{...o})}):r(o)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const a={title:"Docs/Base Tokens/Color",tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:p};const M=["__page"];export{M as __namedExportsOrder,h as __page,a as default};
