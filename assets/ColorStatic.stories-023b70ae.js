import{M as c,U as i}from"./index-5e5e9a90.js";import{S as m}from"./Static-afd808c7.js";import{j as t,a as r,F as l}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-fba5971b.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./ColorGrid-4f4d6ab1.js";import"./index-7257fd52.js";import"./index-1d17cb12.js";function n(o){const e=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code"},a(),o.components);return r(l,{children:[t(c,{title:"Docs/System Tokens/Color/Static"}),`
`,r(i,{children:[t(e.h1,{id:"system-static-color-tokens",children:"System Static Color Tokens"}),t(e.p,{children:"System static color tokens provide consistent color values."}),t(e.h2,{id:"usage",children:"Usage"}),t(e.pre,{children:t(e.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${system.color.static.blue.soft})\`,
};
`})}),t(e.pre,{children:t(e.code,{className:"language-css",children:`// styles.css
.info-card {
  background-color: var(--cnvs-sys-color-static-blue-soft);
}
`})}),t(e.h2,{id:"tokens",children:"Tokens"}),t(m,{})]})]})}function d(o={}){const{wrapper:e}=Object.assign({},a(),o.components);return e?t(e,{...o,children:t(n,{...o})}):n(o)}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Static",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:d};const x=["__page"];export{x as __namedExportsOrder,p as __page,s as default};
//# sourceMappingURL=ColorStatic.stories-023b70ae.js.map
