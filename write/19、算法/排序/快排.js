// 快速排序（分治思想）
// 获取中间位置，小于放左边 大于放右边

// splice
function quickSort1(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const midIndex = Math.floor(len / 2);
  const midValue = arr.splice(midIndex, 1)[0];

  const left = [];
  const right = [];

  //   注意这里不用len而是arr.length，因为arr已被splice修改
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i];
    if (n < midValue) {
      left.push(n);
    } else {
      right.push(n);
    }
  }

  return quickSort1(left).concat([midValue], quickSort1(right));
}

const test = [1, 10, 4, 7, 3, 2, 56, 1];
console.log(quickSort1(test));
// slice
function quickSort2(arr) {
  const len = arr.length;
  if (len <= 1) return arr;

  const midIndex = Math.floor(len / 2);
  const midValue = arr.slice(midIndex, midIndex + 1)[0];

  const left = [];
  const right = [];

  for (let i = 0; i < len; i++) {
    // const n = arr[i];
    // if (n < midValue) {
    // }
    // 这里要忽略  midIndex
    if (i !== midIndex) {
      const n = arr[i];
      if (n <= midValue) {
        left.push(n);
      } else {
        right.push(n);
      }
    }
  }
  return quickSort2(left).concat([midValue], quickSort2(right));
}

var arr1 = [];
for (var i = 0; i < 10 * 10000; i++) {
  arr1.push(Math.floor(Math.random() * 10000));
}


const test1 = [1, 10, 4, 7, 3, 2, 56, 1];
console.log(quickSort2(test1));

// 性能
console.time("quickSort1");
quickSort1(arr1);
console.timeEnd("quickSort1");

var arr2 = [];
for (var i = 0; i < 10 * 10000; i++) {
  arr2.push(Math.floor(Math.random() * 10000));
}
console.time("quickSort2");
quickSort2(arr2);
console.timeEnd("quickSort2");
