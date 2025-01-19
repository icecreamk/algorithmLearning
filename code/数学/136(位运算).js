// 136. 只出现一次的数字
// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

// 示例 1 ：
// 输入：nums = [2,2,1]
// 输出：1

// 示例 2 ：
// 输入：nums = [1,4,2,1,2]
// 输出：4

// 示例 3 ：
// 输入：nums = [1]
// 输出：1

// nums=[4,1,2,1,2]，把所有元素异或：

// 4⊕1⊕2⊕1⊕2
// 4⊕(1⊕1)⊕(2⊕2)
// 4⊕0⊕0
// 4

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (const n of nums) {
    res = res ^ n;
  }
  return res
};

console.log(singleNumber([4,1,2,1,2]))
