import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files.
import enTranslation from '../public/locales/en/translation.json';

// The translations
const resources = {
    en: {
        translation: enTranslation,
    },
};

i18n
    .use(LanguageDetector) // Detects the user's language.
    .use(initReactI18next) // Passes the i18n instance to react-i18next.
    .init({ // Initializes i18next.
        resources,
        lng: 'en', // default language
        fallbackLng: 'en', // fallback language if translation not found
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        debug: false
    });

export default i18n;
