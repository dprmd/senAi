import { getDeviceType } from "@/lib/myUtils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useClearHoldChats } from "./HoldChats/useClearHoldChats";

export const useEscClicked = () => {
  const clearHoldChats = useClearHoldChats();

  const escClicked = (e) => {
    if (e.keyCode === 27) {
      clearHoldChats();
    }
  };
  return escClicked;
};

export const useSwitchTheme = () => {
  const [darkMode, setDarkMode] = useSettingsStore(
    useShallow((state) => [state.darkMode, state.setDarkMode]),
  );

  const switchTheme = () => {
    if (darkMode) {
      localStorage.setItem("senAi-theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("senAi-theme", "dark");
      setDarkMode(true);
    }
  };

  return switchTheme;
};

export const useMobileDeviceType = () => {
  const deviceType = getDeviceType();
  const [isMobile] = useState(deviceType === "Android" || deviceType === "IOS");

  return isMobile;
};
