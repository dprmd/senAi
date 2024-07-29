import { useAppStore } from "@/store/appStore";
import { useRecordStore } from "@/store/useRecordStore";
import { useShallow } from "zustand/react/shallow";
import { useSubmitGroq } from "./useSubmitGroq";
import { toast } from "../components/ui/use-toast";
import { useRef } from "react";

export const useSendRecord = (audioPlaybackRef) => {
  // hooks
  const [setIsRecording, setIsRecordingStart, setHaveRecord, setSendProgress] =
    useRecordStore(
      useShallow((state) => [
        state.setIsRecording,
        state.setIsRecordingStart,
        state.setHaveRecord,
        state.setSendProgress,
      ]),
    );
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const handleSubmit = useSubmitGroq();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioBlobRef = useRef();

  const handleCancel = () => {
    setIsRecordingStart(false);
    setHaveRecord(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm; codecs=opus",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm; codecs=opus",
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlaybackRef.current.src = audioUrl;
        audioChunksRef.current = [];
        audioBlobRef.current = audioBlob;
      };

      mediaRecorderRef.current.start();
      setIsRecordingStart(true);
    } catch (err) {
      console.log(err);
      toast({
        description:
          "Could not access microphone, Please check your permission",
        duration: 2000,
      });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecordingStart(false);
    setHaveRecord(true);
  };

  const handleSendRecord = async () => {
    setIsRecording(false);
    setHaveRecord(false);
    setSendProgress(true);
    const formData = new FormData();
    formData.append("audio", audioBlobRef.current, `${userId}-recording.webm`);
    formData.append(
      "jsonData",
      JSON.stringify({
        userId,
        apiKeyIndex: localStorage.getItem("senAi-user"),
      }),
    );
    const { getGroqTranscription } = await import("@/controller/groq");
    const transcription = await getGroqTranscription(formData);
    handleSubmit(transcription);
    setSendProgress(false);
  };

  return { handleCancel, startRecording, stopRecording, handleSendRecord };
};
