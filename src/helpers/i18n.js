import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en_language from '../config/translation/en.json';
import sp_language from '../config/translation/sp.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    sp: sp_language,
    en: en_language,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
