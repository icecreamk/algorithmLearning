// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
// 注意: 可以认为区间的终点总是大于它的起点。 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。

// 示例 1:
//     输入: [ [1,2], [2,3], [3,4], [1,3] ]
//     输出: 1
//     解释: 移除 [1,3] 后，剩下的区间没有重叠。

// 示例 2:
//     输入: [ [1,2], [1,2], [1,2] ]
//     输出: 2
//     解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

// 示例 3:
//     输入: [ [1,2], [2,3] ]
//     输出: 0
//     解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

// 按右边界排序
var eraseOverlapIntervals1 = function (intervals) {
  intervals.sort((a, b) => {
    return a[1] - b[1];
  });

  let count = 1;
  let end = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    let interval = intervals[i];
    if (interval[0] >= end) {
      end = interval[1];
      count += 1;
    }
  }

  return intervals.length - count;
};

// 按左边界排序
var eraseOverlapIntervals2 = function (intervals) {
  // 按照左边界升序排列
  intervals.sort((a, b) => a[0] - b[0]);
  let count = 1;
  let end = intervals[intervals.length - 1][0];
  // 倒序遍历，对单个区间来说，左边界越大越好，因为给前面区间的空间越大
  for (let i = intervals.length - 2; i >= 0; i--) {
    if (intervals[i][1] <= end) {
      count++;
      end = intervals[i][0];
    }
  }
  // count 记录的是最大非重复区间的个数
  return intervals.length - count;
};