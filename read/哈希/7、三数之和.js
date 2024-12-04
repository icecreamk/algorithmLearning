// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意： 答案中不可以包含重复的三元组。
// 示例：
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

// 哈希解法
// 两层for循环就可以确定 a 和b 的数值了，可以使用哈希法来确定 0-(a+b) 是否在 数组里出现过，其实这个思路是正确的，但是我们有一个非常棘手的问题，就是题目中说的不可以包含重复的三元组。
// 把符合条件的三元组放进vector中，然后再去重，这样是非常费时的，很容易超时，也是这道题目通过率如此之低的根源所在。
// 去重的过程不好处理，有很多小细节，如果在面试中很难想到位。
// 时间复杂度可以做到O(n^2)，但还是比较费时的，因为不好做剪枝操作。
// 大家可以尝试使用哈希法写一写，就知道其困难的程度了。

// class Solution {
// public:
//     vector<vector<int>> threeSum(vector<int>& nums) {
//         vector<vector<int>> result;
//         sort(nums.begin(), nums.end());
//         // 找出a + b + c = 0
//         // a = nums[i], b = nums[j], c = -(a + b)
//         for (int i = 0; i < nums.size(); i++) {
//             // 排序之后如果第一个元素已经大于零，那么不可能凑成三元组
//             if (nums[i] > 0) {
//                 break;
//             }
//             if (i > 0 && nums[i] == nums[i - 1]) { //三元组元素a去重
//                 continue;
//             }
//             unordered_set<int> set;
//             for (int j = i + 1; j < nums.size(); j++) {
//                 if (j > i + 2
//                         && nums[j] == nums[j-1]
//                         && nums[j-1] == nums[j-2]) { // 三元组元素b去重
//                     continue;
//                 }
//                 int c = 0 - (nums[i] + nums[j]);
//                 if (set.find(c) != set.end()) {
//                     result.push_back({nums[i], nums[j], c});
//                     set.erase(c);// 三元组元素c去重
//                 } else {
//                     set.insert(nums[j]);
//                 }
//             }
//         }
//         return result;
//     }
// };
// 时间复杂度: O(n^2)
// 空间复杂度: O(n)，额外的 set 开销

// 其实这道题目使用哈希法并不十分合适，因为在去重的操作中有很多细节需要注意，在面试中很难直接写出没有bug的代码。
// 而且使用哈希法 在使用两层for循环的时候，能做的剪枝操作很有限，虽然时间复杂度是O(n^2)，也是可以在leetcode上通过，但是程序的执行时间依然比较长 。
// 接下来我来介绍另一个解法：双指针法，这道题目使用双指针法 要比哈希法高效一些，那么来讲解一下具体实现的思路。

// 先排序，然后有一层for循环
// a = nums[i]，b = nums[left]，c = nums[right]。
// 接下来如何移动left 和right呢，
// 如果nums[i] + nums[left] + nums[right] > 0 就说明 此时三数之和大了，所以right下标就应该向左移动，这样才能让三数之和小一些。
// 如果 nums[i] + nums[left] + nums[right] < 0 说明 此时 三数之和小了，left 就向右移动，才能让三数之和大一些，
// 直到left与right相遇为止。
// 时间复杂度：O(n^2)。

// 去重逻辑的思考
// #a的去重
// 说到去重，其实主要考虑三个数的去重。 a, b ,c, 对应的就是 nums[i]，nums[left]，nums[right]

// a 如果重复了怎么办，a是nums里遍历的元素，那么应该直接跳过去。
// 但这里有一个问题，是判断 nums[i] 与 nums[i + 1]是否相同，还是判断 nums[i] 与 nums[i-1] 是否相同。
// 有同学可能想，这不都一样吗。其实不一样！
// 如果我们的写法是 这样：
// if (nums[i] == nums[i + 1]) { // 去重操作
//     continue;
// }
// 那我们就把 三元组中出现重复元素的情况直接pass掉了。 例如{-1, -1 ,2} 这组数据，当遍历到第一个-1 的时候，判断 下一个也是-1，那这组数据就pass了。
// 我们要做的是 不能有重复的三元组，但三元组内的元素是可以重复的！
// 所以这里是有两个重复的维度。
// 那么应该这么写：
// if (i > 0 && nums[i] == nums[i - 1]) {
//     continue;
// }
// 这么写就是当前使用 nums[i]，我们判断前一位是不是一样的元素，在看 {-1, -1 ,2} 这组数据，当遍历到 第一个 -1 的时候，只要前一位没有-1，那么 {-1, -1 ,2} 这组数据一样可以收录到 结果集里。

// 而对于bc的去重复
// while (right > left) {
//     if (nums[i] + nums[left] + nums[right] > 0) {
//         right--;
//         // 去重 right
//         while (left < right && nums[right] == nums[right + 1]) right--;
//     } else if (nums[i] + nums[left] + nums[right] < 0) {
//         left++;
//         // 去重 left
//         while (left < right && nums[left] == nums[left - 1]) left++;
//     } else {
//     }
// }
// 拿right去重为例，即使不加这个去重逻辑，依然根据 while (right > left) 和 if (nums[i] + nums[left] + nums[right] > 0) 去完成right-- 的操作。
// 多加了 while (left < right && nums[right] == nums[right + 1]) right--; 这一行代码，其实就是把 需要执行的逻辑提前执行了，但并没有减少 判断的逻辑。
// 最直白的思考过程，就是right还是一个数一个数的减下去的，所以在哪里减的都是一样的。
// 所以这种去重 是可以不加的。 仅仅是 把去重的逻辑提前了而已

// 思考：三数之和可以用指针法，而两数之和不能，因为它要求返回的是索引下标， 而双指针法一定要排序，一旦排序之后原数组的索引就被改变了
// 如果 两数之和要求返回的是数值的话，就可以使用双指针法了

var threeSum1 = function (nums) {
  const res = [],
    len = nums.length;
  // 将数组排序
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    let l = i + 1,
      r = len - 1,
      iNum = nums[i];
    // 数组排过序，如果第一个数大于0直接返回res
    if (iNum > 0) return res;
    // 去重
    if (iNum == nums[i - 1]) continue;
    while (l < r) {
      let lNum = nums[l],
        rNum = nums[r],
        threeSum = iNum + lNum + rNum;
      // 三数之和小于0，则左指针向右移动
      if (threeSum < 0) l++;
      else if (threeSum > 0) r--;
      else {
        res.push([iNum, lNum, rNum]);
        // 去重逻辑应该放在找到一个三元组之后，对b 和 c去重
        while (l < r && nums[l] == nums[l + 1]) {
          l++;
        }
        while (l < r && nums[r] == nums[r - 1]) {
          r--;
        }
        l++;
        r--;
      }
    }
  }
  return res;
};

/**
 *  nsum通用解法，支持2sum，3sum，4sum...等等
 *  时间复杂度分析：
 *  1. n = 2时，时间复杂度O(NlogN)，排序所消耗的时间。、
 *  2. n > 2时，时间复杂度为O(N^n-1)，即N的n-1次方，至少是2次方，此时可省略排序所消耗的时间。举例：3sum为O(n^2)，4sum为O(n^3)
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum2 = function (nums) {
  // nsum通用解法核心方法
  function nSumTarget1(nums, n, start, target) {
    // 前提：nums要先排序好
    let res = [];
    if (n === 2) {
      res = towSumTarget2(nums, start, target);
    } else {
      for (let i = start; i < nums.length; i++) {
        // 递归求(n - 1)sum
        let subRes = nSumTarget1(nums, n - 1, i + 1, target - nums[i]);
        for (let j = 0; j < subRes.length; j++) {
          res.push([nums[i], ...subRes[j]]);
        }
        // 跳过相同元素
        while (nums[i] === nums[i + 1]) i++;
      }
    }
    return res;
  }

  function towSumTarget2(nums, start, target) {
    // 前提：nums要先排序好
    let res = [];
    let len = nums.length;
    let left = start;
    let right = len - 1;
    while (left < right) {
      let sum = nums[left] + nums[right];
      if (sum < target) {
        while (nums[left] === nums[left + 1]) left++;
        left++;
      } else if (sum > target) {
        while (nums[right] === nums[right - 1]) right--;
        right--;
      } else {
        // 相等
        res.push([nums[left], nums[right]]);
        // 跳过相同元素
        while (nums[left] === nums[left + 1]) left++;
        while (nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
    return res;
  }
  nums.sort((a, b) => a - b);
  // n = 3，此时求3sum之和
  return nSumTarget1(nums, 3, 0, 0);
};


console.log(threeSum2([1,-1, 9]))
