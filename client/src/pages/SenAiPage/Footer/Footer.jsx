import { useShallow } from "zustand/react/shallow";
import { SendHorizonal } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useAppStore,
  useInputMessagesStore,
  useSettingsStore,
} from "../../../store/appStore";
import { useSubmitGroq } from "../../../hooks/useSubmitGroq";
import { useClearHoldChats } from "@/hooks/useUtils";

const Footer = () => {
  // hooks
  const { t } = useTranslation();
  const handleSubmit = useSubmitGroq();
  const clearHoldChats = useClearHoldChats();

  const [messageFromUser, setMessageFromUser] = useInputMessagesStore(
    useShallow((state) => [state.messageFromUser, state.setMessageFromUser]),
  );
  const [enterIsSend] = useSettingsStore(
    useShallow((state) => [state.enterIsSend]),
  );
  const [showPP, showSenInfo] = useAppStore(
    useShallow((state) => [state.showPP, state.showSenInfo]),
  );

  return (
    <footer>
      <form
        className={`origin-l fixed bottom-0 max-h-[56px] min-h-[56px] w-screen bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100 ${showPP || showSenInfo ? "hidden" : "inline-block"} z-10`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
          <button
            type="submit"
            className="ml-1 inline-block rounded-full bg-green-500 fill-current p-2 text-black text-slate-800 dark:bg-green-600 dark:text-slate-200"
            aria-label="send message"
          >
            <SendHorizonal className="h-5 w-5" />
          </button>
        </div>
      </form>
    </footer>
  );
};

export default Footer;
