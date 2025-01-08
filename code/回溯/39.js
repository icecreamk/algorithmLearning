// 组合总和

// 输入: candidates = [2,3,5], target = 8
// 输出: [[2,2,2,2],[2,3,3],[3,5]]
var combinationSum = function (candidates, target) {
  const res = [];
  let path = [];
  let sum = 0;

  function dfs(start, curSum) {
    // if (curSum > target) {
    //   return;
    // }

    if (curSum === target) {
      res.push(Array.from(path));
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 剪枝叶 防止溢出
      if (curSum + candidates[i] > target) {
        continue;
      }
      path.push(candidates[i]);
      curSum += candidates[i];
      dfs(i, curSum);
      path.pop();
      curSum -= candidates[i];
    }
  }

  dfs(0, sum);

  return res;
};
console.log(combinationSum([2, 3], 10));
