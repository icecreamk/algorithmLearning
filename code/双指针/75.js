// 颜色分类

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 循环两遍
var sortColors = function (nums) {
  let l = 0,
    r = 0;
  while (r < nums.length) {
    if (nums[r] === 0) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
    }
    r++;
  }
  r = l;
  while (r < nums.length) {
    if (nums[r] === 1) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
    }
    r++;
  }
  //   console.log(nums);
};
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
//  0、 1 和 2 分别表示红色、白色和蓝色。
// 我们可以设置 3 个指针，一个指向头部，一个指向尾部，还有一个指向当前遍历的元素。
// 我们从头部开始遍历数组，如果遇到 0（红色）就把它放到头部指针的位置，
// 如果遇到 2（蓝色）就把它放到尾部指针的位置。
// 如果遇到 1（白色），就跳过它，继续遍历。
// 只循环1遍，双指针p0指向数组开头，p2指向数组结尾
var sortColors = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  for (let i = 0; i <= right; i++) {
    if (nums[i] === 0) {
      swap(nums, i, left);
      left++;
    } else if (nums[i] === 2) {
      swap(nums, i, right);
      right--;
      i--;
    }
  }
};

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

console.log(sortColors([2, 0, 2, 1, 1, 0]));
console.log(sortColors([1, 1, 2, 0, 2, 1, 1, 0]));
