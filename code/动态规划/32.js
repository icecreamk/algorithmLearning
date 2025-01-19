// 最长有效括号
// 输入：s = ")()())"
// 输出：4

// 输入：s = "(()"
// 输出：2
// 解释：最长有效括号子串是 "()"

/**
 * @param {string} s
 * @return {number}
 */
// 动态规划
// O(n)
// O(n)
var longestValidParentheses = function (s) {
  let max = 0;
  const dp = new Array(s.length).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) == ")") {
      if (s.charAt(i - 1) == "(") {
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == "(") {
        dp[i] =
          dp[i - 1] + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
      }
      max = Math.max(max, dp[i]);
    }
  }
  return max;
};

/**
 * @param {string} s
 * @return {number}
 */
// 栈
// O(n)
// O(n)
var longestValidParentheses = function (s) {
  let maxans = 0;
  const stack = [-1];
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) == "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (!stack.length) {
        stack.push(i);
      } else {
        maxans = Math.max(maxans, i - stack[stack.length - 1]);
      }
    }
  }
  return maxans;
};

// 指针
/**
 * @param {string} s
 * @return {number}
 */
// 栈
// O(n)
// O(n)
var longestValidParentheses = function (s) {
  let maxlength = 0,
    left = 0,
    right = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) == "(") {
      left++;
    } else {
      right++;
    }
    if (left == right) {
      maxlength = Math.max(maxlength, 2 * right);
    } else if (right > left) {
      left = right = 0;
    }
  }
  // 但这样会漏掉一种情况，就是遍历的时候左括号的数量始终大于右括号的数量，即 (() ，
  // 这种时候最长有效括号是求不出来的
  left = right = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.charAt(i) == "(") {
      left++;
    } else {
      right++;
    }
    if (left == right) {
      maxlength = Math.max(maxlength, 2 * left);
    } else if (left > right) {
      left = right = 0;
    }
  }
  return maxlength;
};
console.log(longestValidParentheses("(()"));
