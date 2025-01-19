// 下一个排列

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[1,3,2]
// 示例 2：

// 输入：nums = [3,2,1]
// 输出：[1,2,3]

// [2,1,3]
// []

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 思路
// 如何变大：从低位挑一个大一点的数，交换前面一个小一点的数。
// 变大的幅度要尽量小(翻转剩余的)

// 像 [3,2,1] 这样递减的，没有下一个排列，已经稳定了，没法变大。
// 像 [1,5,2,4,3,2] 这种，怎么稍微变大？

// 从右往左，2开始不是递减的，要换
// 从右往左，3比2大，可以用3替换，得到：1,5,(3),4,(2),2
// 最后翻转，得到 153（224）

// O（n）
// O（1）

var nextPermutation = function (nums) {
  let i = nums.length - 2; // 向左遍历，i从倒数第二开始是为了nums[i+1]要存在
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    // 寻找第一个小于右邻居的数
    i--;
  }
  if (i >= 0) {
    // 这个数在数组中存在，从它身后挑一个数，和它换
    let j = nums.length - 1; // 从最后一项，向左遍历
    while (j >= 0 && nums[j] <= nums[i]) {
      // 寻找第一个大于 nums[i] 的数
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]]; // 两数交换，实现变大
  }
  // 如果 i = -1，说明是递减排列，如 3 2 1，没有下一排列，直接翻转为最小排列：1 2 3
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    // i 右边的数进行翻转，使得变大的幅度小一些
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
};
console.log(nextPermutation([3, 2, 1]));
