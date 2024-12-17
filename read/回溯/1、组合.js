// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
// 示例: 输入: n = 4, k = 2 输出: [ [2,4], [3,4], [2,3], [1,2], [1,3], [1,4], ]

// 暴力解法：
// int n = 4;
// for (int i = 1; i <= n; i++) {
//     for (int j = i + 1; j <= n; j++) {
//         cout << i << " " << j << endl;
//     }
// }
// 如果k为3，三层循环
// int n = 100;
// for (int i = 1; i <= n; i++) {
//     for (int j = i + 1; j <= n; j++) {
//         for (int u = j + 1; u <= n; n++) {
//             cout << i << " " << j << " " << u << endl;
//         }
//     }
// }
// 如果k为100呢？开始窒息...此时回溯闪亮登场

// 时间复杂度: O(n * 2^n)
// 空间复杂度: O(n)

// 未剪枝：
var combine = function (n, k) {
  // 回溯法
  let result = [],
    path = [];
  let backtracking = (_n, _k, startIndex) => {
    // 终止条件
    if (path.length === _k) {
      result.push(path.slice());
      return;
    }
    // console.log('path1', path, startIndex, _k - path.length, _n - (_k - path.length))

    // 循环本层集合元素
    for (let i = startIndex; i <= _n; i++) {
      path.push(i);
      console.log("path1", path);
      //   递归
      backtracking(_n, _k, i + 1);
      //   回溯操作
      path.pop();
    }
  };
  backtracking(n, k, 1);
  return result;
};
// 剪枝：

var combine1 = function (n, k) {
  // 回溯法
  let result = [],
    path = [];
  let backtracking = (_n, _k, startIndex) => {
    // 终止条件
    if (path.length === _k) {
      result.push(path.slice());
      return;
    }

    // 循环本层集合元素
    // 比如从1开始，如果还剩2个元素，那么就从3开始，因为3+2=5，5>4，所以剪枝
    for (let i = startIndex; i <= _n - (_k - path.length) + 1; i++) {
      path.push(i);
      console.log("path2", path);

      //   递归
      backtracking(_n, _k, i + 1);
      //   回溯操作
      path.pop();
    }
  };
  backtracking(n, k, 1);
  return result;
};

console.log(combine(4, 3));
console.log(combine1(4, 3));
