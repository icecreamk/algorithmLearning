// 合并区间：
// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

var merge = function (intervals) {
  if (intervals.length < 2) {
    return intervals;
  }
  const res = [];
  intervals.sort((a, b) => a[1] - b[1]);

  for (let i = intervals.length - 1; i >= 0; i--) {
    const prev = intervals[i - 1]
    const cur = intervals[i]
    if (i === 0 || cur[0] > prev[1]) {
      res.unshift(cur);
    } else {
      prev = [
        Math.min(prev[0], cur[0]),
        Math.max(cur[1], prev[1]),
      ];
    }
  }
  return res;
};


var merge = function (intervals) {
  let res = [];
  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i];
    if (prev[1] >= cur[0]) {
      // 有重合
      prev[1] = Math.max(cur[1], prev[1]);
    } else {
      // 不重合，prev推入res数组
      res.push(prev);
      prev = cur; // 更新 prev
    }
  }

  res.push(prev);
  return res;
};
