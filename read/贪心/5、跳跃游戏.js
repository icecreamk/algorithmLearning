// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个位置。

// 示例  1:
// 输入: [2,3,1,1,4]
// 输出: true
// 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
// 示例  2:

// 输入: [3,2,1,0,4]
// 输出: false
// 解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

var canJump = function (nums) {
  if (nums.length === 1) return true;
  let cover = 0;
  for (let i = 0; i <= cover; i++) {
    cover = Math.max(cover, i + nums[i]);
    if (cover >= nums.length - 1) {
      return true;
    }
  }
  return false;
};

// 动态规划的实现会稍微复杂一些，并且时间复杂度为 O(n^2)。
var canJump = function (nums) {
  const n = nums.length;
  // dp[i] 表示是否可以到达位置 i
  const dp = new Array(n).fill(false);
  dp[0] = true; // 初始位置总是可达的

  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue; // 如果当前位置不可达，则跳过
    for (let j = 1; j <= nums[i]; j++) {
      if (i + j >= n - 1) return true; // 如果可以到达或超过最后一个位置，返回 true
      dp[i + j] = true; // 标记位置 i+j 为可达
    }
  }

  return dp[n - 1]; // 返回最后一个位置是否可达
};
