// 单词拆分

// s = "abc", wordDict = ["bc", "ab"]

//   a b c
//   1 0 0 0
//   leetcode
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// function wordBreak(s, wordDict) {
//   const dp = new Array(s.length + 1).fill(false);
//   dp[0] = true;
//   for (let i = 1; i <= s.length; i++) {
//     for (let j = 0; j < i; j++) {
//       const tempStr = s.slice(j, i);
//       console.log(i, j, tempStr, JSON.parse(JSON.stringify(dp)));
//       if (wordDict.includes(tempStr) && dp[j] === true) {
//         console.log("kkkk", j, JSON.parse(JSON.stringify(dp)));
//         dp[i] = true;
//         break;
//       }
//     }
//   }
//   console.log(dp);
//   return dp[s.length];
// }

var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // i是结束位置，j是起始位置，如果起始位置为false，dp[i]没有为 true 的可能，continue，考察下一个 j

      if (dp[j] == false) {
        continue;
      }

      const suffix = s.slice(j, i);
    //   console.log(i, j, suffix, JSON.parse(JSON.stringify(dp)));
      if (wordSet.has(suffix) && dp[j] == true) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};

console.log(wordBreak("leetcode", ["leet", "code", "sljdl"]));
