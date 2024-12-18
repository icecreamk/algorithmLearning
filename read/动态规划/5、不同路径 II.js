// 输入：obstacleGrid = 
// [
//     [0,0,0],
//     [0,1,0],
//     [0,0,0]
// ]
// 输出：2 解释：
// 3x3 网格的正中间有一个障碍物。
var uniquePathsWithObstacles1 = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array(m)
    .fill()
    .map((item) => Array(n).fill(0));

  for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
    dp[i][0] = 1;
  }

  for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < m; ++i) {
    for (let j = 1; j < n; ++j) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
};

// 版本二：内存优化，直接以原数组为dp数组
var uniquePathsWithObstacles2 = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 0) {
        // 不是障碍物
        if (i === 0) {
          // 取左边的值
          obstacleGrid[i][j] = obstacleGrid[i][j - 1] ?? 1;
        } else if (j === 0) {
          // 取上边的值
          obstacleGrid[i][j] = obstacleGrid[i - 1]?.[j] ?? 1;
        } else {
          // 取左边和上边的和
          obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
        }
      } else {
        // 如果是障碍物，则路径为0
        obstacleGrid[i][j] = 0;
      }
    }
  }
  return obstacleGrid[m - 1][n - 1];
};
