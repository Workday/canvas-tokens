import{j as i,a as t,F as c}from"./jsx-runtime-86dfebf6.js";import{M as s,U as l}from"./index-fe986cc6.js";import"./index-586dd939.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-e0eb6041.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function r(n){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",a:"a",p:"p",ol:"ol",code:"code"},o(),n.components);return t(c,{children:[i(s,{title:"Maintaining/Style Dictionary/Filters"}),`
`,t(l,{children:[i(e.h1,{id:"filters",children:"Filters"}),i(e.h2,{id:"table-of-contents",children:"Table of Contents"}),t(e.ul,{children:[`
`,t(e.li,{children:[i(e.a,{href:"#overview",children:"Overview"}),`
`,t(e.ul,{children:[`
`,i(e.li,{children:i(e.a,{href:"#path-based-filters",children:"Path-Based Filters"})}),`
`,i(e.li,{children:i(e.a,{href:"#value-based-filters",children:"Value-Based Filters"})}),`
`,i(e.li,{children:i(e.a,{href:"#type-based-filters",children:"Type-Based Filters"})}),`
`,i(e.li,{children:i(e.a,{href:"#token-filtering-functions",children:"Token Filtering Functions"})}),`
`]}),`
`]}),`
`]}),i(e.h2,{id:"overview",children:"Overview"}),i(e.p,{children:`Filters (matchers) determine which tokens should be included or excluded during the transformation
and formatting process. They return boolean values indicating whether a token matches specific
criteria. They are used for the following purposes:`}),t(e.ol,{children:[`
`,i(e.li,{children:"Select tokens based on their path structure (level, category, type)."}),`
`,i(e.li,{children:"Filter tokens by their value characteristics (e.g., hex colors, math expressions)."}),`
`,i(e.li,{children:"Exclude specific token categories from certain outputs."}),`
`,i(e.li,{children:"Identify tokens that need special handling."}),`
`]}),t(e.p,{children:["The ",i(e.code,{children:"utils/filters/index.ts"}),` file exports all filter functions that can be used in transformers and
file configurations. Filters are used in the `,i(e.code,{children:"build.ts"})," file to configure the Style Dictionary build process."]}),i(e.h2,{id:"path-based-filters",children:"Path-Based Filters"}),i(e.p,{children:"These filters match tokens based on their path structure."}),t(e.p,{children:[`| Filter             | Description                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `,i(e.code,{children:"isBaseFontFamily"})," | Matches tokens from ",i(e.code,{children:"base.font-family"}),` category.                                            |
| `,i(e.code,{children:"isBaseFontWeight"})," | Matches tokens from ",i(e.code,{children:"base.font-weight"})," category with type ",i(e.code,{children:"text"}),`.                           |
| `,i(e.code,{children:"isBaseOpacity"}),"    | Matches tokens from ",i(e.code,{children:"base.opacity"}),` category with values greater than 1 (percentage format). |
| `,i(e.code,{children:"isBorder"}),"         | Matches tokens from ",i(e.code,{children:"sys"})," level with type ",i(e.code,{children:"border"}),`.                                         |
| `,i(e.code,{children:"isBreakpoints"}),"    | Matches tokens from ",i(e.code,{children:"sys.breakpoints"}),` category.                                             |
| `,i(e.code,{children:"isLetterSpacing"}),"  | Matches tokens from ",i(e.code,{children:"base.letter-spacing"}),` category.                                         |
| `,i(e.code,{children:"isPxLineHeight"}),"   | Matches tokens from ",i(e.code,{children:"base.line-height"})," category with type ",i(e.code,{children:"number"}),`.                         |
| `,i(e.code,{children:"isSysShadow"}),"      | Matches tokens from ",i(e.code,{children:"sys.depth"})," category (shadow tokens).                                   |"]}),i(e.h2,{id:"value-based-filters",children:"Value-Based Filters"}),i(e.p,{children:"These filters match tokens based on their value characteristics."}),t(e.p,{children:[`| Filter             | Description                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `,i(e.code,{children:"isDeprecated"}),`     | Matches tokens marked as deprecated in their original definition.                                          |
| `,i(e.code,{children:"isHexColor"}),"       | Matches tokens with hex color values (format: ",i(e.code,{children:"#RRGGBB"})," or ",i(e.code,{children:"#RGB"}),`).                                        |
| `,i(e.code,{children:"isMathExpression"})," | Matches tokens with math expressions (containing ",i(e.code,{children:"+"}),", ",i(e.code,{children:"-"}),", ",i(e.code,{children:"*"}),", or ",i(e.code,{children:"/"}),` operators, excluding oklch values). |
| `,i(e.code,{children:"isSysColor"}),"       | Matches tokens with oklch color values (checks for ",i(e.code,{children:"oklch({"})," in the value string or array).                |"]}),i(e.h2,{id:"type-based-filters",children:"Type-Based Filters"}),i(e.p,{children:"These filters match tokens based on their type characteristics."}),t(e.p,{children:[`| Filter           | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `,i(e.code,{children:"isComposite"}),`    | Matches tokens with composite types (typography or composition).         |
| `,i(e.code,{children:"isNotComposite"})," | Matches tokens that are not composite and not from the ",i(e.code,{children:"depth"})," category. |"]}),i(e.h2,{id:"token-filtering-functions",children:"Token Filtering Functions"}),i(e.p,{children:"These filters are used to filter tokens based on their category."}),t(e.p,{children:[`| Filter               | Description                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `,i(e.code,{children:"filterActionTokens"})," | Filters out tokens from the ",i(e.code,{children:"action"}),` category. Used for brand and system token generation.                       |
| `,i(e.code,{children:"filterCodeTokens"}),"   | Filters out tokens from excluded categories (",i(e.code,{children:"level"}),", ",i(e.code,{children:"shadow"}),", ",i(e.code,{children:"typescale"}),"). Used to generate code token files. |"]})]})]})}function F(n={}){const{wrapper:e}=Object.assign({},o(),n.components);return e?i(e,Object.assign({},n,{children:i(r,n)})):r(n)}export{F as default};
