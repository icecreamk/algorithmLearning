function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  // 找到中间位置并分割数组
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // 递归地对左右两部分进行排序，然后合并
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  // 比较两个子数组的元素，将较小的元素放入结果数组
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // 如果左子数组还有剩余元素，添加到结果数组
  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// 示例用法
const array = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(array)); // 输出: [3, 9, 10, 27, 38, 43, 82]
