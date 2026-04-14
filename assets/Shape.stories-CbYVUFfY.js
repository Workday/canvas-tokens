import{M as c,U as i}from"./index-cygeWmm5.js";import{S as p}from"./Shape-Bpc0MmOX.js";import{j as s,a as o,F as d}from"./jsx-runtime-CJPOobNs.js";import{useMDXComponents as t}from"./index-DoV7cT2f.js";import"./iframe-CrcroC0R.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-B8Arh_2W.js";import"./index-QF83YFrf.js";import"./index-ChsGqxH_.js";import"./index-BRq5TIsn.js";import"./index-DyTWsQK6.js";import"./index-DrFu-skq.js";import"./index-DdDtHz5p.js";import"./index-CMGJTjKq.js";function a(r){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},t(),r.components);return o(d,{children:[s(c,{title:"Docs/System Tokens/Shape/Shape"}),`
`,o(i,{children:[s(e.h1,{id:"system-shape-tokens",children:"System Shape Tokens"}),s(e.p,{children:`System shape tokens provide consistent shapes across our UI. They're used in our buttons, labels,
cards, and more.`}),s(e.h2,{id:"usage",children:"Usage"}),s(e.p,{children:`Shape tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well.`}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  borderRadius: \`var(\${system.shape.x2})\`,
};
`})}),s(e.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),s(e.pre,{children:s(e.code,{className:"language-css",children:`// styles.css
.card {
  border-radius: var(--cnvs-sys-shape-x2);
}
`})}),s(e.hr,{}),s(e.h2,{id:"tokens",children:"Tokens"}),o(e.p,{children:["These tokens use a multiplier scale and reference our ",s(e.code,{children:"baseUnit"})," token, which is ",s(e.code,{children:"0.25rem"})," / ",s(e.code,{children:"4px"}),`.
So the `,s(e.code,{children:"system.shape.x2"})," token has a value of ",s(e.code,{children:"0.5rem"})," or ",s(e.code,{children:"8px"}),"."]}),s(p,{})]})]})}function h(r={}){const{wrapper:e}=Object.assign({},t(),r.components);return e?s(e,{...r,children:s(a,{...r})}):a(r)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const n={title:"Docs/System Tokens/Shape/Shape",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:h};const M=["__page"];export{M as __namedExportsOrder,l as __page,n as default};
