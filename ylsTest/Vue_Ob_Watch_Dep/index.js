/*
* 模拟实现的双向绑定方法
* 实现了数据的遍历侦听和watch方法.
* 暂时没有实现数组的监听方法
* */
let uid = 0;
let count = 0
const { remove, isObject } = require('../utils');
// 修改数组原型方法
let methods = [
  'push',
  'shift',
  'unshift',
  'pop',
  'splice',
  'sort',
  'reverse'
];
let arrayMethods = Object.create(Array.prototype)
methods.forEach(key => {
  // 先保存数组方法
  let method = arrayMethods[key];
  Object.defineProperty(arrayMethods, key, {
    value: function(...arguments) {
      console.log(++count, `调用了数组的${key}方法`)
      // 通过apply绑定新的this运行方法
      let result = method.apply(this, arguments)
      let ob = this.__ob__;
      // 如果是对数组元素长度进行操作的方法，为新元素建立监听
      let newItem
      switch (key) {
        case 'push':
        case 'unshift':
          newItem = arguments[0]
          break;
        case 'splice':
          newItem = arguments[2]
      }
      if (newItem) observer(newItem)
      if (ob.dep && ob.dep instanceof Dep) ob.dep.updateDep();
      return result
    }
  })
});

// 侦察守卫，观察者集合，为每个数据的key值创建一个侦察守卫，每次数据发生变化时，通知观察这个数据的观察者，去更新
class Dep {
  constructor() {
    console.log(++count, '创建Dep类，给每个key创建监听对象');
    this.id = uid++;
    this.arr = [];
  }
  
  addDep(watch) {
    this.arr.push(watch);
  }
  
  removeDep(watch) {
    remove(this.arr, watch);
  }
  
  addSub() {
    if (Dep.target instanceof Watcher) {
      console.log(++count, '调用了Dep的addSub方法');
      this.addDep(Dep.target);
    }
  }
  
  updateDep() {
    console.log(++count, '调用了dep更新，遍历通知该值的侦听对象');
    this.arr.forEach(item => {
      item instanceof Watcher && item.update();
    });
  }
}

Dep.target = null;

// 观察者，实现侦察接口，连接vue和数据模型的中间件
class Watcher {
  // cb 回调函数
  // update vue的更新函数
  constructor(vm, update, cb) {
    console.log(++count, '创建Watch类，通知实例变化');
    vm._watcher = this;
    
    this.id = uid++;
    this.vm = vm;
    this.cb = cb;
    // 记录当前dep是否被记录了
    this.deps = [];
    this.depsId = new Set();
    this.callFn = update;
    this.value = this.get();
  }
  
  get() {
    console.log(++count, '调用了Watcher类的get方法');
    let value = null;
    Dep.target = this;
    if (typeof this.callFn === 'function') this.callFn.call(this.vm);
    else value = this.vm.data[this.callFn];
    Dep.target = null;
    return value;
  }
  
  addDep(dep) {
    // 判断有没有对此个dep进行过添加
    if (!this.depsId.has(dep.id)) {
      console.log(++count, '绑定dep实例，并且将本实例加入dep监听中');
      this.depsId.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  
  update() {
    console.log(++count, 'Watch的update方法，调用vue的update函数，并且实现watch绑定的方法');
    const value = this.get();
    const oldValue = this.value;
    this.value = value;
    // 这是执行watch属性的方法
    if (typeof this.cb === 'function') this.cb.call(this.vm, value, oldValue);
  }
}

// 判断是否需要创建Ob类
function observer(value) {
  if (!isObject(value)) return
  // 处理数组的处理方式
  if (Array.isArray(value)) value.__proto__ = arrayMethods
  let ob
  if (value.__ob__) ob = value.__ob__
  else ob = new Observe(value)
  return ob
}
// 创建Ob类, 处理数据，创建数据代理。
class Observe {
  constructor(_data) {
    console.log(++count, '调用了Observe类');
    this.data = _data;
    // 创建新的依赖保存数组数据
    this.dep = new Dep();
    // 为了递归监听数据
    Object.defineProperty(_data, '__ob__', {
      value: this,
      writable: true,
      enumerable: false,
      configurable: true
    });
    
    if (Array.isArray(_data)) _data.forEach(item => {
      observer(item)
    });
    else this.walk();
  }
  
  // 实现数据对象key侦察
  walk() {
    console.log(++count, '使用def创建变化侦听');
    def(this.data)
  }
}

// es6新属性Proxy代理监听
function proxy(data) {
  const depObj = {};
  Object.keys(data).forEach(item => {
    // 提前为每个可遍历key创建一个dep对象(必要,因为proxy会代理迭代器等一系列Symbol类型的key)
    if (!depObj[item]) depObj[item] = new Dep();
    if (isObject(data[item])) data[item] = new Observe(data[item], item)
  });
  
  new Proxy(data, {
    get: function(target, key, receiver) {
      let dep = depObj[key];
      // 判断是否有dep属于该对象key
      if ((dep instanceof Dep) && Dep.target) {
        Dep.target.addDep(dep);
      }
      return target[key]
    },
    set: function(target, key, value, receiver) {
      target[key] = value;
      console.log(++count, `调用了属性${key}的set方法`);
      let dep = depObj[key];
      dep.updateDep();
    }
  })
}

// 使用defineProperty属性进行拦截
function def(data) {
  // 保存原数据的对象
  Object.keys(data).forEach(item => {
    let val = data[item];
    // 实现递归监听数据
    if (isObject(val)) observer(val);
    let childOb = val.__ob__;
    // 创建收集者
    const dep = new Dep();
    Object.defineProperty(data, item, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          Dep.target.addDep(dep);
          if (childOb) Dep.target.addDep(childOb.dep);
        }
        return val;
      },
      set(value) {
        console.log(++count, `调用了属性${item}的set方法`);
        val = value;
        dep.updateDep();
      }
    });
  });
}

// Vue类
class Vue {
  constructor(options) {
    console.log(++count, '创建Vue实例类');
    this.id = uid++;
    this.data = options.data;
    this.$watch = options.watch;
    this._init();
  }
  
  _init() {
    console.log(++count, '开始绑定实例的Observe');
    new Observe(this.data, this);
    console.log(++count, '开始绑定实例的Watcher');
    new Watcher(this, this.update);
    console.log(++count, '开始绑定实例的watch属性方法');
    for (const item in this.$watch) {
      new Watcher(this, item, this.$watch[item]);
    }
  }
  
  // todo dom界面接口
  update() {
    function toString(data) {
      let str = '';
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (isObject(item)) str += toString(item)
          else str += item
        })
      } else Object.keys(data).forEach(item => {
        // 不遍历Symbol类型
        if (item in Symbol) return;
        str += `${item}: ${data[item]} \`\`\` `;
        if (isObject(data[item])) str += toString(data[item])
      });
      return str
    }
    
    console.log(++count, 'data的值：' + toString(this.data));
  }
}

let vm = new Vue({
  data: { a: '123', b: { c: 123 }, d: [{ e: '123' }] }, watch: {
    a: function(value, oldValue) {
      console.log(++count, `vm属性a的watch`, value, oldValue);
    }
  }
});
console.log('-----------------------------------------------------');
vm.data.d.push({b: 110});
console.log('-----------------------------------------------------');
vm.data.d[1].b = 123;
