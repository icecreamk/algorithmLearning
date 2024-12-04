// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

var averageOfLevels = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  while (queue.length) {
    // 每一层节点个数;
    let lengthLevel = queue.length,
      len = queue.length,
      //   sum记录每一层的和;
      sum = 0;
    while (lengthLevel--) {
      const node = queue.shift();
      sum += node.val;
      //   队列存放下一层节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 求平均值
    res.push(sum / len);
  }
  return res;
};
