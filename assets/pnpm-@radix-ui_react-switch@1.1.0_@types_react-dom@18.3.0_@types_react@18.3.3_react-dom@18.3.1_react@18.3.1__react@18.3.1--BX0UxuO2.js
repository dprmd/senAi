import{r as n,j as d}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{c as j}from"./pnpm-@radix-ui_primitive@1.1.0--DW48STyt.js";import{u as T}from"./pnpm-@radix-ui_react-compose-refs@1.1.0_@types_react@18.3.3_react@18.3.1--iQVuCTu7.js";import{c as _}from"./pnpm-@radix-ui_react-context@1.1.0_@types_react@18.3.3_react@18.3.1--8tErLFxD.js";import{u as B}from"./pnpm-@radix-ui_react-use-controllable-state@1.1.0_@types_react@18.3.3_react@18.3.1--BWEPZzwa.js";import{u as H}from"./pnpm-@radix-ui_react-use-previous@1.1.0_@types_react@18.3.3_react@18.3.1--CR3dOtt7.js";import{u as I}from"./pnpm-@radix-ui_react-use-size@1.1.0_@types_react@18.3.3_react@18.3.1--eLNQE-vY.js";import{P as w}from"./pnpm-@radix-ui_react-primitive@2.0.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--DTkTuNjz.js";var v="Switch",[M,G]=_(v),[N,q]=M(v),C=n.forwardRef((e,a)=>{const{__scopeSwitch:t,name:o,checked:r,defaultChecked:p,required:i,disabled:s,value:u="on",onCheckedChange:m,...S}=e,[c,f]=n.useState(null),E=T(a,h=>f(h)),b=n.useRef(!1),k=c?!!c.closest("form"):!0,[l=!1,R]=B({prop:r,defaultProp:p,onChange:m});return d.jsxs(N,{scope:t,checked:l,disabled:s,children:[d.jsx(w.button,{type:"button",role:"switch","aria-checked":l,"aria-required":i,"data-state":y(l),"data-disabled":s?"":void 0,disabled:s,value:u,...S,ref:E,onClick:j(e.onClick,h=>{R(g=>!g),k&&(b.current=h.isPropagationStopped(),b.current||h.stopPropagation())})}),k&&d.jsx(z,{control:c,bubbles:!b.current,name:o,value:u,checked:l,required:i,disabled:s,style:{transform:"translateX(-100%)"}})]})});C.displayName=v;var x="SwitchThumb",P=n.forwardRef((e,a)=>{const{__scopeSwitch:t,...o}=e,r=q(x,t);return d.jsx(w.span,{"data-state":y(r.checked),"data-disabled":r.disabled?"":void 0,...o,ref:a})});P.displayName=x;var z=e=>{const{control:a,checked:t,bubbles:o=!0,...r}=e,p=n.useRef(null),i=H(t),s=I(a);return n.useEffect(()=>{const u=p.current,m=window.HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(m,"checked").set;if(i!==t&&c){const f=new Event("click",{bubbles:o});c.call(u,t),u.dispatchEvent(f)}},[i,t,o]),d.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...r,tabIndex:-1,ref:p,style:{...e.style,...s,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function y(e){return e?"checked":"unchecked"}var J=C,K=P;export{J as R,K as T};
