// 将有序数组转换为二叉搜索树

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function dfs(arr, left, right) {
    if (left > right) return null;
    const half = left + Math.floor((right - left) / 2);
    let root = new TreeNode(nums[half]);
    root.left = dfs(arr, left, half - 1);
    root.right = dfs(arr, half + 1, right);
    return root;
  }

  return dfs(nums, 0, nums.length - 1);
};

console.log(sortedArrayToBST([1, 3]));
