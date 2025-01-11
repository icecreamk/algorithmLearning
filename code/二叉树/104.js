// 二叉树的最大深度

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
var maxDepth = function (root) {
  let sum = 0;
  function dfs(node, deep) {
    if (!node) {
      return;
    }
    sum = Math.max(sum, deep);
    dfs(node.left, deep + 1);
    dfs(node.right, deep + 1);
  }

  dfs(root, 1);
  return sum;
};

// 比上面慢
var maxDepth = function (root) {
  let queue = [];
  let sum = 0;
  if (!root) return sum;
  queue.push(root);

  while (queue.length) {
    let curLevelNodeLen = queue.length;
    let newLeveNodes = [];
    sum++;
    while (curLevelNodeLen--) {
      const node = queue.shift();
      node.left && newLeveNodes.push(node.left);
      node.right && newLeveNodes.push(node.right);
    }
    queue = [...newLeveNodes];
  }
  return sum;
};

const a = new TreeNode(
  1,
  null,
  new TreeNode(2, new TreeNode(3, null, null), null)
);

console.log(maxDepth(a));
