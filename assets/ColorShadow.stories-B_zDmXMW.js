import{M as d,U as m}from"./index-2WM9CWcf.js";import{j as o,a as r,F as l}from"./jsx-runtime-CJPOobNs.js";import{b as i,s as h,C as p}from"./ColorGrid-Bs-sg3ak.js";import{c as a}from"./index-CMGJTjKq.js";import{useMDXComponents as c}from"./index-DoV7cT2f.js";import"./iframe-Dzh_dVr4.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-B8Arh_2W.js";import"./index-QF83YFrf.js";import"./index-ChsGqxH_.js";import"./index-BRq5TIsn.js";import"./index-DyTWsQK6.js";import"./index-DrFu-skq.js";import"./index-DdDtHz5p.js";const w=i("system.color.shadow",{base:a.shadow.base,ambient:a.shadow.ambient}).sort(h),y=()=>o(p,{name:"Shadow Colors",palette:w,variableType:"system"});function n(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},c(),s.components);return r(l,{children:[o(d,{title:"Docs/System Tokens/Color/Shadow"}),`
`,r(m,{children:[o(e.h1,{id:"shadow-colors",children:"Shadow Colors"}),o(e.p,{children:"System shadow color tokens provide values for box shadow."}),o(e.h2,{id:"usage",children:"Usage"}),o(e.pre,{children:o(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`0 0 0 var(\${system.color.shadow['1']})\`,
};
`})}),o(e.pre,{children:o(e.code,{className:"language-css",children:`// styles.css
.card-text {
  boxshadow: 0 0 0 var(--cnvs-sys-color-shadow-1);
}
`})}),o(e.hr,{}),o(e.h2,{id:"tokens",children:"Tokens"}),o(y,{}),o(e.hr,{})]})]})}function g(s={}){const{wrapper:e}=Object.assign({},c(),s.components);return e?o(e,{...s,children:o(n,{...s})}):n(s)}const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const t={title:"Docs/System Tokens/Color/Shadow",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:g};const U=["__page"];export{U as __namedExportsOrder,u as __page,t as default};
