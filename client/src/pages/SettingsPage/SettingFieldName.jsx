import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/useSettingsStore";
import SettingField from "./SettingsField";
import AlertDialogChangeName from "../../components/composable/AlertDialogChangeName";

const SettingFieldName = () => {
  // zustand
  const [oldName] = useSettingsStore(useShallow((state) => [state.oldName]));

  // hooks
  const { t } = useTranslation();

  // state
  const [changeNameInputDialogOpen, setChangeNameInputDialogOpen] =
    useState(false);

  return (
    <div>
      <AlertDialogChangeName
        open={changeNameInputDialogOpen}
        setOpen={setChangeNameInputDialogOpen}
      />
      <SettingField
        iconName="Person"
        label={t("name")}
        value={oldName}
        description={t("name_desc")}
        onClick={() => {
          setChangeNameInputDialogOpen(true);
        }}
      />
    </div>
  );
};

export default SettingFieldName;
