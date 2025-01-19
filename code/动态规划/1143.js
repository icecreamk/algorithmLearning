// 最长公共子序列

// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */

//   a b c d e
// c 0 0 1 1 1
// d 0 0 0 2 2
// e 0 0 0 0 3

//   b l
// y 0 0
// b
// y

var longestCommonSubsequence = function (text1, text2) {
  const dp = Array.from(new Array(text2.length), () =>
    new Array(text1.length).fill(0)
  );
  dp[0][0] = text1[0] === text2[0] ? 1 : 0;
  for (let j = 1; j < text1.length; j++) {
    dp[0][j] = dp[0][j - 1];
    if (text2[0] === text1[j]) {
      dp[0][j] = dp[0][j - 1] + 1;
    }
  }
  for (let i = 1; i < text2.length; i++) {
    dp[i][0] = dp[i - 1][0];
    if (text1[0] === text2[i]) {
      dp[i][0] = dp[i - 1][0] + 1;
    }
  }
  for (let i = 1; i < text2.length; i++) {
    for (let j = 1; j < text1.length; j++) {
      const max = Math.max(dp[i - 1][j], dp[i][j - 1]);
      if (text1[j] === text2[i]) {
        // 注意！！！！！
        // dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + 1;
        // 等于前面一个数字的dp+1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.log(dp);
  return dp[text2.length - 1][text1.length - 1];
};

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 优化 压缩空间
var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length;
  const n2 = text2.length;
  const dp = new Array(n2 + 1).fill(0);
  for (let i = 1; i <= n1; i++) {
    let diagonal = 0;
    for (let j = 1; j <= n2; j++) {
      let diagonalTemp = dp[j];
      dp[j] =
        text1[i - 1] === text2[j - 1]
          ? diagonal + 1
          : Math.max(dp[j - 1], dp[j]);
      diagonal = diagonalTemp;
    }
  }
  return dp[n2];
};

// dfs + 记忆
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
// 优化 压缩空间
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;
  const memo = Array.from(new Array(n), () => new Array(m).fill(-1));
  function dfs(i, j) {
    if (i < 0 || j < 0) {
      return 0;
    }
    if (memo[i][j] !== -1) {
      return memo[i][j];
    }
    if (text1[i] == text2[j]) {
      return (memo[i][j] = dfs(i - 1, j - 1) + 1);
    }
    memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1));
    return memo[i][j];
  }
  //   console.log(memo)
  return dfs(n - 1, m - 1);
};
console.log(longestCommonSubsequence("bsbininm", "jmjkbkjkv"));
console.log(longestCommonSubsequence("abcde", "ace"));
