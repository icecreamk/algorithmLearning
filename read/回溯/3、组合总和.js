// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
// 说明：
// 所有数字都是正整数。
// 解集不能包含重复的组合。
// 示例 1: 输入: k = 3, n = 7 输出: [[1,2,4]]
// 示例 2: 输入: k = 3, n = 9 输出: [[1,2,6], [1,3,5], [2,3,4]]

// 别忘了处理过程 和 回溯过程是一一对应的，处理有加，回溯就要有减！

// 未剪枝：
var combinationSum3 = function (k, n) {
  // 回溯法
  let result = [],
    path = [];
  const backtracking = (_k, targetSum, sum, startIndex) => {
    // 终止条件
    if (path.length === _k) {
      if (sum === targetSum) {
        result.push(path.slice());
      }
      // 如果总和不相等，就直接返回
      return;
    }

    // 循环当前节点，因为只使用数字1到9，所以最大是9
    for (let i = startIndex; i <= 9; i++) {
      path.push(i);
      sum += i;
      // 回调函数
      backtracking(_k, targetSum, sum, i + 1);
      // 回溯
      sum -= i;
      path.pop();
    }
  };
  backtracking(k, n, 0, 1);
  return result;
};
// 剪枝：

var combinationSum3 = function (k, n) {
  // 回溯法
  let result = [],
    path = [];
  const backtracking = (_k, targetSum, sum, startIndex) => {
    if (sum > targetSum) {
      return;
    }
    // 终止条件
    if (path.length === _k) {
      if (sum === targetSum) {
        result.push(path.slice());
      }
      // 如果总和不相等，就直接返回
      return;
    }

    // 循环当前节点，因为只使用数字1到9，所以最大是9
    for (let i = startIndex; i <= 9 - (_k - path.length) + 1; i++) {
      path.push(i);
      sum += i;
      // 回调函数
      backtracking(_k, targetSum, sum, i + 1);
      // 回溯
      sum -= i;
      path.pop();
    }
  };
  backtracking(k, n, 0, 1);
  return result;
};
