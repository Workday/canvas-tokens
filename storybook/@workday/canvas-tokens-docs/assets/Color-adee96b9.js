import{j as c}from"./jsx-runtime-50e9c51e.js";import{c as n}from"./index-a5628285.js";import{S as s}from"./index-da6a51ff.js";import{C as l,b as i}from"./ColorGrid-96949da1.js";const p=["cinnamon","peach","chiliMango","cantaloupe","sourLemon","juicyPear","kiwi","greenApple","watermelon","jewel","toothpaste","blueberry","plum","berrySmoothie","blackberry","islandPunch","grapeSoda","pomegranate","fruitPunch","rootBeer","toastedMarshmallow","coconut","capuccino","licorice","soap","frenchVanilla","blackPepper"],m=new RegExp(p.join("|"));function u(o){const e={};for(const r in o)if(m.test(r)){const t=r.replace(/\d+/,""),a=i(o[r]);t in e?e[t].push(a):e[t]=[a]}return Object.entries(e)}const b=u(n),P=()=>c(s,{children:b.map(([o,e])=>c(l,{name:o,palette:e},o))});export{P as C};
//# sourceMappingURL=Color-adee96b9.js.map
