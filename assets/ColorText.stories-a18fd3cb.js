import{M as c,U as m}from"./index-f5fe4850.js";import{T as l,a as i}from"./Text-0579418f.js";import{j as e,a as r,F as p}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-4c83bcee.js";import"../sb-preview/runtime.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./ColorGrid-4f4d6ab1.js";import"./index-7257fd52.js";import"./index-4d7273bf.js";function n(o){const t=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},a(),o.components);return r(p,{children:[e(c,{title:"Docs/System Tokens/Color/Text"}),`
`,r(m,{children:[e(t.h1,{id:"system-text-color-tokens",children:"System Text Color Tokens"}),e(t.p,{children:"System text color tokens provide values for typography."}),e(t.h2,{id:"usage",children:"Usage"}),e(t.pre,{children:e(t.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  color: \`var(\${system.color.text.default})\`,
};
`})}),e(t.pre,{children:e(t.code,{className:"language-css",children:`// styles.css
.card-text {
  color: var(--cnvs-sys-color-text-default);
}
`})}),e(t.hr,{}),e(t.h2,{id:"tokens",children:"Tokens"}),e(l,{}),e(t.hr,{}),e(i,{}),e(t.hr,{})]})]})}function d(o={}){const{wrapper:t}=Object.assign({},a(),o.components);return t?e(t,{...o,children:e(n,{...o})}):n(o)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const s={title:"Docs/System Tokens/Color/Text",tags:["stories-mdx"],includeStories:["__page"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:d};const S=["__page"];export{S as __namedExportsOrder,h as __page,s as default};
//# sourceMappingURL=ColorText.stories-a18fd3cb.js.map
