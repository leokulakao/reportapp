import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import moment from 'moment';
// import 'moment/locale/en';
import 'moment/locale/es';
import 'moment/locale/ru';

import en from './en';
import es from './es';
import ru from './ru';

const resources = {
    en: en,
    es: es,
    ru: ru
}

const setStorageLang = async (lang) => {
    try {
        await AsyncStorage.setItem('@appLang', lang);
    } catch (error) {
        // Error saving data
    }
}

const LanguageDetector = {
    type: "languageDetector",
    async: true,
    detect: callback => {
        return AsyncStorage.getItem('@appLang').then((lang) => {
            if (lang) {
                callback(lang);
            } else {
                callback(Localization.locale);
            }
        });
    },
    init: () => { },
    cacheUserLanguage: (lng) => {
        if (lng in resources) {
            setStorageLang(lng);
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: ['en', 'es', 'ru'],
        compatibilityJSON: 'v3',
        resources,
        keySeparator: false,
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        }
    });

i18n.on('languageChanged', (lng) => moment.locale(lng));

export default i18n;
