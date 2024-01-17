import{M as c,U as p}from"./index-b215c1b6.js";import{D as i}from"./Depth-0cda6d15.js";import{j as e,a as n,F as l}from"./jsx-runtime-50e9c51e.js";import{u as a}from"./index-bda0bad7.js";import"./iframe-87fab4e0.js";import"../sb-preview/runtime.js";import"./index-ebeaab24.js";import"./index-073301bc.js";import"./index-356e4a49.js";import"./index-73dcd5d2.js";import"./index-30e3091f.js";function r(t){const s=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",hr:"hr"},a(),t.components);return n(l,{children:[e(c,{title:"Docs/System Tokens/Depth"}),`
`,n(p,{children:[e(s.h1,{id:"system-depth-tokens",children:"System Depth Tokens"}),e(s.p,{children:`System depth tokens use box shadows to help users understand the spacial relationship of objects in
our UI.`}),e(s.h2,{id:"usage",children:"Usage"}),e(s.p,{children:`Depth tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well.`}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`var(\${system.depth[2]})\`,
};
`})}),e(s.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e(s.pre,{children:e(s.code,{className:"language-css",children:`// styles.css
.card {
  background-color: var(--cnvs-sys-depth-2);
}
`})}),e(s.hr,{}),e(s.h2,{id:"tokens",children:"Tokens"}),e(s.p,{children:`These tokens use a linear step scale (1-6). As the steps increase, the shadows become larger and
more pronounced. Use more subtle shadows for components closer to the base level, and more
pronounced shadows for components further away.`}),e(i,{})]})]})}function d(t={}){const{wrapper:s}=Object.assign({},a(),t.components);return s?e(s,{...t,children:e(r,{...t})}):r(t)}const h=()=>{throw new Error("Docs-only story")};h.parameters={docsOnly:!0};const o={title:"Docs/System Tokens/Depth",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:d};const _=["__page"];export{_ as __namedExportsOrder,h as __page,o as default};
//# sourceMappingURL=Depth.stories-6720521e.js.map
