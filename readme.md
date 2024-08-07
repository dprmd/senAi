## Sen Ai

sen ai is a chatbot that uses various models provided by **groq ai**, the front end is made with **react js**, the backend is made with **express js**, and the database uses **firebase**

you can see live production at https://dprmd.github.io/senAi

### Run Localy

#### configure front end and run it

- **edit server source** in `client/src/controller/serverSource`
  you can use the editor code you want, for my case i use visual studio code

` code client/src/controller/serverSource.js`

and edit serverSource variable

```
const serverSource =  "https://senaiserver-adi-permadis-projects.vercel.app";
// const serverSource = "http://192.168.43.228:5000";

export  const groqGetReplyEndPoint =
.....
```

If you run it on a local server, replace it with http://localhost:500, it will refer to the server running on your local computer, if you want to use a server that I have hosted, then you can skip this step

- **run vite server**

```
cd client
pnpm run dev
```

open http://localhost:5173/senAi in browser

#### configure back end and run it

You don't need to do this, if you didn't previously point serverSource to http://localhost:5000

to run local

```
cd server
pnpm run dev
```

### bugs to be fixed and fitur to be added

#### feat

- can send images with captions
- use langchain for conversational chat bots
- can change profile photos and chat wallpapers on the settings page

#### bugs

- bug when holding chat and scrolling at the same time on the mobile platform
