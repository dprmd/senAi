import { create } from "zustand";

// Holding ChatBubble
export let firstTimeHold = false;
export const setFirstTimeHold = (value) => {
  firstTimeHold = value;
};

export const useChatsStore = create((set, get) => ({
  chats: [],
  setChats: (chats) => set({ chats }),
  getChats: () => {
    return get().chats;
  },
  holdChats: [],
  setHoldChats: (holdChats) => set({ holdChats }),
  stillHold: false,
  setStillHold: (stillHold) => set({ stillHold }),
  triggerClearHolding: 0,
  setTriggerClearHolding: () =>
    set({ triggerClearHolding: new Date().getTime() }),
}));
