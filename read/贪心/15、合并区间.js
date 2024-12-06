// 给出一个区间的集合，请合并所有重叠的区间。

// 示例 1:
//     输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
//     输出: [[1,6],[8,10],[15,18]]
//     解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

// 示例 2:
//     输入: intervals = [[1,4],[4,5]]
//     输出: [[1,5]]
//     解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
//     注意：输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名

var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let prev = intervals[0];
  let result = [];
  for (let i = 0; i < intervals.length; i++) {
    let cur = intervals[i];
    if (cur[0] > prev[1]) {
      result.push(prev);
      prev = cur;
    } else {
      prev[1] = Math.max(cur[1], prev[1]);
    }
  }
  result.push(prev);
  return result;
};
