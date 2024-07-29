import { create } from "zustand";

export const useRecordStore = create((set) => ({
  isRecording: false,
  setIsRecording: (isRecording) => set({ isRecording }),
  isRecordingStart: false,
  setIsRecordingStart: (isRecordingStart) => set({ isRecordingStart }),
  haveRecord: false,
  setHaveRecord: (haveRecord) => set({ haveRecord }),
  sendProgress: false,
  setSendProgress: (sendProgress) => set({ sendProgress }),
}));
