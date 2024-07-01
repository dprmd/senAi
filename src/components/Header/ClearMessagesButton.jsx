import { resetTempMessages, useAppStore } from "@/store/appStore";
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

export default function ClearMessagesButton() {
  const [clearMessagestDialog, setClearMessagesDialog] = useState(false);
  const [messages, setMessages, userId] = useAppStore(
    useShallow((state) => [state.messages, state.setMessages, state.userId]),
  );

  const handleClearMessages = () => {
    removeAllMessagesInFirestore(userId);
    resetTempMessages();
    setMessages([]);
  };

  return (
    <>
      <AlertDialog open={clearMessagestDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete all chat history ?
            </AlertDialogDescription>
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
                handleClearMessages();
                setClearMessagesDialog(false);
              }}
            >
              Continue
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
