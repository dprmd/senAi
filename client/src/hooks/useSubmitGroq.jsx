import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import useOnlineStatus from "./useOnlineStatus";

export const useSubmitGroq = () => {
  // hooks
  const [setChats, getChats] = useChatsStore(
    useShallow((state) => [state.setChats, state.getChats]),
  );
  const [model] = useSettingsStore(useShallow((state) => [state.model]));
  const [
    senTyping,
    setSenTyping,
    userId,
    loading,
    setMessageFromUser,
    setGroqFetchProses,
  ] = useAppStore(
    useShallow((state) => [
      state.senTyping,
      state.setSenTyping,
      state.userId,
      state.loading,
      state.setMessageFromUser,
      state.setGroqFetchProses,
    ]),
  );
  const online = useOnlineStatus();
  const { t } = useTranslation();

  const handleSubmit = async (messageFromUser, type = "text") => {
    if (type === "text" && messageFromUser.trim().length === 0) return;
    if (senTyping || loading) return;

    const { sleep } = await import("../lib/generateTime");
    const { getGroqReply } = await import("../controller/groq");
    const { addNewChatsToFirestore } = await import(
      "../controller/CRUDFirestore"
    );

    const chatFromUser = {
      type,
      position: "right",
      time: new Date().getTime(),
      message: messageFromUser,
    };
    setMessageFromUser("");

    setChats([...getChats(), chatFromUser]);
    if (type === "audio") {
      chatFromUser.message = messageFromUser.text;
      chatFromUser.downloadUrl = messageFromUser.downloadUrl;
      chatFromUser.audioFileName = messageFromUser.audioFileName;
    }

    const chatFromAi = {
      type: "text",
      position: "left",
      time: null,
      message: null,
    };

    if (online) {
      await sleep(1000);
      setSenTyping(true);
      setGroqFetchProses("start");
      const reply = await getGroqReply(chatFromUser.message, model);
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
    setGroqFetchProses("end");
  };

  return handleSubmit;
};
