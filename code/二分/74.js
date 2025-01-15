// 74. 搜索二维矩阵

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  if (!matrix.length) return false;
  if (matrix.length === 1) return search(matrix[0], target);

  matrix.push([Infinity]);

  for (let i = 1; i < matrix.length; i++) {
    if (matrix[i][0] > target && matrix[i - 1][0] <= target) {
      return search(matrix[i - 1], target);
    }
  }
  return false;
};

function search(row, target) {
  let left = 0;
  let right = row.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target > row[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return row[left] === target;
}

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    4
  ),
  searchMatrix([[1], [3]], 3)
);

var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  let left = -1,
    right = m * n;
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    const x = matrix[Math.floor(mid / n)][mid % n];
    if (x === target) {
      return true;
    }
    if (x < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return false;
};
var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  let i = 0,
    j = n - 1;
  while (i < m && j >= 0) {
    // 还有剩余元素
    if (matrix[i][j] === target) {
      return true; // 找到 target
    }
    if (matrix[i][j] < target) {
      i++; // 这一行剩余元素全部小于 target，排除
    } else {
      j--; // 这一列剩余元素全部大于 target，排除
    }
  }
  return false;
};
