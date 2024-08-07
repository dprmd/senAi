import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import translationEN from "./locales/en/translation.json";
import translationID from "./locales/id/translation.json";

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  id: {
    translation: translationID,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is not available
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
