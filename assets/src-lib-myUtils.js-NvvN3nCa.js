const r=new Map([["320x480","IPhone 4S, 4, 3GS, 3G, 1st gen"],["320x568","IPhone 5, SE 1st Gen,5C, 5S"],["375x667","IPhone SE 2nd Gen, 6, 6S, 7, 8"],["375x812","IPhone X, XS, 11 Pro, 12 Mini, 13 Mini"],["390x844","IPhone 13, 13 Pro, 12, 12 Pro"],["414x736","IPhone 8+"],["414x896","IPhone 11, XR, XS Max, 11 Pro Max"],["428x926","IPhone 13 Pro Max, 12 Pro Max"],["476x847","IPhone 7+, 6+, 6S+"],["744x1133","IPad Mini 6th Gen"],["768x1024","IPad Mini (5th Gen), IPad (1-6th Gen), iPad Pro (1st Gen 9.7), Ipad Mini (1-4), IPad Air(1-2)  "],["810x1080","IPad 7-9th Gen"],["820x1180","iPad Air (4th gen)"],["834x1194","iPad Pro (3-5th Gen 11)"],["834x1112","iPad Air (3rd gen), iPad Pro (2nd gen 10.5)"],["1024x1366","iPad Pro (1-5th Gen 12.9)"]]),a=new Map([["Win32","Windows"],["Linux","Linux"],["MacIntel","Mac OS"]]),d=()=>{const e=window.navigator.userAgent.slice(window.navigator.userAgent.indexOf("Android")),n=e.slice(e.indexOf("; ")+1,e.indexOf(")"));return n?n.trim().split(" ")[0]:"Android"},s=()=>{const e=`${window.screen.width}x${window.screen.height}`,n=r.get(e);return n||"Iphone"},c=()=>{var o;let e;const n=((o=navigator==null?void 0:navigator.userAgentData)==null?void 0:o.platform)||(navigator==null?void 0:navigator.platform)||"unknown";return e=a.get(n)??"Unknown",e},l=()=>{let e="";return window.navigator.userAgent.toLowerCase().includes("mobi")?window.navigator.userAgent.includes("Android")?e=d():e=s():e=c(),e},h=e=>{const n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.select(),n.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(n)},u=async(e,n)=>{try{return await(await fetch(e,n)).json()}catch(o){alert("An error occured",o)}},x=e=>{let n=[],o=[];return e.forEach(t=>{o.includes(t.owned_by)||o.push(t.owned_by)}),o.forEach(t=>{n.push({owned:t,models:e.filter(i=>i.owned_by===t)})}),n};export{h as copyToClipboard,u as fetchJson,x as filterModels,l as getDeviceName};
