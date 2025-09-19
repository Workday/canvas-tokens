import{M as c,U as i}from"./index-e4b9c8c4.js";import{S as d}from"./Shape-2a0d7f35.js";import{j as s,a as o,F as p}from"./jsx-runtime-86dfebf6.js";import{u as t}from"./index-2ef8b458.js";import"./iframe-cfd21a50.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-586dd939.js";import"./index-ed31ec65.js";function a(n){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},t(),n.components);return o(p,{children:[s(c,{title:"Docs/System Tokens/Shape"}),`
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
So the `,s(e.code,{children:"system.shape.x2"})," token has a value of ",s(e.code,{children:"0.5rem"})," or ",s(e.code,{children:"8px"}),"."]}),s(d,{})]})]})}function l(n={}){const{wrapper:e}=Object.assign({},t(),n.components);return e?s(e,{...n,children:s(a,{...n})}):a(n)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const r={title:"Docs/System Tokens/Shape",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:l};const T=["__page"];export{T as __namedExportsOrder,h as __page,r as default};
//# sourceMappingURL=Shape.stories-83ac1ce3.js.map
