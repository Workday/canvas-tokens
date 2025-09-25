import{M as p,U as u}from"./index-963133a7.js";import{b as i,C as h}from"./Color-09d5d992.js";import{j as e,a as o,F as l}from"./jsx-runtime-86dfebf6.js";import{T as r}from"./index-586dd939.js";import"./SwatchWithText-5e2fae67.js";import{c as m}from"./index-f06029da.js";import{N as b}from"./index-cf666fd8.js";import{u as c}from"./index-2ef8b458.js";import"./iframe-ba2cc7da.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-f65af720.js";import"./ColorGrid-0a0427d9.js";function v(t){return`${Number(t.replace("rem",""))*16}px`}const d=getComputedStyle(document.documentElement).getPropertyValue(i),g=v(d),y={label:i,value:d,pxValue:g},k=()=>e(r,{caption:"Base Unit",headings:["Sample","CSS Variable","Value","Pixel Value"],rows:[y],children:t=>o(l,{children:[e(r.RowItem,{children:e(r.Sample,{style:{width:`var(${t.label})`,backgroundColor:`var(${m.bg.primary.default})`}})}),e(r.RowItem,{children:e(r.MonospaceLabel,{children:t.label})}),e(r.RowItem,{children:t.value}),e(r.RowItem,{children:t.pxValue})]})});function s(t){const a=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre",hr:"hr",h3:"h3"},c(),t.components);return o(l,{children:[e(p,{title:"Docs/Base Tokens"}),`
`,o(u,{children:[e(a.h1,{id:"base-tokens",children:"Base Tokens"}),o(a.p,{children:[`Base tokens are the foundation of our token system. They provide the core values for our brand and
system tokens. Base tokens are `,e(a.strong,{children:"not themed variables"}),`, so you should generally opt to use system
and brand tokens first. However, if you're not concerned with theming a particular property, using a
base token directly is an acceptable option.`]}),e(a.h2,{id:"usage",children:"Usage"}),o(a.p,{children:[`Base tokens can be consumed as a JavaScript / TypeScript object. Each token value references a CSS
variable, so you'll need to have the CSS variables imported in your application as well. This is
discussed further in the `,e(a.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike
JavaScript variables, CSS custom properties (variables) need to be wrapped in `,e(a.code,{children:"var()"}),` to be valid.
If you're new to CSS variables, it might take a bit for that to feel intuitive.`]}),o(a.blockquote,{children:[`
`,e(a.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),e(a.pre,{children:e(a.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import {base} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${base.blue400})\`,
  color: \`var(\${base.neutral0})\`,
};
`})}),e(a.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e(a.pre,{children:e(a.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';

.button {
  background-color: var(--cnvs-base-palette-blue-400);
  color: var(--cnvs-base-palette-neutral-0);
}
`})}),e(a.hr,{}),e(a.h2,{id:"base-unit",children:"Base Unit"}),e(a.p,{children:`The base unit token provides a base value to derive our system space and shape tokens. You could use
this value to build other scales, but unless you're very familiar with our token system, we
recommend you treat this as an internal variable, as changing it could have a drastic effect on your
UI.`}),e(k,{}),e(a.hr,{}),e(a.h2,{id:"color",children:"Color"}),e(a.p,{children:`Base colors provide the core palettes that make up our UI. There are thirteen palettes in total and
they don't have any inherent contextual meaning on when and where they should be used.`}),e("br",{}),e(h,{}),e(a.hr,{}),e(a.h3,{id:"deprecated",children:"Deprecated"}),e(a.p,{children:`The fruit based palettes are deprecated and will be removed in a future release. Please use the new
color palette. While the base tokens are deprecated, we advise to use system tokens instead for
better future proofing.`}),e(b,{title:"Deprecated Base Tokens",link:"https://workday.github.io/canvas-tokens/?path=/docs/guides-upgrade-guides-v3-visual-changes-base-deprecated-palette--docs"}),o(a.p,{children:[`For more information on how to migrate, please view our
`,e(a.a,{href:"https://workday.github.io/canvas-tokens/?path=/docs/guides-upgrade-guides-v3-overview--docs",target:"_blank",rel:"nofollow noopener noreferrer",children:"Token Migration guide"}),"."]})]})]})}function f(t={}){const{wrapper:a}=Object.assign({},c(),t.components);return a?e(a,{...t,children:e(s,{...t})}):s(t)}const w=()=>{throw new Error("Docs-only story")};w.parameters={docsOnly:!0};const n={title:"Docs/Base Tokens",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:f};const P=["__page"];export{P as __namedExportsOrder,w as __page,n as default};
//# sourceMappingURL=Base.stories-e12c740b.js.map
