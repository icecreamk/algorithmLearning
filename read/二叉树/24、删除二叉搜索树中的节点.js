// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
// 一般来说，删除节点可分为两个步骤：
// 首先找到需要删除的节点； 如果找到了，删除它。 说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

// 示例:
// root = [5,3,6,2,4,null,7]
// key = 3

//     5
//    / \
//   3   6
//  / \   \
// 2   4   7
// 给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。

// 一个正确的答案是 [5,4,6,2,null,null,7]，如下图所示。

//     5
//    / \
//   4   6
//  /     \
// 2       7

// 另一个正确答案是 [5,2,6,null,4,null,7]。

//     5
//    / \
//   2   6
//    \   \
//     4   7
// 输出: [5,4,6,2,null,4,null,7]

// 递归
var deleteNode = function (root, key) {
  if (!root) return null;
  if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  } else if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  } else {
    // 场景1: 该节点是叶节点
    if (!root.left && !root.right) {
      return null;
    }
    // 场景2: 有一个孩子节点不存在
    if (root.left && !root.right) {
      return root.left;
    } else if (root.right && !root.left) {
      return root.right;
    }

    //   3
    // 1   5
    //    4  6
    //      7

    // 删除5

    //   3
    // 1   6
    //    4 7

    // 场景3: 左右节点都存在
    const rightNode = root.right;
    // 获取最小值节点
    const minNode = getMinNode(rightNode);
    // 将待删除节点的值替换为最小值节点值
    root.val = minNode.val;
    // 删除最小值节点
    root.right = deleteNode(root.right, minNode.val);
    return root;
  }
};
function getMinNode(root) {
  while (root.left) {
    root = root.left;
  }
  return root;
}

// 迭代
var deleteNode = function (root, key) {
  const deleteOneNode = (target) => {
    if (!target) return target;
    if (!target.right) return target.left;
    let cur = target.right;
    while (cur.left) {
      cur = cur.left;
    }
    cur.left = target.left;
    return target.right;
  };

  if (!root) return root;
  let cur = root;
  let pre = null;
  while (cur) {
    if (cur.val === key) break;
    pre = cur;
    cur.val > key ? (cur = cur.left) : (cur = cur.right);
  }
  if (!pre) {
    return deleteOneNode(cur);
  }
  if (pre.left && pre.left.val === key) {
    pre.left = deleteOneNode(cur);
  }
  if (pre.right && pre.right.val === key) {
    pre.right = deleteOneNode(cur);
  }
  return root;
};
