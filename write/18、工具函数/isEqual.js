// 递归退出条件：
// 两个值类型不同
// 两个值其中一个是null

// 提前结束递归：
// 两个值keys数量不同
// 两个值是同一个变量

function deepEqual(obj1, obj2) {
  // 其中一个为值类型或者null
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }

  // 提前结束递归:
  // 两个值是同一个变量
  if (obj1 === obj2) {
    return;
  }
  //  两个值keys数量不同
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of obj1) {
    // 递归
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
