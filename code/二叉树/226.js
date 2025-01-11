// 翻转二叉树
var invertTree = function (root) {
  if (!root) return root;
  function dfs(node) {
    if (!node.left && !node.right) {
      return;
    }
    [node.left, node.right] = [node.right, node.left];
    node.left && dfs(node.left);
    node.right && dfs(node.right);
  }

  dfs(root);
  return root;
};
