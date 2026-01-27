import{M as l,U as d}from"./index-b64adb67.js";import{S as c,D as h}from"./index-cecec8bb.js";import{N as r}from"./index-d2637191.js";import{j as n,a as t,F as p}from"./jsx-runtime-86dfebf6.js";import{u as s}from"./index-2ef8b458.js";import"./iframe-a371c53b.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-1b03fe98.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function a(o){const e=Object.assign({h1:"h1",p:"p",h4:"h4",ul:"ul",li:"li",strong:"strong",code:"code",blockquote:"blockquote",a:"a",h3:"h3"},s(),o.components);return t(p,{children:[n(l,{title:"Guides/Upgrade Guides/v3/Overview"}),`
`,t(d,{children:[n(e.h1,{id:"whats-new-in-v3",children:"What's New in v3"}),n(e.p,{children:`We've overhauled our color system to align with Workday's new brand identity, while also making
improvements to our underlying colors to be more functional, accessible, and extensible. These
updates remap our existing brand and system tokens to our new color palettes. We also introduce new
token variants that provide better cover for the use cases of Workday's diverse products.`}),n(e.h4,{id:"v2--v3",children:"v2 → v3"}),n(e.p,{children:"If you're migrating from v2.0 to v3.0, the biggest changes will be:"}),t(e.ul,{children:[`
`,t(e.li,{children:[t(e.strong,{children:["Colors now use ",n(e.code,{children:"oklch"})," instead of ",n(e.code,{children:"RGBA"})]}),`, which will result in colors being perceived
differently.`]}),`
`,t(e.li,{children:[n(e.strong,{children:"New base palette colors"}),": ",n(e.code,{children:"blue"}),", ",n(e.code,{children:"green"}),", ",n(e.code,{children:"red"}),", ",n(e.code,{children:"amber"}),", ",n(e.code,{children:"purple"}),", ",n(e.code,{children:"orange"}),", ",n(e.code,{children:"neutral"}),`,
`,n(e.code,{children:"azure"}),", ",n(e.code,{children:"magenta"}),", ",n(e.code,{children:"teal"}),", ",n(e.code,{children:"indigo"}),", ",n(e.code,{children:"coral"})," and ",n(e.code,{children:"slate"}),"."]}),`
`,t(e.li,{children:[n(e.strong,{children:'Depecation of old "fruit" based colors'}),`: Colors named after Jellybean flavors (i.e.
`,n(e.code,{children:"ToastedMarshmallow"}),") were marked as deprecated and map to the new palette colors."]}),`
`]}),t(e.blockquote,{children:[`
`,t(e.p,{children:[n(e.strong,{children:"Important"}),": The new color palette is always a ",n(e.strong,{children:"breaking change"}),`. To reduce the impact, we
strongly suggest using `,n(e.code,{children:"system"})," or ",n(e.code,{children:"brand"})," tokens instead of ",n(e.code,{children:"base"})," tokens."]}),`
`]}),n("br",{}),n(e.h4,{id:"canvas-kit-react-tokens--v3",children:"Canvas Kit React tokens → v3"}),t(e.p,{children:["If you're migrating from old tokens from ",n(e.code,{children:"@workday/canvas-kit-react/tokens"}),` follow our v14 Migration
guide that provides step-by-step migration process instructions.`]}),n(r,{title:"React Tokens Migration Guide",link:"https://workday.github.io/canvas-kit/?path=/docs/guides-tokens-migration-overview--docs"}),t(e.h4,{id:"llm-assisted-migration-",children:["LLM Assisted Migration ",n(c,{type:"ai",content:"AI Content"})]}),t(e.p,{children:["We've provided an ",n(e.strong,{children:"LLM migration mapping file"})," (",n(e.code,{children:"llm-canvas-kit-upgrade-guide-v14.txt"}),`)
specifically designed for use with LLM-based code assistants such as
`,n(e.a,{href:"https://www.cursor.so/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Cursor"}),`. It contains a compiled LLM consumption version of this v14 Upgrade
Guide. It is not intended for direct human reference or team documentation, but rather as structured
input for LLMs to automate and assist with your migration process.`]}),t(e.blockquote,{children:[`
`,t(e.p,{children:[n(e.strong,{children:"Important"}),`: LLMs can make mistakes. Please review changes to be sure they are correct using our
docs and upgrade guides`]}),`
`]}),n(e.p,{children:`This file contains a comprehensive mapping of deprected base palette token usages to their new
equivalents in v3, along with migration tips and examples and formatted for optimal LLM consumption.`}),n(e.p,{children:n(e.strong,{children:"How to use:"})}),t(e.ul,{children:[`
`,t(e.li,{children:[n(e.strong,{children:"View raw file"}),": Open the file in a new tab to see the complete migration mapping"]}),`
`,t(e.li,{children:[n(e.strong,{children:"Download as txt"}),": Save the file locally to upload or paste into your LLM/code assistant"]}),`
`,t(e.li,{children:[n(e.strong,{children:"Use with LLM"}),`: Provide the raw content to your LLM/code assistant as context for automated
migration`]}),`
`]}),n(h,{rawFileLink:"https://raw.githubusercontent.com/Workday/canvas-tokens/master/packages/canvas-tokens-docs/llm-txt/llm-token-migration-3.0.0.txt",filename:"llm-token-migration-3.0.0.txt"}),n(e.h3,{id:"rgba-to-oklch",children:"RGBA to OKLCH"}),t(e.p,{children:["Colors are designed using ",n(e.code,{children:"oklch"}),", a perceptually uniform color space. ",n(e.code,{children:"oklch"}),` ensures that two
colors with the same lightness will appear equal in brightness – a longstanding issue of traditional
color spaces like RGB and HSL.`]}),t(e.ul,{children:[`
`,n(e.li,{children:"More predictable contrast ratios"}),`
`,n(e.li,{children:"Scales well with theming, modes"}),`
`,n(e.li,{children:"Device and gamut independent"}),`
`]}),n(r,{title:"Learn more about OKLCH",link:"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch"}),n(e.h3,{id:"new-base-palette",children:"New Base Palette"}),t(e.p,{children:[`To reduce ambiguity over color values, Base colors have been renamed to use common terms (like
`,n(e.code,{children:"red.600"}),`) that are easier to understand for everyone. The color scale has been increased from 5 to
13 steps. Steps in the new scale go from 0 (white) to 1000 (black), each step being designed for at
least one use case. Colors are designed to feel perceptually balanced - meaning colors with the same
step number (ex. `,n(e.code,{children:"red.200"})," and ",n(e.code,{children:"blue.200"}),") will feel similar in brightness and saturation."]}),t(e.blockquote,{children:[`
`,t(e.p,{children:[n(e.strong,{children:"Important:"}),` The previous palette "fruity" colors are deprecated and mapped to use new palette
colors. Be aware that the color scale in v3 uses `,n(e.code,{children:"oklch"})," which is different to ",n(e.code,{children:"rgb"}),` and the new
color of deprecated token can be not 1:1 replacement of the old color.`]}),`
`]}),n("br",{}),n(r,{title:"Base Tokens",description:"Check newest palette",link:"https://workday.github.io/canvas-tokens/?path=/docs/docs-base-tokens--docs#color"}),n(e.h4,{id:"brand-and-system-tokens",children:"Brand and System Tokens"}),n(e.p,{children:`Brand and system tokens have been revised to offer improved flexibility and clarity. As part of this
update, many legacy color values have been replaced with new palette colors, expanding the palette
to promote consistency and accessibility throughout the system. The main changes are:`}),t(e.ul,{children:[`
`,n(e.li,{children:`The brand token set has been extended to provide more flexibility and coverage for common use
cases.`}),`
`,t(e.li,{children:["New system color groups have been added: ",n(e.code,{children:"ai"}),", ",n(e.code,{children:"info"})," and ",n(e.code,{children:"transparent"}),`, other groups have been
extended by new tokens.`]}),`
`,t(e.li,{children:["The fully transparent color changed from ",n(e.code,{children:"sys.color.bg.transparent"}),` to
`,n(e.code,{children:"sys.color.bg.transparen.default"}),"."]}),`
`,t(e.li,{children:["New system shape token has been added, ",n(e.code,{children:"system.shape.x1Half"}),`, to support 6px value as border
radius.`]}),`
`]}),n(r,{title:"New palette colors",link:"https://workday.github.io/canvas-tokens/?path=/docs/docs-base-tokens--docs"}),n(e.h4,{id:"canvas-kit-react-compatability",children:"Canvas Kit React compatability"}),n(e.p,{children:`For optimal brand alignment, we recommend using v3 tokens with Canvas Kit React v14. While it is
possible to use v3 tokens with earlier versions, this may result in visual inconsistencies due to
changes in the values of deprecated tokens.`})]})]})}function m(o={}){const{wrapper:e}=Object.assign({},s(),o.components);return e?n(e,{...o,children:n(a,{...o})}):a(o)}const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const i={title:"Guides/Upgrade Guides/v3/Overview",tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:m};const _=["__page"];export{_ as __namedExportsOrder,u as __page,i as default};
