/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" /> 

// 声明所有 .vue 文件
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}