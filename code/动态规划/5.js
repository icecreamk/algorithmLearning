// 最长回文子串

// 好理解版
// var longestPalindrome = function (s) {
//   let res = "";
//   for (let i = 0; i < s.length; i++) {
//     // 以 s[i] 为中心的最长回文子串
//     let s1 = palindrome(s, i, i);
//     // 以 s[i] 和 s[i+1] 为中心的最长回文子串
//     let s2 = palindrome(s, i, i + 1);
//     res = res.length > s1.length ? res : s1;
//     res = res.length > s2.length ? res : s2;
//   }
//   return res;
// };

// function palindrome(s, l, r) {
//   while (l >= 0 && r < s.length && s[l] === s[r]) {
//     l--;
//     r++;
//   }
//   return s.substring(l + 1, r);
// }

// console.log(longestPalindrome("bb"));

// 多维数组版
const longestPalindrome = (s) => {
  const strLen = s.length;
  let res = strLen ? s[0] : "";
  let dp = Array.from(Array(strLen), () => Array(strLen).fill(false));

  for (let i = 0; i < strLen; i++) {
    // 因为每个字符自身就是回文
    dp[i][i] = true;
  }


  for (let i = strLen - 1; i >= 0; i--) {
    for (let j = i + 1; j < strLen; j++) {
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        const s1 = getMaxStr(s, i, j);
        res = res.length > s1.length ? res : s1;
      } else if (s[i] === s[j] && dp[i+1][j] && dp[i][j-1]) {
        dp[i][j] = true;
        const s1 = getMaxStr(s, i, j);
        res = res.length > s1.length ? res : s1;
      } else {
        dp[i][j] = false;
      }
      // console.log(i,j,JSON.parse(JSON.stringify(dp)));
    }
  }
  return res
};

function getMaxStr(s, i, j) {
  let s1 = s.substring(i, j + 1);
  return s1;
}

console.log(longestPalindrome("ac"));
console.log(longestPalindrome("aa"));
console.log(longestPalindrome("aaa"));
console.log(longestPalindrome("aaaa"));
console.log(longestPalindrome("babad"));
console.log(longestPalindrome("a"));
