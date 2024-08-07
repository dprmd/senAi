import { create } from "zustand";

export const useRecordStore = create((set) => ({
  isPlayRecord: false,
  setIsPlayRecord: (isPlayRecord) => set({ isPlayRecord }),
  isRecording: false,
  setIsRecording: (isRecording) => set({ isRecording }),
  isRecordingStart: false,
  setIsRecordingStart: (isRecordingStart) => set({ isRecordingStart }),
  haveRecord: false,
  setHaveRecord: (haveRecord) => set({ haveRecord }),
  transcriptionProgress: false,
  setTranscriptionProgress: (transcriptionProgress) =>
    set({ transcriptionProgress }),
  gettingUrlProgress: false,
  setGettingUrlProgress: (gettingUrlProgress) => set({ gettingUrlProgress }),
}));
