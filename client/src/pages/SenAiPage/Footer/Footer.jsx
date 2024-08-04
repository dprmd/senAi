import { useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { SendHorizonal, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../../store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useSubmitGroq } from "../../../hooks/useSubmitGroq";
import { useClearHoldChats } from "@/hooks/useUtils";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import Loading from "@/components/composable/Loading";
import { Toaster } from "@/components/ui/toaster";
import { useRecordStore } from "@/store/useRecordStore";
import { useSendRecord } from "@/hooks/useSendRecord";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";

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
  const [
    isRecording,
    setIsRecording,
    isRecordingStart,
    sendProgress,
    haveRecord,
    isPlayRecord,
  ] = useRecordStore(
    useShallow((state) => [
      state.isRecording,
      state.setIsRecording,
      state.isRecordingStart,
      state.sendProgress,
      state.haveRecord,
      state.isPlayRecord,
    ]),
  );

  // state

  // media recorder ref
  const audioPlaybackRef = useRef(null);
  const seekBar = useRef(null);
  const {
    handleCancel,
    handleStartRecording,
    handleStopRecording,
    handlePlayRecordResult,
    handleEndedRecordResult,
    handleTimeUpdateRecordResult,
    handleSeekBarChangeRecordResult,
    handleSendRecord,
  } = useSendRecord(audioPlaybackRef, seekBar);

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
        // Dynamic Action "Start" if not record yet,
        // "done" when recording,
        // and "send" when record file is ready, to send to the express server
        customAction={
          isRecordingStart
            ? [
                {
                  actionTitle: t("done"),
                  actionFunction: handleStopRecording,
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
                    actionFunction: handleStartRecording,
                  },
                ]
        }
      >
        <div>
          <div className="flex flex-col items-center justify-center p-3">
            {/* Mic Icon */}
            <div className="rounded-full bg-green-500 p-2 text-slate-800 dark:bg-green-600 dark:text-slate-200">
              <Mic className="h-10 w-10" />
            </div>
            {/* The circle animation when Recording */}
            <div className="mt-6 flex">
              {isRecordingStart ? (
                <ul className="flex">
                  <li className="animate-record-0 mx-1.5 h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-1 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-2 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-3 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-4 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-5 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-6 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-7 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                  <li className="mx-1.5 h-2 w-2 animate-record-8 rounded-full bg-slate-800 dark:bg-slate-200"></li>
                </ul>
              ) : (
                // the playback component when record is finish
                <div className="h-6 text-slate-800 dark:text-slate-200">
                  {haveRecord ? (
                    <div id="audioPlayer">
                      <audio
                        ref={audioPlaybackRef}
                        onTimeUpdate={handleTimeUpdateRecordResult}
                        onEnded={handleEndedRecordResult}
                      >
                        <track kind="captions" />
                      </audio>
                      <div className="flex items-center justify-center p-2">
                        <button
                          onClick={handlePlayRecordResult}
                          className="flex min-h-[40px] min-w-[50px] items-center justify-center"
                        >
                          {isPlayRecord ? (
                            <DynamicSvgComponent
                              name="Pause"
                              className="h-8 w-8 animate-small-to-big fill-current font-bold text-slate-900 dark:text-slate-300"
                            />
                          ) : (
                            <DynamicSvgComponent
                              name="Play"
                              className="h-8 w-8 animate-small-to-big fill-current font-bold text-slate-900 dark:text-slate-300"
                            />
                          )}
                        </button>
                        <input
                          type="range"
                          value="0"
                          max="100"
                          ref={seekBar}
                          onInput={handleSeekBarChangeRecordResult}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="font-poppins">
                      {t("click_to_start_record")}
                    </span>
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
