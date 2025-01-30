import { createI18n } from 'vue-i18n';

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'pt',
    fallbackLocale: 'en',
    messages: {},
})

async function loadLocaleMessages(locale) {
    const messages = await import(`@/locales/${locale}.js`);
    i18n.global.setLocaleMessage(locale, messages.default);
}

async function changeLanguage(locale) {
    if(!i18n.global.availableLocales.includes(locale)) {
        await loadLocaleMessages(locale);
    }
    i18n.global.locale = locale;
    localStorage.setItem('lang', locale);
}

export { i18n, changeLanguage, loadLocaleMessages }