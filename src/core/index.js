// 引入经过原型挂载后的Vue
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 初始化Vue暴露给全局的APi, 如use，mixin, extend等等
initGlobalAPI(Vue)

// 添加检测当前环境是否为服务器端
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 检测是否服务器端渲染
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// 公开用于ssr运行时帮助程序安装的FunctionalRenderContext
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
