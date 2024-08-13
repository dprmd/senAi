import {
  firstTimeHold,
  setFirstTimeHold,
  useChatsStore,
} from "@/store/useChatsStore";
import { useShallow } from "zustand/react/shallow";

export const useLongPressChat = ({ chat, holding, setHolding }) => {
  // zustand
  const [holdChats, setHoldChats, stillHold, setStillHold] = useChatsStore(
    useShallow((state) => [
      state.holdChats,
      state.setHoldChats,
      state.stillHold,
      state.setStillHold,
    ]),
  );

  let isHolding;
  const handleLongPressChat = () => {
    if (isHolding && !stillHold) {
      setStillHold(true);
      setFirstTimeHold(true);
      setHoldChats([...holdChats, chat]);
      setHolding(true);
    }
    isHolding = false;
  };
  const handleHoldChatStart = () => {
    if (!stillHold) {
      isHolding = true;
      setTimeout(() => {
        handleLongPressChat();
      }, 1000);
    }
  };
  const handleHoldChatEnd = () => {
    isHolding = false;
  };

  const handleClickHoldChat = () => {
    if (!stillHold) return;
    else {
      if (holding && !firstTimeHold) {
        setHolding(false);
        setHoldChats(
          [...holdChats].filter((holdChat) => holdChat.time !== chat.time),
        );
        if (holdChats.length === 1) {
          setStillHold(false);
        }
      }
      if (!holding) {
        setHolding(true);
        setHoldChats([...holdChats, chat]);
      }
      setFirstTimeHold(false);
    }
  };

  return { handleHoldChatStart, handleHoldChatEnd, handleClickHoldChat };
};
