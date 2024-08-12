import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion } from "framer-motion";
import SettingFieldImage from "./SettingFieldImage";
import SettingFieldUser from "./SettingFieldUser";
import SettingFieldModel from "./SettingFieldModel";
import SettingFieldName from "./SettingFieldName";
import SettingField from "./SettingsField";
import SettingsTop from "../../components/composable/SettingsTop";
import SettingFieldLanguage from "./SettingFieldLanguage";
import SettingFieldBotLanguagePreferences from "./SettingFieldBotLanguagePreferences";

const SettingsPage = () => {
  // zustand
  const [setUserId] = useAppStore(useShallow((state) => [state.setUserId]));
  const [
    setName,
    setOldName,
    setProfilePhotoUrl,
    settingsComponentDidFetch,
    setSettingsComponentDidFetch,
    settingModelComponentDidFetch,
    setSettingModelComponentDidFetch,
    setCurrentModels,
    setCustomProfilePhotoUrl,
    setCustomPPFileName,
  ] = useSettingsStore(
    useShallow((state) => [
      state.setName,
      state.setOldName,
      state.setProfilePhotoUrl,
      state.settingsComponentDidFetch,
      state.setSettingsComponentDidFetch,
      state.settingModelComponentDidFetch,
      state.setSettingModelComponentDidFetch,
      state.setCurrentModels,
      state.setCustomProfilePhotoUrl,
      state.setCustomPPFileName,
    ]),
  );

  // hooks
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

      const { addNewUserToFirestoreIfNotExists, getNameAndPPUrl } =
        await import("../../controller/CRUDFirestore");

      const getUserId = await addNewUserToFirestoreIfNotExists();
      setUserId(getUserId);
      localStorage.setItem("senAi-userId", getUserId);

      const { name, PPUrl, customPPUrl, PPFileName } =
        await getNameAndPPUrl(getUserId);
      setOldName(name);
      setName(name);
      setProfilePhotoUrl(PPUrl);
      setCustomProfilePhotoUrl(customPPUrl);
      setCustomPPFileName(PPFileName);
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
