// 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

// 说明：

// 拆分时可以重复使用字典中的单词。

// 你可以假设字典中没有重复的单词。

// 示例 1：

// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
// 示例 2：

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
// 注意你可以重复使用字典中的单词。
// 示例 3：

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false

function wordBreak(s, wordDict) {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      const tempStr = s.slice(j, i);
      if (wordDict.includes(tempStr) && dp[j] === true) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
// 记忆化回溯

function wordBreak(s, wordDict) {
  // 只需要记忆结果为false的情况
  const memory = [];
  return backTracking(s, wordDict, 0, memory);
  function backTracking(s, wordDict, startIndex, memory) {
    if (startIndex >= s.length) return true;
    if (memory[startIndex] === false) return false;
    for (let i = startIndex + 1, length = s.length; i <= length; i++) {
      const str = s.slice(startIndex, i);
      if (wordDict.includes(str) && backTracking(s, wordDict, i, memory))
        return true;
    }
    memory[startIndex] = false;
    return false;
  }
}
