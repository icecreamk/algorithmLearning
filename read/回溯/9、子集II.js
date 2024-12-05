// 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。

// 示例:
//     输入: [1,2,2]
//     输出: [ [2], [1], [1,2,2], [2,2], [1,2], [] ]

// 这道题目和78.子集区别就是集合里有重复元素了，而且求取的子集要去重。
// 那么关于回溯算法中的去重问题，在40.组合总和II

// 时间复杂度: O(n * 2^n)
// 空间复杂度: O(n)
var subsetsWithDup = function (nums) {
  let result = [];
  let path = [];
  let sortNums = nums.sort((a, b) => {
    return a - b;
  });
  function backtracing(startIndex, sortNums) {
    result.push([...path]);
    if (startIndex > nums.length - 1) {
      return;
    }
    for (let i = startIndex; i < nums.length; i++) {
      if (i > startIndex && nums[i] === nums[i - 1]) {
        continue;
      }
      path.push(nums[i]);
      backtracing(i + 1, sortNums);
      path.pop();
    }
  }
  backtracing(0, sortNums);
  return result;
};

console.log(subsetsWithDup([1, 2, 2]));
// [] [1] [1,2] [1,2,2] [2] [2,2]