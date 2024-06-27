/* eslint-disable no-undef */
import { useRef, useState, memo } from "react";
import {
  addToTempMessages,
  tempMessages,
  useAppStore,
} from "../Store/appStore";
import EmojiPicker from "emoji-picker-react";
import { requestToGroq } from "../utils/groq";
import { useShallow } from "zustand/react/shallow";
import useOnlineStatus from "../hooks/getOnlineStatus";

export default function InputMessage({ scrollEndChat }) {
  // zustand appStore
  const [
    darkMode,
    senTyping,
    setSenTyping,
    showPP,
    showSenInfo,
    showAskBoxWhenClearMessages,
    setMessages,
    model,
  ] = useAppStore(
    useShallow((state) => [
      state.darkMode,
      state.senTyping,
      state.setSenTyping,
      state.showPP,
      state.showSenInfo,
      state.showAskBoxWhenClearMessages,
      state.setMessages,
      state.model,
      state.tempMessages,
      state.pushTempMessages,
      state.messages,
    ])
  );

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const MemoEmojiPicker = memo(EmojiPicker);
  const hiddenForm =
    showPP || showSenInfo || showAskBoxWhenClearMessages
      ? "hidden"
      : "inline-block";
  const pesanref = useRef(null);
  const online = useOnlineStatus();

  const handleEmojiClick = (emojiObj) => {
    pesanref.current.value += emojiObj.emoji;
  };

  const handleSubmit = async () => {
    if (pesan.value.length === 0) return;
    if (senTyping) return;
    const message = pesan.value;
    pesan.value = "";
    setSenTyping(true);
    // tempMessages.push(message);
    addToTempMessages(message);
    setMessages(tempMessages);
    let reply;
    if (online) reply = await requestToGroq(message, model);
    else reply = "Please check your internet connection...";
    // tempMessages.push(reply);
    addToTempMessages(reply);
    setMessages(tempMessages);
    setSenTyping(false);
    scrollEndChat();
  };

  return (
    <form
      className={`fixed bottom-0 w-screen origin-l bg-colorLight dark:bg-colorDark text-slate-900 dark:text-slate-100 ${hiddenForm}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setEmojiPickerOpen(false);
      }}
    >
      <div className="input-message flex gap-x-1 justify-evenly items-center simetris">
        <div className="flex flex-1 items-center">
          <div
            className="pr-2 py-2 bi bi-emoji-smile text-slate-400 text-xl cursor-pointer text-slate-900 fill-current dark:text-slate-100"
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          ></div>
          <input
            type="text"
            className="flex-1 px-3 py-2 outline-none font-bold bg-stone-200 dark:bg-stone-700 text-slate-900 dark:text-slate-100 rounded-full font-inter"
            id="pesan"
            placeholder="Message"
            ref={pesanref}
            onFocus={() => setEmojiPickerOpen(false)}
          />
        </div>
        <button
          type="button"
          className="bi bi-send-fill inline-block px-3 py-2 rounded-full dark:bg-green-600 text-black ml-1 dark:text-slate-200 fill-current text-slate-800 bg-green-500"
          onClick={() => {
            setEmojiPickerOpen(false);
            handleSubmit();
          }}
        ></button>
      </div>
      {emojiPickerOpen && (
        <div className="relative left-0 right-0 bottom-0">
          <MemoEmojiPicker
            onEmojiClick={handleEmojiClick}
            autoFocusSearch={false}
            searchDisabled={true}
            theme={darkMode ? "dark" : "light"}
            emojiStyle="google"
            suggestedEmojisMode="recent"
            lazyLoadEmojis={true}
            width="100vw"
            height="40vh"
            previewConfig={{ showPreview: false }}
            emojiD
          ></MemoEmojiPicker>
        </div>
      )}
    </form>
  );
}
