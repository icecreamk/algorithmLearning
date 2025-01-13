// 二叉树的右视图

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var rightSideView = function (root) {
  if (!root) return [];
  const queue = [root];
  const res = [];

  while (queue.length) {
    let len = queue.length;
    const lastRight = queue[queue.length - 1];
    res.push(lastRight.val);

    while (len--) {
      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return res
};
