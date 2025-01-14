// 二叉树展开为链表
// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

// 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]

//    1
//  2   5
// 3 4   6

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */




// 头插法
var flatten = function (root) {
  let head = null;
  function dfs(node) {
    if (node === null) {
      return;
    }
    dfs(node.right);
    dfs(node.left);
    node.left = null;
    node.right = head; // 头插法，相当于链表的 node.next = head
    head = node; // 现在链表头节点是 node
  }
  dfs(root);
};


const a = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), new TreeNode(4)),
  new TreeNode(5, null, new TreeNode(6))
);
console.log(flatten(a));
console.log(a);