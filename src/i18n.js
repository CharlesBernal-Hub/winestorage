import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import es from "./locales/es.json";

const i18n = createI18n({
    legacy: false, // Usar Composition API
    locale: 'en',  // Inglés por defecto como pide el examen
    fallbackLocale: 'en',
    messages: { en, es }
});

export default i18n;