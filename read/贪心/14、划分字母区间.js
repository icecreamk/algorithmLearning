// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

// 示例：
//     输入：S = "ababcbacadefegdehijhklij"
//     输出：[9,7,8] 解释： 划分结果为 "ababcbaca", "defegde", "hijhklij"。 每个字母最多出现在一个片段中。 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。

// 提示：
//     S的长度在[1, 500]之间。
//     S只包含小写字母 'a' 到 'z'

var partitionLabels = function (s) {
  let hash = {};
  for (let i = 0; i < s.length; i++) {
    hash[s[i]] = i;
  }
  let result = [];
  let left = 0;
  let right = 0;

  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, hash[s[i]]);
    if (right === i) {
      result.push(right - left + 1);
      left = i + 1;
    }
  }
  return result;
};


// 这道题目leetcode上标的是贪心，其实我不认为是贪心，因为没感受到局部最优和全局最优的关系。
// 但不影响这是一道好题，思路很不错，通过字符出现最远距离取并集的方法，把出现过的字符都圈到一个区间里。

// 解题过程分如下两步：
//     统计每一个字符最后出现的位置
//     从头遍历字符，并更新字符的最远出现下标，如果找到字符最远出现位置下标和当前下标相等了，则找到了分割点