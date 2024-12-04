// ---------------------------------------------- JSON --------------------------------------------
// 缺点：
// 1. 无法处理函数、undefined、symbol、正则
// 2. 无法保留 constructor，所有构造函数全部指向Object
// 3. 无法解决循环引用(即无限递归，会导致栈溢出) 如 a = {name: 1}; a.info = a

const newObj = JSON.parse(JSON.stringify(oldObj));

// ---------------------------------------------- 简单 --------------------------------------------
function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    // key是对象的自有属性 而不是继承来的
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}

// ---------------------------------------------- 完整 --------------------------------------------

// 定义一个用于存储已经处理过的对象的映射
const visited = new WeakMap();

// map是强引用，会导致obj和map强绑定，无法释放，导致内存泄露， weakMap弱引用，可以进行垃圾回收
function deepClone(obj, hash = new WeakMap()) {
  // 处理非对象或 null 的情况
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 检查是否已经处理过该对象，避免循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 创建一个新的实例，保持构造函数一致
  let newObj;
  if (obj instanceof Date) {
    newObj = new Date(obj);
  } else if (obj instanceof RegExp) {
    newObj = new RegExp(obj);
  } else if (typeof obj === "function") {
    // 对于普通函数，创建一个新的函数并复制其原型链。
    // 对于箭头函数，使用 Function.prototype.toString 方法获取箭头函数的源代码，然后通过 eval 重新创建箭头函数。
    // 克隆函数
    if (obj.prototype) {
      // 普通函数
      newObj = function (...args) {
        return obj.apply(this, args);
      };
      newObj.prototype = Object.create(obj.prototype);
    } else {
      // 箭头函数
      const fnStr = obj.toString();
      newObj = eval(`(${fnStr})`);
    }
  } else if (obj instanceof Map) {
    // 克隆 Map
    newObj = new Map();
    obj.forEach((value, key) => {
      newObj.set(key, deepClone(value, hash));
    });
  } else if (obj instanceof Set) {
    // 克隆 Set
    newObj = new Set();
    obj.forEach((value) => {
      newObj.add(deepClone(value, hash));
    });
  } else {
    newObj = Array.isArray(obj) ? [] : {};
  }

  // 将新对象存入映射中
  hash.set(obj, newObj);

  // 遍历对象的所有属性
  if (obj instanceof Map || obj instanceof Set) {
    // 如果是 Map 或 Set，已经处理过了，不需要再遍历
    return newObj;
  }

  // 使用 for...in 循环遍历对象的所有属性，并使用 hasOwnProperty 方法确保只处理对象的自有属性。递归调用 deepClone 方法克隆每个属性的值。
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归克隆属性值
      newObj[key] = deepClone(obj[key], hash);
    }
  }

  // 返回克隆后的新对象
  return newObj;
}

// 示例测试
const oldObj = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "painting"],
  date: new Date(),
  regex: /abc/g,
  func: function () {
    console.log("Hello");
  },
  arrowFunc: () => console.log("Arrow Hello"),
  symbol: Symbol("unique"),
  nested: {
    info: "details",
  },
  map: new Map([
    ["key1", "value1"],
    ["key2", { nested: "value2" }],
  ]),
  set: new Set(["item1", { nested: "item2" }]),
};

oldObj.self = oldObj; // 循环引用

const clonedObj = deepClone(oldObj);

console.log(clonedObj); // 应输出与 oldObj 相同的结构
console.log(clonedObj === oldObj); // 应输出 false
console.log(clonedObj.nested === oldObj.nested); // 应输出 false
console.log(clonedObj.self === clonedObj); // 应输出 true
console.log(clonedObj.date instanceof Date); // 应输出 true
console.log(clonedObj.regex instanceof RegExp); // 应输出 true
console.log(typeof clonedObj.func === "function"); // 应输出 true
console.log(typeof clonedObj.arrowFunc === "function"); // 应输出 true
console.log(clonedObj.symbol.toString() === oldObj.symbol.toString()); // 应输出 true
console.log(clonedObj.map instanceof Map); // 应输出 true
console.log(clonedObj.set instanceof Set); // 应输出 true
console.log(clonedObj.map.get("key2") === oldObj.map.get("key2")); // 应输出 false
console.log(
  clonedObj.set.values().next().value === oldObj.set.values().next().value
); // 应输出 false

// 测试箭头函数
clonedObj.arrowFunc(); // 应输出 "Arrow Hello"
