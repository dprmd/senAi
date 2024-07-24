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
  const [setChats] = useChatsStore(useShallow((state) => [state.setChats]));
  const [messageFromUser, setMessageFromUser] = useInputMessagesStore(
    useShallow((state) => [state.messageFromUser, state.setMessageFromUser]),
  );
  const [model, role] = useSettingsStore(
    useShallow((state) => [state.model, state.role]),
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

  const handleSubmit = async () => {
    if (messageFromUser.trim().length === 0) return;
    if (senTyping || loading) return;

    const { addToTempChats, tempChats } = await import("../store/appStore");
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

    addToTempChats(chatFromUser);
    setChats(tempChats);

    const chatFromAi = {
      position: "left",
      time: null,
      message: null,
    };

    if (online) {
      await sleep(1000);
      setSenTyping(true);
      const reply = await getGroqReply(chatFromUser.message, role, model);
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
    addToTempChats(chatFromAi);
    setChats(tempChats);
  };

  return handleSubmit;
};
