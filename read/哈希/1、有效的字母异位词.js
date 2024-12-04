// 先来讲基础：
// 一般哈希表都是用来快速判断一个元素是否出现集合里。例如要查询一个名字是否在这所学校里。
// 要枚举的话时间复杂度是O(n)，但如果使用哈希表的话， 只需要O(1)就可以做到。

// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 示例 1: 输入: s = "anagram", t = "nagaram" 输出: true
// 示例 2: 输入: s = "rat", t = "car" 输出: false


// 看暴力的解法，两层for循环，同时还要记录字符是否重复出现，很明显时间复杂度是 O(n^2)。

// 时间复杂度为O(n)，空间上因为定义是的一个常量大小的辅助数组，所以空间复杂度为O(1)。

var isAnagram1 = function(s, t) {
    if(s.length !== t.length) return false;
    // 26个字母，所以数组长度26
    const resSet = new Array(26).fill(0);
    const base = "a".charCodeAt();
    for(const i of s) {
        resSet[i.charCodeAt() - base]++;
    }
    for(const i of t) {
        if(!resSet[i.charCodeAt() - base]) return false;
        resSet[i.charCodeAt() - base]--;
    }
    return true;
};

var isAnagram2 = function(s, t) {
  if(s.length !== t.length) return false;
  let char_count = new Map();
  for(let item of s) {
    char_count.set(item, (char_count.get(item) || 0) + 1) ;
  }
  for(let item of t) {
    if(!char_count.get(item)) return false;
    char_count.set(item, char_count.get(item)-1);
  }
  return true;
};