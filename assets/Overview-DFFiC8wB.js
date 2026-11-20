import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as n}from"./index-Pe1yh6Xi.js";import{M as a,U as r}from"./index-QYG3jjN8.js";import{N as i}from"./index-CZiU_jgw.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";import"./Card-CLHJSwyV.js";import"./cs-DaNmsJLN.js";import"./SystemIcon-8VNoNPjy.js";function o(t){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",hr:"hr",p:"p",pre:"pre",strong:"strong",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Tokens/Base/Overview"}),`
`,e.jsxs(r,{children:[e.jsx(s.h1,{id:"base-color-tokens",children:"Base Color Tokens"}),e.jsxs(s.p,{children:[`Base tokens are the foundation of our token system. They provide the core values for our brand and
system tokens. Base tokens are `,e.jsx(s.strong,{children:"not themed variables"}),`, so you should generally opt to use system
and brand tokens first. However, if you're not concerned with theming a particular property, using a
base token directly is an acceptable option.`]}),e.jsx(s.h2,{id:"usage",children:"Usage"}),e.jsxs(s.p,{children:[`Base tokens can be consumed as a JavaScript / TypeScript object. Each token value references a CSS
variable, so you'll need to have the CSS variables imported in your application as well. This is
discussed further in the `,e.jsx(s.a,{href:"/docs/docs-getting-started--docs",children:"Getting Started guide"}),`. Unlike
JavaScript variables, CSS custom properties (variables) need to be wrapped in `,e.jsx(s.code,{children:"var()"}),` to be valid.
If you're new to CSS variables, it might take a bit for that to feel intuitive.`]}),e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:`In the example below, we're importing CSS variables in the file directly for clarity. But you'll
likely want to do this at the top-level of your application to avoid redundancy and
unintentionally overwriting values.`}),`
`]}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/base/_variables.css';
import {base} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: \`var(\${base.blue400})\`,
  color: \`var(\${base.neutral0})\`,
};
`})}),e.jsx(s.p,{children:`They can also be consumed as CSS variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`// styles.css
@import '@workday/canvas-tokens-web/css/base/_variables.css';

.button {
  background-color: var(--cnvs-base-palette-blue-400);
  color: var(--cnvs-base-palette-neutral-0);
}
`})}),e.jsx(s.hr,{}),e.jsx(i,{items:[{title:"Color Palette",description:"The base color tokens.",link:"/docs/tokens-base-color-palette--docs"},{title:"Size",description:"The baseline, font size and size scale.",link:"/docs/tokens-base-size--docs"},{title:"Opacity",description:"The base opacity values.",link:"/docs/tokens-base-opacity--docs"},{title:"Motion",description:"Durations and easing curves.",link:"/docs/tokens-base-motion--docs"},{title:"Type",description:"Font families, weights and letter spacing.",link:"/docs/tokens-base-type--docs"}]})]})]})}function j(t={}){const{wrapper:s}={...n(),...t.components};return s?e.jsx(s,{...t,children:e.jsx(o,{...t})}):o(t)}export{j as default};
