import{M as m,U as p}from"./index-ca9dd7ce.js";import{j as r,a as d,F as u}from"./jsx-runtime-86dfebf6.js";import{a as c,s as n,c as b,C as a}from"./ColorGrid-0c305c7d.js";import{e as o}from"./index-4d7273bf.js";import{u as i}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const h=c("system.color.border",{container:o.border.container,divider:o.border.divider,primary:o.border.primary.default,inverse:o.border.inverse,transparent:o.border.transparent}).sort(n),y=()=>r(a,{name:"Border Colors",palette:h}),C=c("system.color.border.contrast",o.border.contrast).sort(n),g=()=>r(a,{name:"Border Contrast Colors",palette:C}),B=c("system.color.border.input",o.border.input).sort(n),f=()=>r(a,{name:"Border Input Colors",palette:B}),v=b("system.color.border",{caution:o.border.caution,critical:o.border.critical},n),_=()=>r(a,{name:"Border Status Colors",palette:v});function l(t){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},i(),t.components);return d(u,{children:[r(m,{title:"Docs/System Tokens/Color/Border"}),`
`,d(p,{children:[r(e.h1,{id:"system-border-color-tokens",children:"System Border Color Tokens"}),r(e.p,{children:"System border color tokens provide values to create clear delineations between content."}),r(e.h2,{id:"usage",children:"Usage"}),r(e.pre,{children:r(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  borderColor: \`var(\${system.color.border.container})\`,
};
`})}),r(e.pre,{children:r(e.code,{className:"language-css",children:`// styles.css
.card {
  border-color: var(--cnvs-sys-color-border-container);
}
`})}),r(e.h2,{id:"tokens",children:"Tokens"}),r(y,{}),r(e.hr,{}),r(g,{}),r(e.hr,{}),r(f,{}),r(e.hr,{}),r(_,{})]})]})}function k(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?r(e,{...t,children:r(l,{...t})}):l(t)}const S=()=>{throw new Error("Docs-only story")};S.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Border",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:k};const F=["__page"];export{F as __namedExportsOrder,S as __page,s as default};
//# sourceMappingURL=ColorBorder.stories-d2917b6e.js.map
