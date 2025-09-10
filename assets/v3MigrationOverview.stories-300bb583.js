import{M as g,U as v}from"./index-0d073df7.js";import{a as t,j as n,F as w}from"./jsx-runtime-86dfebf6.js";import{N as a}from"./index-cf666fd8.js";import{u as p}from"./index-2ef8b458.js";import"./iframe-2d738cd7.js";import"../sb-preview/runtime.js";import"./chunk-6P7RB4HF-36fee097.js";import"./index-1b03fe98.js";import"./index-91af8003.js";import"./index-356e4a49.js";const s=({rawFileLink:o,filename:e})=>t("div",{className:"download-card",children:[n("div",{className:"download-card-filename cnvs-sys-type-body-small",children:t("code",{children:["📁 ",e]})}),t("div",{className:"download-card-actions",children:[t("a",{href:o,className:"download-card-link",children:[n("span",{children:"See raw file"}),n("svg",{xmlns:"http://www.w3.org/2000/svg",focusable:"false",role:"presentation",viewBox:"0 0 24 24",children:n("path",{d:"M9.502 5c.283 0 .498.226.498.505v.99c0 .291-.222.505-.495.505H7v10h10v-2.505c0-.28.226-.495.505-.495h.99c.291 0 .505.223.505.498v4.004a.493.493 0 0 1-.498.498H5.498A.496.496 0 0 1 5 18.502V5.498C5 5.22 5.223 5 5.498 5Zm8.996 0c.139 0 .265.053.356.143.091.1.147.225.147.36v5.994a.497.497 0 0 1-.504.503h-.99a.51.51 0 0 1-.506-.503V8.503l-5.23 5.23a.496.496 0 0 1-.712 0l-.7-.701a.503.503 0 0 1-.002-.713L15.677 7h-3.172A.497.497 0 0 1 12 6.495v-.99c0-.279.233-.505.504-.505z"})})]}),t("button",{className:"download-card-button",onClick:async()=>{try{const u=await(await fetch(o)).text(),m=new Blob([u],{type:"text/plain"}),d=URL.createObjectURL(m),r=document.createElement("a");r.href=d,r.download=e,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(d)}catch(c){console.error("Failed to download file:",c)}},children:[n("svg",{xmlns:"http://www.w3.org/2000/svg",focusable:"false",role:"presentation",viewBox:"0 0 24 24",children:n("path",{d:"M19.504 18c.274 0 .496.214.496.505v.99a.503.503 0 0 1-.496.505H4.496A.493.493 0 0 1 4 19.495v-.99c0-.279.226-.505.496-.505zm-5.078-7.31a.49.49 0 0 1 .704.01l.7.7a.503.503 0 0 1 .01.705l-3.536 3.536a.505.505 0 0 1-.72 0L8.05 12.105a.49.49 0 0 1 .01-.705l.7-.7a.503.503 0 0 1 .704-.01l1.595 1.595V4.506c0-.28.214-.506.505-.506h.99c.28 0 .505.227.505.506v7.552z"})}),n("span",{children:"Download LLM File"})]})]})]});try{s.displayName="DownloadLLMFile",s.__docgenInfo={description:"",displayName:"DownloadLLMFile",props:{rawFileLink:{defaultValue:null,description:"",name:"rawFileLink",required:!0,type:{name:"string"}},filename:{defaultValue:null,description:"",name:"filename",required:!0,type:{name:"string"}}}}}catch{}const b={ai:{color:"var(--cnvs-sys-color-fg-ai)",backgroundColor:"var(--cnvs-sys-color-bg-ai-default)"}},l=({content:o,type:e})=>n("span",{className:"status-indicator",style:b[e],children:n("div",{className:"status-indicator-content cnvs-sys-type-subtext-large",children:o})});try{l.displayName="StatusIndicator",l.__docgenInfo={description:"",displayName:"StatusIndicator",props:{content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:'"ai"'}}}}}catch{}function h(o){const e=Object.assign({h1:"h1",p:"p",h4:"h4",ul:"ul",li:"li",strong:"strong",code:"code",blockquote:"blockquote",a:"a",h3:"h3"},p(),o.components);return t(w,{children:[n(g,{title:"Guides/Upgrade Guides/v3/Overview"}),`
`,t(v,{children:[n(e.h1,{id:"whats-new-in-v3",children:"What's New in v3"}),n(e.p,{children:`We've overhauled our color system to align with Workday's new brand identity, while also making
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
guide that provides step-by-step migration process instructions.`]}),n(a,{title:"React Tokens Migration Guide",link:"https://workday.github.io/canvas-kit/?path=/docs/guides-tokens-migration-overview--docs"}),t(e.h4,{id:"llm-assisted-migration-",children:["LLM Assisted Migration ",n(l,{type:"ai",content:"AI Content"})]}),t(e.p,{children:["We've provided an ",n(e.strong,{children:"LLM migration mapping file"})," (",n(e.code,{children:"llm-canvas-kit-upgrade-guide-v14.txt"}),`)
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
`]}),n(s,{rawFileLink:"https://raw.githubusercontent.com/Workday/canvas-tokens/master/modules/docs/llm-txt/llm-token-migration.txt",filename:"llm-token-migration-3.0.0.txt"}),n(e.h3,{id:"rgba-to-oklch",children:"RGBA to OKLCH"}),t(e.p,{children:["Colors are designed using ",n(e.code,{children:"oklch"}),", a perceptually uniform color space. ",n(e.code,{children:"oklch"}),` ensures that two
colors with the same lightness will appear equal in brightness – a longstanding issue of traditional
color spaces like RGB and HSL.`]}),t(e.ul,{children:[`
`,n(e.li,{children:"More predictable contrast ratios"}),`
`,n(e.li,{children:"Scales well with theming, modes"}),`
`,n(e.li,{children:"Device and gamut independent"}),`
`]}),n(a,{title:"Learn more about OKLCH",link:"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch"}),n(e.h3,{id:"new-base-palette",children:"New Base Palette"}),t(e.p,{children:[`To reduce ambiguity over color values, Base colors have been renamed to use common terms (like
`,n(e.code,{children:"red.600"}),`) that are easier to understand for everyone. The color scale has been increased from 5 to
13 steps. Steps in the new scale go from 0 (white) to 1000 (black), each step being designed for at
least one use case. Colors are designed to feel perceptually balanced - meaning colors with the same
step number (ex. `,n(e.code,{children:"red.200"})," and ",n(e.code,{children:"blue.200"}),") will feel similar in brightness and saturation."]}),t(e.blockquote,{children:[`
`,t(e.p,{children:[n(e.strong,{children:"Important:"}),` The previous palette "fruity" colors are deprecated and mapped to use new palette
colors. Be aware that the color scale in v3 uses `,n(e.code,{children:"oklch"})," which is different to ",n(e.code,{children:"rgb"}),` and the new
color of deprecated token can be not 1:1 replacement of the old color.`]}),`
`]}),n("br",{}),n(a,{title:"Base Tokens",description:"Check newest palette",link:"/?path=/docs/docs-base-tokens--docs#color"}),n(e.h4,{id:"brand-and-system-tokens",children:"Brand and System Tokens"}),n(e.p,{children:`Brand and system tokens have been revised to offer improved flexibility and clarity. As part of this
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
`]}),n(a,{title:"New palette colors",link:"/?path=/docs/docs-base-tokens--docs"}),n(e.h4,{id:"canvas-kit-react-compatability",children:"Canvas Kit React compatability"}),n(e.p,{children:`For optimal brand alignment, we recommend using v3 tokens with Canvas Kit React v14. While it is
possible to use v3 tokens with earlier versions, this may result in visual inconsistencies due to
changes in the values of deprecated tokens.`})]})]})}function f(o={}){const{wrapper:e}=Object.assign({},p(),o.components);return e?n(e,{...o,children:n(h,{...o})}):h(o)}const y=()=>{throw new Error("Docs-only story")};y.parameters={docsOnly:!0};const i={title:"Guides/Upgrade Guides/v3/Overview",tags:["stories-mdx"],includeStories:["__page"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:f};const B=["__page"];export{B as __namedExportsOrder,y as __page,i as default};
//# sourceMappingURL=v3MigrationOverview.stories-300bb583.js.map
