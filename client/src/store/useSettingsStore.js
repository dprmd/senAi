import { create } from "zustand";
import defaultState from "./defaultState.json";

export const useSettingsStore = create((set) => ({
  customPPFileName: "",
  setCustomPPFileName: (customPPFileName) => set({ customPPFileName }),
  customProfilePhotoUrl: false,
  setCustomProfilePhotoUrl: (customProfilePhotoUrl) =>
    set({ customProfilePhotoUrl }),
  profilePhotoUrl: "",
  setProfilePhotoUrl: (profilePhotoUrl) => set({ profilePhotoUrl }),
  imageFile: "",
  setImageFile: (imageFile) => set({ imageFile }),
  haveSelectImageFile: false,
  setHaveSelectImageFile: (haveSelectImageFile) => set({ haveSelectImageFile }),
  botLanguage: localStorage.getItem("senAi-botLanguage")
    ? localStorage.getItem("senAi-botLanguage")
    : defaultState.botLanguage,
  setBotLanguage: (botLanguage) => set({ botLanguage }),
  language: localStorage.getItem("senAi-language")
    ? localStorage.getItem("senAi-language")
    : defaultState.language,
  setLanguage: (language) => set({ language }),
  languageLabel: localStorage.getItem("senAi-languageLabel")
    ? localStorage.getItem("senAi-languageLabel")
    : defaultState.languageLabel,
  setLanguageLabel: (languageLabel) => set({ languageLabel }),
  user: localStorage.getItem("senAi-user")
    ? localStorage.getItem("senAi-user")
    : "0",
  setUser: (user) => set({ user }),
  enterIsSend: localStorage.getItem("senAi-enterIsSend")
    ? localStorage.getItem("senAi-enterIsSend")
    : defaultState.enterIsSend,
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
    : defaultState.model,
  setModel: (model) => set({ model }),
  darkMode: localStorage.getItem("senAi-theme") === "dark" ? true : false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
