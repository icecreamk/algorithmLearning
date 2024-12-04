// 数组扁平化：多维数组转成一维
arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
// <---------------------><--------------------- 1、直接调用  <---------------------><--------------------->

flat1 = arr.flat(Infinity);

// <---------------------><--------------------- 2、正则  <---------------------><--------------------->
str2 = JSON.stringify(arr);
// split 自动将字符串转数组
flat2 = str.replace(/(\[|\])/g, "").split(",");

// <---------------------><--------------------- 3、正则2  <---------------------><--------------------->
str3 = JSON.stringify(arr);
str3 = str3.replace(/(\[|\])/g, "");
str3 = "[" + str3 + "]";
flat3 = JSON.parse(str3);

// <---------------------><--------------------- 4、递归  <---------------------><--------------------->

let result = [];
let fn = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (Array.isArray(item)) {
      fn(item);
    } else {
      result.push(item);
    }
  }
};

fn([1, 2, [3, [4, 5]]]);
console.log(result);

// <---------------------><--------------------- 5、reduce  <---------------------><--------------------->

function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

flatten([1, 2, [3, [4, 5]]]);

// <---------------------><--------------------- 6、迭代  <---------------------><--------------------->
function flatten(arr) {
  if (!arr.length) return;
  while (arr.some(Array.isArray)) {
    // 利用扩展符不断展开
    arr = [].concat(...arr);
  }
  return arr;
}

// <---------------------><--------------------- 7、扩展运算符  <---------------------><--------------------->
// 参考上面例子
