import { useSettingsPageFetch } from "@/hooks/Fetcher/useSettingsPageFetch";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import SettingsTop from "../../components/composable/SettingsTop";
import SettingFieldBotLanguagePreferences from "./SettingFieldBotLanguagePreferences";
import SettingFieldImage from "./SettingFieldImage";
import SettingFieldLanguage from "./SettingFieldLanguage";
import SettingFieldModel from "./SettingFieldModel";
import SettingFieldName from "./SettingFieldName";
import SettingFieldUser from "./SettingFieldUser";
import SettingField from "./SettingsField";

const SettingsPage = () => {
  // zustand
  const [
    settingsComponentDidFetch,
    setSettingsComponentDidFetch,
    settingModelComponentDidFetch,
  ] = useSettingsStore(
    useShallow((state) => [
      state.settingsComponentDidFetch,
      state.setSettingsComponentDidFetch,
      state.settingModelComponentDidFetch,
    ]),
  );

  // hooks
  const navigate = useNavigate();
  const { t } = useTranslation();
  const settingsPageFetch = useSettingsPageFetch();

  useEffect(() => {
    const whenEscClicked = (e) => {
      if (e.keyCode === 27) {
        navigate("/");
      }
    };

    if (!settingsComponentDidFetch) {
      // comment this when firebase is error
      settingsPageFetch();
      // comment this when firebase is error
      setSettingsComponentDidFetch(true);
    }

    document.addEventListener("keydown", whenEscClicked);
    return () => {
      document.removeEventListener("keydown", whenEscClicked);
    };
  }, [settingsComponentDidFetch, settingModelComponentDidFetch]);

  return (
    <motion.div
      className="bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100"
      initial={{ opacity: 0, transition: { duration: 0.2 } }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <SettingsTop title={t("settings")} urlBack="/" />
      <main className="mx-auto mt-1 flex min-h-screen flex-col sm:w-[80%] lg:w-[40%]">
        {/*Image*/}
        <SettingFieldImage />
        {/* Name */}
        <SettingFieldName />
        {/* User */}
        <SettingFieldUser />
        {/* Model */}
        <SettingFieldModel />
        {/* Language */}
        <SettingFieldLanguage />
        {/* Bot Language */}
        <SettingFieldBotLanguagePreferences />
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
