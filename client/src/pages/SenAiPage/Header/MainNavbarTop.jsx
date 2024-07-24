import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { MoonStar, SunIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSettingsStore, useChatsStore } from "@/store/appStore";
import { useDeleteAllChats, useSwitchTheme } from "@/hooks/useUtils";
import ProfilePhoto from "@/pages/SenAiPage/Header/ProfilePhoto";
import SenStatus from "@/pages/SenAiPage/Header/SenStatus";
import AlertDialogNormal from "@/components/composable/AlertDialogNormal";
import DynamicSvgComponent from "@/components/svg/DynamicSvg";
// shadcn ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNavbarTop = () => {
  // hooks
  const [chats] = useChatsStore(useShallow((state) => [state.chats]));
  const [darkMode] = useSettingsStore(useShallow((state) => [state.darkMode]));
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleSwitchTheme = useSwitchTheme();
  const handleDeleteAllChats = useDeleteAllChats();

  // state
  const [threeMenuOpen, setThreeMenuOpen] = useState(false);
  const [deleteAllChatsDialog, setDeleteAllChatsDialog] = useState(false);
  const [threeDotsSvg] = useState("ThreeDotsVertikal");

  return (
    <>
      {/* Alert When Delete All Chats */}
      <AlertDialogNormal
        openState={deleteAllChatsDialog}
        setOpenState={setDeleteAllChatsDialog}
        title={t("delete_all_chats_title")}
        description={t("delete_all_chats_desc")}
        // centerDescription={true}
        showCancel={true}
        showContinue={true}
        handleContinue={handleDeleteAllChats}
      />

      {/* Left Side */}
      <div className="flex flex-1 items-center">
        <ProfilePhoto />
        <SenStatus />
      </div>

      {/* Right Side */}
      <div className="flex">
        {/* DarkMode Toggle */}
        {darkMode ? (
          <button
            className="fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
            onClick={handleSwitchTheme}
            aria-label="dark-mode"
          >
            <MoonStar className="h-5 w-5" />
          </button>
        ) : (
          <button
            className="fill-current px-3 py-1 text-slate-900 dark:text-slate-300"
            onClick={handleSwitchTheme}
            aria-label="light-mode"
          >
            <SunIcon className="h-5 w-5" />
          </button>
        )}

        {/* Menu */}
        <DropdownMenu open={threeMenuOpen} onOpenChange={setThreeMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className="fill-current px-3 py-1 text-slate-900 outline-none dark:text-slate-300"
              aria-label="menu"
            >
              <DynamicSvgComponent name={threeDotsSvg} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-[8px] flex w-48 flex-col rounded-none">
            {chats.length !== 0 && (
              <button
                className="px-3 py-2 text-left text-sm active:bg-slate-300 dark:active:bg-slate-700"
                onClick={() => {
                  setThreeMenuOpen(false);
                  if (chats.length > 0) {
                    setDeleteAllChatsDialog(true);
                  } else {
                    return;
                  }
                }}
              >
                {t("delete_all_chats")}
              </button>
            )}
            <button
              className="px-3 py-2 text-left text-sm active:bg-slate-300 dark:active:bg-slate-500"
              onClick={() => {
                setThreeMenuOpen(false);
                navigate("/settings");
              }}
            >
              {t("settings")}
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default MainNavbarTop;
