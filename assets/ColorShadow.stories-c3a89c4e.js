import{M as c,U as d}from"./index-0d073df7.js";import{S as m}from"./Shadow-3eb31053.js";import{j as o,a as t,F as i}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-2d738cd7.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./ColorGrid-e7d69f13.js";import"./index-586dd939.js";import"./index-4535fbc2.js";function n(s){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},a(),s.components);return t(i,{children:[o(c,{title:"Docs/System Tokens/Color/Shadow"}),`
`,t(d,{children:[o(e.h1,{id:"system-shadow-color-tokens",children:"System Shadow Color Tokens"}),o(e.p,{children:"System shadow color tokens provide values for box shadow."}),o(e.h2,{id:"usage",children:"Usage"}),o(e.pre,{children:o(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`0 0 0 var(\${system.color.shadow['1']})\`,
};
`})}),o(e.pre,{children:o(e.code,{className:"language-css",children:`// styles.css
.card-text {
  boxshadow: 0 0 0 var(--cnvs-sys-color-shadow-1);
}
`})}),o(e.hr,{}),o(e.h2,{id:"tokens",children:"Tokens"}),o(m,{}),o(e.hr,{})]})]})}function h(s={}){const{wrapper:e}=Object.assign({},a(),s.components);return e?o(e,{...s,children:o(n,{...s})}):n(s)}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const r={title:"Docs/System Tokens/Color/Shadow",tags:["stories-mdx"],includeStories:["__page"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:h};const v=["__page"];export{v as __namedExportsOrder,l as __page,r as default};
//# sourceMappingURL=ColorShadow.stories-c3a89c4e.js.map
