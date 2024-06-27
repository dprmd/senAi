import { create } from "zustand";

export let tempMessages = [];
export const resetTempMessages = () => {
  tempMessages = [];
};
export const addToTempMessages = (message) => {
  tempMessages.push(message);
};

export const useAppStore = create((set) => ({
  // tempMessages: [],
  // resetTempMessages: () => set({ tempMessages: [] }),
  // pushTempMessages: (newMessage) =>
  //   set((state) => ({ tempMessages: [...state.tempMessages, newMessage] })),
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
  showSettings: false,
  setShowSettings: (showSettings) => set({ showSettings }),
  model: localStorage.getItem("model")
    ? localStorage.getItem("model")
    : "llama3-8b-8192",
  setModel: (model) => set({ model }),
  darkMode: localStorage.getItem("theme") === "dark" ? true : false,
  setDarkMode: (darkMode) => set({ darkMode }),
}));
