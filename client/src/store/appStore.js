import { create } from "zustand";

// Holding ChatBubble
export let firstTimeHold = false;
export const setFirstTimeHold = (value) => {
  firstTimeHold = value;
};
export let stillHold = false;
export const setStillHold = (value) => {
  stillHold = value;
};

export const useChatsStore = create((set, get) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  getChats: () => {
    return get().chats;
  }
}));

export const useHoldChatsStore = create((set) => ({
  holdChats: [],
  setHoldChats: (holdChats) => set({ holdChats }),
  stillHold: false,
  setStillHold: (stillHold) => set({ stillHold }),
  triggerClearHolding: 0,
  setTriggerClearHolding: () =>
    set({ triggerClearHolding: new Date().getTime() }),
}));

export const useSettingsStore = create((set) => ({
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

export const useInputMessagesStore = create((set) => ({
  messageFromUser: "",
  setMessageFromUser: (messageFromUser) => set({ messageFromUser }),
}));

export const useAppStore = create((set) => ({
  bodyComponentDidFetch: false,
  setBodyComponentDidFetch: (bodyComponentDidFetch) =>
    set({ bodyComponentDidFetch }),
  loadingMessages: true,
  setLoadingMessages: (loadingMessages) => set({ loadingMessages }),
  senTyping: false,
  setSenTyping: (senTyping) => set({ senTyping }),
  showSenInfo: false,
  setShowSenInfo: (showSenInfo) => set({ showSenInfo }),
  showPP: false,
  setShowPP: (showPP) => set({ showPP }),
  userId: localStorage.getItem("senAi-userId"),
  setUserId: (userId) => set({ userId }),
}));
