// 借用一个辅助数据结构即队列来实现，队列先进先出，符合一层一层遍历的逻辑，
// 而用栈先进后出适合模拟深度优先遍历也就是递归的逻辑。而这种层序遍历方式就是图论中的广度优先遍历，只不过我们应用在二叉树上。

// [3,9,20,null,null,15,7]
// [
//   [3],
//   [9, 20],
//   [15, 7]
// ]
var levelOrder = function (root) {
  //二叉树的层序遍历
  let res = [],
    queue = [];
  queue.push(root);
  if (root === null) {
    return res;
  }
  while (queue.length !== 0) {
    // 记录当前层级节点数
    let length = queue.length;
    //存放每一层的节点
    let curLevel = [];
    for (let i = 0; i < length; i++) {
      let node = queue.shift();
      curLevel.push(node.val);
      // 存放当前层下一层的节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    //把每一层的结果放到结果数组
    res.push(curLevel);
  }
  return res;
};
