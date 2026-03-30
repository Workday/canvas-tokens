import{M as c,U as i}from"./index-DwNImctg.js";import{B as d}from"./Border-CBcXuaTQ.js";import{j as e,a as s,F as m}from"./jsx-runtime-BIhOmZ6Z.js";import{useMDXComponents as a}from"./index-DkZfk_su.js";import"./iframe-Dhqi1irQ.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-Cy8TUs5w.js";import"./index-BBkUAzwr.js";import"./index-CxRJxNtB.js";import"./index-_hgweFts.js";import"./index-DrFu-skq.js";import"./ColorGrid-EQ5c26ib.js";import"./index-BsydbUoE.js";import"./index-DV9F5XLP.js";function n(o){const r=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code"},a(),o.components);return s(m,{children:[e(c,{title:"Docs/System Tokens/Color/Border"}),`
`,s(i,{children:[e(r.h1,{id:"border-colors",children:"Border Colors"}),e(r.p,{children:"System border color tokens provide values to create clear delineations between content."}),e(r.h2,{id:"usage",children:"Usage"}),e(r.pre,{children:e(r.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  borderColor: \`var(\${system.color.border.container})\`,
};
`})}),e(r.pre,{children:e(r.code,{className:"language-css",children:`// styles.css
.card {
  border-color: var(--cnvs-sys-color-border-container);
}
`})}),e(r.h2,{id:"tokens",children:"Tokens"}),e(d,{})]})]})}function l(o={}){const{wrapper:r}=Object.assign({},a(),o.components);return r?e(r,{...o,children:e(n,{...o})}):n(o)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const t={title:"Docs/System Tokens/Color/Border",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:l};const j=["__page"];export{j as __namedExportsOrder,p as __page,t as default};
