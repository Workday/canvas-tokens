import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-Pe1yh6Xi.js";import{M as c}from"./index-QYG3jjN8.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function d(n){const s={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Guides/Upgrade Guides/v5/Overview"}),`
`,e.jsx(s.h2,{id:"whats-new-in-v5",children:"What's New in v5"}),`
`,e.jsx(s.p,{children:`Sana Canvas Tokens v5 is mainly about making the token system easier to use and to keep up to date
while delivering performance gains by splitting tokens into smaller, modular bundles for
tree-shaking and smaller production builds. The headline feature is dark mode for the sana-canvas
theme. The package is also lighter, and the cleanup of names, sizes and older tokens makes it
simpler to understand and to maintain.`}),`
`,e.jsxs(s.p,{children:[`Most changes exist to make the system more consistent. Names follow a clearer pattern, old
overlapping tokens are removed, and newer ones are marked deprecated so teams can move in their own
time. A new `,e.jsx(s.code,{children:"token()"}),` function makes it easier to work with tokens by name without relying on JS
imports or long CSS names.`]}),`
`,e.jsx(s.h3,{id:"why-move-to-v5",children:"Why move to v5"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Dark mode without extra work."}),` The sana-canvas theme now includes a dark mode version. Colors
follow the active theme, so products can offer dark mode without setting every dark color by hand.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"A lighter package and better tree-shaking."}),` Token code is split into smaller modules, and a
project can load only the groups it uses. The compressed package is about 10% smaller, and the
stylesheet is about 21% smaller, even with the dark theme included.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"The old system is removed or deprecated"}),`: the old palette names, numbered type sizes, space
tokens, multiplier shape names, role-based brand names, and older color groups. Additional tokens
that no longer fit the new naming conventions or usage patterns are deprecated.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"New tokens take their place"}),`: gap and padding replace space tokens, surface and foreground
replace the older color groups, t-shirt names replace multiplier and long-form names, and numbered
brand steps replace role names.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Use tokens by name in code"}),". The new ",e.jsx(s.code,{children:"token()"})," function returns a ",e.jsx(s.code,{children:"var"}),`-wrapped reference to a
token by its name, and code editors check the name as you type.`]}),`
`]}),`
`]}),`
`,e.jsx(s.h3,{id:"themes",children:"Themes"}),`
`,e.jsxs(s.p,{children:["Since v4.4, the package has two color themes, default and ",e.jsx(s.code,{children:"sana-canvas"}),`. The default canvas theme is
applied at the `,e.jsx(s.code,{children:":root"}),` level and needs no setup. The sana-canvas theme is scoped to the
`,e.jsx(s.code,{children:'data-theme="sana-canvas"'}),` attribute and overrides the tokens that differ in Sana. Both themes are
included in the `,e.jsx(s.code,{children:"css/index.css"})," import."]}),`
`,e.jsxs(s.p,{children:["To apply a theme, set the ",e.jsx(s.code,{children:"data-theme"}),` attribute on an element that wraps your layout. Tokens inside
that element resolve to the theme values:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Default canvas theme: no attribute is needed -->
<body>
  <!-- Your layout -->
</body>

<!-- sana-canvas theme for the whole app -->
<body data-theme="sana-canvas">
  <!-- Your layout -->
</body>

<!-- sana-canvas theme for one part of the page -->
<section data-theme="sana-canvas">
  <!-- Your layout -->
</section>
`})}),`
`,e.jsx(s.p,{children:"Changes made to the sana-canvas theme in v5:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Some tokens were moved to the ",e.jsx(s.code,{children:":root"}),` level, so that tokens that do not change between themes are
defined in the same place and the theme only contains the values that differ.`]}),`
`,e.jsxs(s.li,{children:[`Chart diverging tokens are flattened to remove unnecessary wrapping, so they are no longer placed
under the `,e.jsx(s.code,{children:"azure-coral"})," group."]}),`
`,e.jsxs(s.li,{children:["Dark mode is added to the theme. See ",e.jsx(s.a,{href:"#dark-mode",children:"Dark mode"})," for the setup."]}),`
`,e.jsxs(s.li,{children:[`The sana-canvas theme colors are extended to support a color mode override to light. Light values
also apply under `,e.jsx(s.code,{children:'[data-theme="sana-canvas"][data-color-mode="light"]'}),` and to a
`,e.jsx(s.code,{children:'[data-color-mode="light"]'}),` element nested inside the theme, so a light area can be placed inside
a dark page.`]}),`
`]}),`
`,e.jsx(s.h3,{id:"changes-in-package-structure",children:"Changes in package structure"}),`
`,e.jsx(s.h4,{id:"javascript-slash-imports",children:"JavaScript slash imports"}),`
`,e.jsx(s.p,{children:`Token code is now split into one module per group. The groups include base, brand, system and
component, with smaller groups for color, size, gap and padding. A package exports map lets a
project import a single group, such as only the color group, without loading everything else. The
package declares no side effects, which lets bundlers remove any code you do not use. It still has
no runtime dependencies.`}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`/* In a JavaScript or TypeScript entry file */
import {size100, blue400} from '@workday/canvas-tokens-web/base';
import {color} from '@workday/canvas-tokens-web/color';
import {shape} from '@workday/canvas-tokens-web/shape';
`})}),`
`,e.jsx(s.h4,{id:"stylesheets",children:"Stylesheets"}),`
`,e.jsxs(s.p,{children:[`The legacy stylesheets are removed. One entry stylesheet imports every group, including the light
and dark sana files. Each group also has its own stylesheet for projects that need only part of the
set. The dark theme is a separate file of about 45 KB uncompressed. A project that needs light mode
only can skip it and load about 83 KB of stylesheet. In v5, all CSS can be imported through a single
`,e.jsx(s.code,{children:"index.css"}),` file instead of multiple group files. Import the group files individually if you need a
different CSS file order or only some of the files.`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`@import '@workday/canvas-tokens-web/css/base/_variables.css';
@import '@workday/canvas-tokens-web/css/system/_variables.css';
@import '@workday/canvas-tokens-web/css/brand/_variables.css';

/* Multiple group imports can be replaced by the single index.css import */
@import '@workday/canvas-tokens-web/css/index.css';
`})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`import '@workday/canvas-tokens-web/css/base/_variables.css';
import '@workday/canvas-tokens-web/css/system/_variables.css';
import '@workday/canvas-tokens-web/css/brand/_variables.css';

// Multiple group imports can be replaced by the single index.css import
import '@workday/canvas-tokens-web/css/index.css';
`})}),`
`,e.jsx(s.h3,{id:"token-values-changes",children:"Token Values Changes"}),`
`,e.jsx(s.h4,{id:"base-palette-adjustments",children:"Base palette adjustments"}),`
`,e.jsx(s.p,{children:`The base palette has been adjusted to better align with Sana colors and support dark mode. Some
color values have changed, and some tokens have been added. Projects using the base palette should
review these changes to ensure visual consistency.`}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:`All tokens in the neutral palette have been updated. The neutral palette moved from a warm tint to
true neutral gray.`}),`
`,e.jsx(s.li,{children:"The slate palette has been changed in hue and lightness across its scale."}),`
`,e.jsx(s.li,{children:"Transparent white tokens have been changed in hue and alpha."}),`
`,e.jsxs(s.li,{children:["New color sets for dark mode (such as ",e.jsx(s.code,{children:"dark.azure.*"}),", ",e.jsx(s.code,{children:"dark.coral.*"})," and ",e.jsx(s.code,{children:"dark.green.*"}),`) have been
added to the base palette.`]}),`
`,e.jsx(s.li,{children:"A new alpha black color set has been added to the base palette."}),`
`]}),`
`,e.jsx(s.p,{children:"The main color palette adjustments are listed in the following table:"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Token"}),e.jsx(s.th,{children:"v4 value"}),e.jsx(s.th,{children:"v5 value"}),e.jsx(s.th,{children:"What changed"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.amber.300"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"#fec10b"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"#fec10c"})}),e.jsx(s.td,{children:"Minor color tweak (blue +1)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.amber.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#e1b919"})," α 0.1"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ddb100"})," α 0.09"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.amber.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ffdd06"})," α 0.349"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ffdc00"})," α 0.341"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.amber.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#fcd803"})," α 0.64"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#fcd700"})," α 0.631"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.amber.a300"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#febe00"})," α 0.95"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#febe00"})," α 0.954"]}),e.jsx(s.td,{children:"Slightly more opaque"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.azure.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#05bcff"})," α 0.06"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00bbff"})," α 0.06"]}),e.jsx(s.td,{children:"Minor color tweak (red -5, green -1)"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.azure.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#05b8ff"})," α 0.14"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00b6ff"})," α 0.137"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.blue.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#1e8fff"})," α 0.08"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0080ff"})," α 0.071"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.blue.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0e83ff"})," α 0.17"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#007dff"})," α 0.161"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.coral.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff5005"})," α 0.04"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff4c00"})," α 0.039"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.coral.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff4412"})," α 0.08"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff3500"})," α 0.074"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.coral.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff3e08"})," α 0.15"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff3700"})," α 0.145"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.coral.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff3f05"})," α 0.36"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff3c00"})," α 0.353"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.green.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#1eff37"})," α 0.08"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#01ff1e"})," α 0.071"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.green.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0fff37"})," α 0.15"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00ff2a"})," α 0.145"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.green.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#03f130"})," α 0.29"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00f12e"})," α 0.287"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.green.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#02e33f"})," α 0.6"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00e33e"})," α 0.596"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.green.a300"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00ce4b"})," α 0.78"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00ce4b"})," α 0.777"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.indigo.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#2323ff"})," α 0.05"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0001ff"})," α 0.043"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.indigo.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#051eff"})," α 0.08"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#001aff"})," α 0.079"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.indigo.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#1120ff"})," α 0.13"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0011ff"})," α 0.122"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.indigo.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#091eff"})," α 0.24"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0016ff"})," α 0.232"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.magenta.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff23ff"})," α 0.05"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#fe00ff"})," α 0.043"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.magenta.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff12ff"})," α 0.08"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff00ff"})," α 0.074"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.magenta.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff0be6"})," α 0.16"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff00e5"})," α 0.153"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.magenta.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff01f7"})," α 0.24"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff00f7"})," α 0.239"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.orange.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#f57d05"})," α 0.1"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#f57a00"})," α 0.098"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.orange.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff8f08"})," α 0.17"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff8c00"})," α 0.164"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.orange.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff8303"})," α 0.25"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff8100"})," α 0.247"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.orange.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff7f01"})," α 0.46"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff7e00"})," α 0.459"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.purple.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#9b05ff"})," α 0.04"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#9900ff"})," α 0.039"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.purple.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#9b0bff"})," α 0.09"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#9600ff"})," α 0.086"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.purple.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ad08ff"})," α 0.17"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#aa00ff"})," α 0.165"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.purple.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#bb07ff"})," α 0.25"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#b900ff"})," α 0.243"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.red.25"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"#fff0ef"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"#fff5f4"})}),e.jsx(s.td,{children:"Slightly lighter"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.red.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff0505"})," α 0.04"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#fe1600"})," α 0.043"]}),e.jsx(s.td,{children:"Slightly more opaque"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.red.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff2d19"})," α 0.1"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff1600"})," α 0.09"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.red.a100"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff240b"})," α 0.16"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff1a00"})," α 0.153"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.red.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff2304"})," α 0.35"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#ff2000"})," α 0.345"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.teal.a25"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#16f4ff"})," α 0.09"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#01f3ff"})," α 0.083"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.teal.a50"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#0de5fa"})," α 0.19"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00e3fa"})," α 0.18"]}),e.jsx(s.td,{children:"Slightly more transparent"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"base.teal.a200"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#01b6c9"})," α 0.37"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"#00b6c9"})," α 0.369"]}),e.jsx(s.td,{children:"Slightly more transparent"})]})]})]}),`
`,e.jsx(s.h4,{id:"motion-tokens-changes",children:"Motion tokens changes"}),`
`,e.jsx(s.p,{children:"Here are the motion token changes in v5:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:`The purposeful (B) base easing tokens were updated to use new cubic bezier curve values that more
closely align with Sana`}),`
`,e.jsxs(s.li,{children:["A ",e.jsx(s.code,{children:"duration0"})," base duration token has been added"]}),`
`,e.jsx(s.li,{children:`System duration tokens have been added, so that consumers can use semantic durations alongside the
existing system easing tokens instead of reaching for base duration values directly`}),`
`]}),`
`,e.jsx(s.h4,{id:"other-tokens-adjustments",children:"Other tokens adjustments"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Three opacity values changed to align with Sana:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"base.opacity.100"})," rose from 0.08 to 0.10,"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"system.opacity.accent.hover"})," rose from 0.045 to 0.18,"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"system.opacity.accent.pressed"})," rose from 0.118 to 0.36."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Two base sizes added: ",e.jsx(s.code,{children:"base.size.275"})," (22px) and ",e.jsx(s.code,{children:"base.size.325"})," (26px)."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:`The full-round shape changed from 37.5rem to 62.5rem to match the Figma value and keep tokens
consistent.`}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"breakpoints"})," tokens are deprecated. Replace them with the new ",e.jsx(s.code,{children:"breakpoint"}),` tokens for
consistency with the design system and its naming conventions.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Sana diverging chart colors are flattened and no longer placed under the ",e.jsx(s.code,{children:"azure-coral"})," group."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["The shape scale is extended with a new ",e.jsx(s.code,{children:"xs"})," (0.25rem) value. The ",e.jsx(s.code,{children:"sm"}),` value changed to
`,e.jsx(s.code,{children:"base.size.75"}),", ",e.jsx(s.code,{children:"xxl"})," to ",e.jsx(s.code,{children:"base.size.250"}),", and ",e.jsx(s.code,{children:"xxxl"})," to ",e.jsx(s.code,{children:"base.size.350"}),`, reducing the radius on
larger shapes to align with the Sana design system.`]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"The font-family fallback order is fixed so that it resolves correctly."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"Brand neutral colors now use neutral colors instead of slate."}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"font-weight"})," property in the typography composite tokens now uses ",e.jsx(s.code,{children:"font-weight.regular"}),`
instead of `,e.jsx(s.code,{children:"font-weight.normal"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(s.h3,{id:"dark-mode",children:"Dark mode"}),`
`,e.jsxs(s.p,{children:[`Dark mode is part of the sana-canvas theme in v5. The same system tokens, such as
`,e.jsx(s.code,{children:"system.color.surface.default"})," and ",e.jsx(s.code,{children:"system.color.fg.default"}),`, resolve to different values depending
on the color mode. Anything styled with system tokens switches between light and dark without code
changes. For more details and a live example, see
`,e.jsx(s.a,{href:"?path=/docs/docs-dark-mode-sana-canvas-theme--docs",children:"the Dark Mode docs"}),"."]}),`
`,e.jsx(s.p,{children:"To apply dark mode:"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:["Import the CSS variables through the single ",e.jsx(s.code,{children:"css/index.css"})," import."]}),`
`,e.jsxs(s.li,{children:["Set ",e.jsx(s.code,{children:'data-theme="sana-canvas"'})," on an element that wraps your layout."]}),`
`,e.jsxs(s.li,{children:["Set ",e.jsx(s.code,{children:"data-color-mode"})," to ",e.jsx(s.code,{children:"light"})," or ",e.jsx(s.code,{children:"dark"})," on that element, or on any element inside it."]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<div data-theme="sana-canvas" data-color-mode="dark">
  <!-- Your layout -->
</div>
`})}),`
`,e.jsxs(s.p,{children:["To switch modes, change the ",e.jsx(s.code,{children:"data-color-mode"}),` value. Because the attribute can also be set on an
element inside the theme, part of a page, such as a single panel or card, can use dark mode while
the rest stays light.`]}),`
`,e.jsxs(s.h3,{id:"token-function",children:[e.jsx(s.code,{children:"token()"})," function"]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"token()"}),` takes a token name and returns a reference to the matching CSS variable. Plain CSS
variables remain the recommended approach. `,e.jsx(s.code,{children:"token()"}),` is useful when code needs to refer to a token
by name. Code editors check token names as you type, so a wrong name is caught before the page is
built. A type token returns a whole text style in one call, covering font family, weight, size, line
height and letter spacing. An optional fallback can be given for a value that may be missing, and
the fallback is a CSS variable name, not a token name. For example, a call to `,e.jsx(s.code,{children:"token('color.bg')"}),`
returns a reference to the default background variable:`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-javascript",children:`import {token} from '@workday/canvas-tokens-web/token';

token('color.bg');
// 'var(--cnvs-sys-color-bg-default)'

token('color.bg', '--app-surface');
// 'var(--cnvs-sys-color-bg-default, var(--app-surface))'

token('type.body.md');
// {
//   fontFamily:    'var(--cnvs-sys-font-family-default)',
//   fontWeight:    'var(--cnvs-sys-font-weight-regular)',
//   fontSize:      'var(--cnvs-sys-font-size-body-md)',
//   lineHeight:    'var(--cnvs-sys-line-height-body-md)',
//   letterSpacing: 'var(--cnvs-sys-letter-spacing-body-md)'
// }
`})}),`
`,e.jsx(s.p,{children:`A name that is not in the list is not rejected at run time. In TypeScript the error appears at build
time, while in plain JavaScript the call returns a reference that resolves to nothing. The reference
only works when the matching stylesheet is loaded.`}),`
`,e.jsx(s.h3,{id:"deprecations",children:"Deprecations"}),`
`,e.jsx(s.p,{children:`Deprecated names still work in v5. They will be removed in a later major release, so move to the
replacement when your team has time. The table lists each deprecated name with its replacement.`}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Deprecated"}),e.jsx(s.th,{children:"Replacement"}),e.jsx(s.th,{children:"Notes"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.shadow.x.100"})," and ",e.jsx(s.code,{children:"base.shadow.x.200"})]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.shadow.x.key"})," and ",e.jsx(s.code,{children:"base.shadow.x.ambient"})]}),e.jsx(s.td,{children:"Clearer names for the two shadow layers. These were added in v5."})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.letter.spacing"})," 50, 100, 150, 200"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.letter.spacing"})," 1 to 12"]}),e.jsx(s.td,{children:"One consistent 1 to 12 scale."})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.opacity"})," 250, 300 and 500"]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"base.opacity"})," 200, 400 and 840"]}),e.jsx(s.td,{children:"Closest steps on the opacity scale."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"component.expressive.icon.*"})}),e.jsx(s.td,{children:"None"}),e.jsx(s.td,{children:"Expressive icons are being retired. Plan to remove this styling."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"breakpoints.x"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"breakpoint.x"})}),e.jsx(s.td,{children:"Singular name, matching the other object names."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"font.weight.normal"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"font.weight.regular"})}),e.jsx(s.td,{children:"Matches the standard weight naming."})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"opacity.shadow.first"})," and ",e.jsx(s.code,{children:"opacity.shadow.second"})]}),e.jsx(s.td,{children:"Shadow tokens"}),e.jsx(s.td,{children:"Shadow values have their own tokens."})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"color.shadow.base"})," and ",e.jsx(s.code,{children:"color.shadow.ambient"})]}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"color.shadow.N.key"})," and ",e.jsx(s.code,{children:"color.shadow.N.ambient"})]}),e.jsx(s.td,{children:"Shadow colors are numbered by level."})]})]})]}),`
`,e.jsx(s.h3,{id:"removals",children:"Removals"}),`
`,e.jsxs(s.p,{children:[`For more details on the mapping from old tokens to new tokens, see
`,e.jsx(s.a,{href:"https://workday.github.io/canvas-tokens/?path=/docs/guides-upgrade-guides-v3-visual-changes-base-deprecated-palette--docs",rel:"nofollow",children:"the migration guide"}),`
or
`,e.jsx(s.a,{href:"https://workday.github.io/canvas-kit/?path=/docs/guides-tokens-migration-migration-codemod--docs",rel:"nofollow",children:"the codemod documentation"}),`.
Migration docs are also available in
`,e.jsx(s.a,{href:"https://workday.github.io/canvas-kit/?path=/docs/ai-for-llms-mcp-docs--docs",rel:"nofollow",children:"the Canvas Kit MCP"}),"."]}),`
`,e.jsx(s.h4,{id:"sass-and-less-files",children:"Sass and Less files"}),`
`,e.jsxs(s.p,{children:["The Sass (",e.jsx(s.code,{children:".scss"}),") and Less (",e.jsx(s.code,{children:".less"}),`) token files are removed. Use the CSS variables files instead,
either through the single `,e.jsx(s.code,{children:"css/index.css"}),` import or the group stylesheets. CSS variables can be used
in Sass and Less files as regular `,e.jsx(s.code,{children:"var()"})," references."]}),`
`,e.jsx(s.h4,{id:"old-palette-tokens",children:"Old palette tokens"}),`
`,e.jsx(s.p,{children:`The fruit-themed color families are removed. There were 28 families and 168 JavaScript names in
total. Each family now maps to one or two standard palettes, as shown below.`}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Old family (v4)"}),e.jsx(s.th,{children:"Standard palette (v5)"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"cinnamon"})}),e.jsx(s.td,{children:"red"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"grapeSoda"})}),e.jsx(s.td,{children:"magenta, purple"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"peach"})}),e.jsx(s.td,{children:"coral, red"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"pomegranate"})}),e.jsx(s.td,{children:"magenta, red"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"chiliMango"})}),e.jsx(s.td,{children:"coral, orange"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"fruitPunch"})}),e.jsx(s.td,{children:"red"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"cantaloupe"})}),e.jsx(s.td,{children:"amber"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"rootBeer"})}),e.jsx(s.td,{children:"coral, amber"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"sourLemon"})}),e.jsx(s.td,{children:"amber"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"toastedMarshmallow"})}),e.jsx(s.td,{children:"amber, orange"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"juicyPear"})}),e.jsx(s.td,{children:"amber, green"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"licorice"})}),e.jsx(s.td,{children:"slate"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"kiwi"})}),e.jsx(s.td,{children:"green"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"berrySmoothie"})}),e.jsx(s.td,{children:"indigo, blue"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"greenApple"})}),e.jsx(s.td,{children:"green"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"blackberry"})}),e.jsx(s.td,{children:"indigo"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"watermelon"})}),e.jsx(s.td,{children:"teal, green"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"islandPunch"})}),e.jsx(s.td,{children:"purple"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"jewel"})}),e.jsx(s.td,{children:"teal"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"blueberry"})}),e.jsx(s.td,{children:"blue"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"toothpaste"})}),e.jsx(s.td,{children:"azure"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"plum"})}),e.jsx(s.td,{children:"blue"})]})]})]}),`
`,e.jsxs(s.p,{children:["Six more families (",e.jsx(s.code,{children:"blackPepper"}),", ",e.jsx(s.code,{children:"coconut"}),", ",e.jsx(s.code,{children:"cappuccino"}),", ",e.jsx(s.code,{children:"extendedDragonFruit"}),", ",e.jsx(s.code,{children:"frenchVanilla"}),`,
`,e.jsx(s.code,{children:"soap"}),`) also move to the standard palette. Their exact step mapping has not been confirmed, so teams
using them should define it.`]}),`
`,e.jsx(s.h4,{id:"base-type-tokens-font-size-and-line-height",children:"Base type tokens: font size and line height"}),`
`,e.jsxs(s.p,{children:[`The numbered base font-size and line-height scales are removed. There were 15 font-size names and 13
line-height names. Use the named size tokens by role instead. For example, `,e.jsx(s.code,{children:"body-md"}),` replaces the
numbered steps for body text. Set both the size and the line height from the same role.`]}),`
`,e.jsx(s.h4,{id:"old-utility-tokens-and-renamed-tokens",children:"Old utility tokens and renamed tokens"}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"baseUnit"})," token is renamed to ",e.jsx(s.code,{children:"base.baseline"}),". Typescale tokens are removed. The ",e.jsx(s.code,{children:"legacy"}),` and
`,e.jsx(s.code,{children:"sana"}),` utility objects are removed, and the Sana JavaScript export is removed with them. Use regular
JavaScript tokens instead.`]}),`
`,e.jsx(s.h4,{id:"semi-semantic-brand-tokens",children:"Semi-semantic brand tokens"}),`
`,e.jsxs(s.p,{children:["Named brand roles such as ",e.jsx(s.code,{children:"brand.primary.base"})," and ",e.jsx(s.code,{children:"brand.neutral.dark"}),` are replaced by numbered
steps. Choose the step that matches the shade you need. For example, `,e.jsx(s.code,{children:"brand.primary.base"}),` is
replaced by `,e.jsx(s.code,{children:"brand.primary.600"}),", as named in the v4 type declarations. The ",e.jsx(s.code,{children:"alert"}),", ",e.jsx(s.code,{children:"error"}),`,
`,e.jsx(s.code,{children:"success"})," and ",e.jsx(s.code,{children:"neutral"})," brand groups are replaced by ",e.jsx(s.code,{children:"caution"}),", ",e.jsx(s.code,{children:"critical"}),", ",e.jsx(s.code,{children:"positive"})," and ",e.jsx(s.code,{children:"neutral"}),`
groups, each with numbered steps. The top-level `,e.jsx(s.code,{children:"alert"}),", ",e.jsx(s.code,{children:"error"})," and ",e.jsx(s.code,{children:"success"}),` color objects are
replaced by brand `,e.jsx(s.code,{children:"caution"}),", ",e.jsx(s.code,{children:"critical"})," and ",e.jsx(s.code,{children:"positive"}),"."]}),`
`,e.jsx(s.h4,{id:"t-shirt-step-names-type-and-breakpoints",children:"T-shirt step names: type and breakpoints"}),`
`,e.jsxs(s.p,{children:["Type sizes and breakpoints use short t-shirt names. The long forms are removed: ",e.jsx(s.code,{children:"body.small"}),` becomes
`,e.jsx(s.code,{children:"body.sm"}),", ",e.jsx(s.code,{children:"body.medium"})," becomes ",e.jsx(s.code,{children:"body.md"}),", and ",e.jsx(s.code,{children:"body.large"})," becomes ",e.jsx(s.code,{children:"body.lg"}),`. The single-letter
breakpoint names `,e.jsx(s.code,{children:"s"}),", ",e.jsx(s.code,{children:"m"})," and ",e.jsx(s.code,{children:"l"})," are removed in favor of ",e.jsx(s.code,{children:"sm"}),", ",e.jsx(s.code,{children:"md"})," and ",e.jsx(s.code,{children:"lg"}),"."]}),`
`,e.jsx(s.h4,{id:"multiplier-shape-names",children:"Multiplier shape names"}),`
`,e.jsxs(s.p,{children:["The shape names based on multipliers are removed, such as ",e.jsx(s.code,{children:"x1"}),", ",e.jsx(s.code,{children:"x2"}),", ",e.jsx(s.code,{children:"x4"}),", ",e.jsx(s.code,{children:"x6"})," and ",e.jsx(s.code,{children:"x1-half"}),`. The
`,e.jsx(s.code,{children:"half"}),", ",e.jsx(s.code,{children:"round"})," and ",e.jsx(s.code,{children:"zero"})," shapes are also removed. Use the closest t-shirt size, from ",e.jsx(s.code,{children:"xs"}),` to
`,e.jsx(s.code,{children:"xxxl"}),", for the multiplier names. Use ",e.jsx(s.code,{children:"none"}),", ",e.jsx(s.code,{children:"sm"})," or ",e.jsx(s.code,{children:"full"}),` for the others, depending on the shape
you need. These replacements are the closest match and have not been checked against exact values.`]}),`
`,e.jsx(s.h4,{id:"space-tokens",children:"Space tokens"}),`
`,e.jsxs(s.p,{children:["All 13 space tokens are removed, from ",e.jsx(s.code,{children:"x1"})," to ",e.jsx(s.code,{children:"x20"}),", plus ",e.jsx(s.code,{children:"half"})," and ",e.jsx(s.code,{children:"zero"}),`. Use gap tokens for
spacing between items. Use padding tokens for spacing inside a container.`]}),`
`,e.jsx(s.h4,{id:"semantic-color-groups",children:"Semantic color groups"}),`
`,e.jsx(s.p,{children:`The background, text, icon and static color groups are reduced or removed. The table below shows the
count in each version and what to use now.`}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Group"}),e.jsx(s.th,{children:"v4 names"}),e.jsx(s.th,{children:"v5 names"}),e.jsx(s.th,{children:"What to use in v5"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"bg"})," (background)"]}),e.jsx(s.td,{children:"51"}),e.jsx(s.td,{children:"2"}),e.jsxs(s.td,{children:["Surface tokens. ",e.jsx(s.code,{children:"bg-default"})," and ",e.jsx(s.code,{children:"bg-alt-default"})," remain."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"text"})}),e.jsx(s.td,{children:"32"}),e.jsx(s.td,{children:"0"}),e.jsxs(s.td,{children:["Foreground (",e.jsx(s.code,{children:"fg"}),") tokens"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"icon"})}),e.jsx(s.td,{children:"28"}),e.jsx(s.td,{children:"0"}),e.jsxs(s.td,{children:["Foreground (",e.jsx(s.code,{children:"fg"}),") tokens"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"static"})}),e.jsx(s.td,{children:"41"}),e.jsx(s.td,{children:"0"}),e.jsx(s.td,{children:"Base palette tokens, for fixed colors that do not change with the theme"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"fg"})," (foreground)"]}),e.jsx(s.td,{children:"45"}),e.jsx(s.td,{children:"20"}),e.jsxs(s.td,{children:["Remaining ",e.jsx(s.code,{children:"fg"})," roles, such as ",e.jsx(s.code,{children:"fg-ai"}),", ",e.jsx(s.code,{children:"fg-contrast"}),", ",e.jsx(s.code,{children:"fg-danger"})," and ",e.jsx(s.code,{children:"fg-info"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"border"})}),e.jsx(s.td,{children:"23"}),e.jsx(s.td,{children:"13"}),e.jsx(s.td,{children:"Remaining border roles"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"surface"})}),e.jsx(s.td,{children:"32"}),e.jsx(s.td,{children:"32"}),e.jsx(s.td,{children:"Same count; several values changed (see Token Values Changes)"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"shadow"})," color"]}),e.jsx(s.td,{children:"5"}),e.jsx(s.td,{children:"14"}),e.jsx(s.td,{children:"Numbered key and ambient shadow colors"})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"chart"})," color"]}),e.jsx(s.td,{children:"50"}),e.jsx(s.td,{children:"50"}),e.jsx(s.td,{children:"Categorical, sequential and diverging chart sets"})]})]})]}),`
`,e.jsxs(s.p,{children:["The mapping from removed ",e.jsx(s.code,{children:"text"})," and ",e.jsx(s.code,{children:"icon"})," roles to ",e.jsx(s.code,{children:"fg"}),` roles is by intent, not by value. Confirm
each one before use.`]})]})}function f(n={}){const{wrapper:s}={...r(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(d,{...n})}):d(n)}export{f as default};
