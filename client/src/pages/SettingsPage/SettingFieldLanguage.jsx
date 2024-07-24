import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/appStore";
import SettingField from "./SettingsField";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
// shadcn ui
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

const SettingFieldLanguage = () => {
  // hooks
  const [language, languageLabel, setLanguage, setLanguageLabel] =
    useSettingsStore(
      useShallow((state) => [
        state.language,
        state.languageLabel,
        state.setLanguage,
        state.setLanguageLabel,
      ]),
    );
  const { t } = useTranslation();

  // state
  const [tempLanguage, setTempLanguage] = useState(language);
  const [tempLanguageLabel, setTempLanguageLabel] = useState(languageLabel);
  const [changeLanguageDialog, setChangeLanguageDialog] = useState(false);

  return (
    <>
      <SettingField
        iconName="Globe"
        label={t("language")}
        value={languageLabel}
        description={t("language_desc")}
        onClick={() => {
          setChangeLanguageDialog(true);
        }}
      />

      {/* change language */}
      <AlertDialogNormal
        openState={changeLanguageDialog}
        setOpenState={setChangeLanguageDialog}
        title={t("language_change_title")}
        showCancel={true}
        showContinue={true}
        handleCancel={() => {
          setTempLanguage(language);
          setTempLanguageLabel(languageLabel);
        }}
        handleContinue={() => {
          localStorage.setItem("senAi-language", tempLanguage);
          localStorage.setItem("senAi-languageLabel", tempLanguageLabel);
          setLanguage(tempLanguage);
          setLanguageLabel(tempLanguageLabel);
        }}
        continueTitle={t("save")}
      >
        <RadioGroup
          value={tempLanguage}
          onValueChange={(e) => {
            setTempLanguage(e);
            switch (e) {
              case "en":
                setTempLanguageLabel("English");
                break;
              case "id":
                setTempLanguageLabel("Indonesia");
                break;
            }
          }}
        >
          {[
            { locale: "en", label: "English" },
            { locale: "id", label: "Indonesia" },
          ].map((languageIndex) => (
            <span
              className="my-2 flex items-center space-x-4"
              key={languageIndex.locale}
            >
              <RadioGroupItem
                aria-label="uha"
                value={languageIndex.locale}
                id={`senAi_user-${languageIndex.locale}`}
              />
              <Label
                htmlFor={`senAi_user-${languageIndex.locale}`}
                className="cursor-pointer"
              >
                {languageIndex.label}
              </Label>
            </span>
          ))}
        </RadioGroup>
      </AlertDialogNormal>
    </>
  );
};

export default SettingFieldLanguage;
