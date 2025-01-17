// 最大子数组和
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23

/**
 * @param {number[]} nums
 * @return {number}
 */

// 贪心
var maxSubArray = function (nums) {
  if (!nums.length) return 0;
  let sum = nums[0];
  let pre = nums[0];

  for (let i = 1; i < nums.length; i++) {
    pre = Math.max(nums[i], pre + nums[i]);
    sum = Math.max(sum, pre);
  }

  return sum;
};


// 也可以用动态规划
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
