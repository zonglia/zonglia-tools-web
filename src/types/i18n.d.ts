import 'vue-i18n'

declare module 'vue-i18n' {
    // 定义自定义类型
    export interface DefineLocaleMessage {
        language: string
        login: string
        register: string
    }
}