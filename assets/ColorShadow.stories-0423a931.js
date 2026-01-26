import{M as d,U as m}from"./index-d36e52b4.js";import{j as o,a as r,F as l}from"./jsx-runtime-86dfebf6.js";import{b as i,s as h,C as p}from"./ColorGrid-02eb65c2.js";import{c as a}from"./index-4ff1bdec.js";import{u as c}from"./index-2ef8b458.js";import"./iframe-30d5c690.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./index-bd8a2091.js";const w=i("system.color.shadow",{base:a.shadow.base,ambient:a.shadow.ambient}).sort(h),y=()=>o(p,{name:"Shadow Colors",palette:w,variableType:"system"});function n(e){const s=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},c(),e.components);return r(l,{children:[o(d,{title:"Docs/System Tokens/Color/Shadow"}),`
`,r(m,{children:[o(s.h1,{id:"shadow-colors",children:"Shadow Colors"}),o(s.p,{children:"System shadow color tokens provide values for box shadow."}),o(s.h2,{id:"usage",children:"Usage"}),o(s.pre,{children:o(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`0 0 0 var(\${system.color.shadow['1']})\`,
};
`})}),o(s.pre,{children:o(s.code,{className:"language-css",children:`// styles.css
.card-text {
  boxshadow: 0 0 0 var(--cnvs-sys-color-shadow-1);
}
`})}),o(s.hr,{}),o(s.h2,{id:"tokens",children:"Tokens"}),o(y,{}),o(s.hr,{})]})]})}function u(e={}){const{wrapper:s}=Object.assign({},c(),e.components);return s?o(s,{...e,children:o(n,{...e})}):n(e)}const g=()=>{throw new Error("Docs-only story")};g.parameters={docsOnly:!0};const t={title:"Docs/System Tokens/Color/Shadow",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:u};const P=["__page"];export{P as __namedExportsOrder,g as __page,t as default};
