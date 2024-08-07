import { useRef } from "react";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import Loading from "@/components/composable/Loading";
import { Toaster } from "@/components/ui/toaster";
import { useSendRecord } from "@/hooks/useSendRecord";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useRecordStore } from "@/store/useRecordStore";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { Mic } from "lucide-react";

const RecordAudioDialog = () => {
  // hooks
  const { t } = useTranslation();
  const [
    isRecording,
    setIsRecording,
    isRecordingStart,
    transcriptionProgress,
    gettingUrlProgress,
    haveRecord,
    isPlayRecord,
  ] = useRecordStore(
    useShallow((state) => [
      state.isRecording,
      state.setIsRecording,
      state.isRecordingStart,
      state.transcriptionProgress,
      state.gettingUrlProgress,
      state.haveRecord,
      state.isPlayRecord,
    ]),
  );

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
    <>
      <Toaster />
      {transcriptionProgress && (
        <Loading message={t("loading_transcription")} />
      )}
      {gettingUrlProgress && <Loading message={t("getting_url_progress")} />}
      <AlertDialogNormal
        openState={isRecording}
        setOpenState={setIsRecording}
        showDescription={true}
        showCancel={true}
        showContinue={false}
        handleCancel={handleCancel}
        // Dynamic Action "Start" if not record yet,
        // "done" when recording,
        // and "send" when record the file is ready, to send to the express server
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
                  <li className="mx-1.5 h-2 w-2 animate-record-0 rounded-full bg-slate-800 dark:bg-slate-200"></li>
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
    </>
  );
};

export default RecordAudioDialog;
