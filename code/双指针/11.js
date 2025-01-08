// 盛最多水的容器

var maxArea = function (height) {
  let l = 0;
  let r = height.length - 1;
  let ans = 0;

  while (l <= r) {
    const h = Math.min(height[l], height[r]);
    const w = r - l;
    ans = Math.max(ans, h * w);
    // 如果 height[l] 小于等于 height[r]，
    // 说明左侧的线段高度较小，应该移动左指针 l++，
    // 因为只有提高较小的线段高度，才能增加水量。
    if (height[l] <= height[r]) {
      l++; // 移动左指针
    } else {
      r--; // 移动右指针
    }
  }
  return ans
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
