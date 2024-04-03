import{M as m,U as d}from"./index-ca9dd7ce.js";import{j as t,a as n,F as p}from"./jsx-runtime-86dfebf6.js";import{a as x,s as c,c as h,C as l}from"./ColorGrid-0c305c7d.js";import{e as o}from"./index-4d7273bf.js";import{u as i}from"./index-2ef8b458.js";import"./iframe-d7ae7709.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-7257fd52.js";const u=x("system.color.text",{default:o.text.default,strong:o.text.strong,stronger:o.text.stronger,hint:o.text.hint,disabled:o.text.disabled,inverse:o.text.inverse}).sort(c),y=()=>t(l,{name:"Text Default Colors",palette:u}),g=h("system.color.text",{primary:o.text.primary,caution:o.text.caution,critical:o.text.critical},c),f=()=>t(l,{name:"Text Status Colors",palette:g});function a(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},i(),s.components);return n(p,{children:[t(m,{title:"Docs/System Tokens/Color/Text"}),`
`,n(d,{children:[t(e.h1,{id:"system-text-color-tokens",children:"System Text Color Tokens"}),t(e.p,{children:"System text color tokens provide values for typography."}),t(e.h2,{id:"usage",children:"Usage"}),t(e.pre,{children:t(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.text.default})\`,
};
`})}),t(e.pre,{children:t(e.code,{className:"language-css",children:`// styles.css
.card-text {
  color: var(--cnvs-sys-color-text-default);
}
`})}),t(e.hr,{}),t(e.h2,{id:"tokens",children:"Tokens"}),t(y,{}),t(e.hr,{}),t(f,{}),t(e.hr,{})]})]})}function C(s={}){const{wrapper:e}=Object.assign({},i(),s.components);return e?t(e,{...s,children:t(a,{...s})}):a(s)}const T=()=>{throw new Error("Docs-only story")};T.parameters={docsOnly:!0};const r={title:"Docs/System Tokens/Color/Text",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:C};const U=["__page"];export{U as __namedExportsOrder,T as __page,r as default};
//# sourceMappingURL=ColorText.stories-af5a6635.js.map
