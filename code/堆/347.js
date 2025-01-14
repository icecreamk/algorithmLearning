// 前 K 个高频元素

// 方法一：map+数组
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
// 题目要求算法的时间复杂度必须优于 O(n log n) ，所以这种实现不合题目要求
var topKFrequent = function (nums, k) {
  let map = new Map(),
    arr = [...new Set(nums)];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });

  return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};

// 方法一：小顶堆+map

var topKFrequent = function (nums, k) {
  let map = new Map(),
    heap = [,];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });

  // 如果元素数量小于等于 k
  if (map.size <= k) {
    return [...map.keys()];
  }

  // 如果元素数量大于 k，遍历map，构建小顶堆
  let i = 0;
  map.forEach((value, key) => {
    if (i < k) {
      // 取前k个建堆, 插入堆
      heap.push(key);
      // 原地建立前 k 堆
      if (i === k - 1) buildHeap(heap, map, k);
    } else if (map.get(heap[1]) < value) {
      // 替换并堆化
      heap[1] = key;
      // 自上而下式堆化第一个元素
      heapify(heap, map, k, 1);
    }
    console.log(JSON.parse(JSON.stringify(heap)));
    i++;
  });
  // 删除heap中第一个元素
  heap.shift();
  return heap;
};

// 原地建堆，从后往前，自上而下式建小顶堆
var buildHeap = (heap, map, k) => {
  if (k === 1) return;
  // 从最后一个非叶子节点开始，自上而下式堆化
  for (let i = Math.floor(k / 2); i >= 1; i--) {
    heapify(heap, map, k, i);
  }
};

// 堆化
let heapify = (heap, map, k, i) => {
  // 自上而下式堆化
  while (true) {
    let minIndex = i;
    if (2 * i <= k && map.get(heap[2 * i]) < map.get(heap[i])) {
      minIndex = 2 * i;
    }
    if (2 * i + 1 <= k && map.get(heap[2 * i + 1]) < map.get(heap[minIndex])) {
      minIndex = 2 * i + 1;
    }
    if (minIndex !== i) {
      swap(heap, i, minIndex);
      i = minIndex;
    } else {
      break;
    }
  }
};

// 交换
let swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3, 3, 3, 3], 2));
console.log(topKFrequent([3, 0, 1, 0], 1)); // [0]


