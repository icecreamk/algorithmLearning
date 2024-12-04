// <---------------------><---------------------> 双层循环 O(n^2)  <---------------------><--------------------->
function distinct(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(arr[i]);
    }
  }
  return result
}

// 不需要额外空间
function distinct1(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
}

// <---------------------><---------------------> filter  <---------------------><--------------------->
function distinct2(a, b = []) {
  let arr = a.concat(b);
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
    // 或者
    // return arr.includes(item);
  });
}

// <---------------------><---------------------> ES6 去重  <---------------------><--------------------->
function distinct3(arr) {
  // return [...new Set(arr)];
  return Array.from(new Set(arr));
}

// <---------------------><---------------------> reduce  <---------------------><--------------------->
function distinct4(arr) {
  return arr.reduce((acc, current) => {
    if (!acc.includes(current)) {
      acc.push(current);
    }
    return acc;
  }, []);
}

console.log("0", distinct([1,2,3,3]));
console.log("1", distinct1([1,2,3,3]));
console.log("2", distinct2([1,2,3,3]));
console.log("3", distinct3([1,2,3,3]));
console.log("4", distinct4([1,2,3,3]));
