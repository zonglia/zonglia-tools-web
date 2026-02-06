import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 定义全局组件映射表
const components = {
    SvgIcon,
}

export default {
    install(app: App) {
        // 遍历注册所有组件
        Object.entries(components).forEach(([name, component]) => {
            app.component(name, component)
        })
    }
}