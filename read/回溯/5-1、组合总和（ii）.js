// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用一次。
// 说明： 所有数字（包括目标数）都是正整数。解集不能包含重复的组合。

// 示例 1:
// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:
// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]

// 难点在于：集合（数组candidates）有重复元素，但还不能有重复的组合。

var combinationSum2 = function (candidates, target) {
  const res = [];
  (path = []), (len = candidates.length);
  candidates.sort((a, b) => a - b);
  backtracking(0, 0);
  return res;
  function backtracking(sum, i) {
    if (sum === target) {
      res.push(Array.from(path));
      return;
    }
    for (let j = i; j < len; j++) {
      const n = candidates[j];
      if (j > i && candidates[j] === candidates[j - 1]) {
        //若当前元素和前一个元素相等
        //则本次循环结束，防止出现重复组合
        continue;
      }
      //如果当前元素值大于目标值-总和的值
      //由于数组已排序，那么该元素之后的元素必定不满足条件
      //直接终止当前层的递归
      if (n > target - sum) break;
      path.push(n);
      sum += n;
      backtracking(sum, j + 1);
      path.pop();
      sum -= n;
    }
  }
};
// 使用used去重

var combinationSum2 = function (candidates, target) {
  let res = [];
  let path = [];
  let total = 0;
  const len = candidates.length;
  candidates.sort((a, b) => a - b);
  let used = new Array(len).fill(false);
  const backtracking = (startIndex) => {
    if (total === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < len && total < target; i++) {
      const cur = candidates[i];
      if (
        cur > target - total ||
        (i > 0 && cur === candidates[i - 1] && !used[i - 1])
      )
        continue;
      path.push(cur);
      total += cur;
      used[i] = true;
      backtracking(i + 1);
      path.pop();
      total -= cur;
      used[i] = false;
    }
  };
  backtracking(0);
  return res;
};
