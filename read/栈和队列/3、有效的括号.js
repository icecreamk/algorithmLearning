// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

//     左括号必须用相同类型的右括号闭合。
//     左括号必须以正确的顺序闭合。
//     注意空字符串可被认为是有效字符串。

//     输入: "(]"
//     输出: false
//     输入: "{[]}"
//     输出: true

// 时间复杂度: O(n)
// 空间复杂度: O(n)

var isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    switch (c) {
      case "(":
        stack.push(")");
        break;
      case "[":
        stack.push("]");
        break;
      case "{":
        stack.push("}");
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }
  return stack.length === 0;
};
// 简化版本
var isValid1 = function (s) {
  const stack = [],
    map = {
      "(": ")",
      "{": "}",
      "[": "]",
    };
  for (const x of s) {
    if (x in map) {
      stack.push(x);
      continue;
    }
    if (map[stack.pop()] !== x) return false;
  }
  return !stack.length;
};
