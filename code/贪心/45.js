


// [2,3,1,1,4]
var jump = function (nums) {
    let curIndex = 0;
    let nextIndex = 0;
    let steps = 0;
    for (let i = 0; i < nums.length - 1; i++) {
      // console.log(i, nums[i], curIndex, nextIndex);
      // 题目的前提是，一定会到最后一个位置
      nextIndex = Math.max(nums[i] + i, nextIndex);
      
      if (i === curIndex) {
        curIndex = nextIndex;
        steps++;
      }
    }
  
    return steps;
  };