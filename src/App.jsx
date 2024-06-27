import { useRef } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body";
import InputMessage from "./components/InputMessage";
import "./App.css";
import Settings from "./components/Settings";
import { useAppStore } from "./Store/appStore";

function App() {
  const showSettings = useAppStore((state) => state.showSettings);
  const endChat = useRef(null);

  const scrollEndChat = () => {
    endChat.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {showSettings ? <Settings /> : null}
      <Header />
      <Body endChat={endChat} />
      <InputMessage scrollEndChat={scrollEndChat} />
    </div>
  );
}

export default App;
