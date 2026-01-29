import{M as c,U as l}from"./index-28292b98.js";import{S as m,a as i,b as d,c as p,d as u,e as h}from"./Surface-87a26d29.js";import{j as r,a as t,F as f}from"./jsx-runtime-86dfebf6.js";import{u as n}from"./index-2ef8b458.js";import"./iframe-61707770.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./ColorGrid-02eb65c2.js";import"./index-bd8a2091.js";import"./index-4ff1bdec.js";function a(o){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},n(),o.components);return t(f,{children:[r(c,{title:"Docs/System Tokens/Color/Surface (New)"}),`
`,t(l,{children:[r(e.h1,{id:"surface-colors",children:"Surface Colors"}),r(e.p,{children:"System surface color tokens provide values for surfaces."}),r(e.h2,{id:"usage",children:"Usage"}),r(e.pre,{children:r(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${system.color.surface.default})\`,
};
`})}),r(e.pre,{children:r(e.code,{className:"language-css",children:`// styles.css
.card {
  background-color: var(--cnvs-sys-color-surface-default);
}
`})}),r(e.h2,{id:"tokens",children:"Tokens"}),r(m,{}),r(e.hr,{}),r(i,{}),r(e.hr,{}),r(d,{}),r(e.hr,{}),r(p,{}),r(e.hr,{}),r(u,{}),r(e.hr,{}),r(h,{})]})]})}function g(o={}){const{wrapper:e}=Object.assign({},n(),o.components);return e?r(e,{...o,children:r(a,{...o})}):a(o)}const y=()=>{throw new Error("Docs-only story")};y.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Surface (New)",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:g};const U=["__page"];export{U as __namedExportsOrder,y as __page,s as default};
