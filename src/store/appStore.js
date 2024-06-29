import { create } from "zustand";

export let tempMessages = [];
export const resetTempMessages = () => {
  tempMessages = [];
};
export const addToTempMessages = (message) => {
  tempMessages.push(message);
};

export const useAppStore = create((set) => ({
  senTyping: false,
  setSenTyping: (senTyping) => set({ senTyping }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  showSenInfo: false,
  setShowSenInfo: (showSenInfo) => set({ showSenInfo }),
  showPP: false,
  setShowPP: (showPP) => set({ showPP }),
  showAskBoxWhenClearMessages: false,
  setShowAskBoxWhenClearMessages: (showAskBoxWhenClearMessages) =>
    set({ showAskBoxWhenClearMessages }),
  showAskBoxWhenApiKeyChanged: false,
  setShowAskBoxWhenApiKeyChanged: (showAskBoxWhenApiKeyChanged) =>
    set({ showAskBoxWhenApiKeyChanged }),
  showSettings: false,
  setShowSettings: (showSettings) => set({ showSettings }),
  model: localStorage.getItem("senAi-model")
    ? localStorage.getItem("senAi-model")
    : "llama3-8b-8192",
  setModel: (model) => set({ model }),
  role: localStorage.getItem("senAi-role")
    ? localStorage.getItem("senAi-role")
    : "user",
  setRole: (role) => set({ role }),
  darkMode: localStorage.getItem("senAi-theme") === "dark" ? true : false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
