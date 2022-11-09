const drop = (App) => {
    App.directive('drop', {
        // 渲染完毕
        mounted(el, binding, vnode) {
            /**
             * 获取客户端可见内容的高度
             *
             * @returns {number}
             */
            const getClientHeight = () => {
                return window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
            }
            /**
             * 获取客户端可见内容的宽度
             *
             * @returns {number}
             */

            const getClientWidth = () => {
                return window.innerWidth || Math.min(document.documentElement.clientWidth, document.body.clientWidth)
            }
            /**
             * startX = null:获取鼠标相对于元素（左上顶点）的x轴坐标（移动前坐标）
             * startX != null:获取移动后的左上顶点x轴坐标
             *
             * e.clientX:鼠标相对客户端（客户端左上顶点）的x轴坐标
             * el.offsetLeft:元素顶点（左上顶点）相对客户端（客户端左上顶点）的x轴坐标（元素必须脱离文档流，position: fixed or absolute）
             * el.clientWidth:元素宽度
             *
             * @param el
             * @param e
             * @param startX
             * @returns {number}
             */
            const getX = (el, e, startX) => {
                if (startX === null) {
                    // 返回鼠标相对于元素（左上顶点）的x轴坐标
                    return e.clientX - el.offsetLeft
                }
                // 客户端可视宽度
                const clientWidth = getClientWidth()
                // 元素自身宽度
                const elWidth = el.clientWidth
                // 移动到x轴位置
                let x = e.clientX - startX
                // 水平方向边界处理
                if (x <= 0) {
                    // x轴最小为0
                    x = 0
                } else if (x + elWidth > clientWidth) {
                    // x是左上顶点的坐标，是否触碰到右边边界（超出可视宽度）要通过右顶点判断，所以需要加上元素自身宽度
                    x = clientWidth - elWidth
                }
                return x
            }

            /**
             * startY = null:获取鼠标相对于元素（左上顶点）的y轴坐标（移动前坐标）
             * startY != null:获取移动后的左上顶点y轴坐标
             *
             * e.clientY:鼠标相对客户端（客户端左上顶点）的y轴坐标
             * el.offsetTop:元素顶点（左上顶点）相对客户端（客户端左上顶点）的y轴坐标（元素必须脱离文档流，position: fixed or absolute）
             * el.clientHeight:元素高度
             *
             * @param el
             * @param e
             * @param startY
             * @returns {number}
             */
            const getY = (el, e, startY) => {
                if (startY === null) {
                    // 返回鼠标相对于元素（左上顶点）的y轴坐标
                    return e.clientY - el.offsetTop
                }
                // 客户端可视高度
                const clientHeight = getClientHeight()
                // 元素自身高度
                const elHeight = el.clientHeight
                // 移动到y轴位置
                let y = e.clientY - startY
                // 垂直方向边界处理
                if (y <= 0) {
                    // y轴最小为0
                    y = 0
                } else if (y + elHeight > clientHeight) {
                    // 同理，判断是否超出可视高度要加上自身高度
                    y = clientHeight - elHeight
                }
                return y
            }
            /**
             * 监听鼠标按下事件（PC端拖动）
             *
             * @param e
             */
            el.onmousedown = (e) => {
                console.log('onmousedown')
                // vnode.context.isDrag = false
                // 获取当前位置信息 (startX,startY)
                const startX = getX(el, e, null)
                const startY = getY(el, e, null)
                /**
                 * 监听鼠标移动事件
                 *
                 * @param e
                 */
                document.onmousemove = (e) => {
                    // 标记正在移动，解决元素移动后点击事件被触发的问题
                    // vnode.context.isDrag = true
                    // 更新元素位置（移动元素）
                    el.style.left = getX(el, e, startX) + 'px'
                    el.style.top = getY(el, e, startY) + 'px'
                }
                /**
                 * 监听鼠标松开事件
                 */
                document.onmouseup = () => {
                    // 移除鼠标相关事件，防止元素无法脱离鼠标
                    document.onmousemove = document.onmouseup = null
                }
            }
            /**
             * 监听手指按下事件（移动端拖动）
             * @parame
             */
            el.ontouchstart = (e) => {
                // 获取被触摸的元素
                const touch = e.targetTouches[0]
                // 获取当前位置信息 (startX,startY)
                const startX = getX(el, touch, null)
                const startY = getY(el, touch, null)
                /**
                 * 监听手指移动事件
                 * @parame
                 */
                document.ontouchmove = (e) => {
                    // 获取被触摸的元素
                    const touch = e.targetTouches[0]
                    // 更新元素位置（移动元素）
                    el.style.left = getX(el, touch, startX) + 'px'
                    el.style.top = getY(el, touch, startY) + 'px'
                }
                /**
                 * 监听手指移开事件
                 */
                document.ontouchend = () => {
                    // 移除touch相关事件，防止元素无法脱离手指
                    document.ontouchmove = document.ontouchend = null
                }
            }
        }
    });
}
export default drop
