import { useState, useRef } from "react";
import { requestToGroq } from "./utils/groq";
import Header from "./components/Header/Header";
import Body from "./components/Body";
import InputMessage from "./components/InputMessage";
import useOnlineStatus from "./hooks/getOnlineStatus";
import "./App.css";

let tempMessages = [];

function App() {
  const [senTyping, setSenTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const online = useOnlineStatus();
  const endChat = useRef(null);
  const [showSenInfo, setShowSenInfo] = useState(false);
  const [showPP, setShowPP] = useState(false);

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
    if (online) reply = await requestToGroq(message);
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

  return (
    <div>
      <Header
        senTyping={senTyping}
        handleClearMessages={handleClearMessages}
        showSenInfo={showSenInfo}
        setShowSenInfo={setShowSenInfo}
        showPP={showPP}
        setShowPP={setShowPP}
      />
      <Body messages={messages} setMessages={setMessages} endChat={endChat} />
      <InputMessage
        handleSubmit={handleSubmit}
        showPP={showPP}
        showSenInfo={showSenInfo}
      />
    </div>
  );
}

export default App;
