function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

function isObject(obj) {
  return typeof obj === 'object'
}

module.exports = {
  remove,
  isObject
}
