// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationNO from './locales/no.json';

const resources = {
  en: {
    translation: translationEN,
  },
  no: {
    translation: translationNO,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'no', // ✅ Norwegian is now default
    fallbackLng: 'no', // ✅ Fallback is also Norwegian
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
