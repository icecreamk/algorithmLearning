// 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

// 示例 1:
//      6
//     /  \
//    2    8
//   / \  / \
//  0  4 7  9
//    / \
//   3   5

// 例 1:
//     输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
//     输出: 6
//     解释: 节点 2 和节点 8 的最近公共祖先是 6。
// 示例 2:
//     输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
//     输出: 2
//     解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
// 说明:
//     所有节点的值都是唯一的。
//     p、q 为不同节点且均存在于给定的二叉搜索树中

// 做过二叉树：公共祖先问题
// 利用回溯从底向上搜索，遇到一个节点的左子树里有p，右子树里有q，那么当前节点就是最近公共祖先。
// 那么本题是二叉搜索树，二叉搜索树是有序的，那得好好利用一下这个特点。

// 本题就是标准的搜索一条边的写法，遇到递归函数的返回值，如果不为空，立刻返回。
// 如果 cur->val 小于 p->val，同时 cur->val 小于 q->val，那么就应该向右遍历（目标区间在右子树）。
// if (cur->val < p->val && cur->val < q->val) {
//     TreeNode* right = traversal(cur->right, p, q);
//     if (right != NULL) {
//         return right;
//     }
// }

// 对于二叉搜索树的最近祖先问题，其实要比普通二叉树公共祖先问题
// 不用使用回溯，二叉搜索树自带方向性，可以方便的从上向下查找目标区间，遇到目标区间内的节点，直接返回。
// 最后给出了对应的迭代法，二叉搜索树的迭代法甚至比递归更容易理解，也是因为其有序性（自带方向性），按照目标区间找就行了。

// 递归法：

var lowestCommonAncestor = function (root, p, q) {
  // 使用递归的方法
  // 1. 使用给定的递归函数lowestCommonAncestor
  // 2. 确定递归终止条件
  if (root === null) {
    return root;
  }
  if (root.val > p.val && root.val > q.val) {
    // 向左子树查询
    return (root.left = lowestCommonAncestor(root.left, p, q));
  }
  if (root.val < p.val && root.val < q.val) {
    // 向右子树查询
    return (root.right = lowestCommonAncestor(root.right, p, q));
  }
  return root;
};

// 迭代法

var lowestCommonAncestor = function (root, p, q) {
  // 使用迭代的方法
  while (root) {
    if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return null;
};
