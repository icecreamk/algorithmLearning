// 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
// 为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -2^28 到 2^28 - 1 之间，最终结果不会超过 2^31 - 1 。
// 例如:
// 输入:
// A = [ 1, 2]
// B = [-2,-1]
// C = [-1, 2]
// D = [ 0, 2]
// 输出:
// 2
// 解释:
// 两个元组如下:
// (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
// (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0

// 本题乍眼一看好像和0015.三数之和 0018.四数之和 差不多，其实差很多。
// 本题是使用哈希法的经典题目，而0015.三数之和 0018.四数之和 并不合适使用哈希法，因为三数之和和四数之和这两道题目使用哈希法在不超时的情况下做到对结果去重是很困难的，很有多细节需要处理。
// 而这道题目是四个独立的数组，只要找到A[i] + B[j] + C[k] + D[l] = 0就可以，不用考虑有重复的四个元素相加等于0的情况，所以相对于题目18. 四数之和，题目15.三数之和，还是简单了不少！
// 如果本题想难度升级：就是给出一个数组（而不是四个数组），在这里找出四个元素相加等于0，答案中不可以包含重复的四元组，大家可以思考一下，后续的文章我也会讲到的。

// 步骤
// 首先定义 一个unordered_map，key放a和b两数之和，value 放a和b两数之和出现的次数。
// 遍历大A和大B数组，统计两个数组元素之和，和出现的次数，放到map中。
// 定义int变量count，用来统计 a+b+c+d = 0 出现的次数。
// 再遍历大C和大D数组，找到如果 0-(c+d) 在map中出现过的话，就用count把map中key对应的value也就是出现次数统计出来。
// 最后返回统计值 count 就可以了

// 时间复杂度: O(n^2)
// 空间复杂度: O(n^2)，最坏情况下A和B的值各不相同，相加产生的数字个数为 n^2

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const twoSumMap = new Map();
  let count = 0;
  // 统计nums1和nums2数组元素之和，和出现的次数，放到map中
  for (const n1 of nums1) {
    for (const n2 of nums2) {
      const sum = n1 + n2;
      twoSumMap.set(sum, (twoSumMap.get(sum) || 0) + 1);
    }
  }
  // 找到如果 0-(c+d) 在map中出现过的话，就把map中key对应的value也就是出现次数统计出来
  for (const n3 of nums3) {
    for (const n4 of nums4) {
      const sum = n3 + n4;
      count += twoSumMap.get(0 - sum) || 0;
    }
  }

  return count;
};
