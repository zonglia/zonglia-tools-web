/**
 * 设置 rem 基准值
 * 这里设置为16，表示默认情况下 1rem = 16px
 * 这个值可以根据设计稿尺寸调整，通常设计稿宽度/10
 */
const baseSize = 16

/**
 * 设置根元素的字体大小（即1rem的值）
 * 根据当前窗口宽度与设计稿宽度的比例动态计算
 */
function setRem() {
    // 计算当前窗口宽度与设计稿宽度(1920px)的比例
    // 例如：当前窗口宽度为960px，则 scale = 960/1920 = 0.5
    const scale = document.documentElement.clientWidth / 1920

    /**
     * 计算最终的rem基准值
     * 1. baseSize * scale：按比例缩放基准值
     * 2. Math.min(scale, 2)：限制最大缩放比例为2倍
     *    - 防止在超大屏幕上字体过大
     *    - 2表示最大放大到设计稿的2倍
     * 3. + 'px'：转换为CSS需要的单位字符串
     * 
     * 示例：
     * - 窗口宽度1920px：16 * (1920/1920) = 16px → 1rem = 16px
     * - 窗口宽度960px：16 * (960/1920) = 8px → 1rem = 8px
     * - 窗口宽度3840px：16 * Math.min(3840/1920, 2) = 16 * 2 = 32px → 1rem = 32px
     */
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}

// 初始化时立即执行一次，设置初始rem值
setRem()

// 监听窗口resize事件，当窗口大小变化时重新计算rem值
window.addEventListener('resize', setRem)

/**
 * 可选：监听页面显示/隐藏变化，解决某些浏览器切换标签页时的计算问题
 * 某些浏览器在切换标签页后不会立即触发resize事件
 */
window.addEventListener('pageshow', function (e) {
    if (e.persisted) {  // 如果页面是从缓存加载的
        setRem()
    }
})