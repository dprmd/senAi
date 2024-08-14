import SettingsTop from "@/components/composable/SettingsTop";
import { useSettingsStore } from "@/store/useSettingsStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
// shadcn ui
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { setLS } from "@/lib/myUtils";

const SettingOthersPage = () => {
  // hooks
  const [enterIsSend, setEnterIsSend, darkMode, setDarkMode] = useSettingsStore(
    useShallow((state) => [
      state.enterIsSend,
      state.setEnterIsSend,
      state.darkMode,
      state.setDarkMode,
    ]),
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const height = window.innerHeight;
    const settingOther = document.querySelector(".setting-other");
    settingOther.style.minHeight = `${height - 60}px`;
  }, []);

  return (
    <motion.div
      className="bg-[#FFFFFF] text-slate-900 dark:bg-[#0B141A] dark:text-slate-100"
      initial={{ opacity: 0, transition: { duration: 0.2 } }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <SettingsTop title={t("more_settings")} urlBack="/settings" />
      <main className="setting-other flex flex-col justify-between px-6 py-5">
        <div>
          {/* Enter Is Send */}
          <div className="flex items-center justify-between">
            <p className="my-3 pr-3 text-sm font-medium">
              {t("enter_is_send")}
            </p>
            <Switch
              aria-label="enter is send toggle"
              checked={enterIsSend === "yes"}
              onCheckedChange={() => {
                if (enterIsSend === "yes") {
                  setLS("senAi-enterIsSend", "no");
                  setEnterIsSend("no");
                }
                if (enterIsSend === "no") {
                  setLS("senAi-enterIsSend", "yes");
                  setEnterIsSend("yes");
                }
              }}
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <p className="my-3 pr-3 text-sm font-medium" id="dark-mode-toggle">
              {t("dark_mode")}
            </p>
            <Switch
              checked={darkMode}
              aria-labelledby="dark-mode-toggle"
              onCheckedChange={() => {
                if (darkMode) {
                  setLS("senAi-theme", "light");
                  setDarkMode(false);
                }
                if (!darkMode) {
                  setLS("senAi-theme", "dark");
                  setDarkMode(true);
                }
              }}
            />
          </div>

          {/* see dependencies */}
          <div className="flex items-center justify-between">
            <Link
              to="/settings/other/dependencies"
              className="flex-1 py-3 pr-3 text-sm font-medium"
              id="dark-mode-toggle"
            >
              {t("see_dependencies")}
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Button
            variant="whatsapp"
            size="sm"
            className="w-full rounded-2xl text-sm"
            onClick={() => {
              navigate("/settings/other/deleteAllData");
            }}
          >
            {t("delete_all_data")}
          </Button>
        </div>
      </main>
    </motion.div>
  );
};

export default SettingOthersPage;
