// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，能够偷窃到的最高金额。

// 示例 1：

// 输入：nums = [2,3,2]

// 输出：3

// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

// 示例 2：

// 输入：nums = [1,2,3,1]

// 输出：4

// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 3：

// 输入：nums = [0]

// 输出：0

// 分析：
// 情况1 不考虑头和尾
// 情况2 不考虑尾
// 情况3 不考虑头
// 由于情况2.3包含1，所以不用考虑1

var rob = function (nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    const result1 = robRange(nums, 0, n - 2); // 情况2
    const result2 = robRange(nums, 1, n - 1); // 情况3
    return Math.max(result1, result2);
  };
  
  // 打家劫舍逻辑
  const robRange = (nums, start, end) => {
    if (end === start) return nums[start];
    const dp = Array(nums.length).fill(0);
    dp[start] = nums[start];
    dp[start + 1] = Math.max(nums[start], nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[end];
  };
  