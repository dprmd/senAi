import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/appStore";
import SettingField from "./SettingsField";
import AlertDialogChangeName from "../../components/composable/AlertDialogChangeName";

const SettingFieldName = () => {
  // hooks
  const [oldName] = useSettingsStore(useShallow((state) => [state.oldName]));
  const { t } = useTranslation();

  // state
  const [changeNameInputDialog, setChangeNameInputDialog] = useState(false);

  return (
    <div>
      <AlertDialogChangeName
        changeNameInputDialog={changeNameInputDialog}
        setChangeNameInputDialog={setChangeNameInputDialog}
      />
      <SettingField
        iconName="Person"
        label={t("name")}
        value={oldName}
        description={t("name_desc")}
        onClick={() => {
          setChangeNameInputDialog(true);
        }}
      />
    </div>
  );
};

export default SettingFieldName;
