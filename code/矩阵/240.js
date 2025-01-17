// 搜索二维矩阵 II

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }

  return false;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 二分找
var searchMatrix = function (matrix, target) {
  for (const row of matrix) {
    const index = search(row, target);
    if (index >= 0) {
      return true;
    }
  }
  return false;
};

const search = (nums, target) => {
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const num = nums[mid];
    if (num === target) {
      return mid;
    } else if (num > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// z字找 排除法
var searchMatrix = function (matrix, target) {
  const m = matrix.length,
    n = matrix[0].length;
  let x = 0,
    y = n - 1;
  while (x < m && y >= 0) {
    if (matrix[x][y] === target) {
      return true;
    }
    if (matrix[x][y] > target) {
      --y;
    } else {
      ++x;
    }
  }
  return false;
};

console.log(
  searchMatrix(
    [
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    99
  )
);
