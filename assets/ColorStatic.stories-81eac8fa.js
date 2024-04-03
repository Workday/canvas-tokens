import{M as c,U as i}from"./index-ca9dd7ce.js";import{j as t,a as r,F as l}from"./jsx-runtime-86dfebf6.js";import{c as m,s as d,C as p}from"./ColorGrid-0c305c7d.js";import{e as u}from"./index-4d7273bf.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const h=m("system.color.static",u.static,d),y=()=>t(p,{name:"Static Colors",palette:h});function n(s){const o=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code"},a(),s.components);return r(l,{children:[t(c,{title:"Docs/System Tokens/Color/Static"}),`
`,r(i,{children:[t(o.h1,{id:"system-static-color-tokens",children:"System Static Color Tokens"}),t(o.p,{children:"System static color tokens provide consistent color values."}),t(o.h2,{id:"usage",children:"Usage"}),t(o.pre,{children:t(o.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${system.color.static.blue.soft})\`,
};
`})}),t(o.pre,{children:t(o.code,{className:"language-css",children:`// styles.css
.info-card {
  background-color: var(--cnvs-sys-color-static-blue-soft);
}
`})}),t(o.h2,{id:"tokens",children:"Tokens"}),t(y,{})]})]})}function g(s={}){const{wrapper:o}=Object.assign({},a(),s.components);return o?t(o,{...s,children:t(n,{...s})}):n(s)}const f=()=>{throw new Error("Docs-only story")};f.parameters={docsOnly:!0};const e={title:"Docs/System Tokens/Color/Static",tags:["stories-mdx"],includeStories:["__page"]};e.parameters=e.parameters||{};e.parameters.docs={...e.parameters.docs||{},page:g};const O=["__page"];export{O as __namedExportsOrder,f as __page,e as default};
//# sourceMappingURL=ColorStatic.stories-81eac8fa.js.map
