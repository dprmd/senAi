import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";

export const useInstruction = () => {
  const [botLanguage] = useSettingsStore(
    useShallow((state) => [state.botLanguage]),
  );
  let instruction = "";

  if (botLanguage === "Auto") {
    instruction = "Please Answer Me";
  }
  if (botLanguage === "English") {
    instruction = "Please Answer Me In English Language";
  }
  if (botLanguage === "Indonesia") {
    instruction = "Please Answer Me In Informal Indonesian Language";
  }

  return instruction;
};
