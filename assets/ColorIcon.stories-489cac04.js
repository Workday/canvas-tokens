import{M as p,U as d}from"./index-ca9dd7ce.js";import{j as o,a,F as u}from"./jsx-runtime-86dfebf6.js";import{a as l,s as r,c as y,C as c}from"./ColorGrid-0c305c7d.js";import{e as t}from"./index-4d7273bf.js";import{u as m}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const h=l("system.color.icon",{default:t.icon.default,soft:t.icon.soft,strong:t.icon.strong,inverse:t.icon.inverse}).sort(r),f=()=>o(c,{name:"Icon Default Colors",palette:h}),g=l("system.color.icon.primary",t.icon.primary).sort(r),C=()=>o(c,{name:"Icon Primary Colors",palette:g}),v=y("system.color.icon",{positive:t.icon.positive,caution:t.icon.caution,critical:t.icon.critical},r),_=()=>o(c,{name:"Icon Status Colors",palette:v});function i(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},m(),s.components);return a(u,{children:[o(p,{title:"Docs/System Tokens/Color/Icon"}),`
`,a(d,{children:[o(e.h1,{id:"system-icon-color-tokens",children:"System Icon Color Tokens"}),o(e.p,{children:"System icon color tokens provide values for icons."}),o(e.h2,{id:"usage",children:"Usage"}),o(e.pre,{children:o(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.icon.default})\`,
};
`})}),o(e.pre,{children:o(e.code,{className:"language-css",children:`// styles.css
.icon {
  color: var(--cnvs-sys-color-icon-default);
}
`})}),o(e.h2,{id:"tokens",children:"Tokens"}),o(f,{}),o(e.hr,{}),o(C,{}),o(e.hr,{}),o(_,{}),o(e.hr,{})]})]})}function k(s={}){const{wrapper:e}=Object.assign({},m(),s.components);return e?o(e,{...s,children:o(i,{...s})}):i(s)}const I=()=>{throw new Error("Docs-only story")};I.parameters={docsOnly:!0};const n={title:"Docs/System Tokens/Color/Icon",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:k};const X=["__page"];export{X as __namedExportsOrder,I as __page,n as default};
//# sourceMappingURL=ColorIcon.stories-489cac04.js.map
