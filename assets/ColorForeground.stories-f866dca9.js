import{M as c,U as d}from"./index-c833083d.js";import{F as m,a as l,b as i,c as p,d as u}from"./Foreground-5df0ac3e.js";import{j as o,a as n,F as g}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-b8a2687a.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./ColorGrid-0a0427d9.js";import"./index-586dd939.js";import"./index-5f831440.js";function t(e){const r=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},a(),e.components);return n(g,{children:[o(c,{title:"Docs/System Tokens/Color/Foreground"}),`
`,n(d,{children:[o(r.h1,{id:"system-foreground-color-tokens",children:"System Foreground Color Tokens"}),o(r.p,{children:"System foreground color tokens provide values for foreground elements."}),o(r.h2,{id:"usage",children:"Usage"}),o(r.pre,{children:o(r.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.fg.default})\`,
};
`})}),o(r.pre,{children:o(r.code,{className:"language-css",children:`// styles.css
.card {
  color: var(--cnvs-sys-color-fg-default);
}
`})}),o(r.h2,{id:"tokens",children:"Tokens"}),o(m,{}),o(r.hr,{}),o(l,{}),o(r.hr,{}),o(i,{}),o(r.hr,{}),o(p,{}),o(r.hr,{}),o(u,{}),o(r.hr,{})]})]})}function h(e={}){const{wrapper:r}=Object.assign({},a(),e.components);return r?o(r,{...e,children:o(t,{...e})}):t(e)}const y=()=>{throw new Error("Docs-only story")};y.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Foreground",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:h};const T=["__page"];export{T as __namedExportsOrder,y as __page,s as default};
