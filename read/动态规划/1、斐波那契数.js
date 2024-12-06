// 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是： F(0) = 0，F(1) = 1 F(n) = F(n - 1) + F(n - 2)，其中 n > 1 给你n ，请计算 F(n) 。

// 示例 1：

//     输入：2
//     输出：1
//     解释：F(2) = F(1) + F(0) = 1 + 0 = 1

// 示例 2：

//     输入：3
//     输出：2
//     解释：F(3) = F(2) + F(1) = 1 + 1 = 2

// 示例 3：

//     输入：4
//     输出：3
//     解释：F(4) = F(3) + F(2) = 2 + 1 = 3

// 解法一
var fib = function (n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  console.log(dp);
  return dp[n];
};

// 解法二：时间复杂度O(N)，空间复杂度O(1)

var fib = function (n) {
  // 动规状态转移中，当前结果只依赖前两个元素的结果，所以只要两个变量代替dp数组记录状态过程。将空间复杂度降到O(1)
  let pre1 = 1;
  let pre2 = 0;
  let temp;
  if (n === 0) return 0;
  if (n === 1) return 1;
  for (let i = 2; i <= n; i++) {
    temp = pre1;
    pre1 = pre1 + pre2;
    pre2 = temp;
  }
  return pre1;
};
