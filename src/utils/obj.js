function filter(obj, func) {
  let ret = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && func(obj[key], key)) {
      ret[key] = obj[key]
    }
  }
  return ret
}

function map(obj, callback) {
  let result = {}
  Object.keys(obj).forEach(function(key) {
    result[key] = callback.call(obj, obj[key], key, obj)
  })
  return result
}

export { filter, map }
