import RecordAudioDialog from "@/components/composable/RecordAudioDialog";
import { useClearHoldChats } from "@/hooks/HoldChats/useClearHoldChats";
import { useRecordStore } from "@/store/useRecordStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Mic, SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useSubmitGroq } from "../../../hooks/useSubmitGroq";
import { useAppStore } from "../../../store/appStore";

const Footer = () => {
  // hooks
  const { t } = useTranslation();
  const handleSubmit = useSubmitGroq();
  const clearHoldChats = useClearHoldChats();
  const [enterIsSend] = useSettingsStore(
    useShallow((state) => [
      state.enterIsSend,
      state.model,
      state.languageLabel,
    ]),
  );
  const [showPP, showSenInfo, messageFromUser, setMessageFromUser] =
    useAppStore(
      useShallow((state) => [
        state.showPP,
        state.showSenInfo,
        state.messageFromUser,
        state.setMessageFromUser,
      ]),
    );
  const [isRecording, setIsRecording] = useRecordStore(
    useShallow((state) => [state.isRecording, state.setIsRecording]),
  );

  return (
    <footer>
      <RecordAudioDialog />
      <form
        className={`origin-l fixed bottom-0 z-30 max-h-[56px] min-h-[56px] w-screen bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100 ${showPP || showSenInfo ? "hidden" : "inline-block"} z-10`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(messageFromUser, "text");
        }}
      >
        <div className="input-message simetris flex items-center justify-evenly gap-x-1">
          {enterIsSend === "yes" ? (
            <input
              type="text"
              className="input-message-field"
              placeholder={t("message_placeholder")}
              value={messageFromUser.replaceAll("\n", " ")}
              onChange={(e) => {
                setMessageFromUser(e.target.value);
              }}
              onClick={clearHoldChats}
            />
          ) : (
            <textarea
              className="input-message-field"
              placeholder={t("message_placeholder")}
              value={messageFromUser}
              onChange={(e) => {
                setMessageFromUser(e.target.value);
              }}
              onClick={clearHoldChats}
            ></textarea>
          )}
          {messageFromUser.length === 0 ? (
            <button
              type="button"
              className="ml-2 inline-block rounded-full bg-green-500 fill-current p-2 text-black text-slate-800 outline-none dark:bg-green-600 dark:text-slate-200"
              aria-label="send record"
              onClick={() => {
                setIsRecording(!isRecording);
              }}
            >
              <Mic className="h-5 w-5 animate-small-to-big" />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-2 inline-block rounded-full bg-green-500 fill-current p-2 text-black text-slate-800 outline-none dark:bg-green-600 dark:text-slate-200"
              aria-label="send message"
            >
              <SendHorizonal className="h-5 w-5 animate-small-to-big" />
            </button>
          )}
        </div>
      </form>
    </footer>
  );
};

export default Footer;
