// 移动零

// 输入: nums = [0,1,0,3,12, 14]
// 输出: [1,3,12,0,0]

// [0 0]

function moveZeroes(nums) {
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      stack.push(i);
      continue;
    }
    if (stack.length) {
      const head = stack.shift();
      nums[head] = nums[i];
      nums[i] = 0;
      i--;
    }
  }
  return nums;
}

var moveZeroes = function (nums) {
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      [nums[r], nums[l]] = [nums[l], nums[r]];
      l++;
    }
  }
};

console.log(move([0, 1, 0, 3, 12]));
