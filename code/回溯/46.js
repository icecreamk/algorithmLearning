// 全排列
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

function permute(nums) {
  const res = [];
  const len = nums.length;
  const path = [];
  const used = []
  function dfs() {
    if (path.length === len) {
      res.push(Array.from(path));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true;
      dfs(used);
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
}

console.log(permute([1, 2]));
