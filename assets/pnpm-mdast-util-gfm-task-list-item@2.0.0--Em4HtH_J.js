import{o as l}from"./pnpm-devlop@1.1.0--Cl3hj7Sz.js";import{h as f}from"./pnpm-mdast-util-to-markdown@2.1.0--CoZR4qQX.js";function y(){return{exit:{taskListCheckValueChecked:h,taskListCheckValueUnchecked:h,paragraph:u}}}function b(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:m}}}function h(a){const e=this.stack[this.stack.length-2];l(e.type==="listItem"),e.checked=a.type==="taskListCheckValueChecked"}function u(a){const e=this.stack[this.stack.length-2];if(e&&e.type==="listItem"&&typeof e.checked=="boolean"){const s=this.stack[this.stack.length-1];l(s.type==="paragraph");const t=s.children[0];if(t&&t.type==="text"){const i=e.children;let c=-1,n;for(;++c<i.length;){const r=i[c];if(r.type==="paragraph"){n=r;break}}n===s&&(t.value=t.value.slice(1),t.value.length===0?s.children.shift():s.position&&t.position&&typeof t.position.start.offset=="number"&&(t.position.start.column++,t.position.start.offset++,s.position.start=Object.assign({},t.position.start)))}}this.exit(a)}function m(a,e,s,t){const i=a.children[0],c=typeof a.checked=="boolean"&&i&&i.type==="paragraph",n="["+(a.checked?"x":" ")+"] ",r=s.createTracker(t);c&&r.move(n);let o=f.listItem(a,e,s,{...t,...r.current()});return c&&(o=o.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,k)),o;function k(p){return p+n}}export{b as a,y as g};
