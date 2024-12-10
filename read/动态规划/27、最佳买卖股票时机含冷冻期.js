// 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。
// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
// 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

// 输入: [1,2,3,0,2]
// 输出: 3

// [-1, 0, 0, 0]
// [-1, 1, 0, 0]
// [-1, 2, 1, 1]
// [1, -1, 2, 2]
// [1, 3, 2, -1]

function maxProfit1(prices) {
  // 第i天状态 持股 卖出 非冷冻期(不持股) 处于冷冻期
  const dp = new Array(prices.length).fill(0).map(() => [0, 0, 0, 0]);
  dp[0][0] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    // 持股
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i]);
    // 卖出
    dp[i][1] = dp[i - 1][0] + prices[i];
    // 非冷冻期（不持股）
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1]);
    // 冷冻期（上一天卖出）
    dp[i][3] = dp[i - 1][1];
    console.log(i, dp[i]);
  }
  return Math.max(...dp.pop());
}
const maxProfit2 = (prices) => {
  if (prices.length < 2) {
    return 0;
  } else if (prices.length < 3) {
    return Math.max(0, prices[1] - prices[0]);
  }

  let dp = Array.from(Array(prices.length), () => Array(4).fill(0));
  dp[0][0] = 0 - prices[0];

  for (i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(
      dp[i - 1][0],
      Math.max(dp[i - 1][1], dp[i - 1][3]) - prices[i]
    );
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][3]);
    dp[i][2] = dp[i - 1][0] + prices[i];
    dp[i][3] = dp[i - 1][2];
  }

  return Math.max(
    dp[prices.length - 1][1],
    dp[prices.length - 1][2],
    dp[prices.length - 1][3]
  );
};

console.log(maxProfit1([1, 2, 3, 0, 2]))