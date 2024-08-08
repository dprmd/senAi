import{o as et,s as it,f as nt,a as ot,h as st,c as rt,b as ct,l as lt}from"./pnpm-@floating-ui_core@1.6.7--uvl74l1Z.js";import{p as V,q as x,t as b,u as E,v as K,w as y,r as G,x as C,y as R,z as A,A as J,B as z,C as S,D as M,E as _,F as H,j as T,m as $,G as W,H as D,I as ft,J as X,K as ut}from"./pnpm-@floating-ui_utils@0.2.7--COXYPCKK.js";function P(t){const e=y(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const o=R(t),c=o?t.offsetWidth:n,s=o?t.offsetHeight:i,r=A(n)!==c||A(i)!==s;return r&&(n=c,i=s),{width:n,height:i,$:r}}function q(t){return x(t)?t:t.contextElement}function F(t){const e=q(t);if(!R(e))return b(1);const n=e.getBoundingClientRect(),{width:i,height:o,$:c}=P(e);let s=(c?A(n.width):n.width)/i,r=(c?A(n.height):n.height)/o;return(!s||!Number.isFinite(s))&&(s=1),(!r||!Number.isFinite(r))&&(r=1),{x:s,y:r}}const at=b(0);function Q(t){const e=E(t);return!J()||!e.visualViewport?at:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ht(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==E(t)?!1:e}function L(t,e,n,i){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),c=q(t);let s=b(1);e&&(i?x(i)&&(s=F(i)):s=F(t));const r=ht(c,n,i)?Q(c):b(0);let l=(o.left+r.x)/s.x,f=(o.top+r.y)/s.y,u=o.width/s.x,a=o.height/s.y;if(c){const m=E(c),g=i&&x(i)?E(i):i;let v=m,h=K(v);for(;h&&i&&g!==v;){const p=F(h),d=h.getBoundingClientRect(),w=y(h),O=d.left+(h.clientLeft+parseFloat(w.paddingLeft))*p.x,B=d.top+(h.clientTop+parseFloat(w.paddingTop))*p.y;l*=p.x,f*=p.y,u*=p.x,a*=p.y,l+=O,f+=B,v=E(h),h=K(v)}}return G({width:u,height:a,x:l,y:f})}function dt(t){let{elements:e,rect:n,offsetParent:i,strategy:o}=t;const c=o==="fixed",s=C(i),r=e?S(e.floating):!1;if(i===s||r&&c)return n;let l={scrollLeft:0,scrollTop:0},f=b(1);const u=b(0),a=R(i);if((a||!a&&!c)&&((M(i)!=="body"||_(s))&&(l=H(i)),R(i))){const m=L(i);f=F(i),u.x=m.x+i.clientLeft,u.y=m.y+i.clientTop}return{width:n.width*f.x,height:n.height*f.y,x:n.x*f.x-l.scrollLeft*f.x+u.x,y:n.y*f.y-l.scrollTop*f.y+u.y}}function gt(t){return Array.from(t.getClientRects())}function Y(t){return L(C(t)).left+H(t).scrollLeft}function pt(t){const e=C(t),n=H(t),i=t.ownerDocument.body,o=T(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=T(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let s=-n.scrollLeft+Y(t);const r=-n.scrollTop;return y(i).direction==="rtl"&&(s+=T(e.clientWidth,i.clientWidth)-o),{width:o,height:c,x:s,y:r}}function wt(t,e){const n=E(t),i=C(t),o=n.visualViewport;let c=i.clientWidth,s=i.clientHeight,r=0,l=0;if(o){c=o.width,s=o.height;const f=J();(!f||f&&e==="fixed")&&(r=o.offsetLeft,l=o.offsetTop)}return{width:c,height:s,x:r,y:l}}function mt(t,e){const n=L(t,!0,e==="fixed"),i=n.top+t.clientTop,o=n.left+t.clientLeft,c=R(t)?F(t):b(1),s=t.clientWidth*c.x,r=t.clientHeight*c.y,l=o*c.x,f=i*c.y;return{width:s,height:r,x:l,y:f}}function U(t,e,n){let i;if(e==="viewport")i=wt(t,n);else if(e==="document")i=pt(C(t));else if(x(e))i=mt(e,n);else{const o=Q(t);i={...e,x:e.x-o.x,y:e.y-o.y}}return G(i)}function Z(t,e){const n=W(t);return n===e||!x(n)||D(n)?!1:y(n).position==="fixed"||Z(n,e)}function vt(t,e){const n=e.get(t);if(n)return n;let i=V(t,[],!1).filter(r=>x(r)&&M(r)!=="body"),o=null;const c=y(t).position==="fixed";let s=c?W(t):t;for(;x(s)&&!D(s);){const r=y(s),l=X(s);!l&&r.position==="fixed"&&(o=null),(c?!l&&!o:!l&&r.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||_(s)&&!l&&Z(t,s))?i=i.filter(u=>u!==s):o=r,s=W(s)}return e.set(t,i),i}function xt(t){let{element:e,boundary:n,rootBoundary:i,strategy:o}=t;const s=[...n==="clippingAncestors"?S(e)?[]:vt(e,this._c):[].concat(n),i],r=s[0],l=s.reduce((f,u)=>{const a=U(e,u,o);return f.top=T(a.top,f.top),f.right=$(a.right,f.right),f.bottom=$(a.bottom,f.bottom),f.left=T(a.left,f.left),f},U(e,r,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function yt(t){const{width:e,height:n}=P(t);return{width:e,height:n}}function bt(t,e,n){const i=R(e),o=C(e),c=n==="fixed",s=L(t,!0,c,e);let r={scrollLeft:0,scrollTop:0};const l=b(0);if(i||!i&&!c)if((M(e)!=="body"||_(o))&&(r=H(e)),i){const a=L(e,!0,c,e);l.x=a.x+e.clientLeft,l.y=a.y+e.clientTop}else o&&(l.x=Y(o));const f=s.left+r.scrollLeft-l.x,u=s.top+r.scrollTop-l.y;return{x:f,y:u,width:s.width,height:s.height}}function N(t){return y(t).position==="static"}function j(t,e){return!R(t)||y(t).position==="fixed"?null:e?e(t):t.offsetParent}function tt(t,e){const n=E(t);if(S(t))return n;if(!R(t)){let o=W(t);for(;o&&!D(o);){if(x(o)&&!N(o))return o;o=W(o)}return n}let i=j(t,e);for(;i&&ft(i)&&N(i);)i=j(i,e);return i&&D(i)&&N(i)&&!X(i)?n:i||ut(t)||n}const Rt=async function(t){const e=this.getOffsetParent||tt,n=this.getDimensions,i=await n(t.floating);return{reference:bt(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}};function Ct(t){return y(t).direction==="rtl"}const Ot={convertOffsetParentRelativeRectToViewportRelativeRect:dt,getDocumentElement:C,getClippingRect:xt,getOffsetParent:tt,getElementRects:Rt,getClientRects:gt,getDimensions:yt,getScale:F,isElement:x,isRTL:Ct};function Et(t,e){let n=null,i;const o=C(t);function c(){var r;clearTimeout(i),(r=n)==null||r.disconnect(),n=null}function s(r,l){r===void 0&&(r=!1),l===void 0&&(l=1),c();const{left:f,top:u,width:a,height:m}=t.getBoundingClientRect();if(r||e(),!a||!m)return;const g=z(u),v=z(o.clientWidth-(f+a)),h=z(o.clientHeight-(u+m)),p=z(f),w={rootMargin:-g+"px "+-v+"px "+-h+"px "+-p+"px",threshold:T(0,$(1,l))||1};let O=!0;function B(k){const I=k[0].intersectionRatio;if(I!==l){if(!O)return s();I?s(!1,I):i=setTimeout(()=>{s(!1,1e-7)},1e3)}O=!1}try{n=new IntersectionObserver(B,{...w,root:o.ownerDocument})}catch{n=new IntersectionObserver(B,w)}n.observe(t)}return s(!0),c}function Ft(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:o=!0,ancestorResize:c=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:r=typeof IntersectionObserver=="function",animationFrame:l=!1}=i,f=q(t),u=o||c?[...f?V(f):[],...V(e)]:[];u.forEach(d=>{o&&d.addEventListener("scroll",n,{passive:!0}),c&&d.addEventListener("resize",n)});const a=f&&r?Et(f,n):null;let m=-1,g=null;s&&(g=new ResizeObserver(d=>{let[w]=d;w&&w.target===f&&g&&(g.unobserve(e),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var O;(O=g)==null||O.observe(e)})),n()}),f&&!l&&g.observe(f),g.observe(e));let v,h=l?L(t):null;l&&p();function p(){const d=L(t);h&&(d.x!==h.x||d.y!==h.y||d.width!==h.width||d.height!==h.height)&&n(),h=d,v=requestAnimationFrame(p)}return n(),()=>{var d;u.forEach(w=>{o&&w.removeEventListener("scroll",n),c&&w.removeEventListener("resize",n)}),a==null||a(),(d=g)==null||d.disconnect(),g=null,l&&cancelAnimationFrame(v)}}const Wt=et,Bt=it,zt=nt,At=ot,Dt=st,Ht=ct,It=lt,Nt=(t,e,n)=>{const i=new Map,o={platform:Ot,...n},c={...o.platform,_c:i};return rt(t,e,{...o,platform:c})};export{At as a,Ht as b,Nt as c,Ft as d,zt as f,Dt as h,It as l,Wt as o,Bt as s};
