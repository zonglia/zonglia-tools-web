// 创建layout setting相关的小仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,
        }
    },
})

export default useLayOutSettingStore;