import { useAppStore } from "@/store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { useShallow } from "zustand/react/shallow";
import { useClearHoldChats } from "../HoldChats/useClearHoldChats";

export const useDeleteSomeChats = () => {
  const [chats, setChats, setChatsMemory] = useChatsStore(
    useShallow((state) => [state.chats, state.setChats, state.setChatsMemory]),
  );
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [holdChats] = useChatsStore(useShallow((state) => [state.holdChats]));
  const clearHoldChats = useClearHoldChats();

  const handleDeleteSomeChats = async () => {
    let filteredSelectedChats = chats.slice();

    for (let i = 0; i < holdChats.length; i++) {
      let tempFilteredSelectedChats = filteredSelectedChats.filter(
        (chat) => chat.time !== holdChats[i].time,
      );
      filteredSelectedChats = tempFilteredSelectedChats;
    }

    const chatsMemoryNew = filteredSelectedChats.map((chat) => ({
      role: chat.position === "right" ? "user" : "assistant",
      content: chat.message,
    }));
    setChatsMemory(chatsMemoryNew);

    const { deleteSomeChatsInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );

    deleteSomeChatsInFirestore(userId, filteredSelectedChats, holdChats);
    setChats(filteredSelectedChats);
    clearHoldChats();
  };

  return handleDeleteSomeChats;
};
