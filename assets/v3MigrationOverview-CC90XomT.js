import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as i,U as a}from"./index-QYG3jjN8.js";import{S as l,D as d}from"./index-DgjJ8-qR.js";import{N as t}from"./index-BAEi9xPx.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function o(n){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Guides/Upgrade Guides/v3/Overview"}),`
`,e.jsxs(a,{children:[e.jsx(s.h1,{id:"whats-new-in-v3",children:"What's New in v3"}),e.jsx(s.p,{children:`We've overhauled our color system to align with Workday's new brand identity, while also making
improvements to our underlying colors to be more functional, accessible, and extensible. These
updates remap our existing brand and system tokens to our new color palettes. We also introduce new
token variants that provide better cover for the use cases of Workday's diverse products.`}),e.jsx(s.h4,{id:"v2--v3",children:"v2 → v3"}),e.jsx(s.p,{children:"If you're migrating from v2.0 to v3.0, the biggest changes will be:"}),e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["Colors now use ",e.jsx(s.code,{children:"oklch"})," instead of ",e.jsx(s.code,{children:"RGBA"})]}),`, which will result in colors being perceived
differently.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"New base palette colors"}),": ",e.jsx(s.code,{children:"blue"}),", ",e.jsx(s.code,{children:"green"}),", ",e.jsx(s.code,{children:"red"}),", ",e.jsx(s.code,{children:"amber"}),", ",e.jsx(s.code,{children:"purple"}),", ",e.jsx(s.code,{children:"orange"}),", ",e.jsx(s.code,{children:"neutral"}),`,
`,e.jsx(s.code,{children:"azure"}),", ",e.jsx(s.code,{children:"magenta"}),", ",e.jsx(s.code,{children:"teal"}),", ",e.jsx(s.code,{children:"indigo"}),", ",e.jsx(s.code,{children:"coral"})," and ",e.jsx(s.code,{children:"slate"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:'Depecation of old "fruit" based colors'}),`: Colors named after Jellybean flavors (i.e.
`,e.jsx(s.code,{children:"ToastedMarshmallow"}),") were marked as deprecated and map to the new palette colors."]}),`
`]}),e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Important"}),": The new color palette is always a ",e.jsx(s.strong,{children:"breaking change"}),`. To reduce the impact, we
strongly suggest using `,e.jsx(s.code,{children:"system"})," or ",e.jsx(s.code,{children:"brand"})," tokens instead of ",e.jsx(s.code,{children:"base"})," tokens."]}),`
`]}),e.jsx("br",{}),e.jsx(s.h4,{id:"canvas-kit-react-tokens--v3",children:"Canvas Kit React tokens → v3"}),e.jsxs(s.p,{children:["If you're migrating from old tokens from ",e.jsx(s.code,{children:"@workday/canvas-kit-react/tokens"}),` follow our v14 Migration
guide that provides step-by-step migration process instructions.`]}),e.jsx(t,{title:"React Tokens Migration Guide",link:"https://workday.github.io/canvas-kit/?path=/docs/guides-tokens-migration-overview--docs"}),e.jsxs(s.h4,{id:"llm-assisted-migration-",children:["LLM Assisted Migration ",e.jsx(l,{type:"ai",content:"AI Content"})]}),e.jsxs(s.p,{children:["We've provided an ",e.jsx(s.strong,{children:"LLM migration mapping file"})," (",e.jsx(s.code,{children:"llm-canvas-kit-upgrade-guide-v14.txt"}),`)
specifically designed for use with LLM-based code assistants such as
`,e.jsx(s.a,{href:"https://www.cursor.so/",rel:"nofollow",children:"Cursor"}),`. It contains a compiled LLM consumption version of this v14 Upgrade
Guide. It is not intended for direct human reference or team documentation, but rather as structured
input for LLMs to automate and assist with your migration process.`]}),e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Important"}),`: LLMs can make mistakes. Please review changes to be sure they are correct using our
docs and upgrade guides`]}),`
`]}),e.jsx(s.p,{children:`This file contains a comprehensive mapping of deprected base palette token usages to their new
equivalents in v3, along with migration tips and examples and formatted for optimal LLM consumption.`}),e.jsx(s.p,{children:e.jsx(s.strong,{children:"How to use:"})}),e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"View raw file"}),": Open the file in a new tab to see the complete migration mapping"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Download as txt"}),": Save the file locally to upload or paste into your LLM/code assistant"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Use with LLM"}),`: Provide the raw content to your LLM/code assistant as context for automated
migration`]}),`
`]}),e.jsx(d,{rawFileLink:"https://raw.githubusercontent.com/Workday/canvas-tokens/master/packages/canvas-tokens-docs/llm-txt/llm-token-migration-3.0.0.txt",filename:"llm-token-migration-3.0.0.txt"}),e.jsx(s.h3,{id:"rgba-to-oklch",children:"RGBA to OKLCH"}),e.jsxs(s.p,{children:["Colors are designed using ",e.jsx(s.code,{children:"oklch"}),", a perceptually uniform color space. ",e.jsx(s.code,{children:"oklch"}),` ensures that two
colors with the same lightness will appear equal in brightness – a longstanding issue of traditional
color spaces like RGB and HSL.`]}),e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"More predictable contrast ratios"}),`
`,e.jsx(s.li,{children:"Scales well with theming, modes"}),`
`,e.jsx(s.li,{children:"Device and gamut independent"}),`
`]}),e.jsx(t,{title:"Learn more about OKLCH",link:"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch"}),e.jsx(s.h3,{id:"new-base-palette",children:"New Base Palette"}),e.jsxs(s.p,{children:[`To reduce ambiguity over color values, Base colors have been renamed to use common terms (like
`,e.jsx(s.code,{children:"red.600"}),`) that are easier to understand for everyone. The color scale has been increased from 5 to
13 steps. Steps in the new scale go from 0 (white) to 1000 (black), each step being designed for at
least one use case. Colors are designed to feel perceptually balanced - meaning colors with the same
step number (ex. `,e.jsx(s.code,{children:"red.200"})," and ",e.jsx(s.code,{children:"blue.200"}),") will feel similar in brightness and saturation."]}),e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Important:"}),` The previous palette "fruity" colors are deprecated and mapped to use new palette
colors. Be aware that the color scale in v3 uses `,e.jsx(s.code,{children:"oklch"})," which is different to ",e.jsx(s.code,{children:"rgb"}),` and the new
color of deprecated token can be not 1:1 replacement of the old color.`]}),`
`]}),e.jsx("br",{}),e.jsx(t,{title:"Base Tokens",description:"Check newest palette",link:"https://workday.github.io/canvas-tokens/?path=/docs/docs-base-tokens--docs#color"}),e.jsx(s.h4,{id:"brand-and-system-tokens",children:"Brand and System Tokens"}),e.jsx(s.p,{children:`Brand and system tokens have been revised to offer improved flexibility and clarity. As part of this
update, many legacy color values have been replaced with new palette colors, expanding the palette
to promote consistency and accessibility throughout the system. The main changes are:`}),e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:`The brand token set has been extended to provide more flexibility and coverage for common use
cases.`}),`
`,e.jsxs(s.li,{children:["New system color groups have been added: ",e.jsx(s.code,{children:"ai"}),", ",e.jsx(s.code,{children:"info"})," and ",e.jsx(s.code,{children:"transparent"}),`, other groups have been
extended by new tokens.`]}),`
`,e.jsxs(s.li,{children:["The fully transparent color changed from ",e.jsx(s.code,{children:"sys.color.bg.transparent"}),` to
`,e.jsx(s.code,{children:"sys.color.bg.transparen.default"}),"."]}),`
`,e.jsxs(s.li,{children:["New system shape token has been added, ",e.jsx(s.code,{children:"system.shape.x1Half"}),`, to support 6px value as border
radius.`]}),`
`]}),e.jsx(t,{title:"New palette colors",link:"https://workday.github.io/canvas-tokens/?path=/docs/docs-base-tokens--docs"}),e.jsx(s.h4,{id:"canvas-kit-react-compatability",children:"Canvas Kit React compatability"}),e.jsx(s.p,{children:`For optimal brand alignment, we recommend using v3 tokens with Canvas Kit React v14. While it is
possible to use v3 tokens with earlier versions, this may result in visual inconsistencies due to
changes in the values of deprecated tokens.`})]})]})}function k(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(o,{...n})}):o(n)}export{k as default};
