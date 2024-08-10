import{_ as y}from"./pnpm-react-syntax-highlighter@15.5.0_react@18.3.1--DZvnRHEN.js";import{f as h,a as g,b as f,c as w,d as S,e as T,g as I,h as N,i as E,j as A,k as P,l as C}from"./src-controller-serverSource.js-Cl8oyjhr.js";import{fetchJson as a,resetLocalStorage as O}from"./src-lib-myUtils.js-dn8px5wY.js";import"./pnpm-react@18.3.1--FUz9cRTN.js";import"./pnpm-@babel_runtime@7.25.0--CyFcdsuD.js";import"./pnpm-refractor@3.6.0--CXVGWoH1.js";import"./pnpm-hastscript@6.0.0--DUsoOKIx.js";import"./pnpm-property-information@5.6.0--BaUulPWZ.js";import"./pnpm-xtend@4.0.2--CeaPpq3n.js";import"./pnpm-space-separated-tokens@1.1.5--CMBzgJJ4.js";import"./pnpm-comma-separated-tokens@1.0.8--DgTuumFk.js";import"./pnpm-hast-util-parse-selector@2.2.5--Cqsfuk9Y.js";import"./pnpm-parse-entities@2.0.0--Cz6FRF7l.js";import"./pnpm-character-entities-legacy@1.1.4--BW45UVHJ.js";import"./pnpm-character-reference-invalid@1.1.4--AKrgFUtc.js";import"./pnpm-is-decimal@1.0.4--Dxw1ZLrO.js";import"./pnpm-is-hexadecimal@1.0.4--Bc6OsCR9.js";import"./pnpm-is-alphanumerical@1.0.4--VupdbT_8.js";import"./pnpm-is-alphabetical@1.0.4--BlcIJk-E.js";import"./pnpm-prismjs@1.27.0--l2mXeTxv.js";const m=async()=>{if(localStorage.getItem("senAi-userId"))return localStorage.getItem("senAi-userId");{O();const{getDeviceName:o}=await y(async()=>{const{getDeviceName:u}=await import("./src-lib-myUtils.js-dn8px5wY.js");return{getDeviceName:u}},[]),{generateTimeNow:e}=await y(async()=>{const{generateTimeNow:u}=await import("./src-lib-generateTime.js-DFXwsD9v.js");return{generateTimeNow:u}},[]),t=o(),{day:s,monthName:n,year:r,hour:i,minute:c,second:p}=e(),d=`${s} ${n} ${r} , ${i}:${c}:${p}`,l=await a(f,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({deviceName:t,lastSeen:d})});if(l.status===201)return l.newUserId;console.log(l)}},D=async o=>{const e=await a(I,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o})});if(e.status===200)return{chats:e.chats,newUserId:o};if(e.status===404){localStorage.removeItem("senAi-userId");const t=await m();return localStorage.setItem("senAi-userId",t),await D(t)}else console.log(e)},Y=async o=>{const e=await a(N,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o})});if(e.status===200)return e.chatsMemory;console.log(e)},_=async(o,e,t)=>{const s=await a(A,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,newChatFromUser:e,newChatFromAi:t})});if(s.status!==201)if(s.status===404){localStorage.removeItem("senAi-userId");const n=await m();return localStorage.setItem("senAi-userId",n),await _(n,e,t)}else console.log(s)},Z=async(o,e)=>{const t=await a(h,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,chats:e})});t.status!==202&&console.log(t)},ee=async(o,e,t)=>{const s=await a(g,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,someChatsNew:e,someChatsDeleted:t})});s.status!==202&&console.log(s)},b=async o=>{const e=await a(w,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o})});if(e.status===200)return{name:e.name,userId:o};if(e.status===404){localStorage.removeItem("senAi-userId");const t=await m();return localStorage.setItem("senAi-userId",t),await b(t)}else console.log(e)},$=async(o,e)=>{const t=await a(P,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,newName:e})});if(t.status===202)return t;if(t.status===404){localStorage.removeItem("senAi-userId");const s=await m();return localStorage.setItem("senAi-userId",s),await $(s,e)}else console.log(t)},te=async o=>{const{generateTimeNow:e}=await y(async()=>{const{generateTimeNow:l}=await import("./src-lib-generateTime.js-DFXwsD9v.js");return{generateTimeNow:l}},[]),{day:t,monthName:s,year:n,hour:r,minute:i,second:c}=e(),p=`${t} ${s} ${n} , ${r}:${i}:${c}`,d=await a(E,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,lastSeen:p})});d.status!==201&&console.log(d)},oe=async o=>{const e=await a(S,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({securityCode:o})});if(e.status===202||e.status===405)return e.allow;console.log(e)},se=async(o,e,t)=>{const s=await a(T,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:o,securityCode:e,option:t})});if(s.status===202){const{chats:n,backupChats:r,lastSeenHistory:i}=s.whichDelete;return`${n?"chats ,":""} ${r?"backup chats":""} ${i?"and last seen history":""}`}else console.log(s)},ae=async o=>{const t=await(await fetch(C,{method:"POST",body:o})).json();if(t.status===201)return t;if(t.status===500)return t.error};export{_ as addNewChatsToFirestore,m as addNewUserToFirestoreIfNotExists,ae as addNewVoiceChatToFireStorage,Z as deleteAllChatsInFirestore,se as deleteAllDataInFirestore,ee as deleteSomeChatsInFirestore,D as getAllChatsFromFirestore,Y as getAllChatsMemoryFromFirestore,b as getName,oe as getPermissionToDeleteAllData,$ as updateName,te as uploadSeenHistory};