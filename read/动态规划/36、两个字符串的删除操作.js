// 给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。

// 示例：

// 输入: "sea", "eat"
// 输出: 2
// 解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"

// 本题和动态规划：1143.最长公共子序列基本相同，只要求出两个字符串的最长公共子序列长度即可，
// 那么除了最长公共子序列之外的字符都是必须删除的，
// 最后用两个字符串的总长度减去两个最长公共子序列的长度就是删除的最少步数。


// 当word1[i - 1] 与 word2[j - 1]相同的时候
// 当word1[i - 1] 与 word2[j - 1]不相同的时候
// 当word1[i - 1] 与 word2[j - 1]相同的时候，dp[i][j] = dp[i - 1][j - 1];

// 当word1[i - 1] 与 word2[j - 1]不相同的时候，有三种情况：

// 情况一：删word1[i - 1]，最少操作次数为dp[i - 1][j] + 1

// 情况二：删word2[j - 1]，最少操作次数为dp[i][j - 1] + 1

// 情况三：同时删word1[i - 1]和word2[j - 1]，操作的最少次数为dp[i - 1][j - 1] + 2

// 方法一
var minDistance = (word1, word2) => {
  let dp = Array.from(new Array(word1.length + 1), () =>
    Array(word2.length + 1).fill(0)
  );
  for (let i = 1; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= word2.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 2
        );
      }
    }
  }
  return dp[word1.length][word2.length];
};

// 方法二
var minDistance1 = function (word1, word2) {
  let dp = new Array(word1.length + 1)
    .fill(0)
    .map((_) => new Array(word2.length + 1).fill(0));
  for (let i = 1; i <= word1.length; i++)
    for (let j = 1; j <= word2.length; j++)
      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  return word1.length + word2.length - dp[word1.length][word2.length] * 2;
};
