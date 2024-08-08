import { create } from "zustand";

export const useSettingsStore = create((set) => ({
  botLanguage: localStorage.getItem("senAi-botLanguage")
    ? localStorage.getItem("senAi-botLanguage")
    : "Auto",
  setBotLanguage: (botLanguage) => set({ botLanguage }),
  language: localStorage.getItem("senAi-language")
    ? localStorage.getItem("senAi-language")
    : "en",
  setLanguage: (language) => set({ language }),
  languageLabel: localStorage.getItem("senAi-languageLabel")
    ? localStorage.getItem("senAi-languageLabel")
    : "English",
  setLanguageLabel: (languageLabel) => set({ languageLabel }),
  user: localStorage.getItem("senAi-user")
    ? localStorage.getItem("senAi-user")
    : "0",
  setUser: (user) => set({ user }),
  enterIsSend: localStorage.getItem("senAi-enterIsSend")
    ? localStorage.getItem("senAi-enterIsSend")
    : "no",
  setEnterIsSend: (enterIsSend) => set({ enterIsSend }),
  currentModels: [],
  setCurrentModels: (currentModels) => set({ currentModels }),
  settingsComponentDidFetch: false,
  setSettingsComponentDidFetch: (settingsComponentDidFetch) =>
    set({ settingsComponentDidFetch }),
  settingModelComponentDidFetch: false,
  setSettingModelComponentDidFetch: (settingModelComponentDidFetch) =>
    set({ settingModelComponentDidFetch }),
  name: "Loading...",
  setName: (name) => set({ name }),
  oldName: "Loading...",
  setOldName: (oldName) => set({ oldName }),
  model: localStorage.getItem("senAi-model")
    ? localStorage.getItem("senAi-model")
    : "gemma2-9b-it",
  setModel: (model) => set({ model }),
  darkMode: localStorage.getItem("senAi-theme") === "dark" ? true : false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
