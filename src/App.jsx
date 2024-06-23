import { useState, useRef } from "react";
import { requestToGroq } from "./utils/groq";
import Header from "./components/Header/Header";
import Body from "./components/Body";
import InputMessage from "./components/InputMessage";
import useOnlineStatus from "./hooks/getOnlineStatus";
import "./App.css";
import Settings from "./components/Settings";

let tempMessages = [];

function App() {
  const [senTyping, setSenTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const online = useOnlineStatus();
  const endChat = useRef(null);
  const [showSenInfo, setShowSenInfo] = useState(false);
  const [showPP, setShowPP] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const defaultModel = localStorage.getItem("model")
    ? localStorage.getItem("model")
    : "llama3-8b-8192";
  const [model, setModel] = useState(defaultModel);
  const isDarkMode = localStorage.getItem("theme") === "dark" ? true : false;
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const scrollEndChat = () => {
    endChat.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (pesan.value.length === 0) return;
    if (senTyping) return;
    const message = pesan.value;
    pesan.value = "";
    setSenTyping(true);
    tempMessages.push(message);
    setMessages(tempMessages);
    let reply;
    if (online) reply = await requestToGroq(message, model);
    else reply = "Please check your internet connection...";
    tempMessages.push(reply);
    setMessages(tempMessages);
    setSenTyping(false);
    scrollEndChat();
  };

  const handleClearMessages = () => {
    tempMessages = [];
    setMessages([]);
  };

  const handleGearMenuClicked = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div>
      {showSettings ? (
        <Settings
          model={model}
          setModel={setModel}
          handleGearMenuClicked={handleGearMenuClicked}
        />
      ) : null}
      <Header
        senTyping={senTyping}
        handleClearMessages={handleClearMessages}
        showSenInfo={showSenInfo}
        setShowSenInfo={setShowSenInfo}
        showPP={showPP}
        setShowPP={setShowPP}
        handleGearMenuClicked={handleGearMenuClicked}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Body messages={messages} setMessages={setMessages} endChat={endChat} />
      <InputMessage
        handleSubmit={handleSubmit}
        showPP={showPP}
        showSenInfo={showSenInfo}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
