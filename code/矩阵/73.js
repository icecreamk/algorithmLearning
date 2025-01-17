// 矩阵置零

// 输入：matrix = [
// [0,1,2,0],
// [3,4,5,2],
// [1,3,1,5]
// ]

// 输出：[
// [0,0,0,0],
// [0,4,5,0],
// [0,3,1,0]
// ]

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// O(mn)
// O(m+n)
var setZeroes = function (matrix) {
  let rowMap = {};
  let colMap = {};
  let rows = matrix.length,
    cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 如果某个元素为0，则把它对应的行 列存到哈希表中
      if (matrix[i][j] == 0) {
        rowMap[i] = true;
        colMap[j] = true;
      }
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 如果对应行列在哈希中则置元素为0
      if (rowMap[i] || colMap[j]) matrix[i][j] = 0;
    }
  }
};

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// O(mn)
// O(1)

// 1 2 3 4
// 1 0 3 4
// 0 1 2 0

// 1 2 3 4
// 1 0 - -
// 0 - - 0

// - - 3 -
// - 0 - -
// 0 - - 0

// O(1) 时间换空间
var setZeroes = function (matrix) {
  let rows = matrix.length,
    cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    let flag = false;
    for (let j = 0; j < cols; j++) {
      if (flag && matrix[i][j] !== 0) {
        matrix[i][j] = -Infinity;
        continue;
      }
      if (matrix[i][j] === 0) {
        flag = true;
      }
    }
  }

  for (let j = 0; j < cols; j++) {
    let flag = false;
    for (let i = 0; i < rows; i++) {
      if (flag && matrix[i][j] !== 0) {
        matrix[i][j] = -Infinity;
        continue;
      }
      if (matrix[i][j] === 0) {
        flag = true;
      }
    }
  }

  for (let i = rows - 1; i >= 0; i--) {
    let flag = false;
    for (let j = cols - 1; j >= 0; j--) {
      if (flag && matrix[i][j] !== 0) {
        matrix[i][j] = -Infinity;
        continue;
      }
      if (matrix[i][j] === 0) {
        flag = true;
      }
    }
  }

  for (let j = cols - 1; j >= 0; j--) {
    let flag = false;
    for (let i = rows - 1; i >= 0; i--) {
      if (flag && matrix[i][j] !== 0) {
        matrix[i][j] = -Infinity;
        continue;
      }
      if (matrix[i][j] === 0) {
        flag = true;
      }
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === -Infinity) {
        matrix[i][j] = 0;
      }
      // 如果对应行列在哈希中则置元素为0
    }
  }
  // console.log(matrix);

};

console.log(
  setZeroes([
    [1, 2, 3, 4],
    [1, 0, 2, 3],
    [0, 1, 2, 0],
  ])
);
