// 给定一个未经排序的整数数组，找到最长且连续递增的子序列，并返回该序列的长度。
// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

// 示例 1：
// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。

// 示例 2：
// 输入：nums = [2,2,2,2,2]
// 输出：1
// 解释：最长连续递增序列是 [2], 长度为1。

// 这道题目也可以用贪心来做，也就是遇到nums[i] > nums[i - 1]的情况，count就++，否则count为1，记录count的最大值就可以了。



// 动态规划：

const findLengthOfLCIS1 = (nums) => {
    let dp = new Array(nums.length).fill(1);


    for(let i = 0; i < nums.length - 1; i++) {
        if(nums[i+1] > nums[i]) {
            dp[i+1] = dp[i]+ 1;
        }
    }

    return Math.max(...dp);
};
// 贪心法：
const findLengthOfLCIS2 = (nums) => {
    if(nums.length === 1) {
        return 1;
    }

    let maxLen = 1;
    let curMax = 1;
    let cur = nums[0];

    for(let num of nums) {
        if(num > cur) {
            curMax += 1;
            maxLen =  Math.max(maxLen, curMax);
        } else {
            curMax = 1;
        }
        cur = num;
    }

    return maxLen;
};

// 时间复杂度：O(n)
// 空间复杂度：O(1)
