// 零钱兑换
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1

// 输入：coins = [2], amount = 3
// 输出：-1

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

// dfs
var coinChange = function (coins, amount) {
  let res = Infinity;
  const path = [];

  function dfs(start, sum) {
    if (sum === amount && path.length < res) {
      res = path.length;
      return;
    }
    if (sum > amount) {
      return;
    }
    for (let i = start; i < coins.length; i++) {
      if (path.length > res) {
        continue;
      }

      path.push(coins[i]);
      sum += coins[i];
      dfs(0, sum);
      sum -= coins[i];
      path.pop();
    }
  }

  dfs(0, 0);

  return res === Infinity ? -1 : res;
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 动态规划
var coinChange = (coins, amount) => {
  if (!amount) {
    return 0;
  }

  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
    }
  }
  console.log(dp);
  return dp[amount] === Infinity ? -1 : dp[amount];
};
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j] && dp[i - coins[j]] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
        console.log(i, dp);
      }
    }
  }
  // console.log("1", dp);

  return dp[amount] === Infinity ? -1 : dp[amount];
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = (coins, amount) => {
  if(!amount) {
      return 0;
  }

  let dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for(let i =0; i < coins.length; i++) {
      for(let j = coins[i]; j <= amount; j++) {
          dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
      }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}


console.log(coinChange([1, 2, 5], 7));
// console.log(coinChange([2], 3));
