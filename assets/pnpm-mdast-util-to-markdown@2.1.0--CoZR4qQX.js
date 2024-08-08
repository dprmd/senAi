import{l as R}from"./pnpm-longest-streak@3.1.0--CtXnX3Xp.js";import{v as T}from"./pnpm-unist-util-visit@5.0.0--DWmCSuFY.js";import{E as y}from"./pnpm-unist-util-visit-parents@6.0.1--DpYkTnTF.js";import{t as b}from"./pnpm-mdast-util-to-string@4.0.0--C_aolqmU.js";import{p as z}from"./pnpm-mdast-util-phrasing@4.1.0--CyZhb45D.js";function A(r,n,e,l){const u=e.enter("blockquote"),f=e.createTracker(l);f.move("> "),f.shift(2);const i=e.indentLines(e.containerFlow(r,f.current()),F);return u(),i}function F(r,n,e){return">"+(e?"":" ")+r}function O(r,n){return v(r,n.inConstruct,!0)&&!v(r,n.notInConstruct,!1)}function v(r,n,e){if(typeof n=="string"&&(n=[n]),!n||n.length===0)return e;let l=-1;for(;++l<n.length;)if(r.includes(n[l]))return!0;return!1}function x(r,n,e,l){let u=-1;for(;++u<e.unsafe.length;)if(e.unsafe[u].character===`
`&&O(e.stack,e.unsafe[u]))return/[ \t]/.test(l.before)?"":" ";return`\\
`}function B(r,n){return!!(n.options.fences===!1&&r.value&&!r.lang&&/[^ \r\n]/.test(r.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(r.value))}function $(r){const n=r.options.fence||"`";if(n!=="`"&&n!=="~")throw new Error("Cannot serialize code with `"+n+"` for `options.fence`, expected `` ` `` or `~`");return n}function q(r,n,e,l){const u=$(e),f=r.value||"",i=u==="`"?"GraveAccent":"Tilde";if(B(r,e)){const a=e.enter("codeIndented"),m=e.indentLines(f,M);return a(),m}const c=e.createTracker(l),o=u.repeat(Math.max(R(f,u)+1,3)),t=e.enter("codeFenced");let s=c.move(o);if(r.lang){const a=e.enter(`codeFencedLang${i}`);s+=c.move(e.safe(r.lang,{before:s,after:" ",encode:["`"],...c.current()})),a()}if(r.lang&&r.meta){const a=e.enter(`codeFencedMeta${i}`);s+=c.move(" "),s+=c.move(e.safe(r.meta,{before:s,after:`
`,encode:["`"],...c.current()})),a()}return s+=c.move(`
`),f&&(s+=c.move(f+`
`)),s+=c.move(o),t(),s}function M(r,n,e){return(e?"":"    ")+r}function h(r){const n=r.options.quote||'"';if(n!=='"'&&n!=="'")throw new Error("Cannot serialize title with `"+n+"` for `options.quote`, expected `\"`, or `'`");return n}function Q(r,n,e,l){const u=h(e),f=u==='"'?"Quote":"Apostrophe",i=e.enter("definition");let c=e.enter("label");const o=e.createTracker(l);let t=o.move("[");return t+=o.move(e.safe(e.associationId(r),{before:t,after:"]",...o.current()})),t+=o.move("]: "),c(),!r.url||/[\0- \u007F]/.test(r.url)?(c=e.enter("destinationLiteral"),t+=o.move("<"),t+=o.move(e.safe(r.url,{before:t,after:">",...o.current()})),t+=o.move(">")):(c=e.enter("destinationRaw"),t+=o.move(e.safe(r.url,{before:t,after:r.title?" ":`
`,...o.current()}))),c(),r.title&&(c=e.enter(`title${f}`),t+=o.move(" "+u),t+=o.move(e.safe(r.title,{before:t,after:u,...o.current()})),t+=o.move(u),c()),i(),t}function U(r){const n=r.options.emphasis||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize emphasis with `"+n+"` for `options.emphasis`, expected `*`, or `_`");return n}g.peek=D;function g(r,n,e,l){const u=U(e),f=e.enter("emphasis"),i=e.createTracker(l);let c=i.move(u);return c+=i.move(e.containerPhrasing(r,{before:c,after:u,...i.current()})),c+=i.move(u),f(),c}function D(r,n,e){return e.options.emphasis||"*"}function G(r,n){let e=!1;return T(r,function(l){if("value"in l&&/\r?\n|\r/.test(l.value)||l.type==="break")return e=!0,y}),!!((!r.depth||r.depth<3)&&b(r)&&(n.options.setext||e))}function H(r,n,e,l){const u=Math.max(Math.min(6,r.depth||1),1),f=e.createTracker(l);if(G(r,e)){const s=e.enter("headingSetext"),a=e.enter("phrasing"),m=e.containerPhrasing(r,{...f.current(),before:`
`,after:`
`});return a(),s(),m+`
`+(u===1?"=":"-").repeat(m.length-(Math.max(m.lastIndexOf("\r"),m.lastIndexOf(`
`))+1))}const i="#".repeat(u),c=e.enter("headingAtx"),o=e.enter("phrasing");f.move(i+" ");let t=e.containerPhrasing(r,{before:"# ",after:`
`,...f.current()});return/^[\t ]/.test(t)&&(t="&#x"+t.charCodeAt(0).toString(16).toUpperCase()+";"+t.slice(1)),t=t?i+" "+t:i,e.options.closeAtx&&(t+=" "+i),o(),c(),t}d.peek=W;function d(r){return r.value||""}function W(){return"<"}w.peek=X;function w(r,n,e,l){const u=h(e),f=u==='"'?"Quote":"Apostrophe",i=e.enter("image");let c=e.enter("label");const o=e.createTracker(l);let t=o.move("![");return t+=o.move(e.safe(r.alt,{before:t,after:"]",...o.current()})),t+=o.move("]("),c(),!r.url&&r.title||/[\0- \u007F]/.test(r.url)?(c=e.enter("destinationLiteral"),t+=o.move("<"),t+=o.move(e.safe(r.url,{before:t,after:">",...o.current()})),t+=o.move(">")):(c=e.enter("destinationRaw"),t+=o.move(e.safe(r.url,{before:t,after:r.title?" ":")",...o.current()}))),c(),r.title&&(c=e.enter(`title${f}`),t+=o.move(" "+u),t+=o.move(e.safe(r.title,{before:t,after:u,...o.current()})),t+=o.move(u),c()),t+=o.move(")"),i(),t}function X(){return"!"}_.peek=j;function _(r,n,e,l){const u=r.referenceType,f=e.enter("imageReference");let i=e.enter("label");const c=e.createTracker(l);let o=c.move("![");const t=e.safe(r.alt,{before:o,after:"]",...c.current()});o+=c.move(t+"]["),i();const s=e.stack;e.stack=[],i=e.enter("reference");const a=e.safe(e.associationId(r),{before:o,after:"]",...c.current()});return i(),e.stack=s,f(),u==="full"||!t||t!==a?o+=c.move(a+"]"):u==="shortcut"?o=o.slice(0,-1):o+=c.move("]"),o}function j(){return"!"}I.peek=J;function I(r,n,e){let l=r.value||"",u="`",f=-1;for(;new RegExp("(^|[^`])"+u+"([^`]|$)").test(l);)u+="`";for(/[^ \r\n]/.test(l)&&(/^[ \r\n]/.test(l)&&/[ \r\n]$/.test(l)||/^`|`$/.test(l))&&(l=" "+l+" ");++f<e.unsafe.length;){const i=e.unsafe[f],c=e.compilePattern(i);let o;if(i.atBreak)for(;o=c.exec(l);){let t=o.index;l.charCodeAt(t)===10&&l.charCodeAt(t-1)===13&&t--,l=l.slice(0,t)+" "+l.slice(o.index+1)}}return u+l+u}function J(){return"`"}function C(r,n){const e=b(r);return!!(!n.options.resourceLink&&r.url&&!r.title&&r.children&&r.children.length===1&&r.children[0].type==="text"&&(e===r.url||"mailto:"+e===r.url)&&/^[a-z][a-z+.-]+:/i.test(r.url)&&!/[\0- <>\u007F]/.test(r.url))}P.peek=K;function P(r,n,e,l){const u=h(e),f=u==='"'?"Quote":"Apostrophe",i=e.createTracker(l);let c,o;if(C(r,e)){const s=e.stack;e.stack=[],c=e.enter("autolink");let a=i.move("<");return a+=i.move(e.containerPhrasing(r,{before:a,after:">",...i.current()})),a+=i.move(">"),c(),e.stack=s,a}c=e.enter("link"),o=e.enter("label");let t=i.move("[");return t+=i.move(e.containerPhrasing(r,{before:t,after:"](",...i.current()})),t+=i.move("]("),o(),!r.url&&r.title||/[\0- \u007F]/.test(r.url)?(o=e.enter("destinationLiteral"),t+=i.move("<"),t+=i.move(e.safe(r.url,{before:t,after:">",...i.current()})),t+=i.move(">")):(o=e.enter("destinationRaw"),t+=i.move(e.safe(r.url,{before:t,after:r.title?" ":")",...i.current()}))),o(),r.title&&(o=e.enter(`title${f}`),t+=i.move(" "+u),t+=i.move(e.safe(r.title,{before:t,after:u,...i.current()})),t+=i.move(u),o()),t+=i.move(")"),c(),t}function K(r,n,e){return C(r,e)?"<":"["}E.peek=N;function E(r,n,e,l){const u=r.referenceType,f=e.enter("linkReference");let i=e.enter("label");const c=e.createTracker(l);let o=c.move("[");const t=e.containerPhrasing(r,{before:o,after:"]",...c.current()});o+=c.move(t+"]["),i();const s=e.stack;e.stack=[],i=e.enter("reference");const a=e.safe(e.associationId(r),{before:o,after:"]",...c.current()});return i(),e.stack=s,f(),u==="full"||!t||t!==a?o+=c.move(a+"]"):u==="shortcut"?o=o.slice(0,-1):o+=c.move("]"),o}function N(){return"["}function p(r){const n=r.options.bullet||"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bullet`, expected `*`, `+`, or `-`");return n}function V(r){const n=p(r),e=r.options.bulletOther;if(!e)return n==="*"?"-":"*";if(e!=="*"&&e!=="+"&&e!=="-")throw new Error("Cannot serialize items with `"+e+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(e===n)throw new Error("Expected `bullet` (`"+n+"`) and `bulletOther` (`"+e+"`) to be different");return e}function Y(r){const n=r.options.bulletOrdered||".";if(n!=="."&&n!==")")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOrdered`, expected `.` or `)`");return n}function S(r){const n=r.options.rule||"*";if(n!=="*"&&n!=="-"&&n!=="_")throw new Error("Cannot serialize rules with `"+n+"` for `options.rule`, expected `*`, `-`, or `_`");return n}function Z(r,n,e,l){const u=e.enter("list"),f=e.bulletCurrent;let i=r.ordered?Y(e):p(e);const c=r.ordered?i==="."?")":".":V(e);let o=n&&e.bulletLastUsed?i===e.bulletLastUsed:!1;if(!r.ordered){const s=r.children?r.children[0]:void 0;if((i==="*"||i==="-")&&s&&(!s.children||!s.children[0])&&e.stack[e.stack.length-1]==="list"&&e.stack[e.stack.length-2]==="listItem"&&e.stack[e.stack.length-3]==="list"&&e.stack[e.stack.length-4]==="listItem"&&e.indexStack[e.indexStack.length-1]===0&&e.indexStack[e.indexStack.length-2]===0&&e.indexStack[e.indexStack.length-3]===0&&(o=!0),S(e)===i&&s){let a=-1;for(;++a<r.children.length;){const m=r.children[a];if(m&&m.type==="listItem"&&m.children&&m.children[0]&&m.children[0].type==="thematicBreak"){o=!0;break}}}}o&&(i=c),e.bulletCurrent=i;const t=e.containerFlow(r,l);return e.bulletLastUsed=i,e.bulletCurrent=f,u(),t}function ee(r){const n=r.options.listItemIndent||"one";if(n!=="tab"&&n!=="one"&&n!=="mixed")throw new Error("Cannot serialize items with `"+n+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return n}function re(r,n,e,l){const u=ee(e);let f=e.bulletCurrent||p(e);n&&n.type==="list"&&n.ordered&&(f=(typeof n.start=="number"&&n.start>-1?n.start:1)+(e.options.incrementListMarker===!1?0:n.children.indexOf(r))+f);let i=f.length+1;(u==="tab"||u==="mixed"&&(n&&n.type==="list"&&n.spread||r.spread))&&(i=Math.ceil(i/4)*4);const c=e.createTracker(l);c.move(f+" ".repeat(i-f.length)),c.shift(i);const o=e.enter("listItem"),t=e.indentLines(e.containerFlow(r,c.current()),s);return o(),t;function s(a,m,k){return m?(k?"":" ".repeat(i))+a:(k?f:f+" ".repeat(i-f.length))+a}}function ne(r,n,e,l){const u=e.enter("paragraph"),f=e.enter("phrasing"),i=e.containerPhrasing(r,l);return f(),u(),i}function te(r,n,e,l){return(r.children.some(function(i){return z(i)})?e.containerPhrasing:e.containerFlow).call(e,r,l)}function ie(r){const n=r.options.strong||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize strong with `"+n+"` for `options.strong`, expected `*`, or `_`");return n}L.peek=oe;function L(r,n,e,l){const u=ie(e),f=e.enter("strong"),i=e.createTracker(l);let c=i.move(u+u);return c+=i.move(e.containerPhrasing(r,{before:c,after:u,...i.current()})),c+=i.move(u+u),f(),c}function oe(r,n,e){return e.options.strong||"*"}function ce(r,n,e,l){return e.safe(r.value,l)}function le(r){const n=r.options.ruleRepetition||3;if(n<3)throw new Error("Cannot serialize rules with repetition `"+n+"` for `options.ruleRepetition`, expected `3` or more");return n}function ue(r,n,e){const l=(S(e)+(e.options.ruleSpaces?" ":"")).repeat(le(e));return e.options.ruleSpaces?l.slice(0,-1):l}const pe={blockquote:A,break:x,code:q,definition:Q,emphasis:g,hardBreak:x,heading:H,html:d,image:w,imageReference:_,inlineCode:I,link:P,linkReference:E,list:Z,listItem:re,paragraph:ne,root:te,strong:L,text:ce,thematicBreak:ue};export{pe as h};
