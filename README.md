## 文档分享 
### yulusheng52@qq.com(一起进步)
    gitlab: https://git.lug.ustc.edu.cn/yls666666/study
    码云：https://gitee.com/yulushen/vue_study
    github: https://github.com/Ylushen/studyVue
    
    初次分享，理解不到位处必定不少，欢迎各位大佬指点。
### 一、目录结构
```
scripts                 # 与构建相关的脚本和配置文件
dist                    # 构建后的文件
flow                    # flow的类型声明               
packges                 # vue-server-renderer和vue-template-compiler,它们作为单独的NPM包发布
test                    # 所有的测试代码
src
    compiler            # 与模板编译相关的代码
    core                # 通用的，与平台无关的运行时代码（核心代码）
        observer        # 实现变化侦测的代码
        vdom            # 实现虚拟dom的代码
        instance        # Vue.js实例的构造函数和原型方法
        global-api      # 全局API的代码
        componments     # 通用的抽象组件
    server              # 特定平台代码
    platforms           # 单文件组件（*.vue文件）的解析逻辑
    sfc                 # 整个项目的公共工具代码
    shared              # typescript 类型定义
    types               # typescript 类型定义
        test            # 类型定义测试、
ylsTest                 # 个人仿照源码实现的小demo

参考：《深入浅出Vue.js》--刘博文
```

### 二、运行时进行的操作
1. 在生产环境中，在引入Vue的时候，core中实际执行的代码只有index.js中的代码，
仅仅是挂载了一部分的全局API方法，以及在Vue.prototype上的方法。创建一个抽象类挂载到全局window对象下。

2. 当我们视图实例化一个Vue类的时候，就会调用Vue.constructor方法（instance/index.js），
在Vue.constructor方法中，执行了this._init,this._init是挂载在原型上的方法
（instance/init）。
3. _init中执行的方法中，显示对传入的options进行处理。最终生成一个Vue实例。就如一个工厂流水线生产出来的产品。
传入的是一个空对象，空对象经过observer处理后就有了数据双向绑定的功能，将所有数据变化的视图层重新渲染都集中到_watcher.update方法处理。
4. 当所有数据属性都挂在到vm实例上后，就会调用原型上的$mount方法。$mount方法在代码中分了两
种形式。一种是带模板编译（vue,vue.min中都带有），一种是运行时编译（options中有render函数）。
带模板编辑的$mount方法，会调用core中的compiler模块，将模板编译成render方法，返回一个vnode
对象。
5. 然后调用_watcher属性上的_update(vm.render())方法，进行初次渲染，将render函数生成的vnode传入，
进行dom的操作。在运行时，如果数据产生了变化。重新调用_update时，参数render()会重新执行，
执行时this为vm对象，通过with(this)的方法，可以将this上的属性都以变量的形式使用。
（with是经过模板编译后，先生成一串字符串代码,字符串代码通过new Function(code)转换成可以执行的方法）
6. 至此，将生成的模板挂载到实际dom中，实例化完成。在之后每次数据模型进行更新，都会触发_watcher._update方法,
重新生成新的vnode，通过diff算法，对比出实际变化的dom，替换掉之后重新渲染到前端代码中。这就形成了类似MVVM的模式

![Image text](ylsTest/mvvm.png)

### 三、各个模块的概述
#### 1. observer
设计的各个类之间的关系图
![Image text](ylsTest/Vue_Ob_Watch_Dep/observe.png)
1. 入口： src/core/observer/index.js中的observer方法
使用了发布者(Observer)订阅者(Watcher)模式,Dep收集订阅者，并且通过Dep通知订阅者。
Observer的原理，vue2.0版本中，利用了js的Object.defineProperty()方法。
    ```javascript
    // 大概类似于这种
           let val = '';
           Object.defineProperty(data, key, {
             enumerable: true,
             configurable: true,
             get() {
               // todo1... 在获取属性值前触发的操作
               return val;
             },
             set(value) {
               val = value;
               // todo2... 在设置属性值后触发的操作
             }
    });
    ```
   
2. 通过以上的方法，可以实现当我们在操作data中的某一个属性值时，无论是设置还是获取，都能触发一部分代码。
这部分代码，就可以让我们实现数据变化的侦听了。
3. 现在，我们有了对数据侦听的能力。接下来，我们就可以通过遍历vm.data，将所有的属性都通过以上的方式，
进行代理。至此，对象上任何一个属性都已经可以触发我们自己想要进行的操作代码了。
4. 能够知道什么时候需要通知后，我们现在就需要收集信息的订阅者，收集，就涉及到保存和通知。首先，
保存需要能保存多个数据，我们可以使用数组来收集，为每一个key创建一个数组，这个是一个私有属性，
我们就需要使用闭包的特性来创建一个作用域数组变量。如下：
    ```javascript
    /**
     * @param data 需要进行侦听的对象
     * @param key 侦听的属性key
     * @param val 保存当前属性的值
     */
    function def(data, key, val) {
      // 订阅者队列，当前的key对应的
      const dep = [];
      Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
          // 在此添加一步操作，将订阅者添加进队列
          if (dep.indexOf(watcher)) dep.push(watcher);
          return val;
        },
        set(value) {
          val = value;
          // 赋值后，再通知订阅者重新拉取数据。
          dep.forEach(item => item._update())
        }
      });
    }
    ```
5. 通过以上的方法，我们将对象属性递归遍历处理一次，就能够监听整个的数组模型，数组从变化到通知,
都在这个模块中消化了，入口是当前实例需要侦听的数据模型，以及当前实例。出口，就是对变化的数据侦听了的订阅者。
vue的侦听原理大概就是这样的模型。get收集订阅，set通知订阅，达到实时更新数据跟视图的目的   
6. 当然，我们还漏了点东西。前面我们只实现了Object对象的属性侦听。但实际上，数据模型不仅仅只有对象，
还会有数组。数组操作一般都是通过各种方法去进行元素操作的。所以我们用对象的侦听方式去侦听数组，是无效的。
我们现在有两种数据操作模式。比如有个变量arr=[1]，我们给他赋值一个新数组，arr=[2],这种方式我们可以通过属性变化来监听，
但是，如果使用arr.push(2)，这种方式我们就侦听不到了。所以需要我们来特殊处理一下。
7. 关于数组的处理方式，我们可以借用function.apply的属性方法，来操作。如下代码：
    ```javascript
   // 以push方法为例,先创建一个新对象，
   const arrayMethods = {};
   // 对这个对象的push属性进行代理
   Object.defineProperty(arrayMethods, 'push', {
     enumerable: true,
     configurable: true,
     get(...args) {
       // todo... 此处可以进行我们需要的代理操作
       return Array.prototype.push.apply(this, args)
     }
   });
   // 将数据中的数组原型代理成新对象
   if (Array.isArray(val)) val.prototype = arrayMethods

    ```
8. 通过以上的方法，我们就找到了对数组的方法进行侦听的办法。在vue源码中，就是通过这种方式，去代理数组的操作方法的。
实际上，我们需要代理的只是数组属性中对元素位置和数量操作的方法，那么列出来的话，只有七种符合要求：push, shift, unshift,
pop, sort, splice, 'reverse'。正因为如此,vue才会有一个数组操作的坑。如果我们通过arr[0] = 2这种操作去赋值的话。
是不会触发数据渲染方法的，所以也不会有视图同步更新。vue在这方面，给我们提供了一个Vue.prototype.$set方法，去设置数组的值，并且触发更新。
9. 以上就是vue的数据侦听原理。当然，实际原理中的代码不会只有这么简单，比如，源码中的dep并不是一个数组，而是一个Dep类，
它有自己的调用方法，而且添加dep不会使用数组的查重方式，而是将收集订阅的方法放入了Watcher中，通过每一个Watcher有一个保存dep实例的id的map,
因为对象查重比数组要方便有效的多，能节约性能。这些小细节都是必须深入到源码中，才能理解得到其中的奥秘的。
    ```typescript
    class Watcher {
       // 源码中，get方法里，调用dep.push(watcher),实际执行的是这段代码
       // this指向的Watcher实例
      addDep (dep : Dep) {
              const id = dep.id;
             // newDepIds是存储dep实例id的map。
              if (!this.newDepIds.has(id)) {
               this.newDepIds.add(id);
               this.newDeps.push(dep);
               if (!this.depIds.has(id)) {
                 dep.addSub(this)
               }
              }
          }
    }
    ```
**以上就是对vue源码中数据侦听源码(core/observer)的一个大致的分享。**

#### 2. vdom 
1. todo...
#### 3. compiler
1. 入口compiler/index.js 本模块在vue中的作用，是将vue语法写成的字符串，通过该模块的转换，最终输出一个render函数。每个实例都有一个render,
render的作用就是在调用实例的_watcher._update方法时，生成新的vnode传入方法中，进行视图层的更新。
所以，本模块的最终的目的，就是生成vnode传给vm实例使用。

2. 所以，在new Vue(options)时，如果配置项不传入render函数，那么，$mount方法就会调用本模块，将el传入的字符串，
或者el标签的内容innerHtml，当成参数template传入本模块，调用core/compiler/index的createCompiler方法，
将传入的字符串，先通过解析器parse转换成抽象语法树，在通过优化器optimize标记一些静态属性与根节点，然后通过代码生成器generate，
生成render字符串代码。
3. 其中的核心代码为解析器，解析器的工作流程，跟浏览器解析html文档的流程相仿，先在parse作用域下，
创建一个stack执行栈，用来存放解析的tag节点。再创建start,end,common,chars四个方法，四个方法都穿件在当前作用域下，
然后再通过参数方式传入parseHTML，在执行过程中，通过正则匹配的方式，对</>,<></>,<-- -->,text等符号进行匹配，
将匹配到的字段分成开始标签，结束标签，注释节点，文本节点，在匹配到时，分别调用对应的四个方法。如：
   ```
   start：会将当前tag压入栈中。
   end：弹出栈中第一个与tag名称相同的元素，并且将其加入到当前栈顶元素的children属性中。
   通过栈的方式，可以保证当前栈中的上一个元素，必定是当前元素的父元素，保证了树图的构成
   ```
4. 具体的解析，在parseHTML中，是通过一个while(html)进行操作，有一个公共的切割方法advance方法，会根据当前匹配到的字符下标，
将该字符从html字符串中切割掉。然后根据匹配到的tag类型调用不同的方法，直到html被切割完，或者，执行完一次循环后，html字符串没有变化，
则停止循环。如果是后者停止，则会抛出模板错误，停止代码运行。
5. 通过该种方式，将一串vue代码模板，解析成了AST抽象语法书。然后将再调用优化器optimize，将抽象语法树中，没有参数的文本节点，
以及没有特殊属性的tag节点，标记为静态属性，添加static属性，表示该节点不需要进行额外对比，可以复用。
6. 最后，通过生成器generate处理后，生成了字符串代码。比如:
    ```
   字符串代码: _c('div',{attrs:{"id":"app"}},[_v("\n  "+_s(aaa)+"\n")])
   可以通过render = new Function(with(this){return _c('div',{attrs:{"id":"app"}},[_v("\n  "+_s(aaa)+"\n")])})
   ```
7. 将该段解析的代码，解析成可执行的代码，这其中的关键，在于with(this)，通过这种方式，可以将this的属性，直接不用加前缀的调用。
这样，就可以直接拉区vm实例上对应的属性，渲染成静态的新的vnode，然后再传给_update当作参数使用。
8. 模板编译一般只会调用一次，实例化时调用。如果是使用的vue-cli开发工具开发，那么.vue文件都会被预编译成render函数，打包成纯js代码，
可以减少运行时渲染时间。也支持引入vue.runtime.js代码，这个形态的代码，去除了compiler这个模块的内容，可以使得js的包减少大约1/3，
使得前端拉取代码时减少不必要的加载时间，更快的渲染出视图。
