// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:

// 输入: [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 记得看看之前的贪心算法

const maxSubArray = (nums) => {
  // 数组长度，dp初始化
  const len = nums.length;
  let dp = new Array(len).fill(0);
  dp[0] = nums[0];
  // 最大值初始化为dp[0]
  let max = dp[0];
  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    // 更新最大值
    max = Math.max(max, dp[i]);
  }
  return max;
};
