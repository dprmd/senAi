import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/appStore";
import { useSettingsStore } from "@/store/useSettingsStore";
// shadcn ui
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

const AlertDialogChangeName = ({ open, setOpen }) => {
  // zustand
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const [name, setName, oldName, setOldName] = useSettingsStore(
    useShallow((state) => [
      state.name,
      state.setName,
      state.oldName,
      state.setOldName,
    ]),
  );

  // hooks
  const { t } = useTranslation();

  // callback
  const handleSaveName = async (e) => {
    e.preventDefault();
    const { updateName } = await import("../../controller/CRUDFirestore");
    if (name === oldName) {
      setOpen(false);
    } else if (name.length === 0) {
      toast({
        description: t("name_empty"),
        variant: "destructive",
        duration: 3000,
      });
    } else {
      updateName(userId, name);
      setOldName(name);
      setOpen(false);
    }
  };

  return (
    <>
      {/* toaster untuk toast notifikasi */}
      <Toaster />

      {/* alert dialog untuk mengubah nama */}
      <AlertDialog open={open}>
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
                  setOpen(false);
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
