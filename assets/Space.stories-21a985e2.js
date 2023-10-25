import{M as c,U as i}from"./index-b62f1b43.js";import{S as p}from"./Space-07c287fd.js";import{j as s,a as r,F as d}from"./jsx-runtime-50e9c51e.js";import{u as o}from"./index-bda0bad7.js";import"./iframe-e6300db7.js";import"../sb-preview/runtime.js";import"./index-ebeaab24.js";import"./index-073301bc.js";import"./index-356e4a49.js";import"./index-73dcd5d2.js";import"./index-30e3091f.js";import"./index-75ad2183.js";function t(n){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},o(),n.components);return r(d,{children:[s(c,{title:"Docs/System Tokens/Space"}),`
`,r(i,{children:[s(e.h1,{id:"system-space-tokens",children:"System Space Tokens"}),s(e.p,{children:"System space tokens create consistent layout spacing across our UI."}),s(e.h2,{id:"usage",children:"Usage"}),s(e.p,{children:`Space tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well.`}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  display: 'grid',
  gap: \`var(\${system.space.x1})\`,
  padding: \`var(\${system.space.x2})\`,
};
`})}),s(e.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),s(e.pre,{children:s(e.code,{className:"language-css",children:`// styles.css
.card {
  display: grid;
  gap: var(--cnvs-sys-space-x1);
  padding: var(--cnvs-sys-space-x2);
}
`})}),s(e.hr,{}),s(e.h2,{id:"tokens",children:"Tokens"}),r(e.p,{children:["These tokens use a multiplier scale and reference our ",s(e.code,{children:"baseUnit"})," token, which is ",s(e.code,{children:"0.25rem"})," / ",s(e.code,{children:"4px"}),`.
So the `,s(e.code,{children:"system.space.x2"})," token has a value of ",s(e.code,{children:"0.5rem"})," or ",s(e.code,{children:"8px"}),"."]}),s(p,{})]})]})}function l(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?s(e,{...n,children:s(t,{...n})}):t(n)}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const a={title:"Docs/System Tokens/Space",tags:["stories-mdx"],includeStories:["__page"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:l};const T=["__page"];export{T as __namedExportsOrder,m as __page,a as default};
//# sourceMappingURL=Space.stories-21a985e2.js.map
