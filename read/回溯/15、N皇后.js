// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。

// 输入：n = 1
// 输出：[["Q"]]

// 首先来看一下皇后们的约束条件：

// 不能同行
// 不能同列
// 不能同斜线

// 因为在单层搜索的过程中，每一层递归，只会选for循环（也就是同一行）里的一个元素，所以不用去重了。

// 时间复杂度: O(n!)
// 空间复杂度: O(n)

var solveNQueens = function (n) {
  const ans = [];
  const path = [];
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill("."));
  // 判断是否能相互攻击
  const canAttack = (matrix, row, col) => {
    let i;
    let j;
    // 判断正上方和正下方是否有皇后
    for (i = 0, j = col; i < n; i++) {
      if (matrix[i][j] === "Q") {
        return true;
      }
    }
    // 判断正左边和正右边是否有皇后
    for (i = row, j = 0; j < n; j++) {
      if (matrix[i][j] === "Q") {
        return true;
      }
    }
    // 判断左上方是否有皇后
    for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (matrix[i][j] === "Q") {
        return true;
      }
    }
    // 判断右上方是否有皇后
    for (i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (matrix[i][j] === "Q") {
        return true;
      }
    }
    return false;
  };
  const backtrack = (matrix, row, col) => {
    if (path.length === matrix.length) {
      ans.push(path.slice());
      return;
    }
    for (let i = row; i < matrix.length; i++) {
      for (let j = col; j < matrix.length; j++) {
        // 当前位置会导致互相攻击 继续下一轮搜索
        if (canAttack(matrix, i, j)) {
          continue;
        }
        matrix[i][j] = "Q";
        path.push(matrix[i].join(""));
        // 另起一行搜索 同一行只能有一个皇后
        backtrack(matrix, i + 1, 0);
        matrix[i][j] = ".";
        path.pop();
      }
    }
  };
  backtrack(matrix, 0, 0);
  return ans;
};
