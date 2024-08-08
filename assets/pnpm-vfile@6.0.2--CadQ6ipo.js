import{V as w}from"./pnpm-vfile-message@4.0.2--cOTb-_LP.js";const f={basename:y,dirname:p,extname:b,join:A,sep:"/"};function y(t,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');h(t);let n=0,s=-1,i=t.length,o;if(e===void 0||e.length===0||e.length>t.length){for(;i--;)if(t.codePointAt(i)===47){if(o){n=i+1;break}}else s<0&&(o=!0,s=i+1);return s<0?"":t.slice(n,s)}if(e===t)return"";let r=-1,l=e.length-1;for(;i--;)if(t.codePointAt(i)===47){if(o){n=i+1;break}}else r<0&&(o=!0,r=i+1),l>-1&&(t.codePointAt(i)===e.codePointAt(l--)?l<0&&(s=i):(l=-1,s=r));return n===s?s=r:s<0&&(s=t.length),t.slice(n,s)}function p(t){if(h(t),t.length===0)return".";let e=-1,n=t.length,s;for(;--n;)if(t.codePointAt(n)===47){if(s){e=n;break}}else s||(s=!0);return e<0?t.codePointAt(0)===47?"/":".":e===1&&t.codePointAt(0)===47?"//":t.slice(0,e)}function b(t){h(t);let e=t.length,n=-1,s=0,i=-1,o=0,r;for(;e--;){const l=t.codePointAt(e);if(l===47){if(r){s=e+1;break}continue}n<0&&(r=!0,n=e+1),l===46?i<0?i=e:o!==1&&(o=1):i>-1&&(o=-1)}return i<0||n<0||o===0||o===1&&i===n-1&&i===s+1?"":t.slice(i,n)}function A(...t){let e=-1,n;for(;++e<t.length;)h(t[e]),t[e]&&(n=n===void 0?t[e]:n+"/"+t[e]);return n===void 0?".":E(n)}function E(t){h(t);const e=t.codePointAt(0)===47;let n=P(t,!e);return n.length===0&&!e&&(n="."),n.length>0&&t.codePointAt(t.length-1)===47&&(n+="/"),e?"/"+n:n}function P(t,e){let n="",s=0,i=-1,o=0,r=-1,l,d;for(;++r<=t.length;){if(r<t.length)l=t.codePointAt(r);else{if(l===47)break;l=47}if(l===47){if(!(i===r-1||o===1))if(i!==r-1&&o===2){if(n.length<2||s!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(d=n.lastIndexOf("/"),d!==n.length-1){d<0?(n="",s=0):(n=n.slice(0,d),s=n.length-1-n.lastIndexOf("/")),i=r,o=0;continue}}else if(n.length>0){n="",s=0,i=r,o=0;continue}}e&&(n=n.length>0?n+"/..":"..",s=2)}else n.length>0?n+="/"+t.slice(i+1,r):n=t.slice(i+1,r),s=r-i-1;i=r,o=0}else l===46&&o>-1?o++:o=-1}return n}function h(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}const R={cwd:x};function x(){return"/"}function g(t){return!!(t!==null&&typeof t=="object"&&"href"in t&&t.href&&"protocol"in t&&t.protocol&&t.auth===void 0)}function L(t){if(typeof t=="string")t=new URL(t);else if(!g(t)){const e=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+t+"`");throw e.code="ERR_INVALID_ARG_TYPE",e}if(t.protocol!=="file:"){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return I(t)}function I(t){if(t.hostname!==""){const s=new TypeError('File URL host must be "localhost" or empty on darwin');throw s.code="ERR_INVALID_FILE_URL_HOST",s}const e=t.pathname;let n=-1;for(;++n<e.length;)if(e.codePointAt(n)===37&&e.codePointAt(n+1)===50){const s=e.codePointAt(n+2);if(s===70||s===102){const i=new TypeError("File URL path must not include encoded / characters");throw i.code="ERR_INVALID_FILE_URL_PATH",i}}return decodeURIComponent(e)}const c=["history","path","basename","stem","extname","dirname"];class T{constructor(e){let n;e?g(e)?n={path:e}:typeof e=="string"||S(e)?n={value:e}:n=e:n={},this.cwd="cwd"in n?"":R.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let s=-1;for(;++s<c.length;){const o=c[s];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let i;for(i in n)c.includes(i)||(this[i]=n[i])}get basename(){return typeof this.path=="string"?f.basename(this.path):void 0}set basename(e){u(e,"basename"),a(e,"basename"),this.path=f.join(this.dirname||"",e)}get dirname(){return typeof this.path=="string"?f.dirname(this.path):void 0}set dirname(e){m(this.basename,"dirname"),this.path=f.join(e||"",this.basename)}get extname(){return typeof this.path=="string"?f.extname(this.path):void 0}set extname(e){if(a(e,"extname"),m(this.dirname,"extname"),e){if(e.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=f.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){g(e)&&(e=L(e)),u(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path=="string"?f.basename(this.path,this.extname):void 0}set stem(e){u(e,"stem"),a(e,"stem"),this.path=f.join(this.dirname||"",e+(this.extname||""))}fail(e,n,s){const i=this.message(e,n,s);throw i.fatal=!0,i}info(e,n,s){const i=this.message(e,n,s);return i.fatal=void 0,i}message(e,n,s){const i=new w(e,n,s);return this.path&&(i.name=this.path+":"+i.name,i.file=this.path),i.fatal=!1,this.messages.push(i),i}toString(e){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(e||void 0).decode(this.value)}}function a(t,e){if(t&&t.includes(f.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+f.sep+"`")}function u(t,e){if(!t)throw new Error("`"+e+"` cannot be empty")}function m(t,e){if(!t)throw new Error("Setting `"+e+"` requires `path` to be set too")}function S(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}export{T as V};
