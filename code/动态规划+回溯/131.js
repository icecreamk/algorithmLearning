var partition = function (s) {
  const res = [];
  const dp = new Array(s.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(s.length);
  }
  for (let j = 0; j < s.length; j++) {
    for (let i = 0; i <= j; i++) {
      if (i == j) {
        dp[i][j] = true;
      } else if (j - i == 1 && s[i] == s[j]) {
        dp[i][j] = true;
      } else if (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
      } else {
        dp[i][j] = false;
      }
    }
  }
  function dfs(temp, start) {
    if (start == s.length) {
      res.push(temp.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      if (dp[start][i]) {
        temp.push(s.substring(start, i + 1));
        dfs(temp, i + 1);
        temp.pop();
      }
    }
  }
  dfs([], 0);
  return res;
};
console.log(partition("aabaca"));


// TODO
const countSubstrings = (s) => {
  const strLen = s.length;
  let numOfPalindromicStr = 0;
  let dp = Array.from(Array(strLen), () => Array(strLen).fill(false));

  for (let j = 0; j < strLen; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j]) {
        if (j - i < 2) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
        numOfPalindromicStr += dp[i][j] ? 1 : 0;
      }
    }
  }

  return numOfPalindromicStr;
};
