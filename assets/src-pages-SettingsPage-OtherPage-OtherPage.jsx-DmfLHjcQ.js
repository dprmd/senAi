import{r as m,j as e}from"./pnpm-react@18.3.1--FUz9cRTN.js";import{L as c}from"./pnpm-react-router-dom@6.26.0_react-dom@18.3.1_react@18.3.1__react@18.3.1--D-00O08K.js";import{u as x}from"./pnpm-zustand@4.5.4_@types_react@18.3.3_react@18.3.1--EhdkWrrw.js";import{u as g}from"./src-store-useSettingsStore.js-DcbE8_Af.js";import{S as h}from"./src-components-composable-SettingsTop.jsx-EcIuxh6L.js";import{S as o}from"./src-components-ui-switch.jsx-CzV6w1dA.js";import{B as f}from"./src-components-ui-button.jsx-DsJR5dHX.js";import{a as p}from"./pnpm-react-router@6.26.0_react@18.3.1--BYg1aRBq.js";import{u}from"./pnpm-react-i18next@15.0.1_i18next@23.12.2_react-dom@18.3.1_react@18.3.1__react@18.3.1--C-fP4VmU.js";import{m as j}from"./pnpm-framer-motion@11.3.22_react-dom@18.3.1_react@18.3.1__react@18.3.1--COr7I5SZ.js";const F=()=>{const[i,a,n,r]=g(x(t=>[t.enterIsSend,t.setEnterIsSend,t.darkMode,t.setDarkMode])),l=p(),{t:s}=u();return m.useEffect(()=>{const t=window.innerHeight,d=document.querySelector(".setting-other");d.style.minHeight=`${t-60}px`},[]),e.jsxs(j.div,{className:"bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100",initial:{opacity:0,transition:{duration:.2}},animate:{opacity:1,transition:{duration:.2}},exit:{opacity:0,transition:{duration:.2}},children:[e.jsx(h,{title:s("more_settings"),urlBack:"/settings"}),e.jsxs("main",{className:"setting-other flex flex-col justify-between px-6 py-5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("p",{className:"my-3 pr-3 text-sm font-medium",children:s("enter_is_send")}),e.jsx(o,{"aria-label":"enter is send toggle",checked:i==="yes",onCheckedChange:()=>{i==="yes"&&(localStorage.setItem("senAi-enterIsSend","no"),a("no")),i==="no"&&(localStorage.setItem("senAi-enterIsSend","yes"),a("yes"))}})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("p",{className:"my-3 pr-3 text-sm font-medium",id:"dark-mode-toggle",children:s("dark_mode")}),e.jsx(o,{checked:n,"aria-labelledby":"dark-mode-toggle",onCheckedChange:()=>{n&&(localStorage.setItem("senAi-theme","light"),r(!1)),n||(localStorage.setItem("senAi-theme","dark"),r(!0))}})]}),e.jsx("div",{className:"flex items-center justify-between",children:e.jsx(c,{to:"/settings/other/dependencies",className:"flex-1 py-3 pr-3 text-sm font-medium",id:"dark-mode-toggle",children:s("see_dependencies")})})]}),e.jsx("div",{className:"mt-4",children:e.jsx(f,{variant:"whatsapp",size:"sm",className:"w-full rounded-2xl text-sm",onClick:()=>{l("/settings/other/deleteAllData")},children:s("delete_all_data")})})]})]})};export{F as S};
