// [3,9,20,null,null,15,7]
// [
//   [15, 7]
//   [9, 20],
//   [3],
// ]

// 层序也属于迭代
var levelOrderBottom = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  while (queue.length && root !== null) {
    // 存放当前层级节点数组
    let curLevel = [];
    // 计算当前层级节点数量
    let length = queue.length;
    while (length--) {
      let node = queue.shift();
      // 把当前层节点存入curLevel数组
      curLevel.push(node.val);
      // 把下一层级的左右节点存入queue队列
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 从数组前头插入值，避免最后反转数组，减少运算时间
    res.unshift(curLevel);
  }
  return res;
};
