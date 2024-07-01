import { useEffect } from "react";
import ProfilePhoto from "./ProfilePhoto";
import SenStatus from "./SenStatus";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../../store/appStore";
import ClearMessagesButton from "./ClearMessagesButton";

export default function Header() {
  // zustand appStore
  const [darkMode, setDarkMode, showSettings, setShowSettings] = useAppStore(
    useShallow((state) => [
      state.darkMode,
      state.setDarkMode,
      state.showSettings,
      state.setShowSettings,
    ]),
  );

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
    <header className="simetris sticky top-0 flex items-center justify-between bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100">
      <div className="flex flex-1 items-center">
        <ProfilePhoto />
        <SenStatus />
      </div>
      <div>
        <ClearMessagesButton />
        {darkMode ? (
          <button
            className="bi bi-moon-stars-fill fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
            onClick={handleSwitchTheme}
          ></button>
        ) : (
          <button
            className="bi bi-brightness-high-fill fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
            onClick={handleSwitchTheme}
          ></button>
        )}
        <button
          className="bi bi-gear-fill fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
          onClick={handleGearMenuClicked}
        ></button>
      </div>
    </header>
  );
}
