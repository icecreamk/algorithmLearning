// 给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。
// (题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)
// 你可以假设两个字符串均只含有小写字母。

// canConstruct("a", "b") -> false
// canConstruct("aa", "ab") -> false
// canConstruct("aa", "aab") -> true

// 这道题目和242.有效的字母异位词,该题相当于求 字符串a 和 字符串b 是否可以相互组成 ，而本题目是求 字符串a能否组成字符串b，而不用管字符串b 能不能组成字符串a
// 且有两点特殊：
// 第一点“为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思”  这里说明杂志里面的字母不可重复使用。
// 第二点 “你可以假设两个字符串均只含有小写字母。” 说明只有小写字母，这一点很重要

// 暴力执法：一层遍历一层寻找O(n^2)

// 哈希解法
// 因为题目说只有小写字母，那可以采用空间换取时间的哈希策略，用一个长度为26的数组来记录magazine里字母出现的次数。
// 然后再用ransomNote去验证这个数组是否包含了ransomNote所需要的所有字母。
// 依然是数组在哈希法中的应用。
// 在本题的情况下，使用map的空间消耗要比数组大一些的，因为map要维护红黑树或者哈希表，而且还要做哈希函数，是费时的！
// 数据量大的话就能体现出来差别了。 所以数组更加简单直接有效！

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const strArr = new Array(26).fill(0),
    base = "a".charCodeAt();
  for (const s of magazine) {
    // 记录 magazine里各个字符出现次数
    strArr[s.charCodeAt() - base]++;
  }
  for (const s of ransomNote) {
    // 对应的字符个数做--操作
    const index = s.charCodeAt() - base;
    if (!strArr[index]) return false; // 如果没记录过直接返回false
    strArr[index]--;
  }
  return true;
};
