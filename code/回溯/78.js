// 子集
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]


var subsets = function (nums) {
  const res = [];
  const path = [];
  const len = nums.length;

  function dfs(start) {
    res.push(Array.from(path));
    if (start === len) {
      return;
    }

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);

  return res;
};
console.log(subsets([1, 2, 3]));
