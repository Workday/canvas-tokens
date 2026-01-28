import{M as c,U as i}from"./index-1ee726b7.js";import{B as d}from"./Border-05ac0e2e.js";import{j as e,a as t,F as m}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-476c5211.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";import"./ColorGrid-02eb65c2.js";import"./index-bd8a2091.js";import"./index-4ff1bdec.js";function n(o){const r=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code"},a(),o.components);return t(m,{children:[e(c,{title:"Docs/System Tokens/Color/Border"}),`
`,t(i,{children:[e(r.h1,{id:"border-colors",children:"Border Colors"}),e(r.p,{children:"System border color tokens provide values to create clear delineations between content."}),e(r.h2,{id:"usage",children:"Usage"}),e(r.pre,{children:e(r.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  borderColor: \`var(\${system.color.border.container})\`,
};
`})}),e(r.pre,{children:e(r.code,{className:"language-css",children:`// styles.css
.card {
  border-color: var(--cnvs-sys-color-border-container);
}
`})}),e(r.h2,{id:"tokens",children:"Tokens"}),e(d,{})]})]})}function l(o={}){const{wrapper:r}=Object.assign({},a(),o.components);return r?e(r,{...o,children:e(n,{...o})}):n(o)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Border",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:l};const j=["__page"];export{j as __namedExportsOrder,p as __page,s as default};
