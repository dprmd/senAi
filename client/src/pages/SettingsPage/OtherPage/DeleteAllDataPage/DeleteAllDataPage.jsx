import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import Loading from "@/components/composable/Loading";
import SettingsTop from "@/components/composable/SettingsTop";
import { useAppStore } from "@/store/appStore";
import { useChatsStore } from "@/store/useChatsStore";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
// shadcn ui
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useRef } from "react";

const SettingOtherDeleteAllData = () => {
  // hooks
  const [setChats, setChatsMemory] = useChatsStore(
    useShallow((state) => [state.setChats, state.setChatsMemory]),
  );
  const [userId] = useAppStore(useShallow((state) => [state.userId]));
  const { t } = useTranslation();

  // state and ref
  const mainRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [option, setOption] = useState({
    withChats: false,
    withBackupChats: false,
    withLastSeenHistory: false,
    withDestroyAllCollections: false,
  });
  const maxLengthSecurityCode = 6;
  const [securityCode, setSecurityCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [securityCodeWrongDialog, setSecurityCodeWrongDialog] = useState(false);
  const [deleteAllDataDialog, setDeleteAllDataDialog] = useState(false);

  const handleCheck = async () => {
    if (securityCode.length < maxLengthSecurityCode) return;

    // dynamic import
    const { getPermissionToDeleteAllData } = await import(
      "@/controller/CRUDFirestore"
    );
    const { sleep } = await import("@/lib/generateTime");

    setIsChecking(true);
    await sleep(500);
    const permission = await getPermissionToDeleteAllData(securityCode);
    await sleep(500);

    if (permission) {
      setDeleteAllDataDialog(true);
    } else {
      setSecurityCodeWrongDialog(true);
    }
    setIsChecking(false);
  };

  const handleDeleteAllData = async () => {
    if (
      !option.withChats &&
      !option.withBackupChats &&
      !option.withLastSeenHistory &&
      !option.withDestroyAllCollections
    ) {
      return;
    }

    // delete begin
    setIsDeleting(true);
    setDeleteAllDataDialog(false);

    // reset chats and chatsMemory state
    if (option.withChats && option.withBackupChats) {
      setChats([]);
      setChatsMemory([]);
    }

    // reset all state
    setSecurityCode("");
    setOption({
      withChats: false,
      withBackupChats: false,
      withLastSeenHistory: false,
    });

    // dynamic import and fetch begin
    const { deleteAllDataInFirestore } = await import(
      "@/controller/CRUDFirestore"
    );

    const message = await deleteAllDataInFirestore(
      userId,
      securityCode,
      option,
    );

    // tell user
    toast({
      title: t("deleted_all_data"),
      description: message,
      duration: 2500,
    });

    setIsDeleting(false);
  };

  useEffect(() => {
    const height = window.innerHeight;
    mainRef.current.style.minHeight = `${height - 60}px`;
  }, []);

  return (
    <>
      <motion.div
        className="bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100"
        initial={{ opacity: 0, transition: { duration: 0.2 } }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <SettingsTop
          title={t("delete_all_data_title")}
          urlBack="/settings/other"
        />
        <main
          className="flex flex-col items-center justify-start py-10"
          ref={mainRef}
        >
          <div className="text-center">
            <span className="text-xl font-bold" id="enter-security-code">
              {t("enter_security_code")}
            </span>
            <div className="mt-5">
              <InputOTP
                aria-labelledby="enter-security-code"
                maxLength={maxLengthSecurityCode}
                value={securityCode}
                onChange={(e) => {
                  setSecurityCode(e);
                }}
                onComplete={handleCheck}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="mt-10">
            {isChecking ? (
              <Button
                disabled
                variant="whatsapp"
                size="sm"
                className="rounded-3xl px-10"
              >
                {t("is_checking")}
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button
                variant="whatsapp"
                size="sm"
                className="rounded-3xl px-10"
                onClick={handleCheck}
              >
                {t("check")}
              </Button>
            )}
          </div>
        </main>
      </motion.div>

      {isDeleting && <Loading message={t("loading_delete_all_data")} />}

      {/* Security Code Wrong Dialog */}
      <AlertDialogNormal
        openState={securityCodeWrongDialog}
        setOpenState={setSecurityCodeWrongDialog}
        showTitle={true}
        showDescription={true}
        title={t("wrong_security_code")}
        description={t("wrong_security_code_desc")}
        showCancel={false}
        continueTitle={t("try_again")}
        showContinue={true}
        handleContinue={() => {
          setSecurityCode("");
        }}
      />

      {/* Delete All Data Dialog */}
      <AlertDialogNormal
        openState={deleteAllDataDialog}
        setOpenState={setDeleteAllDataDialog}
        showTitle={true}
        showDescription={true}
        title={t("choose_to_delete")}
        showCancel={true}
        showContinue={true}
        handleCancel={() => {
          setOption({
            withChats: false,
            withBackupChats: false,
            withLastSeenHistory: false,
            withDestroyAllCollections: false,
          });
        }}
        handleContinue={handleDeleteAllData}
      >
        <div className="flex flex-col items-start justify-center gap-y-4 px-1 py-3">
          {/* With Chats */}
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="chats"
              checked={option.withChats}
              onCheckedChange={(e) => {
                setOption((state) => ({ ...state, withChats: e }));
              }}
            />
            <Label htmlFor="chats" className="cursor-pointer">
              Chats
            </Label>
          </div>

          {/* With Backup Chats */}
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="backupChats"
              checked={option.withBackupChats}
              onCheckedChange={(e) => {
                setOption((state) => ({ ...state, withBackupChats: e }));
              }}
            />
            <Label htmlFor="backupChats" className="cursor-pointer">
              Backup Chats
            </Label>
          </div>

          {/* With LastSeen History */}
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="lastSeenHistory"
              checked={option.withLastSeenHistory}
              onCheckedChange={(e) => {
                setOption((state) => ({
                  ...state,
                  withLastSeenHistory: e,
                }));
              }}
            />
            <Label htmlFor="lastSeenHistory" className="cursor-pointer">
              Last Seen History
            </Label>
          </div>

          {/* With All Collections */}
          <div className="flex items-center gap-x-3">
            <Checkbox
              id="allCollections"
              checked={option.withDestroyAllCollections}
              onCheckedChange={(e) => {
                setOption((state) => ({
                  ...state,
                  withDestroyAllCollections: e,
                }));
              }}
            />
            <Label htmlFor="allCollections" className="cursor-pointer">
              All Collections
            </Label>
          </div>
        </div>
      </AlertDialogNormal>
    </>
  );
};

export default SettingOtherDeleteAllData;
