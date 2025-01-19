// 编辑距离

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = (word1, word2) => {
  let dp = Array.from(Array(word1.length + 1), () =>
    Array(word2.length + 1).fill(0)
  );

  //   dp[i][j] 表示以下标i-1为结尾的字符串word1，和以下标j-1为结尾的字符串word2，最近编辑距离为dp[i][j]。
  // dp[i][0] ：以下标i-1为结尾的字符串word1，和空字符串word2，最近编辑距离为dp[i][0]。
  // 那么dp[i][0]就应该是i，对word1里的元素全部做删除操作，即：dp[i][0] = i;
  for (let i = 1; i <= word1.length; i++) {
    dp[i][0] = i;
  }

  //   同理
  for (let j = 1; j <= word2.length; j++) {
    dp[0][j] = j;
  }

  //   console.log([...dp]);

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

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const dp = new Array(word2.length + 1).fill(0);
  for (let j = 0; j < word2.length + 1; j++) {
    dp[j] = j;
  }
  for (let i = 1; i < word1.length + 1; i++) {
    const initialDuiJiaoXian = dp[0]; // 此时dp[j-1]还没被更新为本行的值
    dp[0] = i; // dp[0]是指word2为空的时候
    let duiJiaoXian = initialDuiJiaoXian;
    for (let j = 1; j < word2.length + 1; j++) {
      const nextNumDuiJiaoXian = dp[j]; // 由于下次循环开始j会++，而且此时dp[j]还没被重新赋值所以记录的是上一行的值，所以dp[j]就是下一次循环的对角线的值。
      if (word1[i - 1] === word2[j - 1]) {
        dp[j] = duiJiaoXian;
      } else {
        dp[j] = Math.min(duiJiaoXian + 1, dp[j - 1] + 1, dp[j] + 1); // 此时dp[j-1]已是本行的值
        // dp[j-1]没重新赋值前 就是上一行且前一列的值，dp[j-1]重新赋值后就是同一行且前一列的值，dp[j]没重新赋值前就是上一行同一列的值。
      }
      duiJiaoXian = nextNumDuiJiaoXian;
    }
  }
  return dp[word2.length];
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const len1 = word1.length,
    len2 = word2.length;
  // 初始化备忘录二维数组
  let memo = Array(len1 + 1);
  for (let i = 0; i < len1 + 1; i++) {
    memo[i] = Array(len2 + 1).fill(-1);
  }

  /**
   *@param {number} i word1.length-1
   *@param {number} j word2.length-2
   *@return {number} 编辑步数
   */
  function dp(i, j) {
    // base case
    // 如果word1串读完了，则直接插入剩余的word2串
    if (i == -1) return j + 1;
    // 如果word2串读完了，则直接删除剩余的word1串
    if (j == -1) return i + 1;

    // 对应长度的步数已在备忘录中，直接返回步数
    if (memo[i][j] != -1) {
      return memo[i][j];
    }

    // 两个字符相同，不需要任何操作，直接跳过
    if (word1.charAt(i) == word2.charAt(j)) {
      memo[i][j] = dp(i - 1, j - 1);
    }
    // 不同则选择步数最少的操作
    else {
      memo[i][j] = min(
        dp(i - 1, j - 1) + 1, //替换操作，两个串的长度均减一
        dp(i - 1, j) + 1, //word1串的删除操作，word1串长度减一
        dp(i, j - 1) + 1 //word1串的插入操作，word1不变，word2减一
      );
    }

    // 返回需要操作的步数
    return memo[i][j];
  }

  // 在三个值中选最小值
  function min(a, b, c) {
    return Math.min(a, Math.min(b, c));
  }

  // 调用dp函数，返回结果
  return dp(len1 - 1, len2 - 1);
};
