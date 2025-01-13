//  二叉搜索树中第 K 小的元素

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
var kthSmallest = function (root, k) {
  let len = 0;
  let find = -1;
  function dfs(node) {
    if (!node) {
      return null;
    }
    dfs(node.left);
    len++;
    if (len === k) {
      find = node.val;
    }
    dfs(node.right);
    return find;
  }
  return dfs(root);
};

console.log(kthSmallest(new TreeNode(2, new TreeNode(1), new TreeNode(3)), 3));
