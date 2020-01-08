/* @flow */

import {
  warn,
  nextTick,
  emptyObject,
  handleError,
  defineReactive
} from '../util/index'

import { createElement } from '../vdom/create-element'
import { installRenderHelpers } from './render-helpers/index'
import { resolveSlots } from './render-helpers/resolve-slots'
import { normalizeScopedSlots } from '../vdom/helpers/normalize-scoped-slots'
import VNode, { createEmptyVNode } from '../vdom/vnode'

import { isUpdatingChildComponent } from './lifecycle'

/**
 * @author yls
 * @param vm
 * 初始化组件的虚拟dom，插槽，作用域插槽，渲染函数，以及$attrs， $listeners
 *
 * 内部属性 _c = createElement(vm, a, b, c, d, false)
 */
export function initRender (vm: Component) {
  vm._vnode = null // 子树的根
  vm._staticTrees = null // 是否是静态渲染根节点
  const options = vm.$options
  // vm.$vnode 即是父vnode
  const parentVnode = vm.$vnode = options._parentVnode // 父树中的占位符节点
  // 拿到父实例对应的渲染方法
  const renderContext = parentVnode && parentVnode.context
  // 拿到插槽组件
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  // 作用域插槽赋值一个空的对象，作为命名空间
  vm.$scopedSlots = emptyObject

  // 将createElement fn绑定到此实例
  // 以便在其中获得适当的渲染上下文。
  // args顺序：标记，数据，子代，normalizationType，alwaysNormalize
  // 内部版本由模板编译的渲染函数使用
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // 规范化始终应用于公开版本，用于
  // 用户编写的渲染函数。
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // 公开$ attrs和$ listeners以便于创建HOC。
  // 它们必须是反应性的，以便始终更新使用它们的HOC
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}

export let currentRenderingInstance: Component | null = null

// for testing only
export function setCurrentRenderingInstance (vm: Component) {
  currentRenderingInstance = vm
}

// 挂载重新渲染函数和$nextTick函数
export function renderMixin (Vue: Class<Component>) {
  // 安装运行时便利助手
  // 挂载针对虚拟DOM的操作方法
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }
  // render方法执行的字符串代码模板： with(this){return _c('div',{attrs:{"id":"app"}},[_v("\n  "+_s(aaa)+"\n")])}
  /*
   * 返回vnode {
   *   child: undefined
   *   tag: "div"
   *   data: {attrs: {…}}
   *   children: [VNode]
   *   text: undefined
   *   elm: undefined
   *   ns: undefined
   *   context: Vue {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue, …}
   *   fnContext: undefined
   *   fnOptions: undefined
   *   fnScopeId: undefined
   *   key: undefined
   *   componentOptions: undefined
   *   componentInstance: undefined
   *   parent: undefined
   *   raw: false
   *   isStatic: false
   *   isRootInsert: true
   *   isComment: false
   *   isCloned: false
   *   isOnce: false
   *   asyncFactory: undefined
   *   asyncMeta: undefined
   *   isAsyncPlaceholder: false }*/
   /** @private
   */
  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    // 设置父vnode。 这使得渲染功能可以访问
    // 到占位符节点上的数据。
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      // 无需维护堆栈，因为所有渲染fns都被调用
      // 彼此分开。 嵌套组件的渲染fns称为
      // 修补父组件时。
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
      // 返回错误渲染结果，
      // 或以前的vnode以防止呈现错误导致空白组件
      /* 伊斯坦布尔忽略其他 */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch (e) {
          handleError(e, vm, `renderError`)
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}
