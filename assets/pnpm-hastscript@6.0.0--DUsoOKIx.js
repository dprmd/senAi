import{f as v,n as b,h as N}from"./pnpm-property-information@5.6.0--BaUulPWZ.js";import{s as w}from"./pnpm-space-separated-tokens@1.1.5--CMBzgJJ4.js";import{c as j}from"./pnpm-comma-separated-tokens@1.0.8--DgTuumFk.js";import{h as S}from"./pnpm-hast-util-parse-selector@2.2.5--Cqsfuk9Y.js";var x=v,h=b,C=S,l=w.parse,d=j.parse,P=k,_={}.hasOwnProperty;function k(e,t,r){var n=r?O(r):null;return c;function c(m,o){var a=C(m,t),s=Array.prototype.slice.call(arguments,2),f=a.tagName.toLowerCase(),i;if(a.tagName=n&&_.call(n,f)?n[f]:f,o&&L(o,a)&&(s.unshift(o),o=null),o)for(i in o)p(a.properties,i,o[i]);return u(a.children,s),a.tagName==="template"&&(a.content={type:"root",children:a.children},a.children=[]),a}function p(m,o,a){var s,f,i;a==null||a!==a||(s=x(e,o),f=s.property,i=a,typeof i=="string"&&(s.spaceSeparated?i=l(i):s.commaSeparated?i=d(i):s.commaOrSpaceSeparated&&(i=l(d(i).join(" ")))),f==="style"&&typeof a!="string"&&(i=E(i)),f==="className"&&m.className&&(i=m.className.concat(i)),m[f]=A(s,f,i))}}function L(e,t){return typeof e=="string"||"length"in e||z(t.tagName,e)}function z(e,t){var r=t.type;return e==="input"||!r||typeof r!="string"?!1:typeof t.children=="object"&&"length"in t.children?!0:(r=r.toLowerCase(),e==="button"?r!=="menu"&&r!=="submit"&&r!=="reset"&&r!=="button":"value"in t)}function u(e,t){var r,n;if(typeof t=="string"||typeof t=="number"){e.push({type:"text",value:String(t)});return}if(typeof t=="object"&&"length"in t){for(r=-1,n=t.length;++r<n;)u(e,t[r]);return}if(typeof t!="object"||!("type"in t))throw new Error("Expected node, nodes, or string, got `"+t+"`");e.push(t)}function A(e,t,r){var n,c,p;if(typeof r!="object"||!("length"in r))return y(e,t,r);for(c=r.length,n=-1,p=[];++n<c;)p[n]=y(e,t,r[n]);return p}function y(e,t,r){var n=r;return e.number||e.positiveNumber?!isNaN(n)&&n!==""&&(n=Number(n)):(e.boolean||e.overloadedBoolean)&&typeof n=="string"&&(n===""||h(r)===h(t))&&(n=!0),n}function E(e){var t=[],r;for(r in e)t.push([r,e[r]].join(": "));return t.join("; ")}function O(e){for(var t=e.length,r=-1,n={},c;++r<t;)c=e[r],n[c.toLowerCase()]=c;return n}var T=N,$=P,g=$(T,"div");g.displayName="html";var B=g,F=B;export{F as h};
