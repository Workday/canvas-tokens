import{j as n,a as r,F as i}from"./jsx-runtime-86dfebf6.js";import{M as l,U as c}from"./index-7f38b2fe.js";import{u as o}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-5afc2066.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function d(t){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",a:"a",p:"p",code:"code",blockquote:"blockquote",strong:"strong",br:"br",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre",em:"em",ol:"ol"},o(),t.components);return r(i,{children:[n(l,{title:"Maintaining/Token JSON Structure"}),`
`,r(c,{children:[n(e.h1,{id:"token-json-structure",children:"Token JSON Structure"}),n(e.h2,{id:"table-of-contents",children:"Table of Contents"}),r(e.ul,{children:[`
`,r(e.li,{children:[n(e.a,{href:"#overview",children:"Overview"}),`
`,r(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#file-organization",children:"File Organization"})}),`
`]}),`
`]}),`
`,r(e.li,{children:[n(e.a,{href:"#example-structure",children:"Example Structure"}),`
`,r(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#key-fields",children:"Key Fields"})}),`
`,n(e.li,{children:n(e.a,{href:"#token-references",children:"Token References"})}),`
`]}),`
`]}),`
`,n(e.li,{children:n(e.a,{href:"#composite-tokens",children:"Composite Tokens"})}),`
`,r(e.li,{children:[n(e.a,{href:"#deprecated-tokens",children:"Deprecated Tokens"}),`
`,r(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#purpose",children:"Purpose"})}),`
`,n(e.li,{children:n(e.a,{href:"#key-fields-1",children:"Key Fields"})}),`
`,n(e.li,{children:n(e.a,{href:"#example-structure-1",children:"Example Structure"})}),`
`]}),`
`]}),`
`]}),n(e.h2,{id:"overview",children:"Overview"}),r(e.p,{children:["Canvas tokens are authored and maintained as JSON files in the ",n(e.code,{children:"tokens/"}),` directory. Each JSON file
represents a collection of tokens for a specific level (`,n(e.code,{children:"base"}),", ",n(e.code,{children:"brand"}),", or ",n(e.code,{children:"sys"}),`). The structure
closely follows `,n(e.a,{href:"https://styledictionary.com/info/tokens/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Style Dictionary's design token format"}),`,
with some Canvas-specific conventions.`]}),r(e.blockquote,{children:[`
`,r(e.p,{children:[n(e.strong,{children:"Note:"}),n(e.br,{}),`
`,"Token JSON files are automatically generated and should ",n(e.strong,{children:"not be changed manually"}),".",n(e.br,{}),`
`,`They are updated via sync pull requests from the
`,n(e.a,{href:"https://github.com/Workday/canvas-tokens-studio",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.code,{children:"canvas-tokens-studio"})}),` repository. All changes
to tokens must be done in `,n(e.code,{children:"canvas-tokens-studio"})," repository."]}),`
`]}),n(e.h3,{id:"file-organization",children:"File Organization"}),r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{children:"Category"}),n(e.th,{children:"Location"}),n(e.th,{children:"Description"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{children:"Base"}),n(e.td,{children:n(e.code,{children:"tokens/base.json"})}),n(e.td,{children:"Foundation tokens (color, spacing, etc.)."})]}),r(e.tr,{children:[n(e.td,{children:"Brand"}),n(e.td,{children:n(e.code,{children:"tokens/web/brand.json"})}),n(e.td,{children:"Brand/tenant-level overrides and references."})]}),r(e.tr,{children:[n(e.td,{children:"Deprecated Base"}),n(e.td,{children:n(e.code,{children:"tokens/web/deprecated/base.json"})}),n(e.td,{children:"Deprecated Foundation tokens (color, spacing, etc.)."})]}),r(e.tr,{children:[n(e.td,{children:"Deprecated Brand"}),n(e.td,{children:n(e.code,{children:"tokens/web/deprecated/brand/*"})}),n(e.td,{children:"Deprecated brand/tenant-level overrides and references."})]}),r(e.tr,{children:[n(e.td,{children:"Deprecated System"}),n(e.td,{children:n(e.code,{children:"tokens/web/deprecated/sys/*"})}),n(e.td,{children:"Deprecated system-level composite and component-aligned tokens (shadows, typography, etc.)."})]}),r(e.tr,{children:[n(e.td,{children:"System"}),n(e.td,{children:n(e.code,{children:"tokens/web/sys.json"})}),n(e.td,{children:"System-level composite and component-aligned tokens (shadows, typography, etc.)."})]})]})]}),n(e.h2,{id:"example-structure",children:"Example Structure"}),r(e.p,{children:["Below is an example of the structure for a base color token in ",n(e.code,{children:"tokens/base.json"}),"."]}),n(e.pre,{children:n(e.code,{className:"language-json",children:`{
  "base": {
    "palette": {
      "amber": {
        "25": {
          "type": "color",
          "value": "oklch(0.9779 0.0214 95.33 / 1)"
        },
        "50": {
          "type": "color",
          "value": "oklch(0.969 0.0619 101.63 / 1)"
        }
      }
    }
  }
}
`})}),n(e.h3,{id:"key-fields",children:"Key Fields"}),r(e.p,{children:["All tokens have a ",n(e.code,{children:"value"})," and ",n(e.code,{children:"type"})," field, and optionally have a ",n(e.code,{children:"description"})," field."]}),r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{children:"Field"}),n(e.th,{children:"Description"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value"})}),n(e.td,{children:"The token's primitive or referenced value (hex, rgba, a reference string, etc.)."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"type"})}),r(e.td,{children:["The category/type (e.g., ",n(e.code,{children:"color"}),", ",n(e.code,{children:"dimension"}),", ",n(e.code,{children:"shadow"}),")."]})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"description"})}),r(e.td,{children:["Human-readable documentation for the token. Used to generate JSDocs. ",n(e.em,{children:"(optional)"})]})]})]})]}),n(e.h3,{id:"token-references",children:"Token References"}),r(e.p,{children:["Tokens can reference other tokens using the ",n(e.code,{children:"{path.to.token}"})," syntax. For example:"]}),n(e.pre,{children:n(e.code,{className:"language-json",children:`{
  "brand": {
    "primary": {
      "base": {
        "value": "{base.palette.blue.400}",
        "type": "color",
        "description": "Primary brand background"
      }
    }
  }
}
`})}),n(e.h2,{id:"composite-tokens",children:"Composite Tokens"}),n(e.p,{children:`Composite or object tokens have nested values and are typically used for typography or shadows.
Below is an example of a typography token:`}),n(e.pre,{children:n(e.code,{className:"language-json",children:`{
  "typography": {
    "body": {
      "small": {
        "value": {
          "fontFamily": "{sys.fontFamily.default}",
          "fontWeight": "{sys.fontWeight.regular}",
          "fontSize": "{sys.fontSize.body.small}",
          "lineHeight": "{sys.lineHeight.body.small}"
        },
        "type": "typography"
      }
    }
  }
}
`})}),n(e.h2,{id:"deprecated-tokens",children:"Deprecated Tokens"}),n(e.p,{children:`Deprecated tokens are retained in the token set to ensure backward compatibility and allow dependent
applications or design systems a migration window. Deprecating a token signals to consumers that the
token should no longer be used for new work, and that it may be removed in future major releases.`}),n(e.h3,{id:"purpose",children:"Purpose"}),n(e.p,{children:"Deprecated tokens serve three main purposes:"}),r(e.ol,{children:[`
`,r(e.li,{children:[n(e.strong,{children:"Improve Change Management:"}),` Deprecated tokens allow consuming codebases to continue
functioning while gradually migrating to new or replacement tokens.`]}),`
`,r(e.li,{children:[n(e.strong,{children:"Communicate Intent:"}),` By marking tokens as deprecated, authors signal to users that a token’s
value or purpose is outdated, replaced, or no longer aligns with current design guidelines.`]}),`
`,r(e.li,{children:[n(e.strong,{children:"Enable Tooling:"})," The presence of ",n(e.code,{children:"deprecated"}),", ",n(e.code,{children:"deprecatedComment"}),", and ",n(e.code,{children:"fallback"}),` properties
permits build tools, linters, and documentation generators to warn users, automate migrations, or
replace deprecated usages with recommended alternatives.`]}),`
`]}),n(e.h3,{id:"key-fields-1",children:"Key Fields"}),r(e.p,{children:["Deprecated tokens have the ",n(e.code,{children:"value"}),", ",n(e.code,{children:"type"}),", and ",n(e.code,{children:"description"}),` fields listed above, and also include
the following deprecated-specific fields:`]}),r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{children:"Field"}),n(e.th,{children:"Description"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"deprecated"})}),n(e.td,{children:"Boolean indicating the token is deprecated."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"deprecatedComment"})}),n(e.td,{children:"An explanation for why the token was deprecated."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"fallback"})}),n(e.td,{children:"Specifies a fallback token/path to use instead of the deprecated token."})]})]})]}),n(e.h3,{id:"example-structure-1",children:"Example Structure"}),n(e.p,{children:"Below is an example structure of a deprecated token:"}),n(e.pre,{children:n(e.code,{className:"language-json",children:`{
  "color": {
    "background": {
      "brand": {
        "value": "{base.palette.blue.400}",
        "type": "color",
        "description": "Brand background color",
        "deprecated": true,
        "deprecatedComment": "Use \`brand.primary.base\` instead for updated color scaling.",
        "fallback": "{brand.primary.base}"
      }
    }
  }
}
`})})]})]})}function b(t={}){const{wrapper:e}=Object.assign({},o(),t.components);return e?n(e,Object.assign({},t,{children:n(d,t)})):d(t)}export{b as default};
