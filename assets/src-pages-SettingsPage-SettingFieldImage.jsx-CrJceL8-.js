const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/src-controller-CRUDFirestore.js-C93yip-y.js","assets/pnpm-react-syntax-highlighter@15.5.0_react@18.3.1--DZvnRHEN.js","assets/pnpm-react@18.3.1--FUz9cRTN.js","assets/pnpm-@babel_runtime@7.25.0--CyFcdsuD.js","assets/pnpm-refractor@3.6.0--CXVGWoH1.js","assets/pnpm-hastscript@6.0.0--DUsoOKIx.js","assets/pnpm-property-information@5.6.0--BaUulPWZ.js","assets/pnpm-xtend@4.0.2--CeaPpq3n.js","assets/pnpm-space-separated-tokens@1.1.5--CMBzgJJ4.js","assets/pnpm-comma-separated-tokens@1.0.8--DgTuumFk.js","assets/pnpm-hast-util-parse-selector@2.2.5--Cqsfuk9Y.js","assets/pnpm-parse-entities@2.0.0--Cz6FRF7l.js","assets/pnpm-character-entities-legacy@1.1.4--BW45UVHJ.js","assets/pnpm-character-reference-invalid@1.1.4--AKrgFUtc.js","assets/pnpm-is-decimal@1.0.4--Dxw1ZLrO.js","assets/pnpm-is-hexadecimal@1.0.4--Bc6OsCR9.js","assets/pnpm-is-alphanumerical@1.0.4--VupdbT_8.js","assets/pnpm-is-alphabetical@1.0.4--BlcIJk-E.js","assets/pnpm-prismjs@1.27.0--l2mXeTxv.js","assets/src-components-ui-use-toast.js-w7cDmHIs.js","assets/pnpm-i18next@23.12.2--B7JNKktp.js","assets/src-lib-myUtils.js-B3UxZQ32.js","assets/src-controller-serverSource.js-CoR-J6Fc.js"])))=>i.map(i=>d[i]);
import{_ as B}from"./pnpm-react-syntax-highlighter@15.5.0_react@18.3.1--DZvnRHEN.js";import{r as a,j as e}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{D as n}from"./src-components-svg-DynamicSvg.jsx-BEJwgHYB.js";import{t as P}from"./src-components-ui-use-toast.js-w7cDmHIs.js";import{b as G}from"./src-hooks-useUtils.js-DMn2OGr4.js";import{u as J}from"./src-store-appStore.js-DVH2ouBA.js";import{u as K}from"./src-store-useSettingsStore.js-DLV1m-Pv.js";import{u as j}from"./pnpm-zustand@4.5.4_@types_react@18.3.3_react@18.3.1--EhdkWrrw.js";import{A as Q}from"./src-components-composable-AlertDialogNormal.jsx-DPBkAuDY.js";import{S as W}from"./src-components-ui-skeleton.jsx-DNL_RBFp.js";import{A as v,a as w,b as k,c as X,d as C,e as Y}from"./src-components-ui-alert-dialog.jsx-BydoaKMR.js";import{u as Z}from"./pnpm-react-i18next@15.0.1_i18next@23.12.2_react-dom@18.3.1_react@18.3.1__react@18.3.1--C-fP4VmU.js";import{a as $}from"./pnpm-react-router@6.26.0_react@18.3.1--BYg1aRBq.js";const ge=()=>{const[c,m,o,b,y,I,N,S]=K(j(t=>[t.setImageFile,t.setHaveSelectImageFile,t.profilePhotoUrl,t.setProfilePhotoUrl,t.customProfilePhotoUrl,t.setCustomProfilePhotoUrl,t.customPPFileName,t.setCustomPPFileName])),[F]=J(j(t=>[t.userId])),{t:l}=Z(),d=$(),D=G(),[A,u]=a.useState(!1),U=localStorage.getItem("senAi-love")?localStorage.getItem("senAi-love"):"no",[p,g]=a.useState(U==="yes"),x=a.useRef(null),f=a.useRef(null),[_,r]=a.useState(!1),[L,i]=a.useState(!1),[E,T]=a.useState(!1),O=async()=>{f.current.click()},R=()=>{x.current.click()},H=async t=>{const s=t.target.files[0];s&&(c(s),m(!0),r(!1),d("/settings/cropImage"))},z=async t=>{const s=t.target.files[0];s&&(s.type==="image/png"||s.type==="image/jpeg")?(c(s),m(!0),r(!1),d("/settings/cropImage")):P({description:l("image_format_wrong"),duration:4e3,variant:"destructive"})},h=()=>{p?localStorage.setItem("senAi-love","no"):localStorage.setItem("senAi-love","yes"),g(t=>!t)},M=async()=>{const{deletePPInFireStorage:t,updatePPUrlInFirestore:s}=await B(async()=>{const{deletePPInFireStorage:V,updatePPUrlInFirestore:q}=await import("./src-controller-CRUDFirestore.js-C93yip-y.js");return{deletePPInFireStorage:V,updatePPUrlInFirestore:q}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]));await t(N),await s(F,"img/haku.jpeg","",!1)&&(I(!1),S(""),i(!1),b("img/haku.jpeg"),localStorage.setItem("senAi-love","no"),g(!1),P({description:l("deleted_pp"),duration:3e3}))};return a.useEffect(()=>{const t=new Image;return t.src=o,t.addEventListener("load",()=>{T(!0)}),()=>{t.removeEventListener("load",()=>{})}},[]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex items-center justify-center py-5",children:e.jsxs("div",{className:"relative rounded-full",children:[E?e.jsx("img",{src:o,className:"h-full max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] rounded-full",alt:"Profile Photo",loading:"lazy",onClick:()=>{i(!0)},"aria-hidden":!0}):e.jsx(W,{className:"h-full max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] rounded-full"}),e.jsx("button",{className:"absolute bottom-4 right-0 rounded-full bg-green-600 p-2 dark:bg-green-400",onClick:()=>{r(!0)},children:e.jsx(n,{name:"Camera",className:"h-5 w-5 text-slate-100 dark:text-slate-900"})})]})}),e.jsx(v,{open:_,children:e.jsxs(w,{className:"top-[100%] w-full translate-y-[-100%] rounded-none rounded-t-xl sm:top-[50%] sm:translate-y-[-50%] sm:rounded-xl",onClickOverlay:()=>{r(!1)},children:[e.jsxs(k,{children:[e.jsx(X,{className:"mb-6 text-left font-bold",children:l("profile_photo")}),e.jsx(C,{children:e.jsxs("div",{className:"flex items-center gap-x-6 pb-6",children:[D&&e.jsxs("div",{className:"flex min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-1 duration-300 active:bg-green-200 dark:active:bg-green-700",onClick:O,"aria-hidden":!0,children:[e.jsx("div",{children:e.jsx(n,{name:"Camera",className:"h-7 w-7 font-bold text-green-400 dark:text-green-600"})}),e.jsx("p",{children:"Camera"}),e.jsx("input",{ref:f,type:"file",accept:"image/*",capture:"environment",onChange:H,style:{display:"none"},id:"cameraInput"})]}),e.jsxs("div",{className:"flex min-w-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-1 duration-300 active:bg-green-200 dark:active:bg-green-700",onClick:()=>{R()},"aria-hidden":!0,children:[e.jsx("div",{children:e.jsx(n,{name:"CardImage",className:"h-7 w-7 font-bold text-green-400 dark:text-green-600"})}),e.jsx("p",{children:"Files"}),e.jsx("input",{type:"file",ref:x,style:{display:"none"},accept:".png, .jpg, .jpeg",onChange:z})]})]})})]}),e.jsx(Y,{})]})}),e.jsx(Q,{openState:A,setOpenState:u,showTitle:!1,showDescription:!0,description:l("delete_pp"),centerDescription:!0,showCancel:!0,cancelTitle:l("cancel"),showContinue:!0,continueTitle:l("continue"),handleContinue:M}),e.jsx(v,{open:L,children:e.jsx(w,{className:"h-[300px] w-[300px] rounded-none p-0",onClickOverlay:()=>{i(!1)},children:e.jsx(k,{children:e.jsxs(C,{children:[e.jsx("img",{src:o,alt:"",className:"h-[300px] w-[300px]",loading:"lazy"}),e.jsxs("div",{className:"flex w-full items-center justify-center gap-x-4 rounded-b-xl bg-slate-100 py-2 dark:bg-slate-800",children:[p?e.jsx("button",{onClick:h,className:"inline-block min-h-8 min-w-8",children:e.jsx(n,{name:"HeartFill",className:"h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"})}):e.jsx("button",{onClick:h,className:"inline-block min-h-8 min-w-8",children:e.jsx(n,{name:"Heart",className:"h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"})}),y&&e.jsx("button",{onClick:()=>{u(!0)},children:e.jsx(n,{name:"Trash3",className:"h-6 w-6 animate-small-to-big text-green-400 dark:text-green-600"})})]})]})})})})]})};export{ge as S};