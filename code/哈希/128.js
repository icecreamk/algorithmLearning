// 最长连续序列

// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 示例 1：

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// var longestConsecutive = (nums) => {
//   const m = new Set(nums);
//   let max = 0;

//   for (let i = 0; i < nums.length; i++) {
//     if (!m.has(nums[i] - 1)) {
//       let count = 1;
//       let next = nums[i] + 1;
//       while (m.has(next)) {
//         count++;
//         next++;
//       }
//       max = Math.max(max, count);
//     }
//   }
//   return max;
// };

var longestConsecutive = (nums) => {
  let map = new Map();
  let max = 0;
  for (const num of nums) {
    // 遍历nums数组
    if (!map.has(num)) {
      // 重复的数字不考察，跳过
      let preLen = map.get(num - 1) || 0; // 获取左邻居所在序列的长度
      let nextLen = map.get(num + 1) || 0; // 获取右邻居所在序列的长度
      let curLen = preLen + 1 + nextLen; // 新序列的长度
      map.set(num, curLen); // 将自己存入 map
      max = Math.max(max, curLen); // 和 max 比较，试图刷新max
      map.set(num - preLen, curLen); // 更新新序列的左端数字的value
      map.set(num + nextLen, curLen); // 更新新序列的右端数字的value
      // console.log(map, num, preLen, nextLen);
    }
  }
  return max;
};

// var longestConsecutive = (nums) => {
//   const set = new Set(nums); // set存放数组的全部数字
//   let max = 0;
//   for (let i = 0; i < nums.length; i++) {
//     if (!set.has(nums[i] - 1)) {
//       // nums[i]没有左邻居，是序列的起点
//       let cur = nums[i];
//       let count = 1;
//       while (set.has(cur + 1)) {
//         // cur有右邻居cur+1
//         cur++; // 更新cur
//         count++;
//       }
//       max = Math.max(max, count); // cur不再有右邻居，检查count是否最大
//     }
//   }
//   return max;
// };

// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
// console.log(longestConsecutive([1, 4, 3, 2]));
