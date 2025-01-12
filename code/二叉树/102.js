// 二叉树的层序遍历

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) return [];
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    const children = [];
    const childrenVal = [];
    while (len--) {
      const node = queue.shift();
      childrenVal.push(node.val);
      node.left && children.push(node.left);
      node.right && children.push(node.right);
    }
    res.push(childrenVal.slice());
    queue = [...children];
  }

  return res;
};

console.log(levelOrder(new TreeNode(1, new TreeNode(2), new TreeNode(3))));
