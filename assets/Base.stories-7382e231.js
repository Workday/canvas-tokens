import{M as u,U as h}from"./index-b62f1b43.js";import{P as p,N as m,T as y,S as b,O as v}from"./Color-5d69c077.js";import{j as e,a as n,F as i}from"./jsx-runtime-50e9c51e.js";import{T as r}from"./index-73dcd5d2.js";import{d as l,b as g}from"./index-75ad2183.js";import{u as c}from"./index-bda0bad7.js";import"./iframe-e6300db7.js";import"../sb-preview/runtime.js";import"./index-ebeaab24.js";import"./index-073301bc.js";import"./index-356e4a49.js";import"./index-d9b80eff.js";function f(t){return`${Number(t.replace("rem",""))*16}px`}const d=getComputedStyle(document.documentElement).getPropertyValue(l),k=f(d),w={label:l,value:d,pxValue:k},S=()=>e(r,{caption:"Base Unit",headings:["Sample","CSS Variable","Value","Pixel Value"],rows:[w],children:t=>n(i,{children:[e(r.RowItem,{children:e(r.Sample,{style:{width:`var(${t.label})`,backgroundColor:`var(${g})`}})}),e(r.RowItem,{children:e(r.MonospaceLabel,{children:t.label})}),e(r.RowItem,{children:t.value}),e(r.RowItem,{children:t.pxValue})]})});function s(t){const a=Object.assign({h1:"h1",p:"p",strong:"strong",h2:"h2",a:"a",code:"code",blockquote:"blockquote",pre:"pre",hr:"hr",h3:"h3"},c(),t.components);return n(i,{children:[e(u,{title:"Docs/Base Tokens"}),`
`,n(h,{children:[e(a.h1,{id:"base-tokens",children:"Base Tokens"}),n(a.p,{children:[`Base tokens are the foundation of our token system. They provide the core values for our brand and
system tokens. Base tokens are `,e(a.strong,{children:"not themed variables"}),`, so you should generally opt to use system
and brand tokens first. However, if you're not concerned with theming a particular property, using a
base token directly is an acceptable option.`]}),e(a.h2,{id:"usage",children:"Usage"}),n(a.p,{children:[`Base tokens can be consumed as a JavaScript / TypeScript object. Each token value references a CSS
variable, so you'll need to have the CSS variables imported in your application as well. This is
discussed further in the `,e(a.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike
JavaScript variables, CSS custom properties (variables) need to be wrapped in `,e(a.code,{children:"var()"}),` to be valid.
If you're new to CSS variables, it might take a bit for that to feel intuitive.`]}),n(a.blockquote,{children:[`
`,e(a.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),e(a.pre,{children:e(a.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import {base} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${base.blueberry400})\`,
  color: \`var(\${base.frenchVanilla100})\`,
};
`})}),e(a.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e(a.pre,{children:e(a.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';

.button {
  background-color: var(--cnvs-base-palette-blueberry-400);
  color: var(--cnvs-base-palette-french-vanilla-100);
}
`})}),e(a.hr,{}),e(a.h2,{id:"base-unit",children:"Base Unit"}),e(a.p,{children:`The base unit token provides a base value to derive our system space and shape tokens. You could use
this value to build other scales, but unless you're very familiar with our token system, we
recommend you treat this as an internal variable, as changing it could have a drastic effect on your
UI.`}),e(S,{}),e(a.hr,{}),e(a.h2,{id:"color",children:"Color"}),e(a.p,{children:`Base colors provide the core palettes that make up our UI. There are twenty-seven palettes in total,
but only a handful are used regularly. These palettes don't have any inherent contextual meaning on
when and where they should be used. However, to provide some guidance, we've grouped them
semantically: primary, neutral, type, status, and other.`}),e(a.h3,{id:"primary",children:"Primary"}),e(a.p,{children:`Blueberry is our primary color and the most prominent palette in our UI. We use it for our primary
buttons, links, focus outlines, and more.`}),e(p,{}),e(a.hr,{}),e(a.h3,{id:"neutral",children:"Neutral"}),e(a.p,{children:`We have four neutral palettes: french vanilla, soap, licorice, and black pepper. These colors are
used for our backgrounds, foregrounds, icons, and text.`}),e(m,{}),e(a.hr,{}),e(a.h3,{id:"type",children:"Type"}),e(a.p,{children:`Our type colors are used for headings, text, and icons. Maintaining sufficient contrast is an
important consideration when choosing any type color. Consider where your type will render as well
as any focus, active, and hover states.`}),e(y,{}),e(a.hr,{}),e(a.h3,{id:"status",children:"Status"}),e(a.p,{children:`These palettes are reserved to indicate the status of a particular object, task, or flow. These
palettes are generally better suited for backgrounds than text, as they have difficulty meeting our
contrast ratios guidelines. Also remember to always communicate status with more than color alone.`}),e(b,{}),e(a.hr,{}),e(a.h3,{id:"other",children:"Other"}),e(a.p,{children:`Our other palettes have little-to-no usage in our UI outside of data visualization. Please, use
these sparingly.`}),e(v,{}),e(a.hr,{})]})]})}function T(t={}){const{wrapper:a}=Object.assign({},c(),t.components);return a?e(a,{...t,children:e(s,{...t})}):s(t)}const C=()=>{throw new Error("Docs-only story")};C.parameters={docsOnly:!0};const o={title:"Docs/Base Tokens",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:T};const $=["__page"];export{$ as __namedExportsOrder,C as __page,o as default};
//# sourceMappingURL=Base.stories-7382e231.js.map
