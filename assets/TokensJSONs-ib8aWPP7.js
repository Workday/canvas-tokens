import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as t}from"./index-Pe1yh6Xi.js";import{M as d,U as i}from"./index-QYG3jjN8.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function r(s){const n={a:"a",blockquote:"blockquote",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Maintaining/Token JSON Structure"}),`
`,e.jsxs(i,{children:[e.jsx(n.h1,{id:"token-json-structure",children:"Token JSON Structure"}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," This page is outdated and will be updated soon to match the changes made in v5."]}),`
`]}),e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#overview",children:"Overview"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#file-organization",children:"File Organization"})}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#example-structure",children:"Example Structure"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#key-fields",children:"Key Fields"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#token-references",children:"Token References"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#composite-tokens",children:"Composite Tokens"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#deprecated-tokens",children:"Deprecated Tokens"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#purpose",children:"Purpose"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#key-fields-1",children:"Key Fields"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#example-structure-1",children:"Example Structure"})}),`
`]}),`
`]}),`
`]}),e.jsx(n.h2,{id:"overview",children:"Overview"}),e.jsxs(n.p,{children:["Canvas tokens are authored and maintained as JSON files in the ",e.jsx(n.code,{children:"tokens/"}),` directory. Each JSON file
represents a collection of tokens for a specific level (`,e.jsx(n.code,{children:"base"}),", ",e.jsx(n.code,{children:"brand"}),", or ",e.jsx(n.code,{children:"sys"}),`). The structure
closely follows `,e.jsx(n.a,{href:"https://styledictionary.com/info/tokens/",rel:"nofollow",children:"Style Dictionary's design token format"}),`,
with some Canvas-specific conventions.`]}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),e.jsx(n.br,{}),`
`,"Token JSON files are automatically generated and should ",e.jsx(n.strong,{children:"not be changed manually"}),".",e.jsx(n.br,{}),`
`,`They are updated via sync pull requests from the
`,e.jsx(n.a,{href:"https://github.com/Workday/canvas-tokens-studio",rel:"nofollow",children:e.jsx(n.code,{children:"canvas-tokens-studio"})}),` repository. All changes
to tokens must be done in `,e.jsx(n.code,{children:"canvas-tokens-studio"})," repository."]}),`
`]}),e.jsx(n.h3,{id:"file-organization",children:"File Organization"}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Category"}),e.jsx(n.th,{children:"Location"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Base"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/base.json"})}),e.jsx(n.td,{children:"Foundation tokens (color, spacing, etc.)."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Brand"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/web/brand.json"})}),e.jsx(n.td,{children:"Brand/tenant-level overrides and references."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Deprecated Base"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/web/deprecated/base.json"})}),e.jsx(n.td,{children:"Deprecated Foundation tokens (color, spacing, etc.)."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Deprecated Brand"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/web/deprecated/brand/*"})}),e.jsx(n.td,{children:"Deprecated brand/tenant-level overrides and references."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Deprecated System"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/web/deprecated/sys/*"})}),e.jsx(n.td,{children:"Deprecated system-level composite and component-aligned tokens (shadows, typography, etc.)."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"System"}),e.jsx(n.td,{children:e.jsx(n.code,{children:"tokens/web/sys.json"})}),e.jsx(n.td,{children:"System-level composite and component-aligned tokens (shadows, typography, etc.)."})]})]})]}),e.jsx(n.h2,{id:"example-structure",children:"Example Structure"}),e.jsxs(n.p,{children:["Below is an example of the structure for a base color token in ",e.jsx(n.code,{children:"tokens/base.json"}),"."]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
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
`})}),e.jsx(n.h3,{id:"key-fields",children:"Key Fields"}),e.jsxs(n.p,{children:["All tokens have a ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"type"})," field, and optionally have a ",e.jsx(n.code,{children:"description"})," field."]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Field"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value"})}),e.jsx(n.td,{children:"The token's primitive or referenced value (hex, rgba, a reference string, etc.)."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"type"})}),e.jsxs(n.td,{children:["The category/type (e.g., ",e.jsx(n.code,{children:"color"}),", ",e.jsx(n.code,{children:"dimension"}),", ",e.jsx(n.code,{children:"shadow"}),")."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"description"})}),e.jsxs(n.td,{children:["Human-readable documentation for the token. Used to generate JSDocs. ",e.jsx(n.em,{children:"(optional)"})]})]})]})]}),e.jsx(n.h3,{id:"token-references",children:"Token References"}),e.jsxs(n.p,{children:["Tokens can reference other tokens using the ",e.jsx(n.code,{children:"{path.to.token}"})," syntax. For example:"]}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
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
`})}),e.jsx(n.h2,{id:"composite-tokens",children:"Composite Tokens"}),e.jsx(n.p,{children:`Composite or object tokens have nested values and are typically used for typography or shadows.
Below is an example of a typography token:`}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
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
`})}),e.jsx(n.h2,{id:"deprecated-tokens",children:"Deprecated Tokens"}),e.jsx(n.p,{children:`Deprecated tokens are retained in the token set to ensure backward compatibility and allow dependent
applications or design systems a migration window. Deprecating a token signals to consumers that the
token should no longer be used for new work, and that it may be removed in future major releases.`}),e.jsx(n.h3,{id:"purpose",children:"Purpose"}),e.jsx(n.p,{children:"Deprecated tokens serve three main purposes:"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Improve Change Management:"}),` Deprecated tokens allow consuming codebases to continue
functioning while gradually migrating to new or replacement tokens.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Communicate Intent:"}),` By marking tokens as deprecated, authors signal to users that a token’s
value or purpose is outdated, replaced, or no longer aligns with current design guidelines.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Enable Tooling:"})," The presence of ",e.jsx(n.code,{children:"deprecated"}),", ",e.jsx(n.code,{children:"deprecatedComment"}),", and ",e.jsx(n.code,{children:"fallback"}),` properties
permits build tools, linters, and documentation generators to warn users, automate migrations, or
replace deprecated usages with recommended alternatives.`]}),`
`]}),e.jsx(n.h3,{id:"key-fields-1",children:"Key Fields"}),e.jsxs(n.p,{children:["Deprecated tokens have the ",e.jsx(n.code,{children:"value"}),", ",e.jsx(n.code,{children:"type"}),", and ",e.jsx(n.code,{children:"description"}),` fields listed above, and also include
the following deprecated-specific fields:`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Field"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"deprecated"})}),e.jsx(n.td,{children:"Boolean indicating the token is deprecated."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"deprecatedComment"})}),e.jsx(n.td,{children:"An explanation for why the token was deprecated."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"fallback"})}),e.jsx(n.td,{children:"Specifies a fallback token/path to use instead of the deprecated token."})]})]})]}),e.jsx(n.h3,{id:"example-structure-1",children:"Example Structure"}),e.jsx(n.p,{children:"Below is an example structure of a deprecated token:"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
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
`})})]})]})}function k(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{k as default};
