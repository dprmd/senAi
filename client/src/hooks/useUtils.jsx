import { useShallow } from "zustand/react/shallow";
import {
  useAppStore,
  useChatsStore,
  useHoldChatsStore,
  useSettingsStore,
} from "../store/appStore";
import { firstTimeHold, setFirstTimeHold } from "../store/appStore";
import useOnlineStatus from "./useOnlineStatus";

export const useClearHoldChats = () => {
  const [setHoldChats, stillHold, setStillHold, setTriggerClearHolding] =
    useHoldChatsStore(
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

export const useLongPress = ({ chat, holding, setHolding }) => {
  // hooks
  const [holdChats, setHoldChats, stillHold, setStillHold] = useHoldChatsStore(
    useShallow((state) => [
      state.holdChats,
      state.setHoldChats,
      state.stillHold,
      state.setStillHold,
    ]),
  );

  let isHolding;
  const handleLongPress = () => {
    if (isHolding && !stillHold) {
      setStillHold(true);
      setFirstTimeHold(true);
      setHoldChats([...holdChats, { time: chat.time, message: chat.message }]);
      setHolding(true);
    }
    isHolding = false;
  };
  const handleHoldStart = () => {
    if (!stillHold) {
      isHolding = true;
      setTimeout(() => {
        handleLongPress();
      }, 1000);
    }
  };
  const handleHoldEnd = () => {
    isHolding = false;
  };

  const handleClick = () => {
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
        setHoldChats([
          ...holdChats,
          { time: chat.time, message: chat.message },
        ]);
      }
      setFirstTimeHold(false);
    }
  };

  return { handleHoldStart, handleHoldEnd, handleClick };
};

export const useDeleteSomeChats = () => {
  const [chats, setChats] = useChatsStore(
    useShallow((state) => [state.chats, state.setChats]),
  );
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [holdChats] = useHoldChatsStore(
    useShallow((state) => [state.holdChats]),
  );
  const clearHoldChats = useClearHoldChats();

  const handleDeleteSomeChats = async () => {
    let deletedSelectedChats = chats.slice();
    for (let i = 0; i < holdChats.length; i++) {
      let tempDeletedSelectedChats = deletedSelectedChats.filter(
        (chat) => chat.time !== holdChats[i].time,
      );
      deletedSelectedChats = tempDeletedSelectedChats;
    }

    const { deleteSomeChatsInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );
    const { setTempChats } = await import("@/store/appStore");

    deleteSomeChatsInFirestore(userId, deletedSelectedChats);
    setChats(deletedSelectedChats);
    setTempChats(deletedSelectedChats);
    clearHoldChats();
  };

  return handleDeleteSomeChats;
};

export const useDeleteAllChats = () => {
  const online = useOnlineStatus();
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [setChats] = useChatsStore(useShallow((state) => [state.setChats]));

  const deleteAllChats = async () => {
    const { deleteAllChatsInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );
    const { resetTempChats } = await import("@/store/appStore");
    if (online) {
      deleteAllChatsInFirestore(userId);
    }
    resetTempChats();
    setChats([]);
  };

  return deleteAllChats;
};

export const useSenAiPageFetch = () => {
  const [userId, setUserId, setLoadingMessages] = useAppStore(
    useShallow((state) => [
      state.userId,
      state.setUserId,
      state.setLoadingMessages,
    ]),
  );
  const [setChats] = useChatsStore(useShallow((state) => [state.setChats]));

  const senAiPageFetch = async () => {
    try {
      const { addNewUserToFirestoreIfNotExists, uploadSeenHistory } =
        await import("@/controller/CRUDFirestore");
      const { getAllChatsFromFirestoreAndSetToTempChats } = await import(
        "@/store/appStore"
      );

      const generatedUserId = await addNewUserToFirestoreIfNotExists();
      localStorage.setItem("senAi-userId", generatedUserId);
      setUserId(generatedUserId);

      const [chats] = await Promise.all([
        getAllChatsFromFirestoreAndSetToTempChats(generatedUserId),
        uploadSeenHistory(generatedUserId),
      ]);

      setChats(chats);
      setLoadingMessages(false);
    } catch (error) {
      console.log("An error occured : ", error);
    }

    const compareUserId = localStorage.getItem("senAi-userId") === userId;
    if (!compareUserId) setUserId(localStorage.getItem("senAi-userId"));
  };

  return senAiPageFetch;
};

export const useEscClicked = () => {
  const clearHoldChats = useClearHoldChats();

  const escClicked = (e) => {
    if (e.keyCode === 27) {
      clearHoldChats();
    }
  };
  return escClicked;
};

export const useSwitchTheme = () => {
  const [darkMode, setDarkMode] = useSettingsStore(
    useShallow((state) => [state.darkMode, state.setDarkMode]),
  );

  const switchTheme = () => {
    if (darkMode) {
      localStorage.setItem("senAi-theme", "light");
      setDarkMode(false);
    } else {
      localStorage.setItem("senAi-theme", "dark");
      setDarkMode(true);
    }
  };

  return switchTheme;
};
