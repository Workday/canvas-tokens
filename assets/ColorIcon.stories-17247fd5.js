import{M as a,U as i}from"./index-c833083d.js";import{I as m,a as l,b as p,c as d}from"./Icon-1fbfdd5d.js";import{j as o,a as n,F as h}from"./jsx-runtime-86dfebf6.js";import{u as c}from"./index-2ef8b458.js";import"./iframe-b8a2687a.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./ColorGrid-0a0427d9.js";import"./index-586dd939.js";import"./index-5f831440.js";function t(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},c(),s.components);return n(h,{children:[o(a,{title:"Docs/System Tokens/Color/Icon"}),`
`,n(i,{children:[o(e.h1,{id:"system-icon-color-tokens",children:"System Icon Color Tokens"}),o(e.p,{children:"System icon color tokens provide values for icons."}),o(e.h2,{id:"usage",children:"Usage"}),o(e.pre,{children:o(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.icon.default})\`,
};
`})}),o(e.pre,{children:o(e.code,{className:"language-css",children:`// styles.css
.icon {
  color: var(--cnvs-sys-color-icon-default);
}
`})}),o(e.h2,{id:"tokens",children:"Tokens"}),o(m,{}),o(e.hr,{}),o(l,{}),o(e.hr,{}),o(p,{}),o(e.hr,{}),o(d,{}),o(e.hr,{})]})]})}function y(s={}){const{wrapper:e}=Object.assign({},c(),s.components);return e?o(e,{...s,children:o(t,{...s})}):t(s)}const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const r={title:"Docs/System Tokens/Color/Icon",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:y};const O=["__page"];export{O as __namedExportsOrder,u as __page,r as default};
