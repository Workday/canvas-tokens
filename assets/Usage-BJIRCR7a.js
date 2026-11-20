import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as t,U as o}from"./index-QYG3jjN8.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function s(a){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...r(),...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Tokens/Brand/Usage"}),`
`,e.jsxs(o,{children:[e.jsx(n.h2,{id:"usage",children:"Usage"}),e.jsxs(n.p,{children:[`Brand tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well. This is discussed further in the
`,e.jsx(n.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike JavaScript variables, CSS custom
properties (variables) need to be wrapped in `,e.jsx(n.code,{children:"var()"}),` to be valid. If you're new to CSS variables, it
might take a bit for that to feel intuitive.`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';
import {brand} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${brand.primary.base})\`,
  color: \`var(\${brand.primary.accent})\`,
};
`})}),e.jsx(n.p,{children:`They can also be consumed as CSS variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';

.button {
  background-color: var(--cnvs-brand-primary-base);
  color: var(--cnvs-brand-primary-accent);
}
`})})]})]})}function y(a={}){const{wrapper:n}={...r(),...a.components};return n?e.jsx(n,{...a,children:e.jsx(s,{...a})}):s(a)}export{y as default};
