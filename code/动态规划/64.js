// 最小路径和

// 给定一个包含非负整数的 m x n 网格 grid ，
// 请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

// 说明：每次只能向下或者向右移动一步。

// 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出：7
// 解释：因为路径 1→3→1→1→1 的总和最小。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dp = Array.from(new Array(rows), () => new Array(cols).fill(Infinity));
  dp[0][0] = grid[0][0];

  for (let j = 1; j < cols; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  for (let i = 1; i < rows; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  //   console.log(dp);
  return dp[rows - 1][cols - 1];
};

// 优化空间
var minPathSum4 = function (grid) {
  const m = grid.length,
    n = grid[0].length;

  // 状态定义：dp[i] 表示从 (0, 0) 到达第 i - 1 行的最短路径值
  const dp = new Array(n).fill(0);

  // 状态初始化
  dp[0] = grid[0][0];

  // 状态转移
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j != 0) {
        dp[j] = grid[i][j] + dp[j - 1];
      } else if (i != 0 && j == 0) {
        dp[j] = grid[i][j] + dp[j];
      } else if (i != 0 && j != 0) {
        dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
      }
    }
  }

  // 返回结果
  return dp[n - 1];
};

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
);
