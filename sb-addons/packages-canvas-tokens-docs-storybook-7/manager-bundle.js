try{
var S=__STORYBOOKAPI__,{ActiveTabs:v,Consumer:T,ManagerContext:E,Provider:w,addons:n,combineParameters:k,controlOrMetaKey:O,controlOrMetaSymbol:B,eventMatchesShortcut:R,eventToShortcut:I,isMacLike:A,isShortcutTaken:M,keyToSymbol:P,merge:H,mockChannel:V,optionOrAltSymbol:F,shortcutMatchesShortcut:L,shortcutToHumanString:G,types:N,useAddonState:Y,useArgTypes:j,useArgs:z,useChannel:D,useGlobalTypes:K,useGlobals:U,useParameter:W,useSharedState:$,useStoryPrepared:Z,useStorybookApi:q,useStorybookState:J}=__STORYBOOKAPI__;var se=__STORYBOOKTHEMING__,{CacheProvider:oe,ClassNames:re,Global:ae,ThemeProvider:ne,background:ie,color:le,convert:ce,create:i,createCache:de,createGlobal:pe,createReset:fe,css:me,darken:ue,ensure:ge,ignoreSsrWarning:ye,isPropValid:Ce,jsx:he,keyframes:_e,lighten:xe,styled:be,themes:Se,typography:ve,useTheme:Te,withTheme:Ee}=__STORYBOOKTHEMING__;var l="3.1.4";var c=i({base:"light",brandTitle:` <div style="display: flex; align-items: center;">
    <svg
      width="36"
      height="45"
      viewBox="0 0 36 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="margin-right: 12px;"
    >
      <path
        d="M0 1.5C0 0.671574 0.671573 0 1.5 0H34.5C35.3284 0 36 0.671573 36 1.5V43.5C36 44.3284 35.3284 45 34.5 45H10.5C9.67157 45 9 44.3284 9 43.5V37.5C9 36.6716 8.32843 36 7.5 36H1.5C0.671573 36 0 35.3284 0 34.5V1.5Z"
        fill="url(#paint0_linear_63_362)"
      />
      <path
        d="M25.5 9C26.3284 9.00002 27 9.67159 27 10.5V16.5C27 17.3284 26.3284 18 25.5 18H19.5C18.6717 18 18.0002 18.6714 18 19.4996V25.5C18 26.3284 18.6715 27 19.5 27H25.5C26.3284 27 27 27.6716 27 28.5V34.5C27 35.3284 26.3259 36.0066 25.5003 35.9385C16.7553 35.2172 9.78275 28.2446 9.06148 19.4996C8.99339 18.674 9.67153 18 10.5 18H16.5L16.5769 17.9978C17.3694 17.9577 17.9999 17.3025 18 16.5V10.5C18 9.67157 18.6715 9 19.5 9H25.5Z"
        fill="white"
      />
      <defs>
        <linearGradient id="paint0_linear_63_362" x1="0" y1="0" x2="36" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0.0817308" stop-color="#0F2E66"/>
          <stop offset="0.600962" stop-color="#B03286"/>
          <stop offset="1" stop-color="#FF916E"/>
        </linearGradient>
      </defs>
    </svg>
    <div style="display: flex; flex-direction: column; color: #0F2E66;">
      <span style="font-size: 20px; font-weight: 600;">Canvas Tokens</span>
      <span style="font-size: 18px; font-weight: 500;">v${l}</span>
    </div>
  </div>`,brandUrl:"https://github.com/Workday/canvas-kit",colorPrimary:"#0F2E66",colorSecondary:"#B03286",appBg:"#ffffff",textColor:"#2B2B2B",textInverseColor:"#ffffff",barTextColor:"#5D6775",barSelectedColor:"#0F2E66",barBg:"#ffffff"});var a=__REACT__,{Children:Fe,Component:Le,Fragment:Ge,Profiler:Ne,PureComponent:Ye,StrictMode:je,Suspense:ze,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:De,cloneElement:Ke,createContext:Ue,createElement:We,createFactory:$e,createRef:Ze,forwardRef:qe,isValidElement:Je,lazy:Qe,memo:Xe,useCallback:et,useContext:tt,useDebugValue:st,useEffect:ot,useImperativeHandle:rt,useLayoutEffect:at,useMemo:nt,useReducer:it,useRef:lt,useState:ct,version:dt}=__REACT__;var f={display:"flex",alignItems:"flex-start",gap:"8px",width:"100%",justifyContent:"space-between",paddingInlineEnd:"16px"},m={padding:"0 8px",borderRadius:"40px",fontSize:"12px",fontWeight:"bold",marginTop:"2px",textTransform:"capitalize"},u=e=>e.match(/\((?<type>.*)\)$/)?.groups?.type,g=e=>{switch(e){case"AI":return{backgroundColor:"rgba(207, 235, 255, 1)",color:"rgba(2, 32, 67, 1)"};default:return{backgroundColor:"rgba(219, 225, 233, 1)",color:"rgba(93, 103, 117, 1)"}}},d=e=>{let r=u(e.name);return r?a.createElement("div",{className:"sb-unstyled",style:f},a.createElement("span",null,e.name.replace(`(${r})`,"")),a.createElement("span",{style:{...m,...g(r)}},r)):name};n.setConfig({sidebar:{renderLabel:d},theme:c});
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
