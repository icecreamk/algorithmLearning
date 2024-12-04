function getType(obj) {
  if (obj === null) return String(obj);
  return typeof obj === "object"
    ? // ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
      Object.prototype.toString
        .call(obj)
        .replace("[object ", "")
        .replace("]", "")
        .toLowerCase()
    : typeof obj;
}


// 测试
getType({})
getType(new Date())
getType(new RegExp())
getType(new Error())
getType(new Map())
getType(new Set())
getType(new WeakMap())
getType(new WeakSet())
getType(null)
getType(undefined)
getType(Symbol())
getType(function () {})
getType(123)
