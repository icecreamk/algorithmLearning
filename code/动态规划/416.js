// 416. 分割等和子集

// 示例 1：

// 输入：nums = [1,4, 2,3]
// 输出：true

//   1 2 3
//1 [1 0 1]
//4 [0 0 0]
//2 [0 0 1]
//3 [0 0 1]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  let sum = nums.reduce((p, v) => p + v);
  if (sum & 1) return false;
  const n = nums.length;

  sum = sum / 2;
  let dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(sum + 1).fill(false));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  for (let i = 1; i <= n; i++) {
    let num = nums[i - 1];
    for (let j = 0; j <= sum; j++) {
      // 背包容量不足，不能装入第 i 个物品
      if (j - nums[i - 1] < 0) {
        // 这时候看前面i-1个是否把容量为j的背包恰好装满了
        dp[i][j] = dp[i - 1][j];
      } else {
        // 不装入背包或者装入
        // dp[i - 1][j-num]的含义是前i-1个把容量为j-num恰好装满了
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      }
    }
  }
  return dp[n][sum];
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// 优化空间 从二维到一维
// 状态转移方程，在计算 dp[i+1] 时，只会用到 dp[i]，不会用到比 i 更早的状态。
// 以下是滚动数组写法，需要倒倒序才能保证物品只被取一次
var canPartition = function (nums) {
  // dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);

  const sum = nums.reduce((p, v) => p + v);
  if (sum & 1) return false;
  const dp = Array(sum / 2 + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    for (let j = sum / 2; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
      // console.log(nums[i], j, j - nums[i], dp[j], dp[j - nums[i]], nums[i]);
      if (dp[j] === sum / 2) {
        return true;
      }
    }
  }
  return dp[sum / 2] === sum / 2;
};
/**
 * @param {number[]} nums
 * @return {boolean}
 */
// dfs+记忆
// 时间复杂度： target * nums.length
// 空间复杂度： O(target * nums.length)。保存多少状态，就需要多少空间
var canPartition = (nums) => {
  let sum = 0;
  for (const n of nums) {
    // 求数组和
    sum += n;
  }
  if (sum % 2 != 0) return false; // 如果 sum 为奇数，直接返回 false
  const memo = new Map();
  const target = sum / 2; // 目标和

  const dfs = (curSum, i) => {
    // curSum是当前累加和，i是指针
    if (i == nums.length || curSum > target) {
      // 递归的出口
      return false;
    }
    if (curSum == target) {
      // 递归的出口
      return true;
    }
    const key = curSum + "&" + i; // 描述一个问题的key
    if (memo.has(key)) {
      // 如果memo中有对应的缓存值，直接使用
      return memo.get(key);
    }
    // 选nums[i]，当前和变为curSum+nums[i]，考察的指针移动一位
    // 不选nums[i]，当前和还是curSum，考察的指针移动一位
    const res = dfs(curSum + nums[i], i + 1) || dfs(curSum, i + 1);
    memo.set(key, res); // 计算的结果存入memo
    return res;
  };

  return dfs(0, 0); // 递归的入口，当前和为0，指针为0
};

console.log(canPartition([1, 5, 11, 5]));
