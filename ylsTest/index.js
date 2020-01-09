let uid = 0
const { remove, isObject } = require('./utils')

class Dep {
  constructor() {
    this.id = uid++;
    this.arr = []
  }
  
  addDep(watch) {
    this.arr.push(watch)
  }
  
  removeDep(watch) {
    remove(this.arr, watch)
  }
  
  addSub() {
    if (Dep.target) {
      console.log('调用了Dep的addSub方法')
      this.addDep(Dep.target)
    }
  }
  
  updateDep() {
    console.log('调用了dep更新', this.arr)
    this.arr.forEach(item => {
      item instanceof Watcher && item.update()
    })
  }
}

Dep.target = null;

class Watcher {
  constructor(vm, update, cb) {
    this.id = uid++
    this.vm = vm
    this.cb = cb
    this.deps = [];
    this.active = false;
    // 记录当前dep是否被记录了
    this.depsId = new Set();
    this.callFn = update
    this.value = this.get()
  }
  
  get() {
    let value = null
    Dep.target = this
    if (typeof this.callFn === 'function') value = this.callFn.call(this.vm)
    Dep.target = null
    return value
  }
  
  addDep(dep) {
    // 判断有没有对此个dep进行过添加
    console.log('调用了Watch的addDep方法')
    if (!this.depsId.has(dep.id)) {
      this.depsId.add(dep.id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  
  update() {
    const value = this.value
    
    const oldValue = this.value
    this.value = value
    console.log('Watch的update方法')
    if (typeof this.cb === 'function') this.cb(this.vm, value, oldValue)
  }
}

class Vue {
  constructor(data) {
    this.id = uid++;
    this.data = data;
    this._init();
  }
  
  _init() {
    new Watcher(this, this.update)
    observe(this.data, this)
  }
  
  update() {
    console.log('调用了Vue的update方法')
    console.log(this._data && this._data.a)
  }
}

function observe(_data, vm) {
  const data = {};
  Object.keys(_data).forEach(item => {
    const dep = new Dep()
    Object.defineProperty(data, item, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(Dep.target, '调用了a')
        if (Dep.target) {
          Dep.target.addDep(dep)
        }
        return _data[item];
      },
      set(value) {
        console.log('调用了set方法')
        _data[item] = value
        dep.updateDep()
      }
    })
  })
  vm._data = data
  return data
}

let a = new Vue({ a: '123' })
a._data.a = 'c'
