// 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]

//    1
//  2   5
// 3 4   6

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return root;

  function dfs(node, after) {
    if (!node) {
      return null;
    }
    const temp = dfs(node.right);
    dfs(node.left, temp);
    while (node.next) {
      node = node.next;
    }
  }

  // if (root.right && root.left) {
  //   let temp = flatten(root.right);
  //   root.right = flatten(root.left);
  //   root.right.right = temp;
  //   console.log('1', root)
  //   // root.left = null
  // } else if (root.right && !root.left) {
  //   root.right = flatten(root.right);
  //   console.log('2', root)
  // } else if (!root.right && root.left) {
  //   root.right = flatten(root.left);
  //   root.left = null
  //   console.log('3', root)
  // }
  // // console.log(root)
  // let left = flatten(root.left)
  // let right = flatten(root.right)
  dfs(root);
  return root;
};

var flatten = (root) => {
  const helper = (node) => {
    // 将当前子树转成一个单链表
    if (node == null) return null; // 遍历到null节点 返回null节点
    if (node.right) {
      // 先生成右子树的单链表
      helper(node.right);
    }
    if (node.left) {
      // 如果有左子树，生成单链表然后搬运过去
      const leftFirst = helper(node.left); // 生成单链表，并获取头结点
      let leftLast = leftFirst; // leftEnd是单链表的尾节点
      while (leftLast.right) {
        // 一直找右节点，获取到单链表的尾节点
        leftLast = leftLast.right;
      }
      leftLast.right = node.right; // 尾节点后面接左子树展平后的单链表
      node.right = leftFirst; // 根节点的right改成leftFirst
      node.left = null; // node.left置为null
    }
    // return node; // 返回出当前子树转成的单链表
  };
  helper(root);
};

console.log(
  flatten(
    new TreeNode(
      1,
      new TreeNode(2, new TreeNode(3), new TreeNode(4)),
      new TreeNode(5, null, new TreeNode(6))
    )
  )
);
