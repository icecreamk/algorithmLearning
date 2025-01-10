// 杨辉三角

// 示例 1:

// 输入: numRows = 5
// 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// 示例 2:

// 输入: numRows = 1
// 输出: [[1]]

//     [1]
//    [1,1]
//   [1,2,1]
//  [1,3,3,1]
// [1,4,6,4,1]

var generate = function (numRows) {
  const ret = [];

  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < row.length - 1; j++) {
      row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
    }
    ret.push(row);
  }
  return ret;
};

// console.log(test(5));
// console.log(test(1));
console.log(test(6));
