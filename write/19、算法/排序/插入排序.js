// 在已经排序的里面寻找插入位置
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let target = arr[j];

    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = target;
  }
  return arr;
}

console.log(insertSort([5, 4, 3, 2, 1]));
// [4, 5, 3, 2, 1]
// [3, 4, 5, 2, 1]
// [2, 3, 4, 5, 1]
// [1, 2, 3, 4, 5]
