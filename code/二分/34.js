// 34. 在排序数组中查找元素的第一个和最后一个位置
// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]

var searchRange = function (nums, target) {
  return [searchIdx(nums, target, true), searchIdx(nums, target, false)];
};

function searchIdx(nums, target, start) {
  const len = nums.length;
  let left = 0;
  let right = len - 1;
  if (start) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (target > nums[mid]) {
        left = mid + 1;
      } else {
        right--;
      }
    }
    return nums[left] === target ? left : -1;
  } else {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (target < nums[mid]) {
        right = mid - 1;
      } else {
        left++;
      }
    }
    return nums[right] === target ? right : -1;
  }
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
