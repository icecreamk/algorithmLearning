// 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回滑动窗口中的最大值。
// 进阶：
// 你能在线性时间复杂度内解决此题吗？

// 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回滑动窗口中的最大值。

// 暴力执法：遍历一遍的过程中每次从窗口中再找到最大的数值，这样很明显是O(n × k)的算法。

// 有的同学可能会想用一个大顶堆（优先级队列）来存放这个窗口里的k个数字，这样就可以知道最大的最大值是多少了， 但是问题是这个窗口是移动的，而大顶堆每次只能弹出最大值，我们无法移除其他数值，这样就造成大顶堆维护的不是滑动窗口里面的数值了。所以不能用大顶堆。
// 此时我们需要一个队列，这个队列呢，放进去窗口里的元素，然后随着窗口的移动，队列也一进一出，每次移动之后，队列告诉我们里面的最大值是什么。

// 步骤
// 这是使用单调队列的经典题目。（单调队列不是一成不变的，而是不同场景不同写法，总之要保证队列里单调递减或递增的原则，所以叫做单调队列）
// pop(value)：如果窗口移除的元素value等于单调队列的出口元素，那么队列弹出元素，否则不用任何操作
// push(value)：如果push的元素value大于入口元素的数值，那么就将队列入口的元素弹出，直到push元素的数值小于等于队列入口元素的数值为止
// 保持如上规则，每次窗口移动的时候，只要问que.front()就可以返回当前窗口的最大值。

// 时间复杂度: O(n)
// 空间复杂度: O(k)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  class MonoQueue {
    queue;
    constructor() {
      this.queue = [];
    }
    enqueue(value) {
      let back = this.queue[this.queue.length - 1];

      // 每次遍历，如果遇到更大的，就把这个最大的放前面，之前都清空清空（因为其他元素对于当前窗口来说已经，不是最大的，没有存在的意义）
      while (back !== undefined && back < value) {
        this.queue.pop();
        back = this.queue[this.queue.length - 1];
      }
      this.queue.push(value);
    }
    dequeue(value) {
      let front = this.front();
      // 每次遍历的时候，如果当前元素等于最大的那一个，说明元素已经是窗口的左边界，下次循环，窗口已经右边移动一位，这个没用可以清除了
      if (front === value) {
        this.queue.shift();
      }
    }
    front() {
      return this.queue[0];
    }
  }
  let helperQueue = new MonoQueue();
  let i = 0,
    j = 0;
  let resArr = [];
  while (j < k) {
    helperQueue.enqueue(nums[j++]);
  }
  resArr.push(helperQueue.front());

  while (j < nums.length) {
    helperQueue.enqueue(nums[j]);
    helperQueue.dequeue(nums[i]);
    resArr.push(helperQueue.front());
    i++, j++;
  }
  return resArr;
};

// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 1, 2], 3)); // [ 3, 3, 5, 5, 5, 3 ]
console.log(maxSlidingWindow([1, 3, -1, 5, -3, 3, 1, 2], 3)); // [ 3, 5, 5, 5, 3, 3 ]
// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [ 3, 3, 5, 5, 6, 7 ]
