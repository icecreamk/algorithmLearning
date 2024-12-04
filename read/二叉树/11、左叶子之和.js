// 计算给定二叉树的所有左叶子之和。

//   3
//  9  20
//    15 7

// 9+15=24

// 首先要注意是判断左叶子，不是二叉树左侧节点，所以不要上来想着层序遍历。

// if (node->left != NULL && node->left->left == NULL && node->left->right == NULL) {
//     左叶子节点处理逻辑
// }

// 递归法

var sumOfLeftLeaves = function (root) {
  //采用后序遍历 递归遍历
  // 1. 确定递归函数参数
  const nodesSum = function (node) {
    // 2. 确定终止条件
    if (node === null) {
      return 0;
    }
    let leftValue = nodesSum(node.left);
    let rightValue = nodesSum(node.right);
    // 3. 单层递归逻辑
    let midValue = 0;
    if (node.left && node.left.left === null && node.left.right === null) {
      midValue = node.left.val;
    }
    let sum = midValue + leftValue + rightValue;
    return sum;
  };
  return nodesSum(root);
};
// 迭代法

var sumOfLeftLeaves = function (root) {
  //采用层序遍历
  if (root === null) {
    return null;
  }
  let queue = [];
  let sum = 0;
  queue.push(root);
  while (queue.length) {
    let node = queue.shift();
    if (
      node.left !== null &&
      node.left.left === null &&
      node.left.right === null
    ) {
      sum += node.left.val;
    }
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return sum;
};
