import { useEffect } from "react";
import ProfilePhoto from "./ProfilePhoto";
import SenStatus from "./SenStatus";
import AskBox from "../AskBox/AskBox";
import { useShallow } from "zustand/react/shallow";
import { useAppStore, resetTempMessages } from "../../store/appStore";

export default function Header() {
  // zustand appStore
  const [
    messages,
    darkMode,
    setDarkMode,
    showAskBoxWhenClearMessages,
    setShowAskBoxWhenClearMessages,
    setMessages,
    showSettings,
    setShowSettings,
  ] = useAppStore(
    useShallow((state) => [
      state.messages,
      state.darkMode,
      state.setDarkMode,
      state.showAskBoxWhenClearMessages,
      state.setShowAskBoxWhenClearMessages,
      state.setMessages,
      state.showSettings,
      state.setShowSettings,
    ])
  );

  const handleClearMessages = () => {
    resetTempMessages();
    setMessages([]);
  };

  const handleClearMessagesInThisComponent = () => {
    if (messages.length > 0) {
      setShowAskBoxWhenClearMessages(true);
    }
    return;
  };

  const handleSwitchTheme = () => {
    if (darkMode) {
      localStorage.setItem("senAi-theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("senAi-theme", "dark");
      setDarkMode(true);
    }
  };

  const handleGearMenuClicked = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between simetris border-b border-b-slate-300 dark:border-b-slate-600 sticky top-0 bg-colorLight text-slate-900 dark:bg-colorDark dark:text-slate-100">
      {showAskBoxWhenClearMessages && (
        <AskBox
          message={"do you want to delete all messages ?"}
          whenOkClicked={handleClearMessages}
          setShowAskBox={setShowAskBoxWhenClearMessages}
        />
      )}
      <div className="flex items-center flex-1">
        <ProfilePhoto />
        <SenStatus />
      </div>
      <div>
        <button
          className="bi bi-trash3-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
          onClick={handleClearMessagesInThisComponent}
        ></button>
        {darkMode ? (
          <button
            className="bi bi-moon-stars-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
            onClick={handleSwitchTheme}
          ></button>
        ) : (
          <button
            className="bi bi-brightness-high-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
            onClick={handleSwitchTheme}
          ></button>
        )}
        <button
          className="bi bi-gear-fill px-3 py-1 text-slate-900 fill-current dark:text-slate-300"
          onClick={handleGearMenuClicked}
        ></button>
      </div>
    </header>
  );
}
