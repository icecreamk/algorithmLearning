// 寻找重复数

// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
// 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
// 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

// 输入：nums = [1,3,4,2,2]
// 输出：2

// 输入：nums = [3,1,3,4,2]
// 输出：3

// 输入：nums = [3,3,3,3,3]
// 输出：3

// 递归 有空间要求，不行

// 哈希 有空间要求，不行

// 快慢指针
// 1.cur1 每遍历到一个节点，就让 cur2 从头遍历之前所有节点
// 如果 cur2 走到 cur1，所用的步数二者一样，则相遇点不是入环点
// 如果 cur2 走到 cur1，用的步数二者不一样，则相遇点是入环点，cur1比 cur2多走一个环
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = 0;
  let fast = 0;
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]]; // slow跳一步，fast跳两步
    if (slow == fast) {
      // 指针首次相遇
      fast = 0; // 让快指针回到起点
      while (true) {
        // 开启新的循环
        if (slow == fast) {
          // 如果再次相遇，就肯定是在入口处
          return slow; // 返回入口，即重复的数
        }
        slow = nums[slow]; // 两个指针每次都进1步
        fast = nums[fast];
      }
    }
  }
};

// 二分法

// mid = (1 + n) / 2，重复数要么落在[1, mid]，要么落在[mid + 1, n]。
// 遍历原数组，统计 <= mid 的元素个数，记为 k。
// 如果k > mid，说明有超过 mid 个数落在[1, mid]，但该区间只有 mid 个“坑”，说明重复的数落在[1, mid]。
// 相反，如果k <= mid，则说明重复数落在[mid + 1, n]。
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let lo = 1;
  let hi = nums.length - 1; //题目注明了：nums.length == n + 1
  while (lo < hi) {
    const mid = (lo + hi) >>> 1; // 求中间索引
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] <= mid) {
        count++;
      }
    }
    if (count > mid) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return lo;
};
