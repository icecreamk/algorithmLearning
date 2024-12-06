// 给定一个二叉树，我们在树的节点上安装摄像头。
// 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
// 计算监控树的所有节点所需的最小摄像头数量。

// 示例 1：
//     输入：[0,0,null,0,0]
//     输出：1
//     解释：如图所示，一台摄像头足以监控所有节点。

//      0
//     /
//    1
//   / \
//  0   0

// 输入：[0,0,null,0,null,0,null,null,0]
// 输出：2

//         0
//        /
//       1
//      /
//     0
//    /
//   1
//    \
//     0





// 有如下三种：
//     该节点无覆盖
//     本节点有摄像头
//     本节点有覆盖

// 我们分别有三个数字来表示：
//     0：该节点无覆盖
//     1：本节点有摄像头
//     2：本节点有覆盖
var minCameraCover = function (root) {
  let result = 0;
  function traversal(cur) {
    if (cur === null) {
      return 2;
    }

    let left = traversal(cur.left);
    let right = traversal(cur.right);

    if (left === 2 && right === 2) {
      return 0;
    }

    if (left === 0 || right === 0) {
      result++;
      return 1;
    }

    if (left === 1 || right === 1) {
      return 2;
    }

    return -1;
  }

  if (traversal(root) === 0) {
    result++;
  }

  return result;
};

