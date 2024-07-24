import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/appStore";
import SettingField from "./SettingsField";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
// shadcn ui
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

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
        title={t("user_change_title")}
        showCancel={true}
        showContinue={true}
        handleCancel={() => {
          setTempUser(user);
        }}
        handleContinue={() => {
          localStorage.setItem("senAi-user", tempUser);
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
