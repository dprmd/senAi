import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { SendHorizonal, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useAppStore,
  useInputMessagesStore,
  useSettingsStore,
} from "../../../store/appStore";
import { useSubmitGroq } from "../../../hooks/useSubmitGroq";
import { useClearHoldChats } from "@/hooks/useUtils";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import Loading from "@/components/composable/Loading";
import { Toaster } from "@/components/ui/toaster";
import { useRecordStore } from "@/store/useRecordStore";
import { useSendRecord } from "@/hooks/useSendRecord";

const Footer = () => {
  // hooks
  const { t } = useTranslation();
  const handleSubmit = useSubmitGroq();
  const clearHoldChats = useClearHoldChats();
  const [messageFromUser, setMessageFromUser] = useInputMessagesStore(
    useShallow((state) => [state.messageFromUser, state.setMessageFromUser]),
  );
  const [enterIsSend] = useSettingsStore(
    useShallow((state) => [
      state.enterIsSend,
      state.model,
      state.languageLabel,
    ]),
  );
  const [showPP, showSenInfo] = useAppStore(
    useShallow((state) => [state.showPP, state.showSenInfo]),
  );
  const [
    isRecording,
    setIsRecording,
    isRecordingStart,
    sendProgress,
    haveRecord,
  ] = useRecordStore(
    useShallow((state) => [
      state.isRecording,
      state.setIsRecording,
      state.isRecordingStart,
      state.sendProgress,
      state.haveRecord,
    ]),
  );

  // media recorder ref
  const audioPlaybackRef = useRef(null);
  const { handleCancel, handleSendRecord, startRecording, stopRecording } =
    useSendRecord(audioPlaybackRef);

  return (
    <footer>
      <Toaster />
      {sendProgress && <Loading message="Loading Transcription" />}
      <AlertDialogNormal
        openState={isRecording}
        setOpenState={setIsRecording}
        showDescription={true}
        showCancel={true}
        showContinue={false}
        handleCancel={handleCancel}
        customAction={
          isRecordingStart
            ? [
                {
                  actionTitle: t("done"),
                  actionFunction: stopRecording,
                },
              ]
            : haveRecord
              ? [
                  {
                    actionTitle: t("send"),
                    actionFunction: handleSendRecord,
                  },
                ]
              : [
                  {
                    actionTitle: t("start"),
                    actionFunction: startRecording,
                  },
                ]
        }
      >
        <div>
          <div className="flex flex-col items-center justify-center p-3">
            <div className="rounded-full bg-green-500 p-2 text-slate-800 dark:bg-green-600 dark:text-slate-200">
              <Mic className="h-10 w-10" />
            </div>
            <div className="mt-6 flex">
              {isRecordingStart ? (
                <ul className="flex h-6 items-center justify-center">
                  <li className="mx-1.5 h-2 w-2 animate-record-1 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-2 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-3 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-4 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-5 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-6 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-7 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-8 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-9 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                </ul>
              ) : (
                <div className="h-6 text-slate-800 dark:text-slate-200">
                  {haveRecord ? (
                    <audio
                      ref={audioPlaybackRef}
                      controls
                      className="bg-light dark:bg-dark"
                    >
                      <track kind="captions" />
                    </audio>
                  ) : (
                    <span className="font-poppins">{t("record_title")}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </AlertDialogNormal>

      <form
        className={`origin-l fixed bottom-0 z-30 max-h-[56px] min-h-[56px] w-screen bg-[#F0F2F5] text-slate-900 dark:bg-[#202C33] dark:text-slate-100 ${showPP || showSenInfo ? "hidden" : "inline-block"} z-10`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(messageFromUser);
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
