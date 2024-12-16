// 暴力执法：不断的的寻找符合的子序列
// O(n^2)

// class Solution {
//   public:
//       int minSubArrayLen(int s, vector<int>& nums) {
//           int result = INT32_MAX; // 最终的结果
//           int sum = 0; // 子序列的数值之和
//           int subLength = 0; // 子序列的长度
//           for (int i = 0; i < nums.size(); i++) { // 设置子序列起点为i
//               sum = 0;
//               for (int j = i; j < nums.size(); j++) { // 设置子序列终止位置为j
//                   sum += nums[j];
//                   if (sum >= s) { // 一旦发现子序列和超过了s，更新result
//                       subLength = j - i + 1; // 取子序列的长度
//                       result = result < subLength ? result : subLength;
//                       break; // 因为我们是找符合条件最短的子序列，所以一旦符合条件就break
//                   }
//               }
//           }
//           // 如果result没有被赋值的话，就返回0，说明没有符合条件的子序列
//           return result == INT32_MAX ? 0 : result;
//       }
//   };


// 滑动窗口:(滑动窗口也可以理解为双指针法的一种！只不过这种解法更像是一个窗口的移动，所以叫做滑动窗口更适合一些。)
// 所谓滑动窗口，就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果。
// 在暴力解法中，是一个for循环滑动窗口的起始位置，一个for循环为滑动窗口的终止位置，用两个for循环 完成了一个不断搜索区间的过程。
// 那么滑动窗口如何用一个for循环来完成这个操作呢。
// 首先要思考 如果用一个for循环，那么应该表示 滑动窗口的起始位置，还是终止位置。
// 如果只用一个for循环来表示 滑动窗口的起始位置，那么如何遍历剩下的终止位置？
// 此时难免再次陷入 暴力解法的怪圈。
// 所以 只用一个for循环，那么这个循环的索引，一定是表示 滑动窗口的终止位置。
// 那么问题来了， 滑动窗口的起始位置如何移动呢？
// 窗口的起始位置如何移动：如果当前窗口的值大于等于s了，窗口就要向前移动了（也就是该缩小了）。
// 窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，也就是for循环里的索引。

// 解法
// 滑动窗口的精妙之处在于根据当前子序列和大小的情况，不断调节子序列的起始位置。从而将O(n^2)暴力解法降为O(n)。

var minSubArrayLen = function(target, nums) {
  let start, end
  start = end = 0
  let sum = 0
  let len = nums.length
  let ans = Infinity
  
  while(end < len){
      sum += nums[end];
      while (sum >= target) {
          ans = Math.min(ans, end - start + 1);
          sum -= nums[start];
          start++;
      }
      end++;
  }
  return ans === Infinity ? 0 : ans
};

console.log(minSubArrayLen(7, [2,3,1,2,4,0,3]))