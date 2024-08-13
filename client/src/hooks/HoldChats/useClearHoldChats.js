import { useChatsStore } from "@/store/useChatsStore";
import { useShallow } from "zustand/react/shallow";

export const useClearHoldChats = () => {
  const [setHoldChats, stillHold, setStillHold, setTriggerClearHolding] =
    useChatsStore(
      useShallow((state) => [
        state.setHoldChats,
        state.stillHold,
        state.setStillHold,
        state.setTriggerClearHolding,
      ]),
    );

  const clearHoldChats = () => {
    if (stillHold) {
      setStillHold(false);
      setHoldChats([]);
      setTriggerClearHolding();
    } else {
      return;
    }
  };

  return clearHoldChats;
};
