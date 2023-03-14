import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationFilePL from "./translations/translation-pl";
import translationFileEN from "./translations/translation-en";

// the translations
// (tip move them in a JSON file and import them)

const resources = {
    pl: {
        translation: translationFilePL,
    },
    en: {
        translation: translationFileEN,
    },
};

i18n.use(LngDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        detection: {
            // order and from where user language should be detected
            order: [
                /*'path', 'localStorage',*/ "cookie",
                "navigator",
                "htmlTag",
            ],

            // keys or params to lookup language from
            lookupCookie: "i18next",
            lookupLocalStorage: "i18nextLng",
            lookupFromPathIndex: 0,

            // cache user language on
            caches: ["localStorage", "cookie"],

            // optional expire and domain for set cookie
            cookieMinutes: 10,
            cookieDomain: ".kryptowaluty.pl",
        },
        load: "languageOnly",
        whitelist: ["pl", "en"],
        fallbackLng: ["pl", "en"],
        supportedLngs: ["pl", "en"],
        // lng: "en",
        resources,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
