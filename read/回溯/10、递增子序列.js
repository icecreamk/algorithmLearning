// 给定一个整型数组, 你的任务是找到所有该数组的递增子序列，递增子序列的长度至少是2。
// 示例:
// 输入: [4, 6, 7, 7]
// 输出: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]

// 说明:
//     给定数组的长度不会超过15。
//     数组中的整数范围是 [-100,100]。
//     给定数组中可能包含重复数字，相等的数字应该被视为递增的一种情况。

// 这个递增子序列比较像是取有序的子集。而且本题也要求不能有相同的递增子序列。
// 这又是子集，又是去重，是不是不由自主的想起了刚刚讲过的90.子集II

// 在90.子集II 中我们是通过排序，再加一个标记数组来达到去重的目的。
// 而本题求自增子序列，是不能对原数组进行排序的，排完序的数组都是自增子序列了。
// 所以不能使用之前的去重逻辑！

// 时间复杂度: O(n * 2^n)
// 空间复杂度: O(n)
var findSubsequences = function (nums) {
  let result = [];
  let path = [];
  function backtracing(startIndex) {
    if (path.length > 1) {
      result.push(path.slice());
    }
    // 新的一层uset都会重新定义（清空），所以要知道uset只负责本层！
    let uset = [];
    for (let i = startIndex; i < nums.length; i++) {
      console.log(path, uset, i, nums[i])
      if (
        (path.length > 0 && nums[i] < path[path.length - 1]) ||
        uset[nums[i] + 100]
      ) {
        continue;
      }
      uset[nums[i] + 100] = true;
      path.push(nums[i]);
      backtracing(i + 1);
      path.pop();
    }
  }
  backtracing(0);
  return result;
};

// console.log(findSubsequences([6, 7, 7, 4])) // [[6,7],[6,7,7],[7,7]]
console.log(findSubsequences([4, 6, 7, 7])) // [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

