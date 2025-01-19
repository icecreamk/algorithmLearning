// 300. 最长递增子序列

// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

// 输入：nums = [0,1,0,3,2,3]
// 输出：4

// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1

/**
 * @param {number[]} nums
 * @return {number}
 */

// 动态规划
var lengthOfLIS = function (nums) {
  let dp = Array(nums.length).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 位置i的最长升序子序列等于j从0到i-1各个位置的最长升序子序列 + 1 的最大值。
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    result = Math.max(result, dp[i]);
  }

  return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */

// 思路：维护上升栈， 比top元素大的放心push， 否则覆盖
// 二分  下面那个更好理解
var lengthOfLIS = function (nums) {
  // 每堆的堆顶
  const top = [];
  // 牌堆数初始化为0
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
    // 要处理的扑克牌
    let poker = nums[i];
    // 左堆和最右堆进行二分搜索，因为堆顶是有序排的，最终找到该牌要插入的堆
    let left = 0,
      right = piles;
    //搜索区间是左闭右开
    console.log("l", top, left, right);
    while (left < right) {
      let mid = left + ((right - left) >> 1);
      console.log("mid", top[mid], poker);
      if (top[mid] > poker) {
        right = mid;
      } else if (top[mid] < poker) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    //  没找到合适的牌堆，新建一堆
    if (left == piles) piles++;
    // 把这张牌放到堆顶
    top[left] = poker;
    console.log(top, left, right, piles, poker);
  }
  return piles;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const tails = []; //维护一个tails数组，它严格递增，它保存着当前遍历到i位置时的最长递增子序列
  tails[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // console.log("----", tails);
    const num = nums[i]; //num 代表我要将它插入tails数组的位置
    if (
      tails[tails.length - 1] !== undefined &&
      tails[tails.length - 1] < num
    ) {
      //栈顶就是最大的元素嘛，如果它还比要插入的元素小，说明直接接在后面就可以了
      tails.push(num);
    } else {
      //如果不是，那么就要找一个位置，让num插入，【这个插入是覆盖形的插入，不会改变数组长度，但会改变数组内容】
      let left = 0;
      let right = tails.length;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < num) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      tails[left] = num; //覆盖
    }
  }
  return tails.length;
};

console.log(lengthOfLIS([10, 9, 2, 5, 3, 4, 7, 101, 18]));
