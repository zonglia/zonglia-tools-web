import { defineStore } from 'pinia'
import light from '@/styles/theme/light'
import dark from '@/styles/theme/dark'

// 定义主题变量的类型
interface ThemeVariables {
    '--el-color-primary': string
    '--el-bg-color': string
    '--el-text-color-primary': string
    '--menu-text-color': string
    '--el-border-radius': string
    '--el-font-size': string
    [key: string]: string // 添加索引签名以允许其他可能的变量
}

function applyTheme(theme: 'light' | 'dark') {
    const vars: ThemeVariables = theme === 'dark' ? dark : light
    const html = document.documentElement
    html.setAttribute('data-theme', theme)
    for (const key in vars) {
        html.style.setProperty(key, vars[key])
    }
}

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: 'light' as 'light' | 'dark'
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            applyTheme(this.theme)
        },
        setTheme(theme: 'light' | 'dark') {
            this.theme = theme
            applyTheme(theme)
        }
    }
})