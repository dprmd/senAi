import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/appStore";
import { useChatsStore } from "../store/useChatsStore";
import { firstTimeHold, setFirstTimeHold } from "../store/useChatsStore";
import useOnlineStatus from "./useOnlineStatus";
import { useSettingsStore } from "@/store/useSettingsStore";
import { getDeviceType } from "@/lib/myUtils";

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

export const useLongPressChat = ({ chat, holding, setHolding }) => {
  // hooks
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

export const useSenAiPageFetch = () => {
  const [userId, setUserId, setLoadingMessages] = useAppStore(
    useShallow((state) => [
      state.userId,
      state.setUserId,
      state.setLoadingMessages,
    ]),
  );
  const [setChats, setChatsMemory] = useChatsStore(
    useShallow((state) => [state.setChats, state.setChatsMemory]),
  );
  const [setCustomPPFileName, setCustomProfilePhotoUrl, setProfilePhotoUrl] =
    useSettingsStore(
      useShallow((state) => [
        state.setCustomPPFileName,
        state.setCustomProfilePhotoUrl,
        state.setProfilePhotoUrl,
      ]),
    );

  const senAiPageFetch = async () => {
    try {
      const {
        addNewUserToFirestoreIfNotExists,
        uploadSeenHistory,
        getAllChatsFromFirestore,
        getAllChatsMemoryFromFirestore,
        getPPUrl,
      } = await import("@/controller/CRUDFirestore");

      const getUserId = await addNewUserToFirestoreIfNotExists();
      localStorage.setItem("senAi-userId", getUserId);
      setUserId(getUserId);

      const [gettedChats, gettedChatsMemory, PPInformation] = await Promise.all(
        [
          getAllChatsFromFirestore(getUserId),
          getAllChatsMemoryFromFirestore(getUserId),
          getPPUrl(getUserId),
          uploadSeenHistory(getUserId),
        ],
      );

      const { customPPUrl, PPUrl, PPFileName } = PPInformation;
      setCustomProfilePhotoUrl(customPPUrl);
      setProfilePhotoUrl(PPUrl);
      setCustomPPFileName(PPFileName);

      setChats(gettedChats);
      setChatsMemory(gettedChatsMemory);
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

export const useInstruction = () => {
  const [botLanguage] = useSettingsStore(
    useShallow((state) => [state.botLanguage]),
  );
  let instruction = "";

  if (botLanguage === "Auto") {
    instruction = "Please Answer Me";
  }
  if (botLanguage === "English") {
    instruction = "Please Answer Me In English Language";
  }
  if (botLanguage === "Indonesia") {
    instruction = "Please Answer Me In Informal Indonesian Language";
  }

  return instruction;
};

export const useMobileDeviceType = () => {
  const deviceType = getDeviceType();
  const [isMobile] = useState(deviceType === "Android" || deviceType === "IOS");

  return isMobile;
};
