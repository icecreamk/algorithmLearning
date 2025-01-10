// 不同路径
// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下

function uniquePaths(m, n) {
  const dp = Array.from(new Array(m), () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  // console.log(dp);
  return dp[m - 1][n - 1];
}
console.log(uniquePaths(3, 7));
console.log(uniquePaths(7, 3)); // 28
