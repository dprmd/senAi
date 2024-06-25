import { useEffect, useState } from "react";
import ProfilePhoto from "./ProfilePhoto";
import SenStatus from "./SenStatus";
import AskBox from "../AskBox/AskBox";

export default function Header({
  senTyping,
  handleClearMessages,
  showSenInfo,
  setShowSenInfo,
  showPP,
  setShowPP,
  handleGearMenuClicked,
  darkMode,
  setDarkMode,
  showAskBoxWhenClearMessages,
  setShowAskBoxWhenClearMessages,
}) {
  const whenClearMessageIsTrue = () => {
    handleClearMessages();
  };

  const handleClearMessagesInThisComponent = () => {
    setShowAskBoxWhenClearMessages(true);
  };

  const handleSwitchTheme = () => {
    if (darkMode) {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
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
          whenTrue={whenClearMessageIsTrue}
          setShowAskBox={setShowAskBoxWhenClearMessages}
        />
      )}
      <div className="flex items-center flex-1">
        <ProfilePhoto showPP={showPP} setShowPP={setShowPP} />
        <SenStatus
          senTyping={senTyping}
          showSenInfo={showSenInfo}
          setShowSenInfo={setShowSenInfo}
        />
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
