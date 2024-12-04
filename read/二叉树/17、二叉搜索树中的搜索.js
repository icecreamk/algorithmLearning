// 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
// 之前我们讲的都是普通二叉树，那么接下来看看二叉搜索树。

// 二叉搜索树是一个有序树：
//     若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
//     若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
//     它的左、右子树也分别为二叉搜索树
// 由于有序决定了二叉搜索树，递归遍历和迭代遍历和普通二叉树都不一样。


// 递归：
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (!root || root.val === val) {
    return root;
  }
  if (root.val > val) return searchBST(root.left, val);
  if (root.val < val) return searchBST(root.right, val);
};

// 迭代法
// 因为二叉搜索树的有序性，可以不使用辅助栈或者队列就可以写出迭代法(栈来模拟深度遍历，队列来模拟广度遍历)。
// 对于一般二叉树，递归过程中还有回溯的过程，例如走一个左方向的分支走到头了，那么要调头，在走右分支。
// 而对于二叉搜索树，不需要回溯的过程，因为节点的有序性就帮我们确定了搜索的方向。
// 例如要搜索元素为3的节点，我们不需要搜索其他节点，也不需要做回溯，查找的路径已经规划好了。
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  while (root !== null) {
    if (root.val > val) root = root.left;
    else if (root.val < val) root = root.right;
    else return root;
  }
  return null;
};
