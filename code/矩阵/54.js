// 螺旋矩阵

// 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
// 示例:
// 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]

// 注意开闭区间，要统一，才不会越写越乱
// 时间复杂度 O(n^2): 模拟遍历二维矩阵的时间
// 空间复杂度 O(1)

// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

var spiralOrder = function (matrix) {
  if (matrix.length === 0) return [];
  const res = [];
  let top = 0,
    bottom = matrix.length - 1,
    left = 0,
    right = matrix[0].length - 1;
  while (top < bottom && left < right) {
    for (let i = left; i < right; i++) res.push(matrix[top][i]); // 上层
    for (let i = top; i < bottom; i++) res.push(matrix[i][right]); // 右层
    for (let i = right; i > left; i--) res.push(matrix[bottom][i]); // 下层
    for (let i = bottom; i > top; i--) res.push(matrix[i][left]); // 左层
    right--;
    top++;
    bottom--;
    left++; // 四个边界同时收缩，进入内层
  }
  if (top === bottom)
    // 剩下一行，从左到右依次添加
    for (let i = left; i <= right; i++) res.push(matrix[top][i]);
  else if (left === right)
    // 剩下一列，从上到下依次添加
    for (let i = top; i <= bottom; i++) res.push(matrix[i][left]);
  return res;
};
