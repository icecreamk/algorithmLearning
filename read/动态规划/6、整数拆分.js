// 给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

// 示例 1:

// 输入: 2
// 输出: 1
// 解释: 2 = 1 + 1, 1 × 1 = 1。
// 示例 2:

// 输入: 10
// 输出: 36
// 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
// 说明: 你可以假设 n 不小于 2 且不大于 58。

// [0,0,1,0,0,0,0,0,0,0,0]
var integerBreak = function (n) {
  let dp = new Array(n + 1).fill(0);
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    console.log("iiiiiii", i, [...dp]);
    // 这里利用了数学推理：a*（n-a）中，在n/2处取到最大值，相同周长，正方形体积最大
    for (let j = 1; j <= i / 2; j++) {
      // 递推公式：拆，拆两个，拆两个以上，三种取最大
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j);
      console.log("j", j, [...dp]);
    }
  }
  return dp[n];
};

console.log(integerBreak(6));
