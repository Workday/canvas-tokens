import{M as l,U as i}from"./index-fd2f364a.js";import{F as c}from"./FontFamily-ede9d63c.js";import{F as d}from"./FontSize-e466700a.js";import{F as h}from"./FontWeight-0b0562c2.js";import{T as m}from"./TypeLevel-834d0d98.js";import{j as e,a as t,F as p}from"./jsx-runtime-86dfebf6.js";import{u as a}from"./index-2ef8b458.js";import"./iframe-38ba3839.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";import"./index-586dd939.js";import"./index-4535fbc2.js";function r(n){const s=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",pre:"pre",code:"code",hr:"hr"},a(),n.components);return t(p,{children:[e(l,{title:"Docs/System Tokens/Type"}),`
`,t(i,{children:[e(s.h1,{id:"system-type-tokens",children:"System Type Tokens"}),e(s.p,{children:"System type tokens provide consistent type styles across our UI."}),e(s.h2,{id:"type-level",children:"Type Level"}),e(s.p,{children:`Type level tokens compose our lower-level type tokens (font famiy, font size, font weight, line
height, and letter spacing) into levels. They should be your go-to type tokens. Lower-level type
tokens are intended for further customization when our type levels don't meet your particular use
case.`}),e(s.h3,{id:"usage",children:"Usage"}),e(s.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const headingStyles = {
  ...system.type.levels.heading.small,
}

const bodyStyles = {
  minWidth: 48rem;
  ...system.type.levels.body.small,
};
`})}),e(s.p,{children:`They can also be consumed as CSS, Sass, or Less formats. However, in CSS type level tokens are CSS
classes, not variables. In the example below, we're applying the same type styles using CSS
variables directly.`}),e(s.pre,{children:e(s.code,{className:"language-tsx",children:`<h2 className="cnvs-sys-type-heading-small">Heading</h2>
<p className="cnvs-sys-type-body-small">Body text</p>
`})}),e(s.h3,{id:"tokens",children:"Tokens"}),t(s.p,{children:["There are four type levels: ",e(s.code,{children:"subtext"}),", ",e(s.code,{children:"body"}),", ",e(s.code,{children:"heading"}),", and ",e(s.code,{children:"title"}),`. Each level has three sizes:
`,e(s.code,{children:"small"}),", ",e(s.code,{children:"medium"}),", and ",e(s.code,{children:"large"}),"."]}),e(m,{}),e(s.hr,{}),e(s.h2,{id:"font-family",children:"Font Family"}),e(s.p,{children:"Font family tokens are useful for adjusting the font family without overwriting other font styles."}),e(s.h3,{id:"usage-1",children:"Usage"}),e(s.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontFamily: \`var(\${system.fontFamily.mono})\`,
};
`})}),e(s.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(s.pre,{children:e(s.code,{className:"language-css",children:`// styles.css
code {
  font-family: var(--cnvs-sys-font-family-mono);
}
`})}),e(s.h3,{id:"tokens-1",children:"Tokens"}),t(s.p,{children:["There are three font family tokens, ",e(s.code,{children:"default"}),", ",e(s.code,{children:"mono"}),", and ",e(s.code,{children:"global"}),". You will mostly use ",e(s.code,{children:"default"}),`
and `,e(s.code,{children:"mono"}),", but ",e(s.code,{children:"global"})," is useful for internationalization."]}),e(c,{}),e(s.hr,{}),e(s.h2,{id:"font-size",children:"Font Size"}),e(s.p,{children:"Font size tokens are useful for adjusting the font size without overwriting other font styles."}),e(s.h3,{id:"usage-2",children:"Usage"}),e(s.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontSize: \`var(\${system.fontSize.heading.small})\`,
};
`})}),e(s.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(s.pre,{children:e(s.code,{className:"language-css",children:`// styles.css
h2 {
  font-size: var(--cnvs-sys-font-size-heading-small);
}
`})}),e(s.h3,{id:"tokens-2",children:"Tokens"}),e(s.p,{children:"Font size token names correlate the the the type level where they're used."}),e(d,{}),e(s.hr,{}),e(s.h2,{id:"font-weight",children:"Font Weight"}),e(s.p,{children:"Font weight tokens are useful for adjusting the font weight without overwriting other font styles."}),e(s.h3,{id:"usage-3",children:"Usage"}),e(s.p,{children:"These tokens can be consumed as a JavaScript / TypeScript object."}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  fontWeight: \`var(\${system.fontWeight.bold})\`,
};
`})}),e(s.p,{children:"They can also be consumed as CSS, Sass, or Less variables."}),e(s.pre,{children:e(s.code,{className:"language-css",children:`// styles.css
.bold {
  font-weight: var(--cnvs-sys-font-weight-bold);
}
`})}),e(s.h3,{id:"tokens-3",children:"Tokens"}),e(s.p,{children:"Font weight token names follow web-standard font-weight names."}),e(h,{})]})]})}function y(n={}){const{wrapper:s}=Object.assign({},a(),n.components);return s?e(s,{...n,children:e(r,{...n})}):r(n)}const g=()=>{throw new Error("Docs-only story")};g.parameters={docsOnly:!0};const o={title:"Docs/System Tokens/Type",tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:y};const L=["__page"];export{L as __namedExportsOrder,g as __page,o as default};
//# sourceMappingURL=Type.stories-2ccf3fd6.js.map
