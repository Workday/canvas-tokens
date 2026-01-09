import{M as c,U as i}from"./index-fe986cc6.js";import{S as m}from"./Static-9a2e07db.js";import{j as t,a as r,F as l}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-e0eb6041.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./ColorGrid-f71d4fda.js";import"./index-586dd939.js";import"./index-5f831440.js";function n(e){const o=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code"},a(),e.components);return r(l,{children:[t(c,{title:"Docs/System Tokens/Color/Static"}),`
`,r(i,{children:[t(o.h1,{id:"system-static-color-tokens",children:"System Static Color Tokens"}),t(o.p,{children:"System static color tokens provide consistent color values."}),t(o.h2,{id:"usage",children:"Usage"}),t(o.pre,{children:t(o.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${system.color.static.blue.soft})\`,
};
`})}),t(o.pre,{children:t(o.code,{className:"language-css",children:`// styles.css
.info-card {
  background-color: var(--cnvs-sys-color-static-blue-soft);
}
`})}),t(o.h2,{id:"tokens",children:"Tokens"}),t(m,{})]})]})}function p(e={}){const{wrapper:o}=Object.assign({},a(),e.components);return o?t(o,{...e,children:t(n,{...e})}):n(e)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Static",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:p};const j=["__page"];export{j as __namedExportsOrder,d as __page,s as default};
