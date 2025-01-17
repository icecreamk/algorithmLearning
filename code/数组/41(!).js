// 缺失的第一个正数
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = (nums) => {
  let l = 0,
    r = nums.length;
  while (l < r) {
    if (nums[l] == l + 1) {
      // 如果当前元素已经在正确的位置上
      l++; // 左边界向右移动
    } else if (nums[l] <= l || nums[l] > r || nums[l] == nums[nums[l] - 1]) {
      // 如果当前元素小于等于左边界，或者大于右边界，或者与目标位置的元素相同
      swap(nums, l, --r); // 将当前元素交换到右边界，并缩小右边界
    } else {
      swap(nums, l, nums[l] - 1); // 将当前元素交换到正确的位置
    }
    // console.log(JSON.parse(JSON.stringify(nums)));
  }
  return l + 1; // 返回第一个缺失的正整数
};

function swap(nums, start, end) {
  [nums[start], nums[end]] = [nums[end], nums[start]];
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = (nums) => {
  const m = new Set();
  for (let i = 0; i < nums.length; i++) {
    m.add(nums[i]);
  }

  for (let i = 1; i < nums.length + 1; i++) {
    if (!m.has(i)) {
      return i;
    }
  }

  return nums.length + 1;
};

console.log(firstMissingPositive([3, 4, -1, 1]));
