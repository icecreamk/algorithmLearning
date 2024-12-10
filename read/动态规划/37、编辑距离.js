// 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符

// 删除一个字符

// 替换一个字符

// 示例 1：

// 输入：word1 = "horse", word2 = "ros"

// 输出：3

// 解释： horse -> rorse (将 'h' 替换为 'r') rorse -> rose (删除 'r') rose -> ros (删除 'e')

// 示例 2：

// 输入：word1 = "intention", word2 = "execution"

// 输出：5

// 分析：
// 操作一：word1删除一个元素，那么就是以下标i - 2为结尾的word1 与 j-1为结尾的word2的最近编辑距离 再加上一个操作。
// 即 dp[i][j] = dp[i - 1][j] + 1;
// 操作二：word2删除一个元素，那么就是以下标i - 1为结尾的word1 与 j-2为结尾的word2的最近编辑距离 再加上一个操作。
// 即 dp[i][j] = dp[i][j - 1] + 1;
// 这里有同学发现了，怎么都是删除元素，添加元素去哪了。
// word2添加一个元素，相当于word1删除一个元素
// 操作三：替换元素，word1替换word1[i - 1]，使其与word2[j - 1]相同，此时不用增删加元素。
// 可以回顾一下，if (word1[i - 1] == word2[j - 1])的时候我们的操作 是 dp[i][j] = dp[i - 1][j - 1] 对吧。
// 那么只需要一次替换的操作，就可以让 word1[i - 1] 和 word2[j - 1] 相同。
// 所以 dp[i][j] = dp[i - 1][j - 1] + 1;

// 当 if (word1[i - 1] != word2[j - 1]) 时取最小的，即：dp[i][j] = min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]}) + 1;

const minDistance = (word1, word2) => {
  let dp = Array.from(Array(word1.length + 1), () =>
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
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }

  return dp[word1.length][word2.length];
};
