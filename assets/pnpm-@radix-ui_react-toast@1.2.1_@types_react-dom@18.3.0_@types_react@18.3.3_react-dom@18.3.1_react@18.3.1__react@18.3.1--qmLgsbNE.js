import{r as s,j as c}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{r as Ee}from"./pnpm-react-dom@18.3.1_react@18.3.1--DZ4IdBtu.js";import{c as R}from"./pnpm-@radix-ui_primitive@1.1.0--DW48STyt.js";import{u as te}from"./pnpm-@radix-ui_react-compose-refs@1.1.0_@types_react@18.3.3_react@18.3.1--iQVuCTu7.js";import{c as xe}from"./pnpm-@radix-ui_react-collection@1.1.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--Dhb7BNQf.js";import{c as ye}from"./pnpm-@radix-ui_react-context@1.1.0_@types_react@18.3.3_react@18.3.1--8tErLFxD.js";import{B as Pe,R as Ce}from"./pnpm-@radix-ui_react-dismissable-layer@1.1.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom_5dlhieor6fzkcuz6zzwmefgxrm--Dr8mdpFw.js";import{P as he}from"./pnpm-@radix-ui_react-portal@1.1.1_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--DpvgkT0Y.js";import{P as Re}from"./pnpm-@radix-ui_react-presence@1.1.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--CWL7bkdJ.js";import{P as D,d as be}from"./pnpm-@radix-ui_react-primitive@2.0.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@18.3.1_react@18.3.1__react@18.3.1--DTkTuNjz.js";import{u as H}from"./pnpm-@radix-ui_react-use-callback-ref@1.1.0_@types_react@18.3.3_react@18.3.1--C9qOKCC4.js";import{u as ge}from"./pnpm-@radix-ui_react-use-controllable-state@1.1.0_@types_react@18.3.3_react@18.3.1--BWEPZzwa.js";import{u as Se}from"./pnpm-@radix-ui_react-use-layout-effect@1.1.0_@types_react@18.3.3_react@18.3.1--DOamorVR.js";import{V as oe}from"./pnpm-@radix-ui_react-visually-hidden@1.1.0_@types_react-dom@18.3.0_@types_react@18.3.3_react-dom@1_7lq4qbjthtvjv64jh4leqctn4e--H4rWih4a.js";var G="ToastProvider",[J,Ie,Ae]=xe("Toast"),[re,nt]=ye("Toast",[Ae]),[Fe,W]=re(G),se=e=>{const{__scopeToast:o,label:r="Notification",duration:t=5e3,swipeDirection:u="right",swipeThreshold:d=50,children:p}=e,[T,v]=s.useState(null),[n,h]=s.useState(0),x=s.useRef(!1),N=s.useRef(!1);return r.trim()||console.error(`Invalid prop \`label\` supplied to \`${G}\`. Expected non-empty \`string\`.`),c.jsx(J.Provider,{scope:o,children:c.jsx(Fe,{scope:o,label:r,duration:t,swipeDirection:u,swipeThreshold:d,toastCount:n,viewport:T,onViewportChange:v,onToastAdd:s.useCallback(()=>h(g=>g+1),[]),onToastRemove:s.useCallback(()=>h(g=>g-1),[]),isFocusedToastEscapeKeyDownRef:x,isClosePausedRef:N,children:p})})};se.displayName=G;var ne="ToastViewport",_e=["F8"],B="toast.viewportPause",q="toast.viewportResume",ae=s.forwardRef((e,o)=>{const{__scopeToast:r,hotkey:t=_e,label:u="Notifications ({hotkey})",...d}=e,p=W(ne,r),T=Ie(r),v=s.useRef(null),n=s.useRef(null),h=s.useRef(null),x=s.useRef(null),N=te(o,x,p.onViewportChange),g=t.join("+").replace(/Key/g,"").replace(/Digit/g,""),S=p.toastCount>0;s.useEffect(()=>{const i=y=>{var m;t.every(w=>y[w]||y.code===w)&&((m=x.current)==null||m.focus())};return document.addEventListener("keydown",i),()=>document.removeEventListener("keydown",i)},[t]),s.useEffect(()=>{const i=v.current,y=x.current;if(S&&i&&y){const f=()=>{if(!p.isClosePausedRef.current){const P=new CustomEvent(B);y.dispatchEvent(P),p.isClosePausedRef.current=!0}},m=()=>{if(p.isClosePausedRef.current){const P=new CustomEvent(q);y.dispatchEvent(P),p.isClosePausedRef.current=!1}},w=P=>{!i.contains(P.relatedTarget)&&m()},E=()=>{i.contains(document.activeElement)||m()};return i.addEventListener("focusin",f),i.addEventListener("focusout",w),i.addEventListener("pointermove",f),i.addEventListener("pointerleave",E),window.addEventListener("blur",f),window.addEventListener("focus",m),()=>{i.removeEventListener("focusin",f),i.removeEventListener("focusout",w),i.removeEventListener("pointermove",f),i.removeEventListener("pointerleave",E),window.removeEventListener("blur",f),window.removeEventListener("focus",m)}}},[S,p.isClosePausedRef]);const l=s.useCallback(({tabbingDirection:i})=>{const f=T().map(m=>{const w=m.ref.current,E=[w,...Xe(w)];return i==="forwards"?E:E.reverse()});return(i==="forwards"?f.reverse():f).flat()},[T]);return s.useEffect(()=>{const i=x.current;if(i){const y=f=>{var E,P,I;const m=f.altKey||f.ctrlKey||f.metaKey;if(f.key==="Tab"&&!m){const L=document.activeElement,F=f.shiftKey;if(f.target===i&&F){(E=n.current)==null||E.focus();return}const A=l({tabbingDirection:F?"backwards":"forwards"}),j=A.findIndex(a=>a===L);$(A.slice(j+1))?f.preventDefault():F?(P=n.current)==null||P.focus():(I=h.current)==null||I.focus()}};return i.addEventListener("keydown",y),()=>i.removeEventListener("keydown",y)}},[T,l]),c.jsxs(Pe,{ref:v,role:"region","aria-label":u.replace("{hotkey}",g),tabIndex:-1,style:{pointerEvents:S?void 0:"none"},children:[S&&c.jsx(z,{ref:n,onFocusFromOutsideViewport:()=>{const i=l({tabbingDirection:"forwards"});$(i)}}),c.jsx(J.Slot,{scope:r,children:c.jsx(D.ol,{tabIndex:-1,...d,ref:N})}),S&&c.jsx(z,{ref:h,onFocusFromOutsideViewport:()=>{const i=l({tabbingDirection:"backwards"});$(i)}})]})});ae.displayName=ne;var ie="ToastFocusProxy",z=s.forwardRef((e,o)=>{const{__scopeToast:r,onFocusFromOutsideViewport:t,...u}=e,d=W(ie,r);return c.jsx(oe,{"aria-hidden":!0,tabIndex:0,...u,ref:o,style:{position:"fixed"},onFocus:p=>{var n;const T=p.relatedTarget;!((n=d.viewport)!=null&&n.contains(T))&&t()}})});z.displayName=ie;var U="Toast",De="toast.swipeStart",Ne="toast.swipeMove",Le="toast.swipeCancel",Me="toast.swipeEnd",ce=s.forwardRef((e,o)=>{const{forceMount:r,open:t,defaultOpen:u,onOpenChange:d,...p}=e,[T=!0,v]=ge({prop:t,defaultProp:u,onChange:d});return c.jsx(Re,{present:r||T,children:c.jsx(ke,{open:T,...p,ref:o,onClose:()=>v(!1),onPause:H(e.onPause),onResume:H(e.onResume),onSwipeStart:R(e.onSwipeStart,n=>{n.currentTarget.setAttribute("data-swipe","start")}),onSwipeMove:R(e.onSwipeMove,n=>{const{x:h,y:x}=n.detail.delta;n.currentTarget.setAttribute("data-swipe","move"),n.currentTarget.style.setProperty("--radix-toast-swipe-move-x",`${h}px`),n.currentTarget.style.setProperty("--radix-toast-swipe-move-y",`${x}px`)}),onSwipeCancel:R(e.onSwipeCancel,n=>{n.currentTarget.setAttribute("data-swipe","cancel"),n.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),n.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),n.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),n.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")}),onSwipeEnd:R(e.onSwipeEnd,n=>{const{x:h,y:x}=n.detail.delta;n.currentTarget.setAttribute("data-swipe","end"),n.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),n.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),n.currentTarget.style.setProperty("--radix-toast-swipe-end-x",`${h}px`),n.currentTarget.style.setProperty("--radix-toast-swipe-end-y",`${x}px`),v(!1)})})})});ce.displayName=U;var[Oe,je]=re(U,{onClose(){}}),ke=s.forwardRef((e,o)=>{const{__scopeToast:r,type:t="foreground",duration:u,open:d,onClose:p,onEscapeKeyDown:T,onPause:v,onResume:n,onSwipeStart:h,onSwipeMove:x,onSwipeCancel:N,onSwipeEnd:g,...S}=e,l=W(U,r),[i,y]=s.useState(null),f=te(o,a=>y(a)),m=s.useRef(null),w=s.useRef(null),E=u||l.duration,P=s.useRef(0),I=s.useRef(E),L=s.useRef(0),{onToastAdd:F,onToastRemove:X}=l,_=H(()=>{var C;(i==null?void 0:i.contains(document.activeElement))&&((C=l.viewport)==null||C.focus()),p()}),A=s.useCallback(a=>{!a||a===1/0||(window.clearTimeout(L.current),P.current=new Date().getTime(),L.current=window.setTimeout(_,a))},[_]);s.useEffect(()=>{const a=l.viewport;if(a){const C=()=>{A(I.current),n==null||n()},b=()=>{const M=new Date().getTime()-P.current;I.current=I.current-M,window.clearTimeout(L.current),v==null||v()};return a.addEventListener(B,b),a.addEventListener(q,C),()=>{a.removeEventListener(B,b),a.removeEventListener(q,C)}}},[l.viewport,E,v,n,A]),s.useEffect(()=>{d&&!l.isClosePausedRef.current&&A(E)},[d,E,l.isClosePausedRef,A]),s.useEffect(()=>(F(),()=>X()),[F,X]);const j=s.useMemo(()=>i?Te(i):null,[i]);return l.viewport?c.jsxs(c.Fragment,{children:[j&&c.jsx(Ve,{__scopeToast:r,role:"status","aria-live":t==="foreground"?"assertive":"polite","aria-atomic":!0,children:j}),c.jsx(Oe,{scope:r,onClose:_,children:Ee.createPortal(c.jsx(J.ItemSlot,{scope:r,children:c.jsx(Ce,{asChild:!0,onEscapeKeyDown:R(T,()=>{l.isFocusedToastEscapeKeyDownRef.current||_(),l.isFocusedToastEscapeKeyDownRef.current=!1}),children:c.jsx(D.li,{role:"status","aria-live":"off","aria-atomic":!0,tabIndex:0,"data-state":d?"open":"closed","data-swipe-direction":l.swipeDirection,...S,ref:f,style:{userSelect:"none",touchAction:"none",...e.style},onKeyDown:R(e.onKeyDown,a=>{a.key==="Escape"&&(T==null||T(a.nativeEvent),a.nativeEvent.defaultPrevented||(l.isFocusedToastEscapeKeyDownRef.current=!0,_()))}),onPointerDown:R(e.onPointerDown,a=>{a.button===0&&(m.current={x:a.clientX,y:a.clientY})}),onPointerMove:R(e.onPointerMove,a=>{if(!m.current)return;const C=a.clientX-m.current.x,b=a.clientY-m.current.y,M=!!w.current,O=["left","right"].includes(l.swipeDirection),k=["left","up"].includes(l.swipeDirection)?Math.min:Math.max,ve=O?k(0,C):0,we=O?0:k(0,b),Y=a.pointerType==="touch"?10:2,V={x:ve,y:we},Z={originalEvent:a,delta:V};M?(w.current=V,K(Ne,x,Z,{discrete:!1})):ee(V,l.swipeDirection,Y)?(w.current=V,K(De,h,Z,{discrete:!1}),a.target.setPointerCapture(a.pointerId)):(Math.abs(C)>Y||Math.abs(b)>Y)&&(m.current=null)}),onPointerUp:R(e.onPointerUp,a=>{const C=w.current,b=a.target;if(b.hasPointerCapture(a.pointerId)&&b.releasePointerCapture(a.pointerId),w.current=null,m.current=null,C){const M=a.currentTarget,O={originalEvent:a,delta:C};ee(C,l.swipeDirection,l.swipeThreshold)?K(Me,g,O,{discrete:!0}):K(Le,N,O,{discrete:!0}),M.addEventListener("click",k=>k.preventDefault(),{once:!0})}})})})}),l.viewport)})]}):null}),Ve=e=>{const{__scopeToast:o,children:r,...t}=e,u=W(U,o),[d,p]=s.useState(!1),[T,v]=s.useState(!1);return We(()=>p(!0)),s.useEffect(()=>{const n=window.setTimeout(()=>v(!0),1e3);return()=>window.clearTimeout(n)},[]),T?null:c.jsx(he,{asChild:!0,children:c.jsx(oe,{...t,children:d&&c.jsxs(c.Fragment,{children:[u.label," ",r]})})})},Ke="ToastTitle",ue=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e;return c.jsx(D.div,{...t,ref:o})});ue.displayName=Ke;var He="ToastDescription",le=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e;return c.jsx(D.div,{...t,ref:o})});le.displayName=He;var de="ToastAction",pe=s.forwardRef((e,o)=>{const{altText:r,...t}=e;return r.trim()?c.jsx(me,{altText:r,asChild:!0,children:c.jsx(Q,{...t,ref:o})}):(console.error(`Invalid prop \`altText\` supplied to \`${de}\`. Expected non-empty \`string\`.`),null)});pe.displayName=de;var fe="ToastClose",Q=s.forwardRef((e,o)=>{const{__scopeToast:r,...t}=e,u=je(fe,r);return c.jsx(me,{asChild:!0,children:c.jsx(D.button,{type:"button",...t,ref:o,onClick:R(e.onClick,u.onClose)})})});Q.displayName=fe;var me=s.forwardRef((e,o)=>{const{__scopeToast:r,altText:t,...u}=e;return c.jsx(D.div,{"data-radix-toast-announce-exclude":"","data-radix-toast-announce-alt":t||void 0,...u,ref:o})});function Te(e){const o=[];return Array.from(e.childNodes).forEach(t=>{if(t.nodeType===t.TEXT_NODE&&t.textContent&&o.push(t.textContent),Ue(t)){const u=t.ariaHidden||t.hidden||t.style.display==="none",d=t.dataset.radixToastAnnounceExclude==="";if(!u)if(d){const p=t.dataset.radixToastAnnounceAlt;p&&o.push(p)}else o.push(...Te(t))}}),o}function K(e,o,r,{discrete:t}){const u=r.originalEvent.currentTarget,d=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:r});o&&u.addEventListener(e,o,{once:!0}),t?be(u,d):u.dispatchEvent(d)}var ee=(e,o,r=0)=>{const t=Math.abs(e.x),u=Math.abs(e.y),d=t>u;return o==="left"||o==="right"?d&&t>r:!d&&u>r};function We(e=()=>{}){const o=H(e);Se(()=>{let r=0,t=0;return r=window.requestAnimationFrame(()=>t=window.requestAnimationFrame(o)),()=>{window.cancelAnimationFrame(r),window.cancelAnimationFrame(t)}},[o])}function Ue(e){return e.nodeType===e.ELEMENT_NODE}function Xe(e){const o=[],r=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>{const u=t.tagName==="INPUT"&&t.type==="hidden";return t.disabled||t.hidden||u?NodeFilter.FILTER_SKIP:t.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;r.nextNode();)o.push(r.currentNode);return o}function $(e){const o=document.activeElement;return e.some(r=>r===o?!0:(r.focus(),document.activeElement!==o))}var at=se,it=ae,ct=ce,ut=ue,lt=le,dt=pe,pt=Q;export{dt as A,pt as C,lt as D,at as P,ct as R,ut as T,it as V};
