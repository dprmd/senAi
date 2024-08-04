import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion } from "framer-motion";
import SettingsTop from "@/components/composable/SettingsTop";
// shadcn ui
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const SettingsModelPage = () => {
  // hooks
  const [
    model,
    setModel,
    currentModels,
    setCurrentModels,
    settingModelComponentDidFetch,
    setSettingModelComponentDidFetch,
    settingsComponentDidFetch,
  ] = useSettingsStore(
    useShallow((state) => [
      state.model,
      state.setModel,
      state.currentModels,
      state.setCurrentModels,
      state.settingModelComponentDidFetch,
      state.setSettingModelComponentDidFetch,
      state.settingsComponentDidFetch,
    ]),
  );

  useEffect(() => {
    const initFetch = async () => {
      const { getGroqModels } = await import("@/controller/groq");
      const models = await getGroqModels();
      setCurrentModels(models);
    };

    if (!settingsComponentDidFetch && !settingModelComponentDidFetch) {
      // comment this when firebase is error
      initFetch();
      // comment this when firebase is error
      setSettingModelComponentDidFetch(true);
    }
  }, []);

  return (
    <motion.div
      className="bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100"
      initial={{ opacity: 0, transition: { duration: 0.2 } }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
    >
      <SettingsTop title="Model" urlBack="/settings" />
      <main className="max-w-[700px] px-[27px] py-5">
        <RadioGroup
          defaultValue={model}
          onValueChange={(e) => {
            localStorage.setItem("senAi-model", e);
            setModel(e);
          }}
        >
          {currentModels.map((ownedModel, i) => (
            <div key={i}>
              <h2 className="mb-5 mt-4 text-lg font-bold">
                {ownedModel.owned}
              </h2>
              {ownedModel.models.map((model) => (
                <div
                  className="my-2 flex space-x-4"
                  key={`senAi_model-${model.id}`}
                >
                  <div>
                    <RadioGroupItem
                      value={model.id}
                      id={`senAi_model-${model.id}`}
                    />
                  </div>
                  <Label
                    htmlFor={`senAi_model-${model.id}`}
                    className="cursor-pointer"
                  >
                    <div>{model.id}</div>
                    <div className="mt-2 text-sm text-slate-400">
                      {model.description}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          ))}
        </RadioGroup>
      </main>
    </motion.div>
  );
};

export default SettingsModelPage;
