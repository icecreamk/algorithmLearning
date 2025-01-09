// 滑动窗口最大值

// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]

// [1,4,2,3] 2
// [4 4 3]
// pop(value)：如果窗口移除的元素value等于单调队列的出口元素，那么队列弹出元素，否则不用任何操作
// push(value)：如果push的元素value大于入口元素的数值，那么就将队列入口的元素弹出，直到push元素的数值小于等于队列入口元素的数值为止
// 保持如上规则，每次窗口移动的时候，只要问que.front()就可以返回当前窗口的最大值。

var maxSlidingWindow = function (nums, k) {
  const res = [];
  const q = [];

  for (let i = 0; i < nums.length; i++) {
    // 左边窗口缩小，删除队头
    if (i >= k && q.length && q[0] === nums[i - k]) {
      q.shift();
    }

    // 右边窗口扩大，可以将小于的值（无效值）覆盖掉，所以也删除
    while (q.length && nums[i] > q[q.length - 1]) {
      q.pop();
    }

    q.push(nums[i]);

    if (i >= k - 1) {
      res.push(q[0]);
    }
  }
  return res;
};

// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// console.log(maxSlidingWindow([1, 4, 2, 3], 2));
// console.log(maxSlidingWindow([7, 2, 4], 2));
// console.log(maxSlidingWindow([1, 3, 1, 2, 0, 5], 3));
console.log(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4));


