import{a as c,j as t}from"./jsx-runtime-50e9c51e.js";function s(e,a=""){return a.length?`${e} ${a}`:e}function n({caption:e,children:a,headings:d,rows:i}){return c("table",{className:"token-grid",children:[e&&t("caption",{className:"token-grid__caption cnvs-sys-type-subtext-large",children:e}),t("thead",{className:"token-grid__head",children:t("tr",{className:"token-grid__row",children:d.map((r,o)=>t("th",{className:"token-grid__head-item cnvs-sys-type-subtext-large",children:r},o))})}),t("tbody",{className:"token-grid__body",children:i.map((r,o)=>t("tr",{className:"token-grid__row",children:a(r)},o))})]})}const l=({className:e,...a})=>t("td",{className:s("token-grid__row-item cnvs-sys-type-subtext-large",e),...a}),p=({className:e,...a})=>t("span",{className:s("token-grid__sample",e),...a}),m=({className:e,...a})=>t("span",{className:s("token-grid__swatch",e),...a}),_=({className:e,...a})=>t("span",{className:s("token-grid__monospace-label cnvs-sys-type-subtext-medium",e),...a});n.RowItem=l;n.Sample=p;n.Swatch=m;n.MonospaceLabel=_;try{n.displayName="TokenGrid",n.__docgenInfo={description:"",displayName:"TokenGrid",props:{headings:{defaultValue:null,description:"",name:"headings",required:!0,type:{name:"ReactNode[]"}},rows:{defaultValue:null,description:"",name:"rows",required:!0,type:{name:"T[]"}},caption:{defaultValue:null,description:"",name:"caption",required:!1,type:{name:"ReactNode"}}}}}catch{}export{n as T};
//# sourceMappingURL=index-1acdbb77.js.map