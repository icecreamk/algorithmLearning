// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。

// 示例:
// 输入: [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。从下标为 0 跳到下标为 1 的位置，跳  1  步，然后跳  3  步到达数组的最后一个位置。
// 说明: 假设你总是可以到达数组的最后一个位置。

// 移动下标达到了当前覆盖的最远距离下标时，步数就要加一，来增加覆盖距离。最后的步数就是最少步数。

// 版本一
// class Solution {
//     public:
//         int jump(vector<int>& nums) {
//             if (nums.size() == 1) return 0;
//             int curDistance = 0;    // 当前覆盖最远距离下标
//             int ans = 0;            // 记录走的最大步数
//             int nextDistance = 0;   // 下一步覆盖最远距离下标
//             for (int i = 0; i < nums.size(); i++) {
//                 nextDistance = max(nums[i] + i, nextDistance);  // 更新下一步覆盖最远距离下标
//                 if (i == curDistance) {                         // 遇到当前覆盖最远距离下标
//                     ans++;                                  // 需要走下一步
//                     curDistance = nextDistance;             // 更新当前覆盖最远距离下标（相当于加油了）
//                     if (nextDistance >= nums.size() - 1) break;  // 当前覆盖最远距到达集合终点，不用做ans++操作了，直接结束
//                 }
//             }
//             return ans;
//         }
//     };

// 移动下标只要遇到当前覆盖最远距离的下标，直接步数加一，不考虑是不是终点的情况。
// 版本二
// class Solution {
//     public:
//         int jump(vector<int>& nums) {
//             int curDistance = 0;    // 当前覆盖的最远距离下标
//             int ans = 0;            // 记录走的最大步数
//             int nextDistance = 0;   // 下一步覆盖的最远距离下标
//             for (int i = 0; i < nums.size() - 1; i++) { // 注意这里是小于nums.size() - 1，这是关键所在
//                 nextDistance = max(nums[i] + i, nextDistance); // 更新下一步覆盖的最远距离下标
//                 if (i == curDistance) {                 // 遇到当前覆盖的最远距离下标
//                     curDistance = nextDistance;         // 更新当前覆盖的最远距离下标
//                     ans++;
//                 }
//             }
//             return ans;
//         }
//     };

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
//  [2,3,1,1,4]
