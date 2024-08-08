import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/useSettingsStore";
import SettingField from "./SettingsField";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
// shadcn ui
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

const SettingFieldBotLanguagePreferences = () => {
  // hooks
  const [botLanguage, setBotLanguage] = useSettingsStore(
    useShallow((state) => [state.botLanguage, state.setBotLanguage]),
  );
  const { t } = useTranslation();

  // state
  const [changeBotLanguageDialog, setChangeBotLanguageDialog] = useState(false);
  const [tempBotLanguage, setTempBotLanguage] = useState(botLanguage);

  return (
    <>
      <SettingField
        iconName="Sliders2Vertical"
        label={t("bot_language")}
        value={botLanguage}
        description={t("bot_language_desc")}
        disablePencil={false}
        onClick={() => {
          setChangeBotLanguageDialog(true);
        }}
      />

      <AlertDialogNormal
        openState={changeBotLanguageDialog}
        setOpenState={setChangeBotLanguageDialog}
        showTitle={true}
        title={t("bot_language_change_title")}
        showDescription={true}
        showCancel={true}
        cancelTitle={t("cancel")}
        handleCancel={() => {
          setTempBotLanguage(botLanguage);
        }}
        showContinue={true}
        continueTitle={t("save")}
        handleContinue={() => {
          localStorage.setItem("senAi-botLanguage", tempBotLanguage);
          setBotLanguage(tempBotLanguage);
          setTempBotLanguage(tempBotLanguage);
        }}
      >
        <RadioGroup
          value={tempBotLanguage}
          onValueChange={(e) => {
            setTempBotLanguage(e);
          }}
        >
          {["Auto", "English", "Indonesia"].map((language) => (
            <span className="my-2 flex items-center space-x-4" key={language}>
              <RadioGroupItem value={language} id={`senAi_user-${language}`} />
              <Label
                htmlFor={`senAi_user-${language}`}
                className="cursor-pointer"
              >
                {language}
              </Label>
            </span>
          ))}
        </RadioGroup>
      </AlertDialogNormal>
    </>
  );
};

export default SettingFieldBotLanguagePreferences;
