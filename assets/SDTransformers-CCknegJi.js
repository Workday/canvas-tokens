import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as a}from"./index-Pe1yh6Xi.js";import{M as l,U as i}from"./index-QYG3jjN8.js";import"./index-CsXqVosM.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function r(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Maintaining/Style Dictionary/Transformers"}),`
`,e.jsxs(i,{children:[e.jsx(n.h1,{id:"transformers",children:"Transformers"}),e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," This page is outdated and will be updated soon to match the changes made in v5."]}),`
`]}),e.jsx(n.h2,{id:"table-of-contents",children:"Table of Contents"}),e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#overview",children:"Overview"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#namecamel",children:"name/camel"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuebreakpointspx",children:"value/breakpoints/px"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuedeprecated",children:"value/deprecated"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueflatten-border",children:"value/flatten-border"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueflatten-oklch",children:"value/flatten-oklch"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuefont-weightnumbers",children:"value/font-weight/numbers"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuehex-to-rgba",children:"value/hex-to-rgba"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueletter-spacingpx2rem",children:"value/letter-spacing/px2rem"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueline-heightpx2rem",children:"value/line-height/px2rem"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuemath",children:"value/math"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueopacity",children:"value/opacity"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valueshadowflat-sys",children:"value/shadow/flat-sys"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuevariables",children:"value/variables"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#valuewrapped-font-family",children:"value/wrapped-font-family"})}),`
`]}),e.jsx(n.h2,{id:"overview",children:"Overview"}),e.jsx(n.p,{children:`Transformers are functions that alter token values or names during the Style Dictionary
transformation process. They process each token after parsing and before formatting, enabling
consistent naming and value output across platforms. Transformers are applied to tokens and may
adjust their values (e.g., converting hex to rgba), update names, or flatten complex objects such as
box shadows or typography.`}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"utils/transformers/index.ts"}),` file acts as the central point for all transformers, exporting a
`,e.jsx(n.code,{children:"transforms"})," object that maps transformer names to their configurations."]}),e.jsxs(n.p,{children:["Each transformer is registered with a unique name, the property it modifies (",e.jsx(n.code,{children:"value"})," or ",e.jsx(n.code,{children:"name"}),`), and
the platforms where it is applied (`,e.jsx(n.code,{children:"css"}),", ",e.jsx(n.code,{children:"js"}),`, etc.). Registered transformers run in a specified
order and can be chained so one transform's result is used by the next.`]}),e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Transformer"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"name/camel"})}),e.jsx(n.td,{children:"Converts token names from dot-path notation to camelCase for JS/TS output."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/breakpoints/px"})}),e.jsxs(n.td,{children:["Evaluates breakpoint expressions and appends the ",e.jsx(n.code,{children:"px"})," unit."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/deprecated"})}),e.jsx(n.td,{children:"Replaces deprecated token values with their fallback values."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/flatten-border"})}),e.jsx(n.td,{children:"Flattens border object tokens into a single-line CSS string."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/flatten-oklch"})}),e.jsx(n.td,{children:"Flattens oklch color tokens and handles transparency."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/font-weight/numbers"})}),e.jsx(n.td,{children:"Maps string font weight names to their numeric equivalents."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/hex-to-rgba"})}),e.jsxs(n.td,{children:["Converts hex color values to ",e.jsx(n.code,{children:"rgba()"})," CSS strings."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/letter-spacing/px2rem"})}),e.jsxs(n.td,{children:["Converts letter-spacing from pixel units to ",e.jsx(n.code,{children:"rem"}),"."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/line-height/px2rem"})}),e.jsxs(n.td,{children:["Converts pixel-based line-height values to ",e.jsx(n.code,{children:"rem"}),"."]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/math"})}),e.jsx(n.td,{children:"Evaluates math expressions in token values."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/opacity"})}),e.jsx(n.td,{children:"Converts opacity from 0–100 scale to 0–1 decimal."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/shadow/flat-sys"})}),e.jsx(n.td,{children:"Flattens shadow objects into single-line CSS strings."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/variables"})}),e.jsx(n.td,{children:"Generates CSS variable names from token paths."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"value/wrapped-font-family"})}),e.jsx(n.td,{children:"Wraps font family names containing spaces in quotes."})]})]})]}),e.jsx(n.p,{children:"Below is a detailed description and example of each transformer."}),e.jsx(n.h2,{id:"namecamel",children:"name/camel"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"name/camel"}),` transformer converts token names from dot-path notation (e.g.,
`,e.jsx(n.code,{children:"primary.background.default"}),`) into JavaScript/TypeScript-style camelCase (e.g.,
`,e.jsx(n.code,{children:"primaryBackgroundDefault"}),"), as used for object keys in JS/TS files."]}),e.jsx(n.p,{children:"Used only for JS/TS object output."}),e.jsx(n.h3,{id:"example",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  name: 'default',
  path: ['primary', 'background', 'default'];
}

// output
{
  name: 'primaryBackgroundDefault';
}
`})}),e.jsx(n.h2,{id:"valuebreakpointspx",children:"value/breakpoints/px"}),e.jsxs(n.p,{children:[`This transformer is for tokens whose values define breakpoints, either numerically or as math
expressions (e.g., `,e.jsx(n.code,{children:'"600+16"'}),"). It evaluates any expression and appends the ",e.jsx(n.code,{children:"px"}),` unit. This is
needed because CSS does not support unitless values.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"base.breakpoints.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is in the ",e.jsx(n.code,{children:"web"})," group and mainly outputs raw CSS values."]}),e.jsx(n.h3,{id:"example-1",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: '600+16';
}
// output
{
  value: '616px';
}
`})}),e.jsx(n.h2,{id:"valuedeprecated",children:"value/deprecated"}),e.jsxs(n.p,{children:["This transformer only applies to tokens with the ",e.jsx(n.code,{children:"deprecated"})," property set to ",e.jsx(n.code,{children:"true"}),`. When such a
token is found, the transformer replaces its value with that provided by the `,e.jsx(n.code,{children:"fallback"}),` field, if it
exists. If no fallback exists, the original value is unchanged. This ensures deprecated tokens
redirect to their replacements, helping maintainers guide consumers to updated tokens.`]}),e.jsxs(n.p,{children:["This transformer belongs to the ",e.jsx(n.code,{children:"web"}),` transform group and primarily changes raw values for CSS
outputs.`]}),e.jsx(n.h3,{id:"example-2",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  name: 'base.palette.cinnamon.100',
  value: "#ffefee",
  path: ['base','palette','cinnamon','100'],
  original: {
    value: "#ffefee",
    type: "color",
    deprecated: true,
    fallback: "{base.palette.red.50}"
  }
}

// output
{
  name: 'base.palette.cinnamon.100',
  value: "{base.palette.red.50}",
  path: ['base','palette','cinnamon','100'],
  original: {
    value: "#ffefee",
    type: "color",
    deprecated: true,
    fallback: "{base.palette.red.50}"
  }
}
`})}),e.jsx(n.h2,{id:"valueflatten-border",children:"value/flatten-border"}),e.jsxs(n.p,{children:["This transformer flattens border object tokens (with ",e.jsx(n.code,{children:"width"}),", ",e.jsx(n.code,{children:"style"}),", and ",e.jsx(n.code,{children:"color"}),` properties) into
a single-line CSS string (e.g., `,e.jsx(n.code,{children:'"1px solid #000"'}),`), making border tokens directly usable in
CSS-in-JS or similar environments.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"sys.border.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is part of the ",e.jsx(n.code,{children:"web"})," group and changes raw CSS values."]}),e.jsx(n.h3,{id:"example-3",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: { width: 1, style: "solid", color: "#000" }
}

// output
{
  value: "1px solid #000"
}
`})}),e.jsx(n.h2,{id:"valueflatten-oklch",children:"value/flatten-oklch"}),e.jsxs(n.p,{children:[`This transformer processes tokens in the oklch color space. It flattens tokens using oklch notation
(e.g., `,e.jsx(n.code,{children:"oklch(63.3% 0.21 230)"}),`), replaces palette references with their actual values, and outputs
CSS's `,e.jsx(n.code,{children:"transparent"})," for cases like ",e.jsx(n.code,{children:"{base.opacity.0}"}),`. This ensures correct color referencing in all
platforms.`]}),e.jsxs(n.p,{children:["Applied only to tokens whose value includes ",e.jsx(n.code,{children:"oklch"}),"."]}),e.jsxs(n.p,{children:["This transformer is included in the ",e.jsx(n.code,{children:"web"})," group and mainly updates raw values for CSS outputs."]}),e.jsx(n.h3,{id:"example-4",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: 'oklch(oklch(63.3% 0.21 230 / 1), 0.25)';
}

// output
{
  value: 'oklch(from oklch(63.3% 0.21 230 / 1) / 0.25)';
}

// input
{
  value: 'oklch(oklch(63.3% 0.21 230 / 1), 0)';
}

// output
{
  value: 'transparent';
}
`})}),e.jsx(n.h2,{id:"valuefont-weightnumbers",children:"value/font-weight/numbers"}),e.jsxs(n.p,{children:["This transformer maps string font weight names (e.g. ",e.jsx(n.code,{children:"'bold'"}),", ",e.jsx(n.code,{children:"'regular'"}),", ",e.jsx(n.code,{children:"'medium'"}),`) to their
numeric equivalents (`,e.jsx(n.code,{children:"700"})," for ",e.jsx(n.code,{children:"'bold'"}),`, etc.), following the CSS font weight spec. This enables
always using numeric font weights as needed for many outputs.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"base.font-weight.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is part of the ",e.jsx(n.code,{children:"web"}),` transform group and primarily updates raw values for CSS
outputs.`]}),e.jsx(n.h3,{id:"example-5",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: 'bold';
}

// output
{
  value: 700;
}
`})}),e.jsx(n.h2,{id:"valuehex-to-rgba",children:"value/hex-to-rgba"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/hex-to-rgba"}),` transformer converts token values in hexadecimal color notation (e.g.,
`,e.jsx(n.code,{children:"#FF00AA"}),") to the equivalent ",e.jsx(n.code,{children:"rgba()"}),` CSS string. This is useful for platforms that require explicit
alpha in color output, even for opaque colors.`]}),e.jsx(n.p,{children:"Applied to tokens whose value matches a hex color pattern."}),e.jsxs(n.p,{children:["Currently, this transformer is not used by any platform, as final tokens are generated in ",e.jsx(n.code,{children:"oklch"}),`
format.`]}),e.jsx(n.h3,{id:"example-6",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: '#FF00AA';
}

// output
{
  value: 'rgba(255, 0, 170, 1)';
}
`})}),e.jsx(n.h2,{id:"valueletter-spacingpx2rem",children:"value/letter-spacing/px2rem"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/letter-spacing/px2rem"})," transformer converts letter-spacing from pixel units to ",e.jsx(n.code,{children:"rem"}),`. It
parses pixel values (e.g., `,e.jsx(n.code,{children:'"1.25px"'}),"), divides by 16, and outputs as rem for scalable usage."]}),e.jsxs(n.p,{children:["Applies to ",e.jsx(n.code,{children:"base.letter-spacing.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is included in the ",e.jsx(n.code,{children:"web"})," group and primarily outputs raw CSS values."]}),e.jsx(n.h3,{id:"example-7",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: '1.25px';
}

// output
{
  value: '0.078125rem';
}
`})}),e.jsx(n.h2,{id:"valueline-heightpx2rem",children:"value/line-height/px2rem"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/line-height/px2rem"})," transformer converts pixel-based line-height values (such as ",e.jsx(n.code,{children:"24"}),`)
into their equivalent `,e.jsx(n.code,{children:"rem"})," values by dividing by 16 (root font size) and appending ",e.jsx(n.code,{children:"rem"}),`. This
makes line-heights scalable and suitable for modern CSS/JS outputs.`]}),e.jsxs(n.p,{children:["Applied only to ",e.jsx(n.code,{children:"base.line-height.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is included in the ",e.jsx(n.code,{children:"web"})," group and primarily adjusts raw values for CSS outputs."]}),e.jsx(n.h3,{id:"example-8",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: 24;
}

// output
{
  value: '1.5rem';
}
`})}),e.jsx(n.h2,{id:"valuemath",children:"value/math"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/math"}),` transformer evaluates math expressions in token values. For base-level tokens, it
computes the value directly (e.g., `,e.jsx(n.code,{children:'"8*2"'})," → ",e.jsx(n.code,{children:'"1rem"'}),`). For system-level tokens, it wraps the
expression in a CSS `,e.jsx(n.code,{children:"calc()"})," for programmatic sizing and spacing."]}),e.jsx(n.p,{children:"Applies only to tokens with math expressions in their value."}),e.jsxs(n.p,{children:["This transformer is included in the ",e.jsx(n.code,{children:"web"})," group and primarily updates raw values for CSS outputs."]}),e.jsx(n.h3,{id:"example-9",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input (base level)
{
  value: '8*2';
}
// output (base level)
{
  value: '1rem';
}

// input (sys level)
{
  value: '8*4';
  original: {
    value: '{sys.space.x2}*{sys.space.x1}';
  }
}
// output (sys level)
{
  value: 'calc(var(--cnv-sys-space-x2)*var(--cnv-sys-space-x1))';
}
`})}),e.jsx(n.h2,{id:"valueopacity",children:"value/opacity"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/opacity"}),` transformer converts opacity values from a 0–100 integer scale (as used by
Figma) to a 0–1 decimal (e.g., `,e.jsx(n.code,{children:"50"})," → ",e.jsx(n.code,{children:"0.5"}),`). This ensures outputs are compatible with CSS and
JavaScript conventions, which require values between 0 and 1.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"base.opacity.*"})," tokens not already in the 0–1 range."]}),e.jsxs(n.p,{children:["This transformer is part of the ",e.jsx(n.code,{children:"web"})," group and primarily standardizes raw CSS values."]}),e.jsx(n.h3,{id:"example-10",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: 50;
}

// output
{
  value: 0.5;
}
`})}),e.jsx(n.h2,{id:"valueshadowflat-sys",children:"value/shadow/flat-sys"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/shadow/flat-sys"})," transformer takes a structured shadow object (with properties like ",e.jsx(n.code,{children:"x"}),`,
`,e.jsx(n.code,{children:"y"}),", ",e.jsx(n.code,{children:"blur"}),", ",e.jsx(n.code,{children:"color"}),") and outputs a single-line CSS string using ",e.jsx(n.code,{children:"rem"}),` units. This allows shadow
tokens to be used directly in CSS/JS platforms in standard CSS syntax.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"system.depth.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is part of the ",e.jsx(n.code,{children:"web"}),` transform group and primarily changes raw values for CSS
outputs.`]}),e.jsx(n.h3,{id:"example-11",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: { x: 0, y: 2, blur: 4, color: "rgba(0,0,0,0.1)" }
}

// output
{
  value: "0rem 0.125rem 0.25rem rgba(0,0,0,0.1)"
}
`})}),e.jsx(n.h2,{id:"valuevariables",children:"value/variables"}),e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"value/variables"}),` transformer generates CSS variable names from token paths by converting them
(such as `,e.jsx(n.code,{children:"primary.background.default"}),`) into valid CSS variable names (e.g.,
`,e.jsx(n.code,{children:"--cnvs-primary-background-default"}),"), suitable for CSS custom properties."]}),e.jsx(n.p,{children:"This transformer is currently not in use in the codebase."}),e.jsx(n.h3,{id:"example-12",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  path: ['primary', 'background', 'default'];
}

// output
{
  value: '--cnvs-primary-background-default';
}
`})}),e.jsx(n.h2,{id:"valuewrapped-font-family",children:"value/wrapped-font-family"}),e.jsxs(n.p,{children:[`This transformer formats font family lists for CSS, ensuring any font family name containing spaces
is wrapped in quotes (e.g., `,e.jsx(n.code,{children:'"Work Sans"'})," in ",e.jsx(n.code,{children:'"Work Sans", Arial, sans-serif'}),`). This guarantees the
output is valid for CSS/JS font-family declarations.`]}),e.jsxs(n.p,{children:["Applies only to ",e.jsx(n.code,{children:"base.font-family.*"})," tokens."]}),e.jsxs(n.p,{children:["This transformer is part of the ",e.jsx(n.code,{children:"web"})," group and standardizes raw values for CSS outputs."]}),e.jsx(n.h3,{id:"example-13",children:"Example"}),e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// input
{
  value: 'Work Sans, Arial, sans-serif';
}

// output
{
  value: '"Work Sans", Arial, sans-serif';
}
`})})]})]})}function v(s={}){const{wrapper:n}={...a(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(r,{...s})}):r(s)}export{v as default};
