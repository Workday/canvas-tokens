import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as i}from"./index-Pe1yh6Xi.js";import{M as o,U as r}from"./index-QYG3jjN8.js";import{e as a,E as d}from"./Tables-DzuP3MXf.js";import"./index-vY1YAP7G.js";import"./iframe-DkM-Sfu9.js";import"./index-hc8kBFl4.js";import"./index-BQ6uszir.js";import"./index-XY87pEJy.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";import"./tableHelpers-CMyWSjTR.js";import"./token-BaEEYujI.js";import"./index-D5m-MVG0.js";import"./Menu-BnwInP0h.js";import"./SystemIcon-8VNoNPjy.js";import"./cs-DaNmsJLN.js";import"./Card-CLHJSwyV.js";import"./TypeLevelComponents-SbEamjDu.js";import"./tokens-BwKzFjd_.js";import"./index-BC_18Vw6.js";import"./Table-wgeJD4P5.js";function t(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Tokens/System/Motion"}),`
`,n.jsxs(r,{children:[n.jsx(s.h1,{id:"system-motion-tokens",children:"System Motion Tokens"}),n.jsxs(s.p,{children:[`System motion tokens include duration and easing. For motion usage guidelines, including information
on how to choose an appropriate duration and easing value, see the
`,n.jsx(s.a,{href:"https://design.workday.com/design-system/tokens/motion",rel:"nofollow",children:"Canvas Motion Documentation"}),"."]}),n.jsx(s.p,{children:"Prefer using system duration and easing tokens over using base tokens directly."}),n.jsx(s.h2,{id:"duration-tokens",children:"Duration Tokens"}),n.jsx(s.p,{children:`System duration tokens provide standardized timing values for animations and transitions. Each token
references a base duration token.`}),n.jsxs(s.p,{children:[`Duration tokens are grouped into tiers: instant, short, medium, long, and xlong. Within a tier,
numbered steps get progressively slower, so `,n.jsx(s.code,{children:"medium2"})," is longer than ",n.jsx(s.code,{children:"medium1"}),"."]}),n.jsx(s.h3,{id:"usage",children:"Usage"}),n.jsx(s.p,{children:"Duration tokens can be consumed as a JavaScript / TypeScript object."}),n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  transition: \`transform var(\${system.motion.duration.medium2})\`,
};
`})}),n.jsx(s.p,{children:`They can also be consumed as CSS variables. In the example below, we're applying the same styles
using CSS variables directly.`}),n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`/* styles.css */
.button {
  transition: transform var(--cnvs-sys-motion-duration-medium2);
}
`})}),n.jsx(a,{}),n.jsx(s.h2,{id:"easing-tokens",children:"Easing Tokens"}),n.jsx(s.p,{children:`System easing tokens provide standardized cubic-bezier curves for animations and transitions across
our UI.`}),n.jsx(s.h3,{id:"usage-1",children:"Usage"}),n.jsx(s.p,{children:`Easing tokens can be consumed as a JavaScript / TypeScript object. Each token references a base
easing token.`}),n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  transition: \`transform var(\${system.motion.duration.medium2}) var(\${system.motion.easing.quick.standard})\`,
};
`})}),n.jsx(s.p,{children:`They can also be consumed as CSS variables. In the example below, we're applying the same styles
using CSS variables directly.`}),n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-css",children:`/* styles.css */
.button {
  transition: transform var(--cnvs-sys-motion-duration-medium2) var(--cnvs-sys-motion-easing-quick-standard);
}
`})}),n.jsx(s.h3,{id:"categories",children:"Categories"}),n.jsx(s.p,{children:"System easing tokens are organized into two categories:"}),n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Quick"})," - For shorter, faster interactions (hover states, button presses, etc.)"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Purposeful"})," - For longer, more meaningful transitions (modals, panels, page transitions)"]}),`
`]}),n.jsx(s.p,{children:"Each category includes three timing function variants:"}),n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Standard"})," - Balanced easing for general use"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Acceleration"})," - Starts slowly and speeds up"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"Deceleration"})," - Starts quickly and slows down"]}),`
`]}),n.jsx(d,{})]})]})}function z(e={}){const{wrapper:s}={...i(),...e.components};return s?n.jsx(s,{...e,children:n.jsx(t,{...e})}):t(e)}export{z as default};
