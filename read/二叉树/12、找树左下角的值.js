// 给定一个二叉树，在树的最后一行找到最左边的值

// 本题要找出树的最后一行的最左边的值。此时大家应该想起用层序遍历是非常简单的了，反而用递归的话会比较难一点。

// 递归版本：
var findBottomLeftValue = function (root) {
  //首先考虑递归遍历 前序遍历 找到最大深度的叶子节点即可
  let maxPath = 0,
    resNode = null;
  // 1. 确定递归函数的函数参数
  const dfsTree = function (node, curPath) {
    // 2. 确定递归函数终止条件
    if (node.left === null && node.right === null) {
      if (curPath > maxPath) {
        maxPath = curPath;
        resNode = node.val;
      }
    }
    node.left && dfsTree(node.left, curPath + 1);
    node.right && dfsTree(node.right, curPath + 1);
  };
  dfsTree(root, 1);
  return resNode;
};
// 层序遍历（迭代）：
var findBottomLeftValue = function (root) {
  //考虑层序遍历 记录最后一行的第一个节点
  let queue = [];
  if (root === null) {
    return null;
  }
  queue.push(root);
  let resNode;
  while (queue.length) {
    let length = queue.length;
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      if (i === 0) {
        resNode = node.val;
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return resNode;
};
