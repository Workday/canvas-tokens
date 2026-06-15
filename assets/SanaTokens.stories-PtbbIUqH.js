import{M as v,U as w}from"./index-CJeqKpcL.js";import{j as n,a as r,F as z}from"./jsx-runtime-CJPOobNs.js";import{s as A}from"./sana-NvYUGtu4.js";import{s as x}from"./sana-DhHci2lC.js";import{S as s}from"./index-CVZl71qS.js";import{C as p}from"./ColorGrid-Bs-sg3ak.js";import{f as T}from"./index-DdDtHz5p.js";import{useMDXComponents as b}from"./index-DoV7cT2f.js";import"./iframe-BH0Z_7Yf.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-B8Arh_2W.js";import"./index-QF83YFrf.js";import"./index-ChsGqxH_.js";import"./index-BRq5TIsn.js";import"./index-DyTWsQK6.js";import"./index-DrFu-skq.js";const j={color:{}},C=/^var\((--[a-z0-9-]+),\s*(.*)\)$/i;function f(c){const e=c.match(C);return e?{cssVar:e[1],fallback:e[2]}:{cssVar:c,fallback:c}}function u(c,e){const{cssVar:l,fallback:i}=f(c);return{cssVar:l,jsVar:T(e),value:i}}const g=({children:c})=>n("div",{"data-theme":"sana",children:c});function y(c,e){const l=c.cssVar.split("-").at(-1)||"",i=e.cssVar.split("-").at(-1)||"",d=parseInt(l.replace(/^a/i,""),10),a=parseInt(i.replace(/^a/i,""),10),o=/^a\d/i.test(l)?1:0,t=/^a\d/i.test(i)?1:0;return o!==t?o-t:d-a}function _(){const c={};for(const[e,l]of Object.entries(A)){if(typeof l!="string")continue;const{cssVar:i}=f(l);if(!i.startsWith("--cnvs-base-palette-"))continue;const d=e.replace(/(A?\d+)$/,"");if(!d)continue;const a=u(l,`base.sana.${e}`);d in c||(c[d]=[]),c[d].push(a)}for(const e of Object.keys(c))c[e].sort(y);return Object.entries(c).sort(([e],[l])=>e.localeCompare(l))}const q=_(),N=()=>n(g,{children:n(s,{children:q.map(([c,e])=>n(p,{name:c,palette:e},c))})});function O(){const c={};for(const[e,l]of Object.entries(x)){if(typeof l!="string")continue;const i=e.replace(/(A?\d+)$/,"");if(!i)continue;const d=u(l,`brand.sana.${e}`);i in c||(c[i]=[]),c[i].push(d)}for(const e of Object.keys(c))c[e].sort(y);return Object.entries(c).sort(([e],[l])=>e.localeCompare(l))}const F=O(),V=()=>n(g,{children:n(s,{children:F.map(([c,e])=>n(p,{name:c,palette:e},c))})});function*S(c,e=[]){if(typeof c=="string"){yield{path:e,value:c};return}if(c&&typeof c=="object")for(const[l,i]of Object.entries(c))yield*S(i,[...e,l])}function I(){var l;const c={},e=(l=j.color)==null?void 0:l.color;if(!e)return[];for(const[i,d]of Object.entries(e)){const a=[];for(const{path:o,value:t}of S(d)){const k=["system","sana","color","color",i,...o].join(".");a.push(u(t,k))}a.length&&(c[i]=a)}return Object.entries(c)}const M=I(),$=()=>n(g,{children:n(s,{children:M.map(([c,e])=>n(p,{name:c,palette:e},c))})});function m(c){const e=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",h3:"h3",pre:"pre",blockquote:"blockquote",hr:"hr",h4:"h4",ul:"ul",li:"li"},b(),c.components);return r(z,{children:[n(v,{title:"Docs/Sana Theme/Tokens"}),`
`,r(w,{children:[n(e.h1,{id:"sana-theme-tokens",children:"Sana Theme Tokens"}),r(e.p,{children:[`The Sana token set is an alternate theme for Canvas tokens. The values are scoped to a
`,n(e.code,{children:'[data-theme="sana"]'}),` selector, so they only apply when an ancestor element opts in to the theme.
This makes it possible to render the Sana palette inside an otherwise default Canvas application.`]}),n(e.h2,{id:"usage",children:"Usage"}),n(e.h3,{id:"css",children:"CSS"}),r(e.p,{children:["Import the Sana stylesheet alongside the standard token stylesheets. Then add ",n(e.code,{children:'data-theme="sana"'}),` to
any element you'd like to opt in (commonly the `,n(e.code,{children:"<html>"})," or ",n(e.code,{children:"<body>"}),` element, or a single subtree if
you want to scope the theme).`]}),n(e.pre,{children:n(e.code,{className:"language-css",children:`/* styles.css */
@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/component/_variables.css';
@import '@workday/canvas-tokens-web/css/sana/_variables.css';
`})}),n(e.pre,{children:n(e.code,{className:"language-html",children:`<!-- Apply the theme to a whole document... -->
<html data-theme="sana">
  ...
</html>

<!-- ...or just a subtree. -->
<section data-theme="sana">
  <button class="cnvs-button">I use Sana tokens</button>
</section>
`})}),n(e.h3,{id:"javascript--typescript",children:"JavaScript / TypeScript"}),r(e.p,{children:["Each token level (",n(e.code,{children:"base"}),", ",n(e.code,{children:"brand"}),", ",n(e.code,{children:"system"}),") ships a ",n(e.code,{children:"sana"}),` entry point. Unlike the standard JS
exports, every value is pre-wrapped with `,n(e.code,{children:"var()"}),` and includes the Sana fallback inline, so it can be
assigned directly to a style property.`]}),n(e.pre,{children:n(e.code,{className:"language-ts",children:`// styles.ts
import '@workday/canvas-tokens-web/css/sana/_variables.css';
import {base, brand, system} from '@workday/canvas-tokens-web';

const styles = {
  backgroundColor: system.sana.color.bg.default,
  color: system.sana.color.fg.default,
  borderColor: brand.sana.neutral200,
  outlineColor: base.sana.blueA300,
};
`})}),r(e.blockquote,{children:[`
`,r(e.p,{children:["The Sana CSS variables only resolve to their themed values when ",n(e.code,{children:'data-theme="sana"'}),` is present on
an ancestor element. If the attribute is missing, the fallback baked into each `,n(e.code,{children:"var()"}),` expression
is used instead.`]}),`
`]}),n(e.hr,{}),n(e.h2,{id:"base-tokens",children:"Base Tokens"}),n(e.p,{children:`Sana base tokens extend the base palette with the alpha variants and additional shades used by the
Sana surface, accent, and chart systems.`}),n(e.h3,{id:"new-base-tokens-not-in-the-default-theme",children:"New base tokens (not in the default theme)"}),r(e.h4,{id:"palette--new-a300-alpha-shades",children:["Palette — new ",n(e.code,{children:"A300"})," alpha shades"]}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"amberA300"})}),`
`,n(e.li,{children:n(e.code,{children:"azureA300"})}),`
`,n(e.li,{children:n(e.code,{children:"blueA300"})}),`
`,n(e.li,{children:n(e.code,{children:"coralA300"})}),`
`,n(e.li,{children:n(e.code,{children:"greenA300"})}),`
`,n(e.li,{children:n(e.code,{children:"indigoA300"})}),`
`,n(e.li,{children:n(e.code,{children:"magentaA300"})}),`
`,n(e.li,{children:n(e.code,{children:"orangeA300"})}),`
`,n(e.li,{children:n(e.code,{children:"purpleA300"})}),`
`,n(e.li,{children:n(e.code,{children:"redA300"})}),`
`,n(e.li,{children:n(e.code,{children:"tealA300"})}),`
`]}),n(e.h4,{id:"palette--new-neutral--slate--white-shades",children:"Palette — new neutral / slate / white shades"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"neutral150"})}),`
`,n(e.li,{children:n(e.code,{children:"neutral850"})}),`
`,n(e.li,{children:n(e.code,{children:"neutralA150"})}),`
`,n(e.li,{children:n(e.code,{children:"neutralA850"})}),`
`,n(e.li,{children:n(e.code,{children:"slate150"})}),`
`,n(e.li,{children:n(e.code,{children:"slate850"})}),`
`,n(e.li,{children:n(e.code,{children:"slateA150"})}),`
`,n(e.li,{children:n(e.code,{children:"slateA850"})}),`
`,n(e.li,{children:n(e.code,{children:"whiteA150"})}),`
`,n(e.li,{children:n(e.code,{children:"whiteA850"})}),`
`]}),n(e.h4,{id:"size--new-large-sizes",children:"Size — new large sizes"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"size1600"})}),`
`,n(e.li,{children:n(e.code,{children:"size1800"})}),`
`,n(e.li,{children:n(e.code,{children:"size2000"})}),`
`,n(e.li,{children:n(e.code,{children:"size2400"})}),`
`,n(e.li,{children:n(e.code,{children:"size2800"})}),`
`,n(e.li,{children:n(e.code,{children:"size3200"})}),`
`]}),n(e.h4,{id:"type--new-font-and-weight-tokens",children:"Type — new font and weight tokens"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"fontFamily0"})}),`
`,n(e.li,{children:n(e.code,{children:"fontWeight600"})}),`
`]}),n(e.h4,{id:"type--new-letter-spacing-scale",children:"Type — new letter-spacing scale"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"letterSpacing1"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing2"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing3"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing4"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing5"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing6"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing7"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing8"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing9"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing10"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing11"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing12"})}),`
`]}),n(e.h3,{id:"full-base-palette",children:"Full base palette"}),n(N,{}),n(e.hr,{}),n(e.h2,{id:"brand-tokens",children:"Brand Tokens"}),n(e.p,{children:`Sana brand tokens add the alpha and neutral variants used by Sana branded components such as
banners, focus rings, and selected states.`}),n(e.h3,{id:"new-brand-tokens-not-in-the-default-theme",children:"New brand tokens (not in the default theme)"}),r(e.h4,{id:"new-a300-alpha-shades",children:["New ",n(e.code,{children:"A300"})," alpha shades"]}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"primaryA300"})}),`
`,n(e.li,{children:n(e.code,{children:"criticalA300"})}),`
`,n(e.li,{children:n(e.code,{children:"cautionA300"})}),`
`,n(e.li,{children:n(e.code,{children:"positiveA300"})}),`
`]}),n(e.h4,{id:"new-brand-neutral-shades",children:"New brand neutral shades"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"neutral150"})}),`
`,n(e.li,{children:n(e.code,{children:"neutral850"})}),`
`,n(e.li,{children:n(e.code,{children:"neutralA150"})}),`
`,n(e.li,{children:n(e.code,{children:"neutralA850"})}),`
`]}),n(e.h3,{id:"full-brand-palette",children:"Full brand palette"}),n(V,{}),n(e.hr,{}),n(e.h2,{id:"system-tokens",children:"System Tokens"}),r(e.p,{children:["Sana system tokens are introduced under a brand new ",n(e.code,{children:"--cnvs-sys-color-color-*"}),` namespace (distinct
from the default `,n(e.code,{children:"--cnvs-sys-color-*"}),` tokens), so every token in this section is effectively new.
Non-color system tokens also gain new entries under existing namespaces.`]}),n(e.h3,{id:"new-system-tokens-not-in-the-default-theme",children:"New system tokens (not in the default theme)"}),n(e.h4,{id:"breakpoints",children:n(e.code,{children:"breakpoints"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"breakpoints.xxl"})}),`
`]}),n(e.h4,{id:"shape",children:n(e.code,{children:"shape"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"shape.xs"})}),`
`,n(e.li,{children:n(e.code,{children:"shape.sm"})}),`
`,n(e.li,{children:n(e.code,{children:"shape.xxl"})}),`
`,n(e.li,{children:n(e.code,{children:"shape.xxxl"})}),`
`]}),n(e.h4,{id:"lineheight",children:n(e.code,{children:"lineHeight"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"lineHeight.body.md"})}),`
`]}),n(e.h4,{id:"colorchartdivergingazurecoral",children:n(e.code,{children:"color.chart.diverging.azure.coral.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.1"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.2"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.3"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.4"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.5"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.6"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.7"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.8"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.9"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.10"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.11"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.12"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.13"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.14"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.15"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.16"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.17"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.18"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.19"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.20"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.21"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.22"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.diverging.azure.coral.23"})}),`
`]}),n(e.h4,{id:"colorchartcategorical",children:n(e.code,{children:"color.chart.categorical.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.1"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.2"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.3"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.4"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.5"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.6"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.7"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.8"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.9"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.10"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.11"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.12"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.13"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.14"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.15"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.categorical.16"})}),`
`]}),n(e.h4,{id:"colorchartsequential",children:n(e.code,{children:"color.chart.sequential.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.1"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.2"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.3"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.4"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.5"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.6"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.7"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.8"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.9"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.10"})}),`
`,n(e.li,{children:n(e.code,{children:"color.chart.sequential.11"})}),`
`]}),n(e.h4,{id:"depth",children:n(e.code,{children:"depth.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"depth.1"})}),`
`,n(e.li,{children:n(e.code,{children:"depth.2"})}),`
`,n(e.li,{children:n(e.code,{children:"depth.3"})}),`
`,n(e.li,{children:n(e.code,{children:"depth.4"})}),`
`,n(e.li,{children:n(e.code,{children:"depth.5"})}),`
`,n(e.li,{children:n(e.code,{children:"depth.6"})}),`
`]}),n(e.h4,{id:"fontfamily",children:n(e.code,{children:"fontFamily.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"fontFamily.fallback"})}),`
`]}),n(e.h4,{id:"letterspacing",children:n(e.code,{children:"letterSpacing.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.subtext.sm"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.subtext.md"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.subtext.lg"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.body.sm"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.body.md"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.body.lg"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.heading.sm"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.heading.md"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.heading.lg"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.title.sm"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.title.md"})}),`
`,n(e.li,{children:n(e.code,{children:"letterSpacing.title.lg"})}),`
`]}),n(e.h4,{id:"fontweight",children:n(e.code,{children:"fontWeight.*"})}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.code,{children:"fontWeight.regular"})}),`
`,n(e.li,{children:n(e.code,{children:"fontWeight.semibold"})}),`
`]}),n(e.h3,{id:"full-system-palette",children:"Full system palette"}),r(e.p,{children:["Each grid below is rendered inside a ",n(e.code,{children:'data-theme="sana"'}),` container so the swatches reflect the
themed values.`]}),n($,{})]})]})}function B(c={}){const{wrapper:e}=Object.assign({},b(),c.components);return e?n(e,{...c,children:n(m,{...c})}):m(c)}const D=()=>{throw new Error("Docs-only story")};D.parameters={docsOnly:!0};const h={title:"Docs/Sana Theme/Tokens",tags:["stories-mdx"],includeStories:["__page"]};h.parameters=h.parameters||{};h.parameters.docs={...h.parameters.docs||{},page:B};const ce=["__page"];export{ce as __namedExportsOrder,D as __page,h as default};
