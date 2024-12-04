// 15.三数之和的双指针解法是一层for循环num[i]为确定值，然后循环内有left和right下标作为双指针，找到nums[i] + nums[left] + nums[right] == 0。
// 四数之和的双指针解法是两层for循环nums[k] + nums[i]为确定值，依然是循环内有left和right下标作为双指针，找出nums[k] + nums[i] + nums[left] + nums[right] == target的情况，
// 三数之和的时间复杂度是O(n^2)，四数之和的时间复杂度是O(n^3) 。
// 那么一样的道理，五数之和、六数之和等等都采用这种解法。
// 对于15.三数之和 双指针法就是将原本暴力O(n^3)的解法，降为O(n^2)的解法，四数之和的双指针解法就是将原本暴力O(n^4)的解法，降为O(n^3)的解法。

var fourSum = function (nums, target) {
  const len = nums.length;
  if (len < 4) return [];
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < len - 3; i++) {
    // 去重i
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < len - 2; j++) {
      // 去重j
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1,
        r = len - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum < target) {
          l++;
          continue;
        }
        if (sum > target) {
          r--;
          continue;
        }
        res.push([nums[i], nums[j], nums[l], nums[r]]);

        // 对nums[left]和nums[right]去重
        while (l < r && nums[l] === nums[++l]);
        while (l < r && nums[r] === nums[--r]);
      }
    }
  }
  return res;
};
