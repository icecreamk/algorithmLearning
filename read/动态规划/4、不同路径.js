// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？

// a = [
//     [1,1,1],
//     [1,0,0],
//     [1,0,0],
// ]
var uniquePaths = function (m, n) {
  const dp = Array(m)
    .fill()
    .map((item) => Array(n));

  for (let i = 0; i < m; ++i) {
    dp[i][0] = 1;
  }

  for (let i = 0; i < n; ++i) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
// 版本二：直接将dp数值值初始化为1

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill(1).map(() => new Array(n).fill(1));
  // dp[i][j] 表示到达（i，j） 点的路径数
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};
