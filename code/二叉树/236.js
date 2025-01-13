// 236. 二叉树的最近公共祖先

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。


//      3
//    5   1
//  6 2
const lowestCommonAncestor = (root, p, q) => {
  if (root == null) {
    // 遇到null，返回null 没有LCA
    return null;
  }
  if (root == q || root == p) {
    // 遇到p或q，直接返回当前节点
    return root;
  }
  // 非null 非q 非p，则递归左右子树
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) {
    return root;
  }
  if (left == null) {
    return right;
  }
  return left;
};

a = new TreeNode(5)
b = new TreeNode(1)

console.log(
  lowestCommonAncestor(
    new TreeNode(
      3,
      a,
      b
    ),
    a,
    b
  )
);

//      3
//    5   1
//  6 2  0 8
//   7 4
