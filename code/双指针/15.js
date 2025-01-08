// 三数之和

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。

// 组合无序 子集{1,2} 和 子集{2,1}是一样的
// 排列有序 有序的，{1, 2} 和{2, 1}是两个集合

// 超时了，看看双指针
// function threeSum(nums) {
//   const res = [];
//   const memo = new Map();
//   nums.sort();

//   function dfs(temp, start) {
//     if (temp.length === 3) {
//       const keys = String(temp);
//       if (temp[0] + temp[1] + temp[2] === 0 && !memo.get(keys)) {
//         res.push(temp.slice());
//         memo.set(keys, true);
//       }
//       return;
//     }
//     for (let i = start; i < nums.length; i++) {
//       const val = nums[i];
//       temp.push(val);
//       dfs(temp, i + 1);
//       temp.pop();
//     }
//   }
//   dfs([], 0);
//   return res;
// }

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// console.log(threeSum([1, -1, -1, 0]));
// var threeSum = function (nums) {
//   const res = [],
//     len = nums.length;
//   // 将数组排序
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < len; i++) {
//     let l = i + 1,
//       r = len - 1,
//       iNum = nums[i];
//     // 数组排过序，如果第一个数大于0直接返回res
//     if (iNum > 0) return res;
//     // 去重
//     if (iNum == nums[i - 1]) continue;
//     while (l < r) {
//       let lNum = nums[l],
//         rNum = nums[r],
//         threeSum = iNum + lNum + rNum;
//       // 三数之和小于0，则左指针向右移动
//       if (threeSum < 0) l++;
//       else if (threeSum > 0) r--;
//       else {
//         res.push([iNum, lNum, rNum]);
//         // 去重逻辑应该放在找到一个三元组之后，对b 和 c去重
//         while (l < r && nums[l] == nums[l + 1]) {
//           l++;
//         }
//         while (l < r && nums[r] == nums[r - 1]) {
//           r--;
//         }
//         l++;
//         r--;
//       }
//     }
//   }
//   return res;
// };

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    let l = i + 1;
    let r = len - 1;
    const curNum = nums[i];
    if (curNum > 0) break;

    if (nums[i] === nums[i - 1]) continue;
    while (l < r) {
      const sum = curNum + nums[l] + nums[r];
      if (sum < 0) {
        l++;
      } else if (sum > 0) {
        r--;
      } else {
        res.push([curNum, nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }
        while (l < r && nums[r] === nums[l - 1]) {
          r--;
        }
        l++;
        r--;
      }
    }
  }
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(
  threeSum([
    0, -6, 0, -14, 2, 0, -9, 5, -9, -8, -7, 12, -4, 14, -6, 6, 0, 5, -2, 6, -7,
    1, 10, -10, -5, 3, -2, -3, -13, -6, 1, -6, 3, 9, -5, 12, -6, -7, 2, 0, 1,
    11, -11, 4, 2, -2, -5, -13, 11, 0, 9, 11, -13, -4, -13, -11, 14, -8, 1, 8,
    1, 9, -13, -11, 3, -11, 9, 12, -2, -4, -11, 6, 14, -7, -5, 1, -1, -3, -4,
    -5, 12, 12, 13, 6, -7, -15, 10, 14, 14, -12, 8, 0, 13, 2, -3, 1, -1, -9, -9,
    12, -6, -5, -5, -6, 4, 5, 2, 10, -13, 13, 12, 6,
  ])
);
