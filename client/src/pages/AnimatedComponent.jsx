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

const AnimatedComponent = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<SenAiPage />} />
        <Route path="/settings" element={<SettingsPage />} />
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
