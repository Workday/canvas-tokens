import{j as n,a as r,F as t}from"./jsx-runtime-86dfebf6.js";import{M as d,U as o}from"./index-d36e52b4.js";import"./index-bd8a2091.js";import{u as i}from"./index-2ef8b458.js";import"./index-1b03fe98.js";import"./iframe-30d5c690.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function l(a){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",a:"a",p:"p",code:"code",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",h3:"h3",pre:"pre"},i(),a.components);return r(t,{children:[n(d,{title:"Maintaining/Style Dictionary/Transformers"}),`
`,r(o,{children:[n(e.h1,{id:"transformers",children:"Transformers"}),n(e.h2,{id:"table-of-contents",children:"Table of Contents"}),r(e.ul,{children:[`
`,n(e.li,{children:n(e.a,{href:"#overview",children:"Overview"})}),`
`,n(e.li,{children:n(e.a,{href:"#namecamel",children:"name/camel"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuebreakpointspx",children:"value/breakpoints/px"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuedeprecated",children:"value/deprecated"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueflatten-border",children:"value/flatten-border"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueflatten-oklch",children:"value/flatten-oklch"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuefont-weightnumbers",children:"value/font-weight/numbers"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuehex-to-rgba",children:"value/hex-to-rgba"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueletter-spacingpx2rem",children:"value/letter-spacing/px2rem"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueline-heightpx2rem",children:"value/line-height/px2rem"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuemath",children:"value/math"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueopacity",children:"value/opacity"})}),`
`,n(e.li,{children:n(e.a,{href:"#valueshadowflat-sys",children:"value/shadow/flat-sys"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuevariables",children:"value/variables"})}),`
`,n(e.li,{children:n(e.a,{href:"#valuewrapped-font-family",children:"value/wrapped-font-family"})}),`
`]}),n(e.h2,{id:"overview",children:"Overview"}),n(e.p,{children:`Transformers are functions that alter token values or names during the Style Dictionary
transformation process. They process each token after parsing and before formatting, enabling
consistent naming and value output across platforms. Transformers are applied to tokens and may
adjust their values (e.g., converting hex to rgba), update names, or flatten complex objects such as
box shadows or typography.`}),r(e.p,{children:["The ",n(e.code,{children:"utils/transformers/index.ts"}),` file acts as the central point for all transformers, exporting a
`,n(e.code,{children:"transforms"})," object that maps transformer names to their configurations."]}),r(e.p,{children:["Each transformer is registered with a unique name, the property it modifies (",n(e.code,{children:"value"})," or ",n(e.code,{children:"name"}),`), and
the platforms where it is applied (`,n(e.code,{children:"css"}),", ",n(e.code,{children:"js"}),`, etc.). Registered transformers run in a specified
order and can be chained so one transform's result is used by the next.`]}),r(e.table,{children:[n(e.thead,{children:r(e.tr,{children:[n(e.th,{children:"Transformer"}),n(e.th,{children:"Description"})]})}),r(e.tbody,{children:[r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"name/camel"})}),n(e.td,{children:"Converts token names from dot-path notation to camelCase for JS/TS output."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/breakpoints/px"})}),r(e.td,{children:["Evaluates breakpoint expressions and appends the ",n(e.code,{children:"px"})," unit."]})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/deprecated"})}),n(e.td,{children:"Replaces deprecated token values with their fallback values."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/flatten-border"})}),n(e.td,{children:"Flattens border object tokens into a single-line CSS string."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/flatten-oklch"})}),n(e.td,{children:"Flattens oklch color tokens and handles transparency."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/font-weight/numbers"})}),n(e.td,{children:"Maps string font weight names to their numeric equivalents."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/hex-to-rgba"})}),r(e.td,{children:["Converts hex color values to ",n(e.code,{children:"rgba()"})," CSS strings."]})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/letter-spacing/px2rem"})}),r(e.td,{children:["Converts letter-spacing from pixel units to ",n(e.code,{children:"rem"}),"."]})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/line-height/px2rem"})}),r(e.td,{children:["Converts pixel-based line-height values to ",n(e.code,{children:"rem"}),"."]})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/math"})}),n(e.td,{children:"Evaluates math expressions in token values."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/opacity"})}),n(e.td,{children:"Converts opacity from 0–100 scale to 0–1 decimal."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/shadow/flat-sys"})}),n(e.td,{children:"Flattens shadow objects into single-line CSS strings."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/variables"})}),n(e.td,{children:"Generates CSS variable names from token paths."})]}),r(e.tr,{children:[n(e.td,{children:n(e.code,{children:"value/wrapped-font-family"})}),n(e.td,{children:"Wraps font family names containing spaces in quotes."})]})]})]}),n(e.p,{children:"Below is a detailed description and example of each transformer."}),n(e.h2,{id:"namecamel",children:"name/camel"}),r(e.p,{children:["The ",n(e.code,{children:"name/camel"}),` transformer converts token names from dot-path notation (e.g.,
`,n(e.code,{children:"primary.background.default"}),`) into JavaScript/TypeScript-style camelCase (e.g.,
`,n(e.code,{children:"primaryBackgroundDefault"}),"), as used for object keys in JS/TS files."]}),n(e.p,{children:"Used only for JS/TS object output."}),n(e.h3,{id:"example",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  name: 'default',
  path: ['primary', 'background', 'default'];
}

// output
{
  name: 'primaryBackgroundDefault';
}
`})}),n(e.h2,{id:"valuebreakpointspx",children:"value/breakpoints/px"}),r(e.p,{children:[`This transformer is for tokens whose values define breakpoints, either numerically or as math
expressions (e.g., `,n(e.code,{children:'"600+16"'}),"). It evaluates any expression and appends the ",n(e.code,{children:"px"}),` unit. This is
needed because CSS does not support unitless values.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"base.breakpoints.*"})," tokens."]}),r(e.p,{children:["This transformer is in the ",n(e.code,{children:"web"})," group and mainly outputs raw CSS values."]}),n(e.h3,{id:"example-1",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: '600+16';
}
// output
{
  value: '616px';
}
`})}),n(e.h2,{id:"valuedeprecated",children:"value/deprecated"}),r(e.p,{children:["This transformer only applies to tokens with the ",n(e.code,{children:"deprecated"})," property set to ",n(e.code,{children:"true"}),`. When such a
token is found, the transformer replaces its value with that provided by the `,n(e.code,{children:"fallback"}),` field, if it
exists. If no fallback exists, the original value is unchanged. This ensures deprecated tokens
redirect to their replacements, helping maintainers guide consumers to updated tokens.`]}),r(e.p,{children:["This transformer belongs to the ",n(e.code,{children:"web"}),` transform group and primarily changes raw values for CSS
outputs.`]}),n(e.h3,{id:"example-2",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
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
`})}),n(e.h2,{id:"valueflatten-border",children:"value/flatten-border"}),r(e.p,{children:["This transformer flattens border object tokens (with ",n(e.code,{children:"width"}),", ",n(e.code,{children:"style"}),", and ",n(e.code,{children:"color"}),` properties) into
a single-line CSS string (e.g., `,n(e.code,{children:'"1px solid #000"'}),`), making border tokens directly usable in
CSS-in-JS or similar environments.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"sys.border.*"})," tokens."]}),r(e.p,{children:["This transformer is part of the ",n(e.code,{children:"web"})," group and changes raw CSS values."]}),n(e.h3,{id:"example-3",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: { width: 1, style: "solid", color: "#000" }
}

// output
{
  value: "1px solid #000"
}
`})}),n(e.h2,{id:"valueflatten-oklch",children:"value/flatten-oklch"}),r(e.p,{children:[`This transformer processes tokens in the oklch color space. It flattens tokens using oklch notation
(e.g., `,n(e.code,{children:"oklch(63.3% 0.21 230)"}),`), replaces palette references with their actual values, and outputs
CSS's `,n(e.code,{children:"transparent"})," for cases like ",n(e.code,{children:"{base.opacity.0}"}),`. This ensures correct color referencing in all
platforms.`]}),r(e.p,{children:["Applied only to tokens whose value includes ",n(e.code,{children:"oklch"}),"."]}),r(e.p,{children:["This transformer is included in the ",n(e.code,{children:"web"})," group and mainly updates raw values for CSS outputs."]}),n(e.h3,{id:"example-4",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
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
`})}),n(e.h2,{id:"valuefont-weightnumbers",children:"value/font-weight/numbers"}),r(e.p,{children:["This transformer maps string font weight names (e.g. ",n(e.code,{children:"'bold'"}),", ",n(e.code,{children:"'regular'"}),", ",n(e.code,{children:"'medium'"}),`) to their
numeric equivalents (`,n(e.code,{children:"700"})," for ",n(e.code,{children:"'bold'"}),`, etc.), following the CSS font weight spec. This enables
always using numeric font weights as needed for many outputs.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"base.font-weight.*"})," tokens."]}),r(e.p,{children:["This transformer is part of the ",n(e.code,{children:"web"}),` transform group and primarily updates raw values for CSS
outputs.`]}),n(e.h3,{id:"example-5",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: 'bold';
}

// output
{
  value: 700;
}
`})}),n(e.h2,{id:"valuehex-to-rgba",children:"value/hex-to-rgba"}),r(e.p,{children:["The ",n(e.code,{children:"value/hex-to-rgba"}),` transformer converts token values in hexadecimal color notation (e.g.,
`,n(e.code,{children:"#FF00AA"}),") to the equivalent ",n(e.code,{children:"rgba()"}),` CSS string. This is useful for platforms that require explicit
alpha in color output, even for opaque colors.`]}),n(e.p,{children:"Applied to tokens whose value matches a hex color pattern."}),r(e.p,{children:["Currently, this transformer is not used by any platform, as final tokens are generated in ",n(e.code,{children:"oklch"}),`
format.`]}),n(e.h3,{id:"example-6",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: '#FF00AA';
}

// output
{
  value: 'rgba(255, 0, 170, 1)';
}
`})}),n(e.h2,{id:"valueletter-spacingpx2rem",children:"value/letter-spacing/px2rem"}),r(e.p,{children:["The ",n(e.code,{children:"value/letter-spacing/px2rem"})," transformer converts letter-spacing from pixel units to ",n(e.code,{children:"rem"}),`. It
parses pixel values (e.g., `,n(e.code,{children:'"1.25px"'}),"), divides by 16, and outputs as rem for scalable usage."]}),r(e.p,{children:["Applies to ",n(e.code,{children:"base.letter-spacing.*"})," tokens."]}),r(e.p,{children:["This transformer is included in the ",n(e.code,{children:"web"})," group and primarily outputs raw CSS values."]}),n(e.h3,{id:"example-7",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: '1.25px';
}

// output
{
  value: '0.078125rem';
}
`})}),n(e.h2,{id:"valueline-heightpx2rem",children:"value/line-height/px2rem"}),r(e.p,{children:["The ",n(e.code,{children:"value/line-height/px2rem"})," transformer converts pixel-based line-height values (such as ",n(e.code,{children:"24"}),`)
into their equivalent `,n(e.code,{children:"rem"})," values by dividing by 16 (root font size) and appending ",n(e.code,{children:"rem"}),`. This
makes line-heights scalable and suitable for modern CSS/JS outputs.`]}),r(e.p,{children:["Applied only to ",n(e.code,{children:"base.line-height.*"})," tokens."]}),r(e.p,{children:["This transformer is included in the ",n(e.code,{children:"web"})," group and primarily adjusts raw values for CSS outputs."]}),n(e.h3,{id:"example-8",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: 24;
}

// output
{
  value: '1.5rem';
}
`})}),n(e.h2,{id:"valuemath",children:"value/math"}),r(e.p,{children:["The ",n(e.code,{children:"value/math"}),` transformer evaluates math expressions in token values. For base-level tokens, it
computes the value directly (e.g., `,n(e.code,{children:'"8*2"'})," → ",n(e.code,{children:'"1rem"'}),`). For system-level tokens, it wraps the
expression in a CSS `,n(e.code,{children:"calc()"})," for programmatic sizing and spacing."]}),n(e.p,{children:"Applies only to tokens with math expressions in their value."}),r(e.p,{children:["This transformer is included in the ",n(e.code,{children:"web"})," group and primarily updates raw values for CSS outputs."]}),n(e.h3,{id:"example-9",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input (base level)
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
`})}),n(e.h2,{id:"valueopacity",children:"value/opacity"}),r(e.p,{children:["The ",n(e.code,{children:"value/opacity"}),` transformer converts opacity values from a 0–100 integer scale (as used by
Figma) to a 0–1 decimal (e.g., `,n(e.code,{children:"50"})," → ",n(e.code,{children:"0.5"}),`). This ensures outputs are compatible with CSS and
JavaScript conventions, which require values between 0 and 1.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"base.opacity.*"})," tokens not already in the 0–1 range."]}),r(e.p,{children:["This transformer is part of the ",n(e.code,{children:"web"})," group and primarily standardizes raw CSS values."]}),n(e.h3,{id:"example-10",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: 50;
}

// output
{
  value: 0.5;
}
`})}),n(e.h2,{id:"valueshadowflat-sys",children:"value/shadow/flat-sys"}),r(e.p,{children:["The ",n(e.code,{children:"value/shadow/flat-sys"})," transformer takes a structured shadow object (with properties like ",n(e.code,{children:"x"}),`,
`,n(e.code,{children:"y"}),", ",n(e.code,{children:"blur"}),", ",n(e.code,{children:"color"}),") and outputs a single-line CSS string using ",n(e.code,{children:"rem"}),` units. This allows shadow
tokens to be used directly in CSS/JS platforms in standard CSS syntax.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"system.depth.*"})," tokens."]}),r(e.p,{children:["This transformer is part of the ",n(e.code,{children:"web"}),` transform group and primarily changes raw values for CSS
outputs.`]}),n(e.h3,{id:"example-11",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: { x: 0, y: 2, blur: 4, color: "rgba(0,0,0,0.1)" }
}

// output
{
  value: "0rem 0.125rem 0.25rem rgba(0,0,0,0.1)"
}
`})}),n(e.h2,{id:"valuevariables",children:"value/variables"}),r(e.p,{children:["The ",n(e.code,{children:"value/variables"}),` transformer generates CSS variable names from token paths by converting them
(such as `,n(e.code,{children:"primary.background.default"}),`) into valid CSS variable names (e.g.,
`,n(e.code,{children:"--cnvs-primary-background-default"}),"), suitable for CSS custom properties."]}),n(e.p,{children:"This transformer is currently not in use in the codebase."}),n(e.h3,{id:"example-12",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  path: ['primary', 'background', 'default'];
}

// output
{
  value: '--cnvs-primary-background-default';
}
`})}),n(e.h2,{id:"valuewrapped-font-family",children:"value/wrapped-font-family"}),r(e.p,{children:[`This transformer formats font family lists for CSS, ensuring any font family name containing spaces
is wrapped in quotes (e.g., `,n(e.code,{children:'"Work Sans"'})," in ",n(e.code,{children:'"Work Sans", Arial, sans-serif'}),`). This guarantees the
output is valid for CSS/JS font-family declarations.`]}),r(e.p,{children:["Applies only to ",n(e.code,{children:"base.font-family.*"})," tokens."]}),r(e.p,{children:["This transformer is part of the ",n(e.code,{children:"web"})," group and standardizes raw values for CSS outputs."]}),n(e.h3,{id:"example-13",children:"Example"}),n(e.pre,{children:n(e.code,{className:"language-js",children:`// input
{
  value: 'Work Sans, Arial, sans-serif';
}

// output
{
  value: '"Work Sans", Arial, sans-serif';
}
`})})]})]})}function x(a={}){const{wrapper:e}=Object.assign({},i(),a.components);return e?n(e,Object.assign({},a,{children:n(l,a)})):l(a)}export{x as default};
