// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 示例 1：
// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"
// 示例 2：

// 输入：s = "3[a2[c]]"
// 输出："accaccacc"
// 示例 3：

// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"
// 示例 4：

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const nums = [];
  const repeatStr = [];
  const numberFlag = /^[0-9]+(\.[0-9]+)?$/
  let res = "";
  for (let i = 0; i < s.length; i++) {
    const v = s[i];
    if (numberFlag.test(v)) {
      nums.push(v);
      repeatStr.push([]);
    } else if (v === "[") {
      const lastIdx = nums.length - 1;
      repeatStr[lastIdx].push(s[i + 1]);
      i++;
      continue;
    } else if (v === "]") {
      const curNum = nums.pop()
      const curStr = repeatStr.pop()
      if (nums.length) {
        repeatStr[nums.length - 1] = repeatStr[nums.length - 1].concat(curStr.join("").repeat(curNum))
      } else {
        res += curStr.join("").repeat(curNum)
      }
    } else if (nums.length){
      const lastIdx = nums.length - 1
      repeatStr[lastIdx].push(v)
    } else {
      res += v
    }
  }
  return res;
};

// console.log(decodeString("2[abc]3[cd]ef"))
// console.log(decodeString("3[a2[c]]"))
// accaccacc
console.log(decodeString("100[leetcode]"))
// accaccacc