import { create } from "zustand";

export const useAppStore = create((set) => ({
  messageFromUser: "",
  setMessageFromUser: (messageFromUser) => set({ messageFromUser }),
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
  groqFetchProses: "wait",
  setGroqFetchProses: (groqFetchProses) => set({ groqFetchProses }),
}));
