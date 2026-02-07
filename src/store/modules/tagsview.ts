import { defineStore } from "pinia";

const useTagsViewStore = defineStore("tags-view", {
    state: () => ({
        visitedViews: [] as any[],
        cachedViews: [] as any[],
    }),
    actions: {
        // 添加视图（同时添加到访问列表和缓存列表）
        addView(view: any) {
            // 已访问的视图列表
            this.addVisitedView(view);
            // 需要缓存的视图名称列表（配合<keep-alive>使用）
            this.addCachedView(view);
        },
        // 添加访问视图（用于标签页显示）
        addVisitedView(view: any) {
            const exists = this.visitedViews.some(v => v.path === view.path);
            if (!exists) {
                this.visitedViews.push({
                    ...view,
                    title: view.meta.title || 'no-name'
                });
            }
        },
        // 添加缓存视图（用于<keep- alive > 缓存）
        addCachedView(view: any) {
            // 检查是否已缓存
            if (view.name && !view.meta.noCache && !this.cachedViews.includes(view.name)) {
                this.cachedViews.push(view.name);
            }
        },

        // 删除视图（同时从访问列表和缓存列表删除）
        delView(view: any) {
            this.delVisitedView(view);
            this.delCachedView(view);
            return {
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews],
            };
        },

        // 删除访问视图
        delVisitedView(view: any) {
            const index = this.visitedViews.findIndex(v => v.path === view.path);
            if (index > -1) {
                // 删除
                this.visitedViews.splice(index, 1);
            }
            return [...this.visitedViews];
        },

        // 删除缓存视图
        delCachedView(view: any) {
            if (view.name) {
                const index = this.cachedViews.indexOf(view.name);
                if (index > -1) {
                    this.cachedViews.splice(index, 1);
                }
            }
            return [...this.cachedViews];
        },


    }
});

export default useTagsViewStore;