// <---------------------><---------------------> Array.isArray  <---------------------><--------------------->
Array.myIsArray = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

Array.myIsArray([]) // true

// <---------------------><---------------------> Array.of  <---------------------><--------------------->

// es6
Array.myArrayOf = function (...args) {
  // return Array.prototype.slice.call(args);
  return [].slice.call(args);
};

// es5
Array.myES5ArrayOf = function () {
  // return Array.prototype.slice.call(args);
  return [].slice.call(arguments);
};

Array.myArrayOf(1, 2, 3); // [1, 2, 3]
Array.myArrayOf(3); // [3]
Array.myArrayOf(3).length; // 1

Array.myES5ArrayOf(1, 2, 3); // [1, 2, 3]
Array.myES5ArrayOf(3); // [3]
Array.myES5ArrayOf(3).length; // 1


// <---------------------><---------------------> 实现 forEach  <---------------------><--------------------->
Array.prototype.myForEach = function (fn, context = window) {
  // this => arr
  let self = this,
    i = 0,
    len = self.length;
  for (; i < len; i++) {
    typeof fn === "function" && fn.call(context, self[i], i);
  }
};

// 测试数据
const array = [1, 2, 3, 4];

// 测试 1: 基本功能测试
console.log("测试 1: 基本功能测试");
let result1 = [];
array.myForEach((item) => {
  result1.push(item * 2);
});
console.log(result1); // 应输出: [2, 4, 6, 8]

// 测试 2: 检查索引和数组本身
console.log("测试 2: 检查索引和数组本身");
let result2 = [];
array.myForEach((item, index, arr) => {
  result2.push({ item, index, arr });
});
console.log(result2); // 应输出: [{ item: 1, index: 0, arr: [1, 2, 3, 4] }, { item: 2, index: 1, arr: [1, 2, 3, 4] }, ...]

// 测试 3: 检查上下文 (context)
console.log("测试 3: 检查上下文 (context)");
const obj = { name: "test" };
array.myForEach(function (item) {
  this.result = item;
}, obj);
console.log(obj.result); // 应输出: 4

// 测试 4: 检查空数组
console.log("测试 4: 检查空数组");
const emptyArray = [];
emptyArray.myForEach((item) => {
  console.error("不应该执行这里");
});
console.log("空数组测试通过");

// 测试 5: 检查非函数参数
console.log("测试 5: 检查非函数参数");
array.myForEach(null);
console.log("非函数参数测试通过");

// 测试 6: 检查不传入参数
console.log("测试 6: 检查不传入参数");
array.myForEach();
console.log("不传入参数测试通过");

// <---------------------><---------------------> 实现 filter  <---------------------><--------------------->
Array.prototype.myFilter = function (fn, context = window) {
  let newArr = [],
    i = 0,
    len = this.length;
  for (; i < len; i++) {
    if (fn.apply(context, [this[i], i, this])) {
      newArr.push(this[i]);
    }
  }

  return newArr;
};

// 测试数据
const array1 = [1, 2, 3, 4, 5];

// 测试 1: 基本功能测试
console.log("测试 1: 基本功能测试");
const result11 = array1.myFilter((item) => item % 2 === 0);
console.log(result11); // 应输出: [2, 4]

// 测试 2: 检查索引和数组本身
console.log("测试 2: 检查索引和数组本身");
const result22 = array1.myFilter(
  (item, index, arr) => item > 3 && arr[index - 1] % 2 === 0
);
console.log(result22); // 应输出: [4]

// 测试 3: 检查上下文 (context)
console.log("测试 3: 检查上下文 (context)");
const obj1 = { threshold: 3 };
const result3 = array1.myFilter(function (item) {
  return item > this.threshold;
}, obj1);
console.log(result3); // 应输出: [4, 5]

// 测试 4: 检查空数组
console.log("测试 4: 检查空数组");
const emptyArray1 = [];
const result4 = emptyArray1.myFilter((item) => item > 0);
console.log(result4); // 应输出: []

// 测试 5: 检查非函数参数
console.log("测试 5: 检查非函数参数");
const result5 = array1.myFilter(null);
console.log(result5); // 应输出: []

// 测试 6: 检查不传入参数
console.log("测试 6: 检查不传入参数");
const result6 = array1.myFilter();
console.log(result6); // 应输出: []

// 测试 7: 检查返回值类型
console.log("测试 7: 检查返回值类型");
const result7 = array1.myFilter((item) => true);
console.log(Array.isArray(result7)); // 应输出: true

// <---------------------><---------------------> 实现 find  <---------------------><--------------------->

Array.prototype.myFind = function (fn, context = window) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i)) {
      return this[i];
    }
  }
  // 没找到自动返回undefined
};

[1, 2, 3].myFind((item) => {
  return item === 2;
}); // 2

// <---------------------><---------------------> 实现 findIndex  <---------------------><--------------------->
Array.prototype.myFindIndex = function (fn, context = window) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i)) {
      return i;
    }
  }

  return -1;
};

[1, 2, 4, 5, 6].myFindIndex((item) => {
  return item === 5;
}); // 3

// <---------------------><---------------------> 实现 map  <---------------------><--------------------->
Array.prototype.myMap = function (fn, context = window) {
  var arr = Array.prototype.slice.call(this), // 由于es5所以不用...展开符
    newArr = [],
    i = 0;

  for (; i < arr.length; i++) {
    // 把当前值、索引、当前数组 传入
    // [1,2,3].map((curr, index, arr))
    newArr.push(fn.call(context, arr[i], i, this));
  }
  return newArr;
};

// <---------------------><---------------------> 实现 reduce  <---------------------><--------------------->
Array.prototype.myReduce = function (fn, initValue) {
  var arr = Array.prototype.slice.call(this);
  var res, startIndex;

  res = initValue ? initValue : arr[0];
  startIndex = initValue ? 0 : 1;

  for (var i = startIndex; i < arr.length; i++) {
    // 把初始值，当前值，索引，当前数组传入
    // [1,2,3].reduce(initValue, curr, index, arr)
    res = fn.call(null, res, arr[i], i, this);
  }
  return res;
};

[1, 2, 3].myReduce((a, b) => {
  return a + b;
}, 0); // 6

// <---------------------><---------------------> 实现 every  <---------------------><--------------------->
Array.prototype.myEvery = function (fn, context = window) {
  var len = this.length;
  flag = true;
  i = 0;

  for (; i < len; i++) {
    if (!fn.call(context, this[i], i, this)) {
      flag = false;
      break;
    }
  }

  return flag;
};

[1, 2, 3].myEvery((item) => item > 0); // true
// <---------------------><---------------------> 实现 some  <---------------------><--------------------->
Array.prototype.mySome = function (fn, context = window) {
  var len = this.length;
  flag = false;
  i = 0;

  for (; i < len; i++) {
    if (fn.call(context, this[i], i, this)) {
      flag = true;
      break;
    }
  }

  return flag;
};

[1, 2, 3].mySome((item) => item > 2); // true
