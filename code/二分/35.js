// 搜索插入位置

// 示例 1:
// 输入: nums = [1,3,5,6], target = 5
// 输出: 2
// 示例 2:
// 输入: nums = [1,3,5,6], target = 2
// 输出: 1
// 示例 3:
// 输入: nums = [1,3,5,6], target = 7
// 输出: 4

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0,
    right = nums.length - 1; // 闭区间 [left, right]
  while (left <= right) {
    // console.log(left, right);
    // 区间不为空
    // 循环不变量：
    // nums[left-1] < target
    // nums[right+1] >= target
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1; // 范围缩小到 [mid+1, right]
    } else {
      right = mid - 1; // 范围缩小到 [left, mid-1]
    }
  }
  return left;
};


console.log(searchInsert([1, 3, 5, 6], 5));
// console.log(searchInsert([1, 3, 5, 6], 2));
// console.log(searchInsert([1, 3, 5, 6], 7));
// console.log(searchInsert([1, 3, 5], 3));
// console.log(searchInsert([1, 3, 5], 4));
