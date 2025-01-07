// 无重复字符的最长子串
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

var lengthOfLongestSubstring = function (s) {
  const m = new Map();
  let ans = 0;

  for (let left = (right = 0); right < s.length; right++) {
    if (m.has(s[right])) {
      left = Math.max(left, m.get(s[right]) + 1);
    }

    m.set(s[right], right);
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));