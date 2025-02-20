// 每次选最小/最大的往前放

// 不稳定：因为在每一次选择最小元素的过程中，它会将找到的最小元素与未排序序列的第一个元素交换位置。
// 这种操作可能导致相同值的元素之间的相对顺序被改变。


function selectSort(arr) {
  const len = arr.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 如果minIndex对应的元素不是目前的元素，则交换
    if (minIndex !== i) {
      // 交换元素
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

console.log(selectSort([1, 5, 2, 3, 4, 6, 7, 8, 9, 10]));
