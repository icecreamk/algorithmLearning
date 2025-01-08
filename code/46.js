// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

function test(nums) {
  const res = [];
  const len = nums.length;
  function dfs(temp, start) {
    if (temp.length === len) {
      res.push(temp.slice());
      return;
    }

    for (let i = start; i < nums.length; i++) {
      temp.push(nums[i]);
      dfs(temp, start + 1);
      temp.pop();
    }
  }
  dfs([], 0);
  return res;
}

console.log(test([1, 2, 3]));
