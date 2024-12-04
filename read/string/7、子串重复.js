// 基本检查：如果字符串长度小于等于1，直接返回false，因为单字符或空字符串不能由子串重复构成。
// 遍历可能的子串长度：从1到字符串长度的一半进行遍历，因为子串的最大长度不会超过字符串长度的一半。
// 检查子串长度是否为字符串长度的因数：只有当子串长度是字符串长度的因数时，才有可能通过重复子串构成原字符串。
// 生成重复字符串：根据子串长度计算需要重复的次数，并生成重复字符串。
// 比较生成的重复字符串和原字符串：如果生成的重复字符串与原字符串相等，则返回true，否则继续检查下一个子串长度。
// 返回结果：如果所有可能的子串长度都检查完毕，仍没有找到符合条件的子串，则返回false。

// 外层循环遍历从 1 到 Math.floor(str.length / 2) 的所有可能的子串长度。
// 这个循环的时间复杂度是 O(n)，其中 n 是字符串的长度。

// 内层循环检查当前子串是否可以重复构成整个字符串。
// 对于每个子串长度 i，内层循环的时间复杂度是 O(n/i)。

// 综合： 时间复杂度是 O(n log n)。
function canBeRepeated(s) {
  if (s.length <= 1) return false;

  for (let i = 1; i <= s.length / 2; i++) {
    if (s.length % i === 0) {
      const substring = s.slice(0, i);
      let repeatedString = '';
      const repeatCount = s.length / i;

      for (let j = 0; j < repeatCount; j++) {
        repeatedString += substring;
      }

      if (repeatedString === s) {
        return true;
      }
    }
  }

  return false;
}

// 测试用例
console.log(canBeRepeated("abab")); // true
console.log(canBeRepeated("abcabcabc")); // true
console.log(canBeRepeated("abcd")); // false
console.log(canBeRepeated("aaaa")); // true
console.log(canBeRepeated("a")); // false