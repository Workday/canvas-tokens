import{M as u,U as g}from"./index-ca9dd7ce.js";import{j as t,a as l,F as i}from"./jsx-runtime-86dfebf6.js";import{a as c,s,c as p,C as a}from"./ColorGrid-0c305c7d.js";import{e}from"./index-4d7273bf.js";import{u as m}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const b=c("system.color.bg",{default:e.bg.default,transparent:e.bg.transparent,translucent:e.bg.translucent,overlay:e.bg.overlay}).sort(s),k=()=>t(a,{name:"Background Default Colors",palette:b}),h=c("system.color.bg.alt",e.bg.alt).sort(s),y=()=>t(a,{name:"Background Alternate Colors",palette:h}),C=c("system.color.bg.muted",e.bg.muted).sort(s),f=()=>t(a,{name:"Background Muted Colors",palette:C}),B=c("system.color.bg.contrast",e.bg.contrast).sort(s),v=()=>t(a,{name:"Background Contrast Colors",palette:B}),_=p("system.color.bg",{positive:e.bg.positive,caution:e.bg.caution,critical:e.bg.critical},s),M=()=>t(a,{name:"Background Status Colors",palette:_});function d(r){const o=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},m(),r.components);return l(i,{children:[t(u,{title:"Docs/System Tokens/Color/Background"}),`
`,l(g,{children:[t(o.h1,{id:"system-background-color-tokens",children:"System Background Color Tokens"}),t(o.p,{children:"System background color tokens provide values for surfaces."}),t(o.h2,{id:"usage",children:"Usage"}),t(o.pre,{children:t(o.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${system.color.bg.default})\`,
};
`})}),t(o.pre,{children:t(o.code,{className:"language-css",children:`// styles.css
.card {
  background-color: var(--cnvs-sys-color-bg-default);
}
`})}),t(o.h2,{id:"tokens",children:"Tokens"}),t(k,{}),t(o.hr,{}),t(y,{}),t(o.hr,{}),t(f,{}),t(o.hr,{}),t(v,{}),t(o.hr,{}),t(M,{})]})]})}function P(r={}){const{wrapper:o}=Object.assign({},m(),r.components);return o?t(o,{...r,children:t(d,{...r})}):d(r)}const S=()=>{throw new Error("Docs-only story")};S.parameters={docsOnly:!0};const n={title:"Docs/System Tokens/Color/Background",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:P};const G=["__page"];export{G as __namedExportsOrder,S as __page,n as default};
//# sourceMappingURL=ColorBackground.stories-8ed5eba4.js.map
