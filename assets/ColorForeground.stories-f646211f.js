import{M as i,U as m}from"./index-ca9dd7ce.js";import{j as e,a as n,F as g}from"./jsx-runtime-86dfebf6.js";import{a as u,s as c,c as p,C as l}from"./ColorGrid-0c305c7d.js";import{e as r}from"./index-4d7273bf.js";import{u as d}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const f=u("system.color.fg",{default:r.fg.default,strong:r.fg.strong,stronger:r.fg.stronger,disabled:r.fg.disabled,inverse:r.fg.inverse}).sort(c),h=()=>e(l,{name:"Foreground Default Colors",palette:f}),y=p("system.color.fg",{caution:r.fg.caution,critical:r.fg.critical},c),C=()=>e(l,{name:"Foreground Status Colors",palette:y});function a(s){const o=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},d(),s.components);return n(g,{children:[e(i,{title:"Docs/System Tokens/Color/Foreground"}),`
`,n(m,{children:[e(o.h1,{id:"system-foreground-color-tokens",children:"System Foreground Color Tokens"}),e(o.p,{children:"System foreground color tokens provide values for foreground elements."}),e(o.h2,{id:"usage",children:"Usage"}),e(o.pre,{children:e(o.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.fg.default})\`,
};
`})}),e(o.pre,{children:e(o.code,{className:"language-css",children:`// styles.css
.card {
  color: var(--cnvs-sys-color-fg-default);
}
`})}),e(o.h2,{id:"tokens",children:"Tokens"}),e(h,{}),e(o.hr,{}),e(C,{}),e(o.hr,{})]})]})}function _(s={}){const{wrapper:o}=Object.assign({},d(),s.components);return o?e(o,{...s,children:e(a,{...s})}):a(s)}const k=()=>{throw new Error("Docs-only story")};k.parameters={docsOnly:!0};const t={title:"Docs/System Tokens/Color/Foreground",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:_};const T=["__page"];export{T as __namedExportsOrder,k as __page,t as default};
//# sourceMappingURL=ColorForeground.stories-f646211f.js.map
