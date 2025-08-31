import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

import uz from "@/locales/uz.json";
import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

const savedLanguage = Cookies.get("language") || "ru";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: savedLanguage,
  interpolation: { escapeValue: false },
});

export default i18n;