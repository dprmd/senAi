import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore, useSettingsStore } from "../../store/appStore";
import { motion } from "framer-motion";
import SettingFieldUser from "./SettingFieldUser";
import SettingFieldRole from "./SettingFieldRole";
import SettingFieldModel from "./SettingFieldModel";
import SettingFieldName from "./SettingFieldName";
import SettingField from "./SettingsField";
import SettingsTop from "../../components/composable/SettingsTop";
import SettingFieldLanguage from "./SettingFieldLanguage";

const SettingsPage = () => {
  // hooks
  const [setUserId] = useAppStore(useShallow((state) => [state.setUserId]));
  const [
    setName,
    setOldName,
    settingsComponentDidFetch,
    setSettingsComponentDidFetch,
    settingModelComponentDidFetch,
    setSettingModelComponentDidFetch,
    setCurrentModels,
  ] = useSettingsStore(
    useShallow((state) => [
      state.setName,
      state.setOldName,
      state.settingsComponentDidFetch,
      state.setSettingsComponentDidFetch,
      state.settingModelComponentDidFetch,
      state.setSettingModelComponentDidFetch,
      state.setCurrentModels,
    ]),
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const initFetch = async () => {
      if (!settingModelComponentDidFetch) {
        const { getGroqModels } = await import("../../controller/groq");
        getGroqModels().then((models) => {
          setCurrentModels(models);
          setSettingModelComponentDidFetch(true);
        });
      }

      const { addNewUserToFirestoreIfNotExists, getName } = await import(
        "../../controller/CRUDFirestore"
      );

      const generatedUserId = await addNewUserToFirestoreIfNotExists();
      localStorage.setItem("senAi-userId", generatedUserId);
      setUserId(generatedUserId);

      const gettedName = await getName(generatedUserId);
      setOldName(gettedName);
      setName(gettedName);
    };

    const whenEscClicked = (e) => {
      if (e.keyCode === 27) {
        navigate("/");
      }
    };

    if (!settingsComponentDidFetch) {
      // comment this when firebase is error
      initFetch();
      // comment this when firebase is error
      setSettingsComponentDidFetch(true);
    }

    document.addEventListener("keydown", whenEscClicked);
    return () => {
      document.removeEventListener("keydown", whenEscClicked);
    };
  }, []);

  return (
    <motion.div
      className="bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100"
      initial={{ opacity: 0, transition: { duration: 0.2 } }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <SettingsTop title={t("settings")} urlBack="/" />
      <main className="mx-auto mt-1 flex min-h-screen flex-col sm:w-[80%] lg:w-[40%]">
        {/* images */}
        <div className="flex items-center justify-center py-5">
          <div className="max-h-[150px] min-h-[150px] min-w-[150px] max-w-[150px] overflow-hidden rounded-full">
            <img
              src="img/sen.jpg"
              className="z-0 h-full"
              alt="sen ai"
              loading="lazy"
            />
          </div>
        </div>
        {/* Name */}
        <SettingFieldName />
        {/* User */}
        <SettingFieldUser />
        {/* Role */}
        <SettingFieldRole />
        {/* Model */}
        <SettingFieldModel />
        {/* Language */}
        <SettingFieldLanguage />
        {/* More Settings */}
        <SettingField
          iconName="ThreeDots"
          label={t("more_settings")}
          description={t("more_settings_desc")}
          disablePencil={true}
          value={""}
          onClick={() => {
            navigate("/settings/other");
          }}
        />
      </main>
    </motion.div>
  );
};

export default SettingsPage;
