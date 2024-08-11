import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import SenAiPage from "@/pages/SenAiPage/SenAiPage";
import SettingsPage from "@/pages/SettingsPage/SettingsPage";
import SettingsModelPage from "@/pages/SettingsPage/ModelPage/ModelPage";
import SettingsOtherPage from "@/pages/SettingsPage/OtherPage/OtherPage";
import SettingsOtherDeleteAllData from "@/pages/SettingsPage/OtherPage/DeleteAllDataPage/DeleteAllDataPage";
import DependenciesPage from "./SettingsPage/OtherPage/DependenciesPage/DependenciesPage";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import ImageCropper from "@/components/composable/ImageCropper";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";

const AnimatedComponent = () => {
  // hooks
  const location = useLocation();
  const online = useOnlineStatus();
  const { t } = useTranslation();

  useEffect(() => {
    if (!online) {
      toast({
        description: t("error_offline"),
        duration: 2000,
      });
    }
  }, [online]);

  return (
    <AnimatePresence>
      <Toaster />
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<SenAiPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/cropImage" element={<ImageCropper />} />
        <Route path="/settings/model" element={<SettingsModelPage />} />
        <Route path="/settings/other" element={<SettingsOtherPage />} />
        <Route
          path="/settings/other/deleteAllData"
          element={<SettingsOtherDeleteAllData />}
        />
        <Route
          path="/settings/other/dependencies"
          element={<DependenciesPage />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedComponent;
