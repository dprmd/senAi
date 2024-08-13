import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  shouldGetName: true,
  setShouldGetName: (shouldGetName) => set({ shouldGetName }),
  shouldCheckAUser: true,
  setShouldCheckAUser: (shouldCheckAUser) => set({ shouldCheckAUser }),
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
  getUserId: () => {
    return get().userId;
  },
  groqFetchProses: "wait",
  setGroqFetchProses: (groqFetchProses) => set({ groqFetchProses }),
  isCaptureCamera: false,
  setIsCaptureCamera: (isCaptureCamera) => set({ isCaptureCamera }),
}));
