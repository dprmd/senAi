/* eslint-disable no-undef */
import { useRef } from "react";
import {
  addToTempMessages,
  tempMessages,
  useAppStore,
} from "../store/appStore";
import { requestToGroq } from "../utils/groq";
import { useShallow } from "zustand/react/shallow";
import useOnlineStatus from "../hooks/getOnlineStatus";
import { addNewMessagesToFirestore } from "@/store/CRUDFirestore";

export default function InputMessage({ scrollEndChat }) {
  // zustand appStore
  const [
    senTyping,
    setSenTyping,
    showPP,
    showSenInfo,
    showAskBoxWhenClearMessages,
    setMessages,
    model,
    role,
    userId,
  ] = useAppStore(
    useShallow((state) => [
      state.senTyping,
      state.setSenTyping,
      state.showPP,
      state.showSenInfo,
      state.showAskBoxWhenClearMessages,
      state.setMessages,
      state.model,
      state.role,
      state.userId,
    ]),
  );

  const hiddenForm =
    showPP || showSenInfo || showAskBoxWhenClearMessages
      ? "hidden"
      : "inline-block";
  const pesanref = useRef(null);
  const online = useOnlineStatus();

  const handleSubmit = async () => {
    if (pesan.value.replaceAll(" ", "").length === 0) return;
    if (senTyping) return;

    const message = pesan.value;
    pesan.value = "";

    setSenTyping(true);
    addToTempMessages(message);
    setMessages(tempMessages);

    let reply;
    if (online) {
      reply = await requestToGroq(message, role, model);
      addNewMessagesToFirestore(userId, message, reply);
    } else {
      reply = "Please check your internet connection...";
    }

    addToTempMessages(reply);
    setMessages(tempMessages);
    setSenTyping(false);
    scrollEndChat();
  };

  return (
    <form
      className={`origin-l fixed bottom-0 w-screen bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100 ${hiddenForm}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="input-message simetris flex items-center justify-evenly gap-x-1">
        <input
          type="text"
          className="flex-1 rounded-full bg-[#FFFFFF] px-3 py-2 font-inter font-bold text-slate-900 outline-none placeholder:text-slate-500 dark:bg-[#2A3942] dark:text-slate-100 dark:placeholder:text-slate-400"
          id="pesan"
          placeholder="Message"
          ref={pesanref}
        />
        <button
          type="button"
          className="bi bi-send-fill ml-1 inline-block rounded-full bg-green-500 fill-current px-3 py-2 text-black text-slate-800 dark:bg-green-600 dark:text-slate-200"
          onClick={() => {
            handleSubmit();
          }}
        ></button>
      </div>
    </form>
  );
}
