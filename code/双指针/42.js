// 接雨水

// 双指针
var trap = function (height) {
  let sum = 0,
    left = 0,
    leftMax = 0,
    rightMax = 0,
    right = height.length - 1;

  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (height[left] < height[right]) {
      sum += leftMax - height[left];
      left++;
    } else {
      sum += rightMax - height[right];
      right--;
    }
  }

  return sum;
};

console.log(trap([4, 2, 3])); // 1
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6

// 单调栈
var trap = function (height) {
  let ans = 0;
  const stack = [];
  const n = height.length;
  for (let i = 0; i < n; ++i) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) {
        break;
      }
      const left = stack[stack.length - 1];
      const currWidth = i - left - 1;
      const currHeight = Math.min(height[left], height[i]) - height[top];
      ans += currWidth * currHeight;
    }
    stack.push(i);
  }
  return ans;
};

// 动态规划
// 取交集
var trap = function (height) {
  const n = height.length;
  if (n == 0) {
    return 0;
  }

  const leftMax = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; ++i) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; --i) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let ans = 0;
  for (let i = 0; i < n; ++i) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ans;
};
