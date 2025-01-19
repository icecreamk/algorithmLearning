// 时间复杂度 O(n) 空间复杂度O(n)
// 1,-4, 3, -2
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const n = nums.length;
  const fMax = new Array(n);
  const fMin = new Array(n);
  fMax[0] = fMin[0] = nums[0];
  for (let i = 1; i < n; i++) {
    const x = nums[i];
    // 把 x 加到右端点为 i-1 的（乘积最大/最小）子数组后面，
    // 或者单独组成一个子数组，只有 x 一个元素
    fMax[i] = Math.max(Math.max(fMax[i - 1] * x, fMin[i - 1] * x), x);
    fMin[i] = Math.min(Math.min(fMax[i - 1] * x, fMin[i - 1] * x), x);
  }
  return Math.max(...fMax);
};
/**
 * @param {number[]} nums
 * @return {number}
 */
// 空间 优化
var maxProduct = (nums) => {
  let res = nums[0];
  let prevMin = nums[0];
  let prevMax = nums[0];
  let temp1 = 0,
    temp2 = 0;
  for (let i = 1; i < nums.length; i++) {
    console.log(prevMin, prevMax);
    temp1 = prevMin * nums[i];
    temp2 = prevMax * nums[i];
    prevMin = Math.min(temp1, temp2, nums[i]);
    prevMax = Math.max(temp1, temp2, nums[i]);
    res = Math.max(prevMax, res);
  }
  return res;
};
console.log(maxProduct([1, -4, 3, -2]));
