// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 示例 1：
// 输入：[7,1,5,3,6,4]

// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

// 暴力：
// 时间复杂度：O(n^2)
// 空间复杂度：O(1)

// 贪心
// 因为股票就买卖一次，那么贪心的想法很自然就是取最左最小值，取最右最大值，那么得到的差值就是最大利润。

// C++代码如下：

// class Solution {
// public:
//     int maxProfit(vector<int>& prices) {
//         int low = INT_MAX;
//         int result = 0;
//         for (int i = 0; i < prices.size(); i++) {
//             low = min(low, prices[i]);  // 取最左最小价格
//             result = max(result, prices[i] - low); // 直接取最大区间利润
//         }
//         return result;
//     }
// };

// 时间复杂度：O(n)
// 空间复杂度：O(1)

// 动态规划
const maxProfit = (prices) => {
  const len = prices.length;
  // 创建dp数组
  const dp = new Array(len).fill([0, 0]);
  // dp数组初始化
  dp[0] = [-prices[0], 0];
  for (let i = 1; i < len; i++) {
    // 更新dp[i]
    dp[i] = [
      Math.max(dp[i - 1][0], -prices[i]),
      Math.max(dp[i - 1][1], prices[i] + dp[i - 1][0]),
    ];
  }
  return dp[len - 1][1];
};
