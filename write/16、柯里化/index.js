// 柯里化（是一个高阶函数）
// 思想：利用闭包，预先处理
// 定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数
// 特点：参数复用、提前返回、延迟执行

// 实现：
// 把多次传入的参数合并
// 每次返回新函数
// 每次入参都是一个

// 思考：接收足够的参数后再执行原函数，如何确定何时达到足够的参数？
// 两个思路：
// 1、通过函数的length属性，获取形参个数
// 2、调用时，手动指定个数

// 方式1
function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function () {
    // newArgs = args.concat([...arguments]);
    // 或者
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    }
    return fn.apply(this, newArgs);
  };
}

// 测试
var fn = curry(function (a, b, c) {
  return a + b + c;
});

console.log(fn(1, 2, 3));
console.log(fn(1, 2)(3));
console.log(fn(1)(2)(3));

// 方式2

function curry1(fn) {
  let length = fn.length;
  let args = [];

  function calc(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length < length) {
      // 参数不够返回函数
      return calc;
    }
    // 参数够了执行函数
    return fn.apply(this, args.slice(0, length)); // 截取length，超过的参数没有意义
  }

  return calc;
}

// 测试
var fn1 = curry1(function (a, b, c) {
  return a + b + c;
});

console.log(fn1(1, 2, 3));
console.log(fn1(1, 2)(3));
console.log(fn1(1)(2)(3));

// 方式3

function curry2(fn, arr = []) {
  let len = fn.length;
  return function (...args) {
    let newArr = [...arr, ...args];
    // 如果传入的参数等于指定的参数，执行函数
    if (newArr.length === len) {
      return fn(...newArr);
    }
    // 递归收集参数
    return curry2(fn, newArr);
  };
}

var fn2 = curry2(function (a, b, c) {
  return a + b + c;
});

console.log(fn2(1, 2, 3));
console.log(fn2(1, 2)(3));
console.log(fn2(1)(2)(3));

// es写法
const curry3 =
  (fn, arr = []) =>
  (...args) =>
    ((arg) => (arg.length === fn.length ? fn(...arg) : curry3(fn, arg)))([
      ...arr,
      ...args,
    ]);

var fn3 = curry3(function (a, b, c) {
  return a + b + c;
});

console.log(fn3(1, 2, 3));
console.log(fn3(1, 2)(3));
console.log(fn3(1)(2)(3));

// 应用：
// 判断类型，参数多少个，就执行多少次收集
function isType(type, val) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

let newType = curry3(isType);
let isString = newType("String");
let isNumber = newType("Number");

isString("hello world"); // true
isNumber(888); // true




