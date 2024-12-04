// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
// 例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
// 236. 二叉树的最近公共祖先

//        3
//       /  \
//      5     1
//     / \   / \
//    6   2 0   8
//       / \
//      7   4

// 示例 1: 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1 输出: 3 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
// 示例 2: 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4 输出: 5 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
// 说明:
//     所有节点的值都是唯一的。
//     p、q 为不同节点且均存在于给定的二叉树中。

// 如果递归函数有返回值，如何区分要搜索一条边，还是搜索整个树呢？
// 搜索一条边的写法：
// if (递归函数(root->left)) return ;
// if (递归函数(root->right)) return ;

// 搜索整个树写法：
// left = 递归函数(root->left);  // 左
// right = 递归函数(root->right); // 右
// left与right的逻辑处理;         // 中

// 看出区别了没？
// 在递归函数有返回值的情况下：如果要搜索一条边，递归函数返回值不为空的时候，立刻返回，
// 如果搜索整个树，直接用一个变量left、right接住返回值，这个left、right后序还有逻辑处理的需要，
// 也就是后序遍历中处理中间节点的逻辑（也是回溯）。

// 求最小公共祖先，需要从底向上遍历，那么二叉树，只能通过后序遍历（即：回溯）实现从底向上的遍历方式。
// 在回溯的过程中，必然要遍历整棵二叉树，即使已经找到结果了，依然要把其他节点遍历完，因为要使用递归函数的返回值（也就是代码中的left和right）做逻辑判断。
// 要理解如果返回值left为空，right不为空为什么要返回right，为什么可以用返回right传给上一层结果。
// 可以说这里每一步，都是有难度的，都需要对二叉树，递归和回溯有一定的理解。
// 本题没有给出迭代法，因为迭代法不适合模拟回溯的过程。理解递归的解法就够了。

var lowestCommonAncestor = function (root, p, q) {
  // 使用递归的方法
  // 需要从下到上，所以使用后序遍历
  // 1. 确定递归的函数
  const travelTree = function (root, p, q) {
    // 2. 确定递归终止条件
    if (root === null || root === p || root === q) {
      return root;
    }
    // 3. 确定递归单层逻辑
    let left = travelTree(root.left, p, q);
    let right = travelTree(root.right, p, q);
    if (left !== null && right !== null) {
      return root;
    }
    if (left === null) {
      return right;
    }
    return left;
  };
  return travelTree(root, p, q);
};

// TypeScript
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  if (left !== null) return left;
  if (right !== null) return right;
  return null;
}
