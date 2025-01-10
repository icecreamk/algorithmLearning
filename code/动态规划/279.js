// 完全平方数

// 输入：n = 12
// 输出：3
// 解释：12 = 4 + 4 + 4
// 示例 2：

// 输入：n = 13
// 输出：2
// 解释：13 = 4 + 9

// 时间复杂度，指数级别
// 超时。。。。。。
// function numSquares(n) {
//   if (n <= 1) return 1;
//   const path = [];
//   let min = Infinity;
//   const half = Math.floor(n / 2);
//   function dfs(start, sum) {
//     if (sum > n) {
//       return;
//     }
//     if (sum === n) {
//       if (path.length < min) {
//         min = path.length;
//       }
//       return;
//     }
//     for (let i = start; i > 0; i--) {
//       if (sum + i * i > n) continue;
//       path.push(i);
//       dfs(i, sum + i * i);
//       path.pop();
//     }
//   }

//   dfs(half, 0);
//   return min;
// }

var numSquares = function (n) {
  let dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      // 因为j*j已经是一个，所以再+1就是当前的
      dp[i] = Math.min(dp[i - j * j] + 1, dp[i]);
    }
  }
  // console.log(dp);
  return dp[n];
};
console.log(numSquares(5));
