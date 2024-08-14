import { getLS } from "@/lib/myUtils";
import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  // Fetch Data
  shouldGetName: true,
  setShouldGetName: (shouldGetName) => set({ shouldGetName }),
  shouldCheckAUser: true,
  setShouldCheckAUser: (shouldCheckAUser) => set({ shouldCheckAUser }),
  bodyComponentDidFetch: false,
  setBodyComponentDidFetch: (bodyComponentDidFetch) =>
    set({ bodyComponentDidFetch }),

  // Message Input and Loading
  messageFromUser: "",
  setMessageFromUser: (messageFromUser) => set({ messageFromUser }),
  loadingMessages: true,
  setLoadingMessages: (loadingMessages) => set({ loadingMessages }),

  // Header State
  senTyping: false,
  setSenTyping: (senTyping) => set({ senTyping }),
  showSenInfo: false,
  setShowSenInfo: (showSenInfo) => set({ showSenInfo }),
  showPP: false,
  setShowPP: (showPP) => set({ showPP }),
  userId: getLS("senAi-userId"),

  // User Id
  setUserId: (userId) => set({ userId }),
  getUserId: () => {
    return get().userId;
  },

  // Loading
  groqFetchProses: "wait",
  setGroqFetchProses: (groqFetchProses) => set({ groqFetchProses }),
}));
