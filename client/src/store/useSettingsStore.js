import { checkLS, getLS } from "@/lib/myUtils";
import { create } from "zustand";
import defaultState from "./defaultState.json";

export const useSettingsStore = create((set) => ({
  // PROFILE PHOTO
  loadingCompressImage: false,
  setLoadingCompressImage: (loadingCompressImage) =>
    set({ loadingCompressImage }),
  loadingUploadImage: false,
  setLoadingUploadImage: (loadingUploadImage) => set({ loadingUploadImage }),
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

  // NAME
  name: "Loading...",
  setName: (name) => set({ name }),
  oldName: "Loading...",
  setOldName: (oldName) => set({ oldName }),

  // USER
  user: checkLS("senAi-user") ? getLS("senAi-user") : "0",
  setUser: (user) => set({ user }),

  // MODEL
  model: checkLS("senAi-model") ? getLS("senAi-model") : defaultState.model,
  setModel: (model) => set({ model }),
  currentModels: [],
  setCurrentModels: (currentModels) => set({ currentModels }),

  // LANGUAGE
  language: checkLS("senAi-language")
    ? getLS("senAi-language")
    : defaultState.language,
  setLanguage: (language) => set({ language }),
  languageLabel: checkLS("senAi-languageLabel")
    ? getLS("senAi-languageLabel")
    : defaultState.languageLabel,
  setLanguageLabel: (languageLabel) => set({ languageLabel }),
  botLanguage: checkLS("senAi-botLanguage")
    ? getLS("senAi-botLanguage")
    : defaultState.botLanguage,
  setBotLanguage: (botLanguage) => set({ botLanguage }),

  // Enter is Send
  enterIsSend: checkLS("senAi-enterIsSend")
    ? getLS("senAi-enterIsSend")
    : defaultState.enterIsSend,
  setEnterIsSend: (enterIsSend) => set({ enterIsSend }),

  // Fetch Page
  settingsComponentDidFetch: false,
  setSettingsComponentDidFetch: (settingsComponentDidFetch) =>
    set({ settingsComponentDidFetch }),
  settingModelComponentDidFetch: false,
  setSettingModelComponentDidFetch: (settingModelComponentDidFetch) =>
    set({ settingModelComponentDidFetch }),

  // Dark Mode
  darkMode: getLS("senAi-theme") === "dark" ? true : false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
