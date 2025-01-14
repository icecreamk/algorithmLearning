// 单词搜索

// 第 n 个元素的 左子节点 为 2*n+1
// 第 n 个元素的 右子节点 为 2*n+2
// 第 n 个元素的 父节点 为 (n-1)/2
// 最后一个非叶子节点为 Math.floor(arr.length/2)-1

// 将无序序列构建成一个堆，根据升序降序需求选择大顶堆
// 将堆顶元素与末尾元素交换，将最大元素「沉」到数组末端
// 重新调整结构，使其满足堆定义，
// 然后继续交换堆顶与当前末尾元素，反复执行调整、交换步骤，直到整个序列有序。

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapify(arr, x, length) {
  var l = 2 * x + 1;
  var r = 2 * x + 2;
  // console.log("x", x, l, r);
  var largest = x;

  // 如果子节点 大于 当前的，则交换，直到属于换到属于自己的位置
  if (l < length && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < length && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest != x) {
    swap(arr, x, largest);
    // 递归交换以下的是否也建好堆.
    heapify(arr, largest, length);
  }
}

var findKthLargest = function (nums, k) {
  var size = nums.length;
  // 建立堆
  for (var i = parseInt(size / 2) + 1; i >= 0; i--) {
    heapify(nums, i, size);
  }
  // 排序
  for (var j = size - 1; j >= size - k; j--) {
    // 得到本次的最大，将最大的与最后一个交换位子
    swap(nums, 0, j);
    heapify(nums, 0, j);
  }
  return nums[size - k];
};

// console.log(findKthLargest([3, 10, 1, 5, 9, 4], 2));
