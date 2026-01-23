import{M as b,U as k}from"./index-7f38b2fe.js";import{j as e,a as n,F as g}from"./jsx-runtime-86dfebf6.js";import{r as m}from"./index-1b03fe98.js";import{f as o,T as a}from"./index-586dd939.js";import{m as i,b as p,s as v,c as S}from"./index-4ff1bdec.js";import{u as y}from"./index-2ef8b458.js";import"./iframe-5afc2066.js";import"../sb-preview/runtime.js";import"./chunk-6E673XPF-4294b5bd.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";const u=[{cssVar:i.easing.quick.standard,jsVar:o("system.motion.easing.quick.standard"),category:"Quick",type:"Standard"},{cssVar:i.easing.quick.acceleration,jsVar:o("system.motion.easing.quick.acceleration"),category:"Quick",type:"Acceleration"},{cssVar:i.easing.quick.deceleration,jsVar:o("system.motion.easing.quick.deceleration"),category:"Quick",type:"Deceleration"},{cssVar:i.easing.purposeful.standard,jsVar:o("system.motion.easing.purposeful.standard"),category:"Purposeful",type:"Standard"},{cssVar:i.easing.purposeful.acceleration,jsVar:o("system.motion.easing.purposeful.acceleration"),category:"Purposeful",type:"Acceleration"},{cssVar:i.easing.purposeful.deceleration,jsVar:o("system.motion.easing.purposeful.deceleration"),category:"Purposeful",type:"Deceleration"}];function V(){const[t,s]=m.useState({});return m.useEffect(()=>{const r={},l=document.createElement("div");document.body.appendChild(l),u.forEach(d=>{const f=getComputedStyle(l).getPropertyValue(d.cssVar);r[d.cssVar]=f.trim()}),document.body.removeChild(l),s(r)},[]),e(a,{caption:"easing tokens",headings:["Sample","CSS Variable","JS Variable","Value","Category","Type"],rows:u,children:r=>n(g,{children:[e(a.RowItem,{children:n(a.Sample,{children:[e("div",{style:{width:`var(${p.xs})`,height:`var(${p.xs})`,borderRadius:`var(${v.round})`,backgroundColor:`var(${S.bg.primary.default})`,animation:`ease-slide 2300ms var(${r.cssVar}) infinite`}}),e("style",{children:`
                @keyframes ease-slide {
                  0%, 35%, 100% { transform: translateX(0); }
                  17.5% { transform: translateX(60px); }
                }
              `})]})}),e(a.RowItem,{children:e(a.MonospaceLabel,{children:r.cssVar})}),e(a.RowItem,{children:e(a.MonospaceLabel,{children:r.jsVar})}),e(a.RowItem,{children:e(a.MonospaceLabel,{children:t[r.cssVar]||"..."})}),e(a.RowItem,{children:r.category}),e(a.RowItem,{children:r.type})]})})}function h(t){const s=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",h3:"h3",pre:"pre",code:"code",ul:"ul",li:"li",strong:"strong"},y(),t.components);return n(g,{children:[e(b,{title:"Docs/System Tokens/Motion"}),`
`,n(k,{children:[e(s.h1,{id:"system-motion-tokens",children:"System Motion Tokens"}),n(s.p,{children:["Currently, only easing tokens are available at the system token level. For motion usage guidelines, including information on how to choose an appropriate easing value, see the ",e(s.a,{href:"https://canvas.workday.com/styles/tokens/motion",target:"_blank",rel:"nofollow noopener noreferrer",children:"Canvas Motion Documentation"}),"."]}),e(s.h2,{id:"easing-tokens",children:"Easing Tokens"}),e(s.p,{children:"System easing tokens provide standardized cubic-bezier curves for animations and transitions across our UI."}),e(s.h3,{id:"usage",children:"Usage"}),e(s.p,{children:`Easing tokens can be consumed as a JavaScript / TypeScript object. Each token value references the
CSS variable from a base token, so you'll need to have those CSS variables imported in your
application as well.`}),e(s.pre,{children:e(s.code,{className:"language-ts",children:`// styles.ts
import {system} from '@workday/canvas-tokens-web';

const styles = {
  transition: \`transform 300ms var(\${system.motion.easing.quick.standard})\`,
};
`})}),e(s.p,{children:`They can also be consumed as CSS, Sass, or Less variables. In the example below, we're applying the
same styles using CSS variables directly.`}),e(s.pre,{children:e(s.code,{className:"language-css",children:`// styles.css
.button {
  transition: transform 300ms var(--cnvs-sys-easing-quick-standard);
}
`})}),e(s.h3,{id:"categories",children:"Categories"}),e(s.p,{children:"System easing tokens are organized into two categories:"}),n(s.ul,{children:[`
`,n(s.li,{children:[e(s.strong,{children:"Quick"})," - For shorter, faster interactions (hover states, button presses, etc.)"]}),`
`,n(s.li,{children:[e(s.strong,{children:"Purposeful"})," - For longer, more meaningful transitions (modals, panels, page transitions)"]}),`
`]}),e(s.p,{children:"Each category includes three timing function variants:"}),n(s.ul,{children:[`
`,n(s.li,{children:[e(s.strong,{children:"Standard"})," - Balanced easing for general use"]}),`
`,n(s.li,{children:[e(s.strong,{children:"Acceleration"})," - Emphasizes the beginning of the animation"]}),`
`,n(s.li,{children:[e(s.strong,{children:"Deceleration"})," - Emphasizes the end of the animation"]}),`
`]}),e(V,{})]})]})}function w(t={}){const{wrapper:s}=Object.assign({},y(),t.components);return s?e(s,{...t,children:e(h,{...t})}):h(t)}const C=()=>{throw new Error("Docs-only story")};C.parameters={docsOnly:!0};const c={title:"Docs/System Tokens/Motion",tags:["stories-mdx"],includeStories:["__page"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:w};const F=["__page"];export{F as __namedExportsOrder,C as __page,c as default};
