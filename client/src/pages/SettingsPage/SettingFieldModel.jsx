import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/appStore";
import SettingField from "./SettingsField";

const SettingFieldModel = () => {
  const { t } = useTranslation();
  // hooks
  const [model] = useSettingsStore(useShallow((state) => [state.model]));
  const navigate = useNavigate();

  return (
    <SettingField
      iconName="Database"
      label={t("model")}
      value={model}
      description={t("model_desc")}
      onClick={() => {
        navigate("/settings/model");
      }}
    />
  );
};

export default SettingFieldModel;
