import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore, useSettingsStore } from "@/store/appStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

const AlertDialogChangeName = ({
  changeNameInputDialog,
  setChangeNameInputDialog,
}) => {
  // hooks
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [name, setName, oldName, setOldName] = useSettingsStore(
    useShallow((state) => [
      state.name,
      state.setName,
      state.oldName,
      state.setOldName,
    ]),
  );
  const { t } = useTranslation();

  const handleSaveName = async (e) => {
    e.preventDefault();
    const { updateName } = await import("../../controller/CRUDFirestore");
    if (name === oldName) {
      setChangeNameInputDialog(false);
    } else if (name.length === 0) {
      toast({
        description: t("name_empty"),
      });
    } else {
      updateName(userId, name);
      setOldName(name);
      setChangeNameInputDialog(false);
    }
  };

  return (
    <>
      <Toaster />
      <AlertDialog open={changeNameInputDialog}>
        <AlertDialogContent className="top-[100%] w-full translate-y-[-100%] rounded-none sm:top-[50%] sm:translate-y-[-50%]">
          <form onSubmit={handleSaveName}>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left text-sm font-bold">
                {t("name_change_title")}
              </AlertDialogTitle>
              <AlertDialogDescription className="relative">
                <Input
                  maxLength={25}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="px-0 dark:text-slate-100"
                />
                <span className="absolute right-2 top-[50%] translate-y-[-50%]">
                  {name.length === 0 ? "" : 25 - name.length}
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setName(oldName);
                  setChangeNameInputDialog(false);
                }}
              >
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleSaveName}>
                {t("save")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogChangeName;
