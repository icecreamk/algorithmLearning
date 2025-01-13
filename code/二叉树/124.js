// 124. 二叉树中的最大路径和

// 二叉树中的 路径 被定义为一条节点序列，
// 序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。
// 该路径 至少包含一个 节点，且不一定经过根节点。

// 路径和 是路径中各节点值的总和。
// 给你一个二叉树的根节点 root ，返回其 最大路径和 。
var maxPathSum = function (root) {
  if (!root) {
    return;
  }
  let sum = -Infinity;
  function dfs(node) {
    if (!node) {
      return 0;
    }

    const l = dfs(node.left);
    const r = dfs(node.right);
    const maxPath = Math.max(l + node.val, r + node.val, node.val);
    sum = Math.max(maxPath, l + r + node.val, sum);
    return maxPath;
  }
  dfs(root, 0);
  return sum;
};


console.log(
  maxPathSum(
    new TreeNode(
      -10,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    )
  )
);

// -10
// 9 20
//  15 7
