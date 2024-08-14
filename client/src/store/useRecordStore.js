import { create } from "zustand";

export const useRecordStore = create((set) => ({
  isRecordingStart: false,
  setIsRecordingStart: (isRecordingStart) => set({ isRecordingStart }),

  isRecording: false,
  setIsRecording: (isRecording) => set({ isRecording }),

  isPlayRecord: false,
  setIsPlayRecord: (isPlayRecord) => set({ isPlayRecord }),

  haveRecord: false,
  setHaveRecord: (haveRecord) => set({ haveRecord }),

  transcriptionProgress: false,
  setTranscriptionProgress: (transcriptionProgress) =>
    set({ transcriptionProgress }),

  gettingUrlProgress: false,
  setGettingUrlProgress: (gettingUrlProgress) => set({ gettingUrlProgress }),
}));
