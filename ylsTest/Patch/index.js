/*diff element对比demo*/
// 假设我们有两个list，分别对应patch中的newChildren, oldChildren
// name代表tag名，value代表该节点在document中的dom对象
// 简单list
let newList = [
  {name: 'div'},
  {name: 'div'},
  {name: 'h1'},
  {name: 'div'},
  {name: 'h1'},
], oldList = [
  {name: 'h1', value: 3},
  {name: 'div', value: 1},
  {name: 'div', value: 2}];
console.log('简单类型对比：', updateChildren(newList, oldList));

// 多类型list
newList = [
  {name: 'div'},
  {name: 'div'},
  {name: 'h2'},
  {name: 'div'},
  {name: 'h1'},
];
oldList = [
  {name: 'h5', value: 3},
  {name: 'h2', value: 1},
  {name: 'div', value: 4},
  {name: 'div', value: 5},
  {name: 'h1', value: 6},
  {name: 'div', value: 7},
  {name: 'h6', value: 2}];
console.log('多种类型对比：', updateChildren(newList, oldList));

// 带key的多类型list
newList = [
  {name: 'div', key: 'key1'},
  {name: 'div', key: 'key2'},
  {name: 'h2', key: 'key3'},
  {name: 'div', key: 'key4'},
  {name: 'h1', key: 'key5'},
];
oldList = [
  {name: 'h5', value: 3},
  {name: 'h2', value: 1, key: 'key3'},
  {name: 'div', value: 4, key: 'key1'},
  {name: 'div', value: 5, key: 'key2'},
  {name: 'h1', value: 6, key: 'key5'},
  {name: 'div', value: 7, key: 'key4'},
  {name: 'h6', value: 2}];

console.log('带key的多类型:', updateChildren(newList, oldList));

/**
 * @param newList 新vnode
 * @param oldList 旧vnode
 * @returns newList
 * 新旧vnodeList diff对比方法
 */
function updateChildren(newList, oldList) {
  const someVnode = (oldVnode, newVnode) => {
    // 先对比key是否相同，如果key不同，直接放弃比较(key都为空时，条件也成立)
    // 再对比name是否相同，如果两者都相同，则返回对比成功。
    return newVnode.key === oldVnode.key && newVnode.name === oldVnode.name;
  };

// 声明新旧开始与结尾节点的下标和元素
  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldList.length - 1;
  let newEndIndex = newList.length - 1;
  let oldStartNode = oldList[oldStartIndex];
  let newStartNode = newList[newStartIndex];
  let newEndNode = newList[newEndIndex];
  let oldEndNode = oldList[oldEndIndex];
  let keyMap;

// 模拟的diff算法
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    // 对旧节点进行判空操作
    if (oldStartNode === void 0) oldStartNode = oldList[++oldStartIndex];
    else if (oldEndNode === void 0) oldEndNode = oldList[--oldEndIndex];
    else if (someVnode(oldStartNode, newStartNode)) {// 新前->旧前
      newStartNode.value = oldStartNode.value;
      newStartNode = newList[++newStartIndex];
      oldStartNode = oldList[++oldStartIndex];
    } else if (someVnode(oldEndNode, newEndNode)) {// 新后->旧后
      newEndNode.value = oldEndNode.value;
      newEndNode = newList[--newEndIndex];
      oldEndNode = oldList[--oldEndIndex];
    } else if (someVnode(oldEndNode, newStartNode)) {// 新前->旧后
      newStartNode.value = oldEndNode.value;
      newStartNode = newList[++newStartIndex];
      oldEndNode = oldList[--oldEndIndex];
    } else if (someVnode(oldStartNode, newEndNode)) {// 新后->旧前
      newEndNode.value = oldStartNode.value;
      newEndNode = newList[--newEndIndex];
      oldStartNode = oldList[++oldStartIndex];
    } else {
      // 生成旧dom的keyMap
      if (!keyMap) {
        keyMap = {};
        oldList.forEach(item => {
          if (item.key) keyMap[item.key] = item.value;
        });
      }
      // 如果key相同，就认为是同一节点，复用
      if (keyMap[newStartNode.key] !==
          void 0) newStartNode.value = keyMap[newStartNode.key];
      newStartNode = newList[++newStartIndex];
    }
  }
  return newList;
}


