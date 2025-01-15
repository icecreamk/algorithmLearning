// 搜索旋转排序数组

// 例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

// 示例 1：

// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
// 示例 2：

// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1
// 示例 3：

// 输入：nums = [1], target = 0
// 输出：-1

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// var search = function (nums, target) {
//   let l = 0;
//   let r = nums.length - 1;
//   while (l < r) {
//     const mid = Math.floor((l + r) / 2);
//     if (nums[mid] === target) return mid;
//     if (
//       (target < nums[l] && nums[l] > nums[r]) ||
//       (nums[l] < nums[r] && target > nums[mid])
//     ) {
//       l = mid + 1;
//     } else {
//       r = mid - 1;
//     }
//   }
//   return nums[l] === target ? l : -1;
// };
/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var search = function (nums, target) {
  // 时间复杂度：O(logn)
  // 空间复杂度：O(1)
  // [6,7,8,1,2,3,4,5]
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = start + ((end - start) >> 1);
    if (nums[mid] === target) return mid;
    // [start, mid]有序
    // ️⚠️注意这里的等号
    if (nums[mid] >= nums[start]) {
      //target 在 [start, mid] 之间
      // 其实target不可能等于nums[mid]， 但是为了对称，我还是加上了等号
      if (target >= nums[start] && target <= nums[mid]) {
        end = mid - 1;
      } else {
        //target 不在 [start, mid] 之间
        start = mid + 1;
      }
    } else {
      // [mid, end]有序
      // target 在 [mid, end] 之间
      if (target >= nums[mid] && target <= nums[end]) {
        start = mid + 1;
      } else {
        // target 不在 [mid, end] 之间
        end = mid - 1;
      }
    }
  }
  return -1;
};
// 重要 由于根据mid划分，所以要判断l和mid、mid和r的顺序情况，而不是l和r的顺序情况，下面一个是错误写法

// var search = function (nums, target) {
//   // 时间复杂度：O(logn)
//   // 空间复杂度：O(1)
//   // [6,7,8,1,2,3,4,5]
//   let l = 0;
//   let r = nums.length - 1;

//   while (l <= r) {
//     const mid = l + ((r - l) >> 1);
//     console.log(l, r, mid);
//     if (nums[mid] === target) return mid;

//     if (nums[l] < nums[r]) {
//       if (target > nums[mid]) {
//         l = mid + 1;
//       } else {
//         r = mid - 1;
//       }
//     } else {
//       if (target < nums[mid] && target >= nums[l]) {
//         r = mid - 1;
//       } else {
//         l = mid + 1;
//       }
//     }
//   }
//   return -1;
// };

console.log(search([4,5,6,7,8,1,2], 8)); // 4
// console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
// console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
// console.log(search([1], 0)); // -1
// console.log(search([1, 3], 1)); // 0
// console.log(search([1, 3], 3)); // 1
// console.log(search([1, 3, 5], 3)); // 1
