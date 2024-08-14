import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import { useSettingsStore } from "../../store/useSettingsStore";
import SettingField from "./SettingsField";
// shadcn ui
import { setLS } from "@/lib/myUtils";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

const SettingFieldUser = () => {
  // hooks
  const [user] = useSettingsStore(useShallow((state) => [state.user]));
  const { t } = useTranslation();

  // state
  const [tempUser, setTempUser] = useState(user);
  const [changeUserDialog, setChangeUserDialog] = useState(false);

  return (
    <>
      <SettingField
        iconName="People"
        label={t("user")}
        value={`user ${user}`}
        description={t("user_desc")}
        onClick={() => {
          setChangeUserDialog(true);
        }}
      />

      {/* change user */}
      <AlertDialogNormal
        openState={changeUserDialog}
        setOpenState={setChangeUserDialog}
        showTitle={true}
        showDescription={true}
        title={t("user_change_title")}
        showCancel={true}
        showContinue={true}
        handleCancel={() => {
          setTempUser(user);
        }}
        handleContinue={() => {
          setLS("senAi-user", tempUser);
          setChangeUserDialog(false);
          location.reload();
        }}
        continueTitle={t("save")}
      >
        <RadioGroup
          value={tempUser}
          onValueChange={(e) => {
            setTempUser(e);
          }}
        >
          {["0", "1", "2", "3", "4"].map((userIndex) => (
            <span className="my-2 flex items-center space-x-4" key={userIndex}>
              <RadioGroupItem
                value={userIndex}
                id={`senAi_user-${userIndex}`}
              />
              <Label
                htmlFor={`senAi_user-${userIndex}`}
                className="cursor-pointer"
              >
                {t("user_list")} {userIndex}
              </Label>
            </span>
          ))}
        </RadioGroup>
      </AlertDialogNormal>
    </>
  );
};

export default SettingFieldUser;
