import { resetTempMessages, useAppStore } from "@/store/appStore";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { removeAllMessagesInFirestore } from "@/store/CRUDFirestore";
import { Input } from "../ui/input";

export default function ClearMessagesButton() {
  const [clearMessagestDialog, setClearMessagesDialog] = useState(false);
  const [deleteWithBackupDialogAuth, setDeleteWithBackupDialogAuth] =
    useState(false);
  const [deleteWithBackup, setDeleteWithBackup] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages, userId] = useAppStore(
    useShallow((state) => [state.messages, state.setMessages, state.userId]),
  );

  const handleClearMessages = (deleteBackup) => {
    if (deleteBackup) removeAllMessagesInFirestore(userId, true);
    else removeAllMessagesInFirestore(userId, false);
    resetTempMessages();
    setMessages([]);
  };

  return (
    <>
      {/* Alert When Delete Messages */}
      <AlertDialog open={clearMessagestDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete all chat history ?
            </AlertDialogDescription>
            <div
              className="flex cursor-pointer items-center justify-center gap-x-2 sm:justify-start"
              onClick={() => {
                setDeleteWithBackup(!deleteWithBackup);
              }}
            >
              <Checkbox checked={deleteWithBackup} />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                delete with backup
              </span>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setClearMessagesDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-400 dark:bg-red-600 dark:text-white dark:hover:bg-red-400"
              onClick={() => {
                // handleClearMessages();
                if (deleteWithBackup) {
                  setClearMessagesDialog(false);
                  setDeleteWithBackupDialogAuth(true);
                } else {
                  handleClearMessages(false);
                }
                setClearMessagesDialog(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert When Delete With Backup */}
      <AlertDialog open={deleteWithBackupDialogAuth}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>root environment</AlertDialogTitle>
            <AlertDialogDescription>input random *_*</AlertDialogDescription>
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteWithBackupDialogAuth(false);
              }}
            >
              Not now
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-400 dark:bg-red-600 dark:text-white dark:hover:bg-red-400"
              onClick={async () => {
                if (password === "aawm1973") {
                  handleClearMessages(true);
                } else {
                  handleClearMessages(false);
                }
                setDeleteWithBackupDialogAuth(false);
              }}
            >
              Go ahead !
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button
        className="bi bi-trash3-fill fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
        onClick={() => {
          if (messages.length > 0) {
            setClearMessagesDialog(true);
          } else {
            return;
          }
        }}
      ></button>
    </>
  );
}
