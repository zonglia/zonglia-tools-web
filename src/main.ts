import { createApp } from 'vue'
import App from './App.vue'
import '@/permission' // 路由守卫
import router from './router'  // 引入路由
import '@/styles/index.scss' // 引入全局样式
import 'virtual:svg-icons-register'
import globalComponents from '@/components/index.ts'
import i18n from '@/plugins/i18n'
import pinia from '@/store'
import '@/styles/theme.scss'
import '@/styles/element-patch.scss'
import 'element-plus/dist/index.css'  // 引入 Element Plus 样式

const app = createApp(App)

app.use(router) // 使用路由
app.use(globalComponents) // 一键注册所有组件
app.use(i18n)
app.use(pinia)
app.mount('#app')