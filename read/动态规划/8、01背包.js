// 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。
// 每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

// 每一件物品其实只有两个状态，取或者不取，所以可以使用回溯法搜索出所有的情况，
// 那么时间复杂度就是O(2^n)，这里的n表示物品数量。
// 所以暴力的解法是指数级别的时间复杂度。进而才需要动态规划的解法来进行优化

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on("line", (line) => {
  input.push(line);
});

readline.on("close", () => {
  let [n, bagweight] = input[0].split(" ").map(Number);
  let weight = input[1].split(" ").map(Number);
  let value = input[2].split(" ").map(Number);

  let dp = Array.from({ length: n }, () => Array(bagweight + 1).fill(0));

  for (let j = weight[0]; j <= bagweight; j++) {
    dp[0][j] = value[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= bagweight; j++) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }

  console.log(dp[n - 1][bagweight]);
});
