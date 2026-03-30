import{M as d,U as m}from"./index-CvfbjBhl.js";import{j as o,a as r,F as l}from"./jsx-runtime-BIhOmZ6Z.js";import{b as i,s as h,C as p}from"./ColorGrid-EQ5c26ib.js";import{c as a}from"./index-DV9F5XLP.js";import{useMDXComponents as c}from"./index-DkZfk_su.js";import"./iframe-BEwkFiMU.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-Cy8TUs5w.js";import"./index-BBkUAzwr.js";import"./index-CxRJxNtB.js";import"./index-_hgweFts.js";import"./index-DrFu-skq.js";import"./index-BsydbUoE.js";const w=i("system.color.shadow",{base:a.shadow.base,ambient:a.shadow.ambient}).sort(h),y=()=>o(p,{name:"Shadow Colors",palette:w,variableType:"system"});function n(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},c(),s.components);return r(l,{children:[o(d,{title:"Docs/System Tokens/Color/Shadow"}),`
`,r(m,{children:[o(e.h1,{id:"shadow-colors",children:"Shadow Colors"}),o(e.p,{children:"System shadow color tokens provide values for box shadow."}),o(e.h2,{id:"usage",children:"Usage"}),o(e.pre,{children:o(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`0 0 0 var(\${system.color.shadow['1']})\`,
};
`})}),o(e.pre,{children:o(e.code,{className:"language-css",children:`// styles.css
.card-text {
  boxshadow: 0 0 0 var(--cnvs-sys-color-shadow-1);
}
`})}),o(e.hr,{}),o(e.h2,{id:"tokens",children:"Tokens"}),o(y,{}),o(e.hr,{})]})]})}function g(s={}){const{wrapper:e}=Object.assign({},c(),s.components);return e?o(e,{...s,children:o(n,{...s})}):n(s)}const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const t={title:"Docs/System Tokens/Color/Shadow",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:g};const P=["__page"];export{P as __namedExportsOrder,u as __page,t as default};
