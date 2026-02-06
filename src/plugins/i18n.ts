// src/plugins/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import zh from '@/locales/zh'

const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: {
        zh,
        en
    }
})

export default i18n