// 轮转数组

// 输入：nums = [-1,-100,3,99], k = 2
// 输出：[3,99,-1,-100]
// 解释:
// 向右轮转 1 步: [99,-1,-100,3]
// 向右轮转 2 步: [3,99,-1,-100]

// 891234567
// 765432198
// 891234576

// 45123;

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const len = nums.length;
  let num = k % len
  swap(nums, 0, len - 1);
  swap(nums, 0, num - 1);
  swap(nums, num, len - 1);
};

function swap(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
console.log(rotate([-1], 2));
console.log(rotate([1, 2], 3));
console.log(rotate([1, 2, 3], 4));
