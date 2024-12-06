// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。

// 示例 1：

//     输入： 2
//     输出： 2
//     解释： 有两种方法可以爬到楼顶。
//         1 阶 + 1 阶
//         2 阶

// 示例 2：

//     输入： 3
//     输出： 3
//     解释： 有三种方法可以爬到楼顶。
//         1 阶 + 1 阶 + 1 阶
//         1 阶 + 2 阶
//         2 阶 + 1 阶

// 爬2阶;

function climbStairs(n) {
  /**
        dp[i]: i阶楼梯的方法种数
        dp[1]: 1;
        dp[2]: 2;
        ...
        dp[i]: dp[i - 1] + dp[i - 2];
     */
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 爬m阶;
function climbStairs(n) {
  /**
        一次可以爬m阶
        dp[i]: i阶楼梯的方法种数
        dp[1]: 1;
        dp[2]: 2;
        dp[3]: dp[2] + dp[1];
        ...
        dp[i]: dp[i - 1] + dp[i - 2] + ... + dp[max(i - m, 1)]; 从i-1加到max(i-m, 1)
     */
  const m = 2; // 本题m为2
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    const end = Math.max(i - m, 1);
    for (let j = i - 1; j >= end; j--) {
      dp[i] += dp[j];
    }
  }
  return dp[n];
}




// dp[3] = dp[2] + dp[1] + dp[1] = 4
// d[4] = dp[3] + dp[2] + dp[1] = 7

// 1,1,1,1
// 1,2,1
// 1,1,2
// 1,3
// 2,1,1
// 2,2
// 3,1
