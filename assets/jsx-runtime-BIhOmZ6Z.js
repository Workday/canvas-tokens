import{r as x}from"./index-BBkUAzwr.js";var u={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=x,m=Symbol.for("react.element"),l=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,y=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,j={key:!0,ref:!0,__self:!0,__source:!0};function a(t,r,_){var e,o={},n=null,f=null;_!==void 0&&(n=""+_),r.key!==void 0&&(n=""+r.key),r.ref!==void 0&&(f=r.ref);for(e in r)c.call(r,e)&&!j.hasOwnProperty(e)&&(o[e]=r[e]);if(t&&t.defaultProps)for(e in r=t.defaultProps,r)o[e]===void 0&&(o[e]=r[e]);return{$$typeof:m,type:t,key:n,ref:f,props:o,_owner:y.current}}s.Fragment=l;s.jsx=a;s.jsxs=a;u.exports=s;var p=u.exports;const d=p.Fragment,E=p.jsx,O=p.jsxs;export{d as F,O as a,E as j};
