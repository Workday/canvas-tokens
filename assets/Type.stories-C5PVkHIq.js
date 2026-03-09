import{M as i,U as l}from"./index-DaW5_zi6.js";import{F as c}from"./FontFamily-JX_Jf5Gc.js";import{F as d}from"./FontSize-D7cd9iex.js";import{F as h}from"./FontWeight-4cDyCcg8.js";import{T as m}from"./TypeLevel-BEhCOvFA.js";import{j as e,a as t,F as p}from"./jsx-runtime-BIhOmZ6Z.js";import{useMDXComponents as a}from"./index-DkZfk_su.js";import"./iframe-COOsESWA.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-Cy8TUs5w.js";import"./index-BBkUAzwr.js";import"./index-CxRJxNtB.js";import"./index-_hgweFts.js";import"./index-DrFu-skq.js";import"./index-BsydbUoE.js";import"./index-DV9F5XLP.js";function r(s){const n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",hr:"hr"},a(),s.components);return t(p,{children:[e(i,{title:"Docs/System Tokens/Type/Type"}),`
`,t(l,{children:[e(n.h1,{id:"system-type-tokens",children:"System Type Tokens"}),e(n.p,{children:"System type tokens provide consistent type styles across our UI."}),e(n.h2,{id:"type-level",children:"Type Level"}),e(n.p,{children:`Type level tokens compose our lower-level type tokens (font famiy, font size, font weight, line
height, and letter spacing) into levels. They should be your go-to type tokens. Lower-level type
tokens are intended for further customization when our type levels don't meet your particular use
case.`}),e(n.h3,{id:"usage",children:"Usage"}),e(n.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const headingStyles = {
  ...system.type.levels.heading.small,
}

const bodyStyles = {
  minWidth: 48rem;
  ...system.type.levels.body.small,
};
`})}),e(n.p,{children:`They can also be consumed as CSS, Sass, or Less formats. However, in CSS type level tokens are CSS
classes, not variables. In the example below, we're applying the same type styles using CSS
variables directly.`}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<h2 className="cnvs-sys-type-heading-small">Heading</h2>
<p className="cnvs-sys-type-body-small">Body text</p>
`})}),e(n.h3,{id:"tokens",children:"Tokens"}),t(n.p,{children:["There are four type levels: ",e(n.code,{children:"subtext"}),", ",e(n.code,{children:"body"}),", ",e(n.code,{children:"heading"}),", and ",e(n.code,{children:"title"}),`. Each level has three sizes:
`,e(n.code,{children:"small"}),", ",e(n.code,{children:"medium"}),", and ",e(n.code,{children:"large"}),"."]}),e(m,{}),e(n.hr,{}),e(n.h2,{id:"font-family",children:"Font Family"}),e(n.p,{children:"Font family tokens are useful for adjusting the font family without overwriting other font styles."}),e(n.h3,{id:"usage-1",children:"Usage"}),e(n.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontFamily: \`var(\${system.fontFamily.mono})\`,
};
`})}),e(n.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(n.pre,{children:e(n.code,{className:"language-css",children:`// styles.css
code {
  font-family: var(--cnvs-sys-font-family-mono);
}
`})}),e(n.h3,{id:"tokens-1",children:"Tokens"}),t(n.p,{children:["There are three font family tokens, ",e(n.code,{children:"default"}),", ",e(n.code,{children:"mono"}),", and ",e(n.code,{children:"global"}),". You will mostly use ",e(n.code,{children:"default"}),`
and `,e(n.code,{children:"mono"}),", but ",e(n.code,{children:"global"})," is useful for internationalization."]}),e(c,{}),e(n.hr,{}),e(n.h2,{id:"font-size",children:"Font Size"}),e(n.p,{children:"Font size tokens are useful for adjusting the font size without overwriting other font styles."}),e(n.h3,{id:"usage-2",children:"Usage"}),e(n.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontSize: \`var(\${system.fontSize.heading.small})\`,
};
`})}),e(n.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(n.pre,{children:e(n.code,{className:"language-css",children:`// styles.css
h2 {
  font-size: var(--cnvs-sys-font-size-heading-small);
}
`})}),e(n.h3,{id:"tokens-2",children:"Tokens"}),e(n.p,{children:"Font size token names correlate the the the type level where they're used."}),e(d,{}),e(n.hr,{}),e(n.h2,{id:"font-weight",children:"Font Weight"}),e(n.p,{children:"Font weight tokens are useful for adjusting the font weight without overwriting other font styles."}),e(n.h3,{id:"usage-3",children:"Usage"}),e(n.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontWeight: \`var(\${system.fontWeight.bold})\`,
};
`})}),e(n.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(n.pre,{children:e(n.code,{className:"language-css",children:`// styles.css
.bold {
  font-weight: var(--cnvs-sys-font-weight-bold);
}
`})}),e(n.h3,{id:"tokens-3",children:"Tokens"}),e(n.p,{children:"Font weight token names follow web-standard font-weight names."}),e(h,{})]})]})}function y(s={}){const{wrapper:n}=Object.assign({},a(),s.components);return n?e(n,{...s,children:e(r,{...s})}):r(s)}const g=()=>{throw new Error("Docs-only story")};g.parameters={docsOnly:!0};const o={title:"Docs/System Tokens/Type/Type",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:y};const M=["__page"];export{M as __namedExportsOrder,g as __page,o as default};
