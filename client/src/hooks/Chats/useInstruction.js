import { useSettingsStore } from "@/store/useSettingsStore";
import { useShallow } from "zustand/react/shallow";

export const useInstruction = () => {
  const [botLanguage] = useSettingsStore(
    useShallow((state) => [state.botLanguage]),
  );
  let instruction = "";

  if (botLanguage === "Auto") {
    instruction = "Please Answer Me";
  } else if (botLanguage === "English") {
    instruction = "Please Answer Me In English Language";
  } else if (botLanguage === "Indonesia (Formal)") {
    instruction = "Please Answer Me In Formal Indonesian Language";
  } else if (botLanguage === "Indonesia (Informal)") {
    instruction = "Please Answer Me In Informal Indonesian Language";
  }

  return instruction;
};
