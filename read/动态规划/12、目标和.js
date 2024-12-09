// 给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。
// 返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

// 示例：
// 输入：nums: [1, 1, 1, 1, 1], S: 3
// 输出：5
// 解释：

// -1+1+1+1+1 = 3
// +1-1+1+1+1 = 3
// +1+1-1+1+1 = 3
// +1+1+1-1+1 = 3
// +1+1+1+1-1 = 3
// 一共有5种方法让最终目标和为3。

const findTargetSumWays = (nums, target) => {
  const sum = nums.reduce((a, b) => a + b);

  if (Math.abs(target) > sum) {
    return 0;
  }

  if ((target + sum) % 2) {
    return 0;
  }

  const halfSum = (target + sum) / 2;

  let dp = new Array(halfSum + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = halfSum; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
    }
  }

  return dp[halfSum];
};
