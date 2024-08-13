import { useAppStore } from "@/store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { useShallow } from "zustand/react/shallow";
import useOnlineStatus from "../useOnlineStatus";

export const useDeleteAllChats = () => {
  const online = useOnlineStatus();
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [chats, setChats, setChatsMemory] = useChatsStore(
    useShallow((state) => [state.chats, state.setChats, state.setChatsMemory]),
  );

  const deleteAllChats = async () => {
    const { deleteAllChatsInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );
    if (online) {
      deleteAllChatsInFirestore(userId, chats);
    }
    setChats([]);
    setChatsMemory([]);
  };

  return deleteAllChats;
};
