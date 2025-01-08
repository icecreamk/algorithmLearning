// 字母异位词分组
// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 示例 1:
// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = ["a"]
// 输出: [["a"]]

// 1，2，1，3，1

function groupAnagrams(strs) {
  const memo = new Map();
  const aCode = "a".charCodeAt();

  for (let i = 0; i < strs.length; i++) {
    let sumKey = new Array(26).fill(0);
    for (s of strs[i]) {
      sumKey[s.charCodeAt() - aCode] += 1;
    }
    const keyStr = String(sumKey)
    memo.has(keyStr)
      ? memo.set(keyStr, [...memo.get(keyStr), strs[i]])
      : memo.set(keyStr, [strs[i]]);
  }
  const res = [];
  for ([, v] of memo) {
    res.push(v);
  }
  return res;
}

// var groupAnagrams = function (strs) {
//   const map = new Object();
//   for (let s of strs) {
//     const count = new Array(26).fill(0);
//     for (let c of s) {
//       count[c.charCodeAt() - "a".charCodeAt()]++;
//     }
//     map[count] ? map[count].push(s) : (map[count] = [s]);
//   }
//   console.log(map)
//   return Object.values(map);
// };

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(
  groupAnagrams([
    "cab",
    "tin",
    "pew",
    "duh",
    "may",
    "ill",
    "buy",
    "bar",
    "max",
    "doc",
  ])
);
