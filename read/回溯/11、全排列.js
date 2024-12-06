// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

//     输入: [1,2,3]
//     输出: [ [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1] ]

// 时间复杂度: O(n!)
// 空间复杂度: O(n)
// 每层都是从0开始搜索而不是startIndex
// 需要used数组记录path里都放了哪些元素了

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [],
    path = [];
  backtracking(nums, nums.length, []);
  return res;

  function backtracking(n, k, used) {
    if (path.length === k) {
      res.push(Array.from(path));
      return;
    }
    for (let i = 0; i < k; i++) {
      if (used[i]) continue;
      path.push(n[i]);
      used[i] = true; // 同支
      backtracking(n, k, used);
      path.pop();
      used[i] = false;
    }
  }
};

console.log(permute([1, 2, 3]));