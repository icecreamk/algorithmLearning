// 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
// 在 S 上反复执行重复项删除操作，直到无法继续删除。
// 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。
// 示例：
//     输入："abbaca"
//     输出："ca"
//     解释：例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

// 栈
var removeDuplicates = function (s) {
  const result = [];
  for (const i of s) {
    if (i === result[result.length - 1]) {
      result.pop();
    } else {
      result.push(i);
    }
  }
  return result.join("");
};

// 法二：双指针（模拟栈）

// 原地解法（双指针模拟栈）
var removeDuplicates = function (s) {
  s = [...s];
  let top = -1; // 指向栈顶元素的下标
  for (let i = 0; i < s.length; i++) {
    if (top === -1 || s[top] !== s[i]) {
      // top === -1 即空栈
      s[++top] = s[i]; // 入栈
    } else {
      top--; // 推出栈
    }
  }
  s.length = top + 1; // 栈顶元素下标 + 1 为栈的长度
  return s.join("");
};
