// 给定两个数组，编写一个函数来计算它们的交集。
// 说明： 输出结果中的每个元素一定是唯一的。 我们可以不考虑输出结果的顺序
// 输入：[1,2,2,1] [2,2]
// 输出：[2]

// 输入：[4,9,5] [9,4,9,8,4]
// 输出：[9,4]

// 这道题目，主要要学会使用一种哈希数据结构：unordered_set，这个数据结构可以解决很多类似的问题。
// 注意题目特意说明：输出结果中的每个元素一定是唯一的，也就是说输出的结果的去重的， 同时可以不考虑输出结果的顺序

// 那么用数组来做哈希表也是不错的选择，例如上一题：《有效的字母异位词》
// 但是要注意，使用数组来做哈希的题目，是因为题目都限制了数值的大小。
// 而这道题目没有限制数值的大小，就无法使用数组来做哈希表了。
// 而且如果哈希值比较少、特别分散、跨度非常大，使用数组就造成空间的极大浪费。

// 此时就要使用另一种结构体了，set ，关于set，C++ 给提供了如下三种可用的数据结构：
// std::set
// std::multiset
// std::unordered_set
// 前两种底层实现都是红黑树，
// std::unordered_set的底层实现是哈希表， 使用unordered_set 读写效率是最高的，并不需要对数据进行排序，而且还不要让数据重复，所以选择unordered_set。

// 这道题用暴力的解法时间复杂度是O(n^2)，那来看看使用哈希法进一步优化。

// 拓展
// 那有同学可能问了，遇到哈希问题我直接都用set不就得了，用什么数组啊。
// 直接使用set 不仅占用空间比数组大，而且速度要比数组慢，set把数值映射到key上都要做hash计算的。
// 不要小瞧 这个耗时，在数据量大的情况，差距是很明显的。

// 时间复杂度: O(n + m) m 是最后要把 set转成vector
// 空间复杂度: O(n)
// class Solution {
//     public:
//     vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
//         unordered_set<int> result_set; // 存放结果，之所以用set是为了给结果集去重
//         int hash[1005] = {0}; // 默认数值为0
//         for (int num : nums1) { // nums1中出现的字母在hash数组中做记录
//             hash[num] = 1;
//         }
//         for (int num : nums2) { // nums2中出现话，result记录
//             if (hash[num] == 1) {
//                 result_set.insert(num);
//             }
//         }
//         return vector<int>(result_set.begin(), result_set.end());
//     }
// };

var intersection = function (nums1, nums2) {
  // 根据数组大小交换操作的数组
  if (nums1.length < nums2.length) {
    const _ = nums1;
    nums1 = nums2;
    nums2 = _;
  }
  const nums1Set = new Set(nums1);
  const resSet = new Set();
  // for(const n of nums2) {
  //     nums1Set.has(n) && resSet.add(n);
  // }
  // 循环 比 迭代器快

  //  遍历数量小的那个数组 nums2
  for (let i = nums2.length - 1; i >= 0; i--) {
    nums1Set.has(nums2[i]) && resSet.add(nums2[i]);
  }
  return Array.from(resSet);
};
