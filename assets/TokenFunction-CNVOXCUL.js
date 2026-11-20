import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as d,U as a}from"./index-QYG3jjN8.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function t(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Token Function"}),`
`,e.jsxs(a,{children:[e.jsx(n.h1,{id:"the-token-function",children:"The token() Function"}),e.jsxs(n.p,{children:[e.jsx(n.code,{children:"token()"}),` takes a token name and returns a reference to the matching CSS variable. It's an
alternative to writing CSS variable names by hand: code editors check the token name as you type, so
a wrong name is caught before the page is built.`]}),e.jsxs(n.p,{children:["Plain CSS variables remain the recommended approach. Use ",e.jsx(n.code,{children:"token()"}),` when code needs to refer to a
token by name, for example in styles written in JavaScript or TypeScript.`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"token()"})," was added in v5. See the ",e.jsx(n.a,{href:"/docs/guides-upgrade-guides-v5-overview--docs",children:"v5 upgrade guide"}),"."]}),`
`]}),e.jsx(n.h2,{id:"import",children:"Import"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import {token} from '@workday/canvas-tokens-web/token';
`})}),e.jsx(n.p,{children:`The function lives in its own module, so projects that don't use it don't load it. The package
declares no side effects, so bundlers remove it when it's unused.`}),e.jsxs(n.p,{children:[e.jsx(n.code,{children:"token()"}),` only returns a reference. The variable resolves when the matching stylesheet is loaded, so
make sure you import the Canvas Tokens CSS in your application.`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import '@workday/canvas-tokens-web/css/index.css';
`})}),e.jsx(n.h2,{id:"token-names",children:"Token names"}),e.jsx(n.p,{children:"A token name is the token's path joined with dots, in the same form used across these docs:"}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Level"}),e.jsx(n.th,{children:"Name"}),e.jsx(n.th,{children:"Returns"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"System"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"color.surface.default"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"var(--cnvs-sys-color-surface-default)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"System"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"shape.md"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"var(--cnvs-sys-shape-md)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Palette"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"blue.500"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"var(--cnvs-base-palette-blue-500)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Base"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"base.size.100"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"var(--cnvs-base-size-100)"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Brand"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"brand.primary.600"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"var(--cnvs-brand-primary-600)"})})]})]})]}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"System and palette tokens"}),` don't carry their level in the name. System tokens resolve to
`,e.jsx(n.code,{children:"--cnvs-sys-*"})," and palette tokens to ",e.jsx(n.code,{children:"--cnvs-base-palette-*"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Base, brand and component tokens"})," keep their level as the first part of the name."]}),`
`,e.jsx(n.li,{children:"The name is converted to a variable name by replacing dots with dashes and lowercasing."}),`
`]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`token('color.surface.default');
// 'var(--cnvs-sys-color-surface-default)'

token('base.size.100');
// 'var(--cnvs-base-size-100)'
`})}),e.jsx(n.h2,{id:"fallback",children:"Fallback"}),e.jsxs(n.p,{children:[`Pass a fallback as the second argument for a value that may be missing. The fallback is a CSS
variable name, not a token name. A fallback that is already a `,e.jsx(n.code,{children:"var()"})," is used as is."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`token('color.surface.default', '--app-surface');
// 'var(--cnvs-sys-color-surface-default, var(--app-surface))'

token('color.surface.default', 'var(--app-surface)');
// 'var(--cnvs-sys-color-surface-default, var(--app-surface))'
`})}),e.jsx(n.h2,{id:"type-tokens",children:"Type tokens"}),e.jsx(n.p,{children:`A type level token returns a whole text style in one call, covering font family, weight, size, line
height and letter spacing. Spread it into a style object.`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`token('type.body.md');
// {
//   fontFamily:    'var(--cnvs-sys-font-family-default)',
//   fontWeight:    'var(--cnvs-sys-font-weight-regular)',
//   fontSize:      'var(--cnvs-sys-font-size-body-md)',
//   lineHeight:    'var(--cnvs-sys-line-height-body-md)',
//   letterSpacing: 'var(--cnvs-sys-letter-spacing-body-md)'
// }

const styles = {
  ...token('type.body.md'),
  color: token('color.fg.default'),
};
`})}),e.jsxs(n.p,{children:["The available type tokens are ",e.jsx(n.code,{children:"type.subtext"}),", ",e.jsx(n.code,{children:"type.body"}),", ",e.jsx(n.code,{children:"type.heading"})," and ",e.jsx(n.code,{children:"type.title"}),`, each in
`,e.jsx(n.code,{children:"sm"}),", ",e.jsx(n.code,{children:"md"})," and ",e.jsx(n.code,{children:"lg"}),". Type level tokens don't accept a fallback."]}),e.jsx(n.h2,{id:"typescript",children:"TypeScript"}),e.jsx(n.p,{children:`Every token name is typed, so an unknown name is a build-time error and editors autocomplete names
and show each token's raw value on hover. Return types are exact string types. The module also
exports helper types:`}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Token"})}),e.jsx(n.td,{children:"Every token name"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"ActiveToken"})}),e.jsx(n.td,{children:"Every token name that isn't deprecated"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"DeprecatedToken"})}),e.jsx(n.td,{children:"Token names that still work but will be removed in a later major"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"TypeToken"})}),e.jsxs(n.td,{children:["The type level token names, such as ",e.jsx(n.code,{children:"type.body.md"})]})]})]})]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import {token} from '@workday/canvas-tokens-web/token';
import type {ActiveToken} from '@workday/canvas-tokens-web/token';

const getColor = (name: ActiveToken) => token(name);
`})}),e.jsx(n.h2,{id:"things-to-know",children:"Things to know"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:`A name that isn't a token isn't rejected at run time. In TypeScript the error appears at build
time. In plain JavaScript the call returns a reference that resolves to nothing.`}),`
`,e.jsxs(n.li,{children:[`Deprecated names still return a variable, but they're marked deprecated in editors. Move to the
replacement listed in the `,e.jsx(n.a,{href:"/docs/guides-upgrade-guides-v5-overview--docs#deprecations",children:"v5 upgrade guide"}),"."]}),`
`,e.jsxs(n.li,{children:["Each call takes about 0.2 microseconds. Call ",e.jsx(n.code,{children:"token()"}),` once when the module loads, not on every
render.`]}),`
`,e.jsxs(n.li,{children:[`Where code only applies a value to an element, write the CSS variable directly in the stylesheet
instead. Keep `,e.jsx(n.code,{children:"token()"})," for places that build styles in code."]}),`
`]})]})]})}function v(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{v as default};
