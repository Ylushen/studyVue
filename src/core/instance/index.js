import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 暴露到全局中的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

/**
 *  这里处理的是在Vue.prototype上挂载基础的处理方，数据，事件，渲染，跟回调的方法
 *  也可以说是挂载全局方法，混入初始化方法
 */
// 添加init方法
initMixin(Vue)
// 挂载 $data, $props, $set, $del, $watch 方法
stateMixin(Vue)
// 挂载$on, $once, $off, $emit等事件方法
eventsMixin(Vue)
// 挂载$forceUpdate， $destroy等直接对操作Vue render的方法
lifecycleMixin(Vue)
// 挂载_render重新渲染函数和$nextTick函数
renderMixin(Vue)

export default Vue
