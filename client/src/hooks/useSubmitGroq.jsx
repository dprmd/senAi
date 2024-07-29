import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import {
  useChatsStore,
  useAppStore,
  useInputMessagesStore,
  useSettingsStore,
} from "../store/appStore";
import useOnlineStatus from "./useOnlineStatus";

export const useSubmitGroq = () => {
  // hooks
  const [setChats, getChats] = useChatsStore(
    useShallow((state) => [state.setChats, state.getChats]),
  );
  const [setMessageFromUser] = useInputMessagesStore(
    useShallow((state) => [state.setMessageFromUser]),
  );
  const [model, languageLabel] = useSettingsStore(
    useShallow((state) => [state.model, state.languageLabel]),
  );
  const [senTyping, setSenTyping, userId, loading] = useAppStore(
    useShallow((state) => [
      state.senTyping,
      state.setSenTyping,
      state.userId,
      state.loading,
    ]),
  );
  const online = useOnlineStatus();
  const { t } = useTranslation();

  const handleSubmit = async (messageFromUser) => {
    if (messageFromUser.trim().length === 0) return;
    if (senTyping || loading) return;

    const { sleep } = await import("../lib/generateTime");
    const { getGroqReply } = await import("../controller/groq");
    const { addNewChatsToFirestore } = await import(
      "../controller/CRUDFirestore"
    );

    const chatFromUser = {
      position: "right",
      time: new Date().getTime(),
      message: messageFromUser,
    };
    setMessageFromUser("");

    setChats([...getChats(), chatFromUser]);

    const chatFromAi = {
      position: "left",
      time: null,
      message: null,
    };

    if (online) {
      await sleep(1000);
      setSenTyping(true);
      let systemInstruction = "";
      if (languageLabel === "English") {
        systemInstruction = "Please answer me in English language";
      }
      if (languageLabel === "Indonesia") {
        systemInstruction = "Please answer me in Indonesian language";
      }
      const reply = await getGroqReply(
        chatFromUser.message,
        systemInstruction,
        model,
      );
      chatFromAi.time = new Date().getTime();
      chatFromAi.message = reply;
      // comment this when firebase is error
      addNewChatsToFirestore(userId, chatFromUser, chatFromAi);
      // comment this when firebase is error
    } else {
      chatFromAi.time = new Date().getTime();
      chatFromAi.message = t("senAi_cant_receive_message");
    }

    setSenTyping(false);
    await sleep(500);
    setChats([...getChats(), chatFromAi]);
  };

  return handleSubmit;
};
