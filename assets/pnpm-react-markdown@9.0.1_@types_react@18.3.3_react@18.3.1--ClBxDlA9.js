import{u as N}from"./pnpm-devlop@1.1.0--Cl3hj7Sz.js";import{j as c}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{u as R}from"./pnpm-unified@11.0.5--BfEDgjQC.js";import{r as H}from"./pnpm-remark-parse@11.0.0--BSkHF13f.js";import{r as S}from"./pnpm-remark-rehype@11.1.0--CQ7tfgnK.js";import{V as D}from"./pnpm-vfile@6.0.2--CadQ6ipo.js";import{v as I}from"./pnpm-unist-util-visit@5.0.0--DWmCSuFY.js";import{t as U}from"./pnpm-hast-util-to-jsx-runtime@2.3.0--MDitaztR.js";import{u as d}from"./pnpm-html-url-attributes@3.0.0--D46m5wfe.js";import"./pnpm-@babel_runtime@7.25.0--CyFcdsuD.js";import"./pnpm-bail@2.0.2--FqpXQuLt.js";import"./pnpm-extend@3.0.2--CRF2Ve2S.js";import"./pnpm-is-plain-obj@4.1.0--C1gvLhAf.js";import"./pnpm-trough@2.2.0--B_b8ryxu.js";import"./pnpm-mdast-util-from-markdown@2.0.1--CdoTGTy8.js";import"./pnpm-micromark-util-decode-numeric-character-reference@2.0.1--CNs1qBpV.js";import"./pnpm-micromark-util-decode-string@2.0.0--CFNWcUXr.js";import"./pnpm-decode-named-character-reference@1.0.2--C3-224fz.js";import"./pnpm-micromark-util-normalize-identifier@2.0.0--C9ANKk3v.js";import"./pnpm-micromark@4.0.0--CTA1qyHu.js";import"./pnpm-micromark-util-combine-extensions@2.0.0--BTQXpFjS.js";import"./pnpm-micromark-util-chunked@2.0.0--DrRIdSP-.js";import"./pnpm-micromark-factory-space@2.0.0--dAR4O8ms.js";import"./pnpm-micromark-util-character@2.1.0--CuZ8VJ3N.js";import"./pnpm-micromark-core-commonmark@2.0.1--D-jIjWKQ.js";import"./pnpm-micromark-util-classify-character@2.0.0--hZCeMY_8.js";import"./pnpm-micromark-util-resolve-all@2.0.0--PQCKh0dx.js";import"./pnpm-micromark-util-subtokenize@2.0.1--DzVBUiuF.js";import"./pnpm-micromark-factory-destination@2.0.0--CexNfGRi.js";import"./pnpm-micromark-factory-label@2.0.0--y-M3V9fu.js";import"./pnpm-micromark-factory-title@2.0.0--BhgvU35s.js";import"./pnpm-micromark-factory-whitespace@2.0.0--Bs-DlCrj.js";import"./pnpm-micromark-util-html-tag-name@2.0.0--DbKNfynz.js";import"./pnpm-unist-util-stringify-position@4.0.0--Ch_qCilz.js";import"./pnpm-mdast-util-to-string@4.0.0--C_aolqmU.js";import"./pnpm-mdast-util-to-hast@13.2.0--BsdZykbI.js";import"./pnpm-@ungap_structured-clone@1.2.0--DDJC10qW.js";import"./pnpm-micromark-util-sanitize-uri@2.0.0--DJIgcGWu.js";import"./pnpm-unist-util-position@5.0.0--60F3QETU.js";import"./pnpm-trim-lines@3.0.1--D8znQY54.js";import"./pnpm-vfile-message@4.0.2--cOTb-_LP.js";import"./pnpm-unist-util-visit-parents@6.0.1--DpYkTnTF.js";import"./pnpm-unist-util-is@6.0.0--D9KQvrmg.js";import"./pnpm-comma-separated-tokens@2.0.3--Dw-VBL9A.js";import"./pnpm-property-information@6.5.0--DdDptki-.js";import"./pnpm-space-separated-tokens@2.0.2--D7QSIrTI.js";import"./pnpm-style-to-object@1.0.6--Bjojw8RR.js";import"./pnpm-inline-style-parser@0.2.3--D--Rb2MU.js";import"./pnpm-hast-util-whitespace@3.0.0--D4Wp6AEg.js";import"./pnpm-estree-util-is-identifier-name@3.0.0--BgBfM8ME.js";const F="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",w=[],h={allowDangerousHtml:!0},M=/^(https?|ircs?|mailto|xmpp)$/i,V=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function Fe(e){const m=e.allowedElements,l=e.allowElement,n=e.children||"",a=e.className,y=e.components,f=e.disallowedElements,k=e.rehypePlugins||w,b=e.remarkPlugins||w,O=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...h}:h,v=e.skipHtml,x=e.unwrapDisallowed,E=e.urlTransform||q,u=R().use(H).use(b).use(S,O).use(k),p=new D;typeof n=="string"&&(p.value=n);for(const r of V)Object.hasOwn(e,r.from)&&N("Unexpected `"+r.from+"` prop, "+(r.to?"use `"+r.to+"` instead":"remove it")+" (see <"+F+"#"+r.id+"> for more info)");const P=u.parse(p);let i=u.runSync(P,p);return a&&(i={type:"element",tagName:"div",properties:{className:a},children:i.type==="root"?i.children:[i]}),I(i,j),U(i,{Fragment:c.Fragment,components:y,ignoreInvalidStyle:!0,jsx:c.jsx,jsxs:c.jsxs,passKeys:!0,passNode:!0});function j(r,t,s){if(r.type==="raw"&&s&&typeof t=="number")return v?s.children.splice(t,1):s.children[t]={type:"text",value:r.value},t;if(r.type==="element"){let o;for(o in d)if(Object.hasOwn(d,o)&&Object.hasOwn(r.properties,o)){const T=r.properties[o],g=d[o];(g===null||g.includes(r.tagName))&&(r.properties[o]=E(String(T||""),o,r))}}if(r.type==="element"){let o=m?!m.includes(r.tagName):f?f.includes(r.tagName):!1;if(!o&&l&&typeof t=="number"&&(o=!l(r,t,s)),o&&s&&typeof t=="number")return x&&r.children?s.children.splice(t,1,...r.children):s.children.splice(t,1),t}}}function q(e){const m=e.indexOf(":"),l=e.indexOf("?"),n=e.indexOf("#"),a=e.indexOf("/");return m<0||a>-1&&m>a||l>-1&&m>l||n>-1&&m>n||M.test(e.slice(0,m))?e:""}export{Fe as default,q as defaultUrlTransform};
