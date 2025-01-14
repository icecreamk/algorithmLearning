// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
//     输入: nums = [1,1,1,2,2,3], k = 2
//     输出: [1,2]

//     输入: nums = [1], k = 1
//     输出: [1]

// 这道题目主要涉及到如下三块内容：
//     要统计元素出现频率
//     对频率排序
//     找出前K个高频元素

// 统计频率：O(n)，因为需要遍历整个数组。
// 构建堆或优先队列：O(n log K)，因为每次插入堆的时间复杂度为 O(log K)，最多需要插入 n 次。
// 输出结果：O(K log K)，因为从堆中取出 K 个元素，每次取出的时间复杂度为 O(log K)。
// 综合起来，总的时间复杂度为 O(n log K)。
// 空间复杂度: O(n)

// 而且优先级队列内部元素是自动依照元素的权值排列。那么它是如何有序排列的呢？
// 堆是一棵完全二叉树
// 本题我们就要使用优先级队列来对部分频率进行排序。
// 为什么不用快排呢， 使用快排要将map转换为vector的结构，然后对整个数组进行排序， 而这种场景下，我们其实只需要维护k个有序的序列就可以了，所以使用优先级队列是最优的。

// 那么问题来了，定义一个大小为k的大顶堆，在每次移动更新大顶堆的时候，每次弹出都把最大的元素弹出去了，那么怎么保留下来前K个高频元素呢。
// 而且使用大顶堆就要把所有元素都进行排序，那能不能只排序k个元素呢？
// 所以我们要用小顶堆，因为要统计最大前k个元素，只有小顶堆每次将最小的元素弹出，最后小顶堆里积累的才是前k个最大元素。

// js 没有堆 需要自己构造
class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.queue = [];
  }

  // 添加
  push(item) {
    // 推入元素
    this.queue.push(item);

    // 上浮
    let index = this.size() - 1; // 记录推入元素下标
    let parent = Math.floor((index - 1) / 2); // 记录父节点下标

    console.log("start", index, parent, [...this.queue]);

    while (parent >= 0 && this.compare(parent, index) > 0) {
      // 注意compare参数顺序
      [this.queue[index], this.queue[parent]] = [
        this.queue[parent],
        this.queue[index],
      ];

      // 更新下标
      index = parent;
      parent = Math.floor((index - 1) / 2);

      console.log("continue", index, parent);
      console.log([...this.queue]);
    }
  }

  // 获取堆顶元素并移除
  pop() {
    // 边界情况，只有一个元素或没有元素应直接弹出
    if (this.size() <= 1) {
      return this.queue.pop();
    }

    // 堆顶元素
    const out = this.queue[0];

    // 移除堆顶元素 填入最后一个元素
    this.queue[0] = this.queue.pop();

    // 下沉
    let index = 0; // 记录下沉元素下标
    let left = 1; // left 是左子节点下标 left + 1 则是右子节点下标
    let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left;

    while (this.compare(index, searchChild) > 0) {
      // 注意compare参数顺序
      [this.queue[index], this.queue[searchChild]] = [
        this.queue[searchChild],
        this.queue[index],
      ];

      // 更新下标
      index = searchChild;
      left = 2 * index + 1;
      searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
    }

    return out;
  }

  size() {
    return this.queue.length;
  }

  // 使用传入的 compareFn 比较两个位置的元素
  compare(index1, index2) {
    // 处理下标越界问题
    if (this.queue[index1] === undefined) return 1;
    if (this.queue[index2] === undefined) return -1;

    return this.compareFn(this.queue[index1], this.queue[index2]);
  }
}

var topKFrequent = function (nums, k) {
  const map = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 创建小顶堆
  const heap = new Heap((a, b) => a[1] - b[1]);
  // entry 是一个长度为2的数组，0位置存储key，1位置存储value
  for (const entry of map.entries()) {
    heap.push(entry);
    if (heap.size() > k) {
      heap.pop();
    }
  }
  const res = [];
  for (let i = heap.size() - 1; i >= 0; i--) {
    res[i] = heap.pop()[0];
  }
  return res;
};

console.log("end", topKFrequent([1, 1, 1, 1, 2, 2, 2, 3, 3, 4], 4));

// 桶排序
var topKFrequent1 = function (nums, k) {
  const map = new Map();
  for (const n of nums) map.set(n, 1 + (map.get(n) || 0));

  const buckets = new Array(nums.length + 1);

  // 这里对桶进行排序
  for (const [n, v] of map)
    !buckets[v] ? (buckets[v] = [n]) : buckets[v].push(n);
  console.log(buckets, map);

  const res = [];

  // 这时候桶是以次数排序，越后面的越大，所以从后往前遍历
  for (let i = buckets.length - 1; i > -1; i--) {
    if (res.length >= k) break;
    if (buckets[i]) res.push(...buckets[i]);
  }

  return res.length > k ? res.slice(0, k) : res;
};

console.log("end1", topKFrequent1([7, 3, 3, 3, 1, 1, 2], 3));


// 1
// 1 2 => 2 1
// 2 1 3 => 3 1 2
// 3 1 2 4 => 3 4 2 1 => 4 3 2 1
