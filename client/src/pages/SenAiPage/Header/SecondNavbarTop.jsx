import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useHoldChatsStore } from "@/store/appStore";
import ReturnButton from "@/components/composable/ReturnButton";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
import { useClearHoldChats, useDeleteSomeChats } from "@/hooks/useUtils";

const SecondNavbarTop = () => {
  // hooks
  const [holdChats] = useHoldChatsStore(
    useShallow((state) => [state.holdChats]),
  );
  const { t } = useTranslation();
  const clearHoldChats = useClearHoldChats();
  const handleDeleteSomeChats = useDeleteSomeChats();

  // state
  const [deleteSomeChatsDialog, setDeleteSomeChatsDialog] = useState(false);

  const handleCopyChat = async () => {
    const { copyToClipboard } = await import("@/lib/myUtils");
    copyToClipboard(holdChats[0].message);
    clearHoldChats();
  };

  return (
    <div className="flex w-full items-center justify-between">
      {/* Alert When Delete Messages */}
      <AlertDialogNormal
        openState={deleteSomeChatsDialog}
        setOpenState={setDeleteSomeChatsDialog}
        showDescription={true}
        description={`${t("delete_some_chat_delete")} ${holdChats.length} ${t("delete_some_chat_chat")}`}
        centerDescription={true}
        showCancel={true}
        showContinue={true}
        handleContinue={handleDeleteSomeChats}
      />

      <div className="flex items-center justify-center">
        <ReturnButton onClick={clearHoldChats} />
        <div className="px-3 py-1 text-slate-900 dark:text-slate-300">
          {holdChats.length}
        </div>
      </div>
      <div className="flex">
        {/* copy chat */}
        {holdChats.length === 1 && (
          <button
            className="fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
            onClick={handleCopyChat}
          >
            <DynamicSvgComponent name="Copy" />
          </button>
        )}
        {/* remove selected chat */}
        <button
          className="fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
          onClick={() => {
            setDeleteSomeChatsDialog(true);
          }}
        >
          <DynamicSvgComponent name="Trash3" />
        </button>
      </div>
    </div>
  );
};

export default SecondNavbarTop;
