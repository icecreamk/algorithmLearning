// 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

// 示例:

// nums = [1, 2, 3]
// target = 4
// 所有可能的组合为： (1, 1, 1, 1) (1, 1, 2) (1, 2, 1) (1, 3) (2, 1, 1) (2, 2) (3, 1)

// 时间复杂度: O(target * n)，其中 n 为 nums 的长度
// 空间复杂度: O(target)
const combinationSum4 = (nums, target) => {
  let dp = Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i >= nums[j]) {
        dp[i] += dp[i - nums[j]];
      }
    }
  }

  return dp[target];
};
