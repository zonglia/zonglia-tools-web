// 创建layout setting相关的小仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, //控制菜单折叠/展开
            refresh: false //控制刷新效果
        }
    },
})

export default useLayOutSettingStore;