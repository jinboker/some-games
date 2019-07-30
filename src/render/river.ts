/**
 * 专门用来渲染河流：河流每隔一段时间需要切换渲染图片
 */
export function renderRiver() {
 //
}

/**
 * 修改方向：
 * 核心只有一个渲染器，其他所有的渲染全部直接注册到这个渲染器上面，它自己会循环进行调用
 * 每个需要渲染的内容自己搞一个自己的生命周期，从注册到删除
 * 其余的交叉部分通过事件来进行解耦，需要有一个核心的总的事件派发core
 */