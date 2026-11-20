import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as o}from"./index-Pe1yh6Xi.js";import{M as i,U as r}from"./index-QYG3jjN8.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function t(n){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Tokens/System/Overview"}),`
`,e.jsxs(r,{children:[e.jsx(s.h1,{id:"system-tokens",children:"System Tokens"}),e.jsxs(s.p,{children:["System tokens are ",e.jsx(s.strong,{children:"themed variables"}),` intended to provide application-wide theming. They are not
connected to brand tokens, which are tenant-specific.`]}),e.jsx(s.h2,{id:"usage",children:"Usage"}),e.jsxs(s.p,{children:[`System tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well. This is discussed further in the
`,e.jsx(s.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike JavaScript variables, CSS custom
properties (variables) need to be wrapped in `,e.jsx(s.code,{children:"var()"}),` to be valid. If you're new to CSS variables, it
might take a bit for that to feel intuitive.`]}),e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import {system} from '@workday/canvas-tokens-web';

const styles = {
  boxShadow: \`var(\${system.depth[2]})\`,
  padding: \`var(\${system.space.x4})\`,
};
`})}),e.jsx(s.p,{children:`They can also be consumed as CSS variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';

.card {
  background-color: var(--cnvs-sys-depth-2);
  padding: var(--cnvs-sys-space-x4);
}
`})}),e.jsx(s.h2,{id:"tokens",children:"Tokens"}),e.jsx(s.p,{children:`There are several token collections within system tokens. You can find more documentation on them at
the links below.`}),e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-breakpoint--docs",children:"Breakpoint"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/docs-system-tokens-depth--docs",children:"Depth"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/docs-system-tokens-motion--docs",children:"Motion"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/docs-system-tokens-shape--docs",children:"Shape"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/docs-system-tokens-space--docs",children:"Space"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-type-levels--docs",children:"Type Level"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-font-family--docs",children:"Font Family"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-font-size--docs",children:"Font Size"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-font-weight--docs",children:"Font Weight"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-line-height--docs",children:"Line Height"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/docs/tokens-system-type-letter-spacing--docs",children:"Letter Spacing"})}),`
`]})]})]})}function k(n={}){const{wrapper:s}={...o(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{k as default};
