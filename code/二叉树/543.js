// 二叉树的直径

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let sum = 0;
  function dfs(node) {
    if (!node) return 0;
    const leftHeight = node.left ? dfs(node.left) : 0;
    const rightHeight = node.right ? dfs(node.right) : 0;
    sum = Math.max(leftHeight + rightHeight, sum);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  dfs(root);
  return sum;
};

console.log(
  diameterOfBinaryTree(
    new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4), new TreeNode(3)),
      new TreeNode(5)
    )
  )
);
