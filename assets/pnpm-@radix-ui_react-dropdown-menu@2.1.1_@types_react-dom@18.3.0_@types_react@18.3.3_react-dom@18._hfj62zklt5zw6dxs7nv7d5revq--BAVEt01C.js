import{r as p,j as t}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{c as m}from"./pnpm-@radix-ui_primitive@1.1.0--DW48STyt.js";import{c as j}from"./pnpm-@radix-ui_react-compose-refs@1.1.0_@types_react@18.3.3_react@18.3.1--iQVuCTu7.js";import{c as G}from"./pnpm-@radix-ui_react-context@1.1.0_@types_react@18.3.3_react@18.3.1--8tErLFxD.js";import{u as k}from"./pnpm-@radix-ui_react-use-controllable-state@1.1.0_@types_react@18.3.3_react@18.3.1--BWEPZzwa.js";import{P as L}from"./pnpm-@radix-ui_react-primitive@2.0.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--DTkTuNjz.js";import{c as g,A as K,C as U,G as B,L as F,I as H,a as W,R as $,b as X,d as q,S as z,e as J,f as Q,g as V,h as Y,P as Z}from"./pnpm-@radix-ui_react-menu@2.1.1_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--C6q7llhI.js";import{u as v}from"./pnpm-@radix-ui_react-id@1.1.0_@types_react@18.3.3_react@18.3.1--BIknf87a.js";var M="DropdownMenu",[oo,No]=G(M,[g]),s=g(),[eo,D]=oo(M),x=o=>{const{__scopeDropdownMenu:n,children:r,dir:e,open:a,defaultOpen:i,onOpenChange:c,modal:d=!0}=o,u=s(n),f=p.useRef(null),[l=!1,w]=k({prop:a,defaultProp:i,onChange:c});return t.jsx(eo,{scope:n,triggerId:v(),triggerRef:f,contentId:v(),open:l,onOpenChange:w,onOpenToggle:p.useCallback(()=>w(T=>!T),[w]),modal:d,children:t.jsx(Y,{...u,open:l,onOpenChange:w,dir:e,modal:d,children:r})})};x.displayName=M;var _="DropdownMenuTrigger",R=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,disabled:e=!1,...a}=o,i=D(_,r),c=s(r);return t.jsx(K,{asChild:!0,...c,children:t.jsx(L.button,{type:"button",id:i.triggerId,"aria-haspopup":"menu","aria-expanded":i.open,"aria-controls":i.open?i.contentId:void 0,"data-state":i.open?"open":"closed","data-disabled":e?"":void 0,disabled:e,...a,ref:j(n,i.triggerRef),onPointerDown:m(o.onPointerDown,d=>{!e&&d.button===0&&d.ctrlKey===!1&&(i.onOpenToggle(),i.open||d.preventDefault())}),onKeyDown:m(o.onKeyDown,d=>{e||(["Enter"," "].includes(d.key)&&i.onOpenToggle(),d.key==="ArrowDown"&&i.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(d.key)&&d.preventDefault())})})})});R.displayName=_;var ro="DropdownMenuPortal",h=o=>{const{__scopeDropdownMenu:n,...r}=o,e=s(n);return t.jsx(Z,{...e,...r})};h.displayName=ro;var I="DropdownMenuContent",b=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=D(I,r),i=s(r),c=p.useRef(!1);return t.jsx(U,{id:a.contentId,"aria-labelledby":a.triggerId,...i,...e,ref:n,onCloseAutoFocus:m(o.onCloseAutoFocus,d=>{var u;c.current||(u=a.triggerRef.current)==null||u.focus(),c.current=!1,d.preventDefault()}),onInteractOutside:m(o.onInteractOutside,d=>{const u=d.detail.originalEvent,f=u.button===0&&u.ctrlKey===!0,l=u.button===2||f;(!a.modal||l)&&(c.current=!0)}),style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});b.displayName=I;var no="DropdownMenuGroup",ao=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(B,{...a,...e,ref:n})});ao.displayName=no;var to="DropdownMenuLabel",N=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(F,{...a,...e,ref:n})});N.displayName=to;var po="DropdownMenuItem",S=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(H,{...a,...e,ref:n})});S.displayName=po;var so="DropdownMenuCheckboxItem",C=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(W,{...a,...e,ref:n})});C.displayName=so;var io="DropdownMenuRadioGroup",uo=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx($,{...a,...e,ref:n})});uo.displayName=io;var co="DropdownMenuRadioItem",E=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(X,{...a,...e,ref:n})});E.displayName=co;var lo="DropdownMenuItemIndicator",A=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(q,{...a,...e,ref:n})});A.displayName=lo;var wo="DropdownMenuSeparator",P=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(z,{...a,...e,ref:n})});P.displayName=wo;var mo="DropdownMenuArrow",fo=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(J,{...a,...e,ref:n})});fo.displayName=mo;var Mo="DropdownMenuSubTrigger",y=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(Q,{...a,...e,ref:n})});y.displayName=Mo;var vo="DropdownMenuSubContent",O=p.forwardRef((o,n)=>{const{__scopeDropdownMenu:r,...e}=o,a=s(r);return t.jsx(V,{...a,...e,ref:n,style:{...o.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});O.displayName=vo;var So=x,Co=R,Eo=h,Ao=b,Po=N,yo=S,Oo=C,To=E,jo=A,Go=P,ko=y,Lo=O;export{Ao as C,yo as I,Po as L,Eo as P,To as R,ko as S,Co as T,Lo as a,Oo as b,jo as c,Go as d,So as e};
