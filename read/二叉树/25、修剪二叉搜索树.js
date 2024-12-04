// 给定一个二叉搜索树，同时给定最小边界L 和最大边界 R。通过修剪二叉搜索树，使得所有节点的值在[L, R]中 (R>=L) 。
// 你可能需要改变树的根节点，所以结果应当返回修剪好的二叉搜索树的新的根节点。

// 示例 1:
//   1
//  / \
// 0   2
// L = 1
// R = 2

// 输出:
//   1
//    \
//     2

// 示例 2:
//   3
//  / \
// 0   4
//  \
//   2
//  /
// 1

// L = 1
// R = 3

// 输出:
//     3
//    /
//   2
//  /
// 1

// 直接想法就是：递归处理，然后遇到 root->val < low || root->val > high 的时候直接return NULL，一波修改，赶紧利落。
// 不难写出如下代码：
// class Solution {
// public:
//     TreeNode* trimBST(TreeNode* root, int low, int high) {
//         if (root == nullptr || root->val < low || root->val > high) return nullptr;
//         root->left = trimBST(root->left, low, high);
//         root->right = trimBST(root->right, low, high);
//         return root;
//     }
// };

// 然而[1, 3]区间在二叉搜索树的中可不是单纯的节点3和左孩子节点0就决定的，还要考虑节点0的右子树。
// 所以以上的代码是不可行的！
// 在上图中我们发现节点0并不符合区间要求，那么将节点0的右孩子 节点2 直接赋给 节点3的左孩子就可以了（就是把节点0从二叉树中移除），如图：

// 迭代法

// 因为二叉搜索树的有序性，不需要使用栈模拟递归的过程。
// 在剪枝的时候，可以分为三步：
//     将root移动到[L, R] 范围内，注意是左闭右闭区间
//     剪枝左子树
//     剪枝右子树

// 迭代：
var trimBST = function (root, low, high) {
  if (root === null) {
    return null;
  }
  while (root !== null && (root.val < low || root.val > high)) {
    if (root.val < low) {
      root = root.right;
    } else {
      root = root.left;
    }
  }
  let cur = root;
  while (cur !== null) {
    while (cur.left && cur.left.val < low) {
      cur.left = cur.left.right;
    }
    cur = cur.left;
  }
  cur = root;
  //判断右子树大于high的情况
  while (cur !== null) {
    while (cur.right && cur.right.val > high) {
      cur.right = cur.right.left;
    }
    cur = cur.right;
  }
  return root;
};

// 递归：
var trimBST = function (root, low, high) {
  if (root === null) {
    return null;
  }
  if (root.val < low) {
    let right = trimBST(root.right, low, high);
    return right;
  }
  if (root.val > high) {
    let left = trimBST(root.left, low, high);
    return left;
  }
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
};
