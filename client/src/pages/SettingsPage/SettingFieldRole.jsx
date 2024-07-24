import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../store/appStore";
import SettingField from "./SettingsField";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
// shadcn ui
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

const SettingFieldRole = () => {
  const { t } = useTranslation();
  // hooks
  const [role, setRole] = useSettingsStore(
    useShallow((state) => [
      state.role,
      state.setRole,
      state.roleName,
      state.setRoleName,
    ]),
  );

  // state
  const [tempRole, setTempRole] = useState(role);
  const [changeRoleDialog, setChangeRoleDialog] = useState(false);

  return (
    <>
      <SettingField
        iconName="PersonGear"
        label={t("role")}
        value={role}
        description={t("role_desc")}
        onClick={() => {
          setChangeRoleDialog(true);
        }}
      />

      <AlertDialogNormal
        openState={changeRoleDialog}
        setOpenState={setChangeRoleDialog}
        title={t("role_change_title")}
        showCancel={true}
        showContinue={true}
        handleCancel={() => {
          setTempRole(role);
        }}
        handleContinue={() => {
          localStorage.setItem("senAi-role", tempRole);
          setRole(tempRole);
        }}
        continueTitle={t("save")}
      >
        <RadioGroup
          value={tempRole}
          onValueChange={(e) => {
            setTempRole(e);
          }}
        >
          {["user", "system", "assistant"].map((roleName) => (
            <span className="my-2 flex items-center space-x-4" key={roleName}>
              <RadioGroupItem value={roleName} id={`senAi_role-${roleName}`} />
              <Label
                htmlFor={`senAi_role-${roleName}`}
                className="cursor-pointer"
              >
                {roleName}
              </Label>
            </span>
          ))}
        </RadioGroup>
      </AlertDialogNormal>
    </>
  );
};

export default SettingFieldRole;
