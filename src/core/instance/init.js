/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  /**
   * @author yls 2020-01-06
   * @param options
   * @private
   * 给构造函数原型挂载_init函数
   * 实际构造方法，初始化实例。并返回，关键方法
   * 1. initLifecycle(vm)：初始化一些配置文件，标识属性，判断当前实例是否经过处理，如是否有发布者，与观察者实例等
   * 2. initEvents(vm)：初始化实例的事件，捕获当前实例的事件，并冒泡传递给父组件，此处对应经过$emit or $on等事件方法
   * 3. initRender(vm)：初始化实例的关于渲染与更新的方法，对slots 与 scopedSlots作用域插槽进行处理
   * 4. callHook(vm, 'beforeCreate')：调用beforeCreate生命周期方法，至此，还未进行数据的处理
   * 5. initInjections(vm)：开始数据的处理，首先，先处理Injections注入的属性
   * 6. initState(vm)： 在进行数据的处理，包括但不限于 watcher处理：props, data, computed, watch. 将methods方法使用bind属性绑定this
   * 7. initProvide(vm)： 处理provide注入的数据，至此，数据处理完成。
   * 8. callHook(vm, 'created')：调用created生命周期方法
   * 9. 执行 vm.$mount(vm.$options.el)方法，$mount = mountComponent，位于core/instance/lifecycle目录下
   * 10. 至此，init函数结束，beforeMount 与 mounted生命周期函数，由$mount调用挂载的vm._update进行第一次渲染。vm._update贯穿实例整个生命周期
   *
   * --------私有属性------------：
   * _isVue = true
   * _uid = uid++
   * _self = vm
   * _renderProxy = new Proxy(vm, handlers)
   * _watcher = null
   * _inactive = null
   * _directInactive = false
   * // (vm._isMounted && !vm._isDestroyed) 判断是否调用beforeUpdate生命周期函数
   * _isMounted = false
   * _isDestroyed = false
   * _isBeingDestroyed = false
   */
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* 如果需要，可以忽略 */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // 一个标志，以避免被观察到
    vm._isVue = true
    // 合并选项,判断该option是否是一个组件
    if (options && options._isComponent) {
      // 优化内部组件实例化
      // 因为动态选项合并非常慢，而且没有
      // 内部组件选项需要特殊处理
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* 判断是否为浏览器环境 */
    // todo _renderProxy属性暂不清楚作用，创建一个proxy对象
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // 将自己绑定到私有属性_self
    vm._self = vm
    // 添加初始化，找到元素的父元素，并初始化一些配置值，比如是否挂载等等
    initLifecycle(vm)
    // 初始化事件，在实例上挂载事件属性，并且监听父元素的事件并冒泡给父元素
    initEvents(vm)
    // 初始化组件的虚拟dom，插槽，作用域插槽，渲染函数，以及$attrs， $listeners
    initRender(vm)
    // 调用beforeCreate生命周期方法
    callHook(vm, 'beforeCreate')
    // 在数据/props之前解决注入问题
    initInjections(vm)
    /**
     * @function initState
     * 开始进行数据绑定
     * 为props, data, computed, watch创建watcher对象，将methods方法全部用bind绑定this
     * 因为箭头函数不能绑定this，所以不建议在methods中使用箭头函数
     */
    initState(vm)
    // 解决提供数据/props后的问题
    initProvide(vm)
    // 调用created生命周期方法
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    // 运行时执行的挂载方法，
    if (vm.$options.el) {
      /**
       * 如果有el属性，就执行挂载方法
       * core/instance/lifecycle目录下
       */
      vm.$mount(vm.$options.el)
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // 这样做是因为它比动态枚举要快。
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

/**
 *
 * @param Ctor 实例的原型
 * @returns {Object} 返回配置函数
 * todo Ctor.super未知属性
 */
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
