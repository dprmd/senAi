import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/appStore";
import AnimatedComponent from "./pages/AnimatedComponent";
import "@/App.css";

const App = () => {
  // hooks
  const [darkMode, language] = useSettingsStore(
    useShallow((state) => [state.darkMode, state.language]),
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };

    changeLanguage(language);
  }, [language]);

  return (
    <Router>
      <AnimatedComponent />
    </Router>
  );
};

export default App;
