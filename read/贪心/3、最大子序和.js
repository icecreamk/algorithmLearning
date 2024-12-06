// 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:
// 输入: [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释:  连续子数组  [4,-1,2,1] 的和最大，为  6。

// 暴力执法：两个for，复杂度O(n^2)

// 贪心
var maxSubArray = function (nums) {
  let result = -Infinity;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i];
    if (count > result) {
      result = count;
    }

    // 遍历 nums，从头开始用 count 累积，如果 count 一旦加上 nums[i]变为负数，
    // 那么就应该从 nums[i+1]开始从 0 累积 count 了，因为已经变为负数的 count，只会拖累总和。
    if (count < 0) {
      count = 0;
    }
  }
  return result;
};

// 动态规划
function maxSubArray1(nums) {
  if (nums.length === 0) return 0;

  let dp = new Array(nums.length);
  dp[0] = nums[0];
  let maxSum = dp[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
}
