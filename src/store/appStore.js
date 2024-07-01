import { create } from "zustand";
import { getAllMessagesFromFirestore } from "./CRUDFirestore";

export let tempMessages = [];
export const resetTempMessages = () => {
  tempMessages = [];
};
export const addToTempMessages = (message) => {
  tempMessages.push(message);
};
export const getAllMessagesFromFirestoreAndSetToTempMessages = async (
  userId,
) => {
  const { messages } = await getAllMessagesFromFirestore(userId);
  tempMessages = messages;
  return messages;
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
  userId: "",
  setUserId: (userId) => set({ userId }),
}));
