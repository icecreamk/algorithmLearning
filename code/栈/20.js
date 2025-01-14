// 有效的括号

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 输入：s = "()[]{}"
// 输出：true



// s = "(([])[))"
// s = "){})"

var isValid = function (s) {
  const linkMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  const stack = [];

  for (v of s) {
    if (linkMap[v] && stack[stack.length - 1] === linkMap[v]) {
      stack.pop();
    } else {
      stack.push(v)
    }
  }
  return !stack.length
};

console.log(isValid("(}"))
console.log(isValid("({})"))
