// 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
// [1,2,3,null,5,null,4]
// [1, 3, 4]

//   1
//  2  3
//   5   4
var rightSideView = function (root) {
  //二叉树右视图 只需要把每一层最后一个节点存储到res数组
  let res = [],
    queue = [];
  queue.push(root);

  while (queue.length && root !== null) {
    // 记录当前层级节点个数
    let length = queue.length;
    while (length--) {
      // length 是外层的
      console.log([...queue]);
      let node = queue.shift();
      // length长度为0的时候表明到了层级最后一个节点
      console.log(length)
      if (!length) {
        res.push(node.val);
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  return res;
};

const root = {
  val: 1,
  left: {
    val: 2,
    right: {
      val: 5,
    },
  },
  right: {
    val: 3,
    right: {
      val: 4,
    },
  },
};

console.log(rightSideView(root));