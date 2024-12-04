// 给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
// 输入:root=[1,2,3,4,5,6,7]
// 输出:[1,#,2,3,#,4,5,6,7,#]
// 解释:给定二叉树如图 A 所示，你的函数应该填充它的每个 next指针，以指向其下一个右侧节点，
// 如图B所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#'标志着每一层的结束。
// 初始状态下，所有 next 指针都被设置为 NULL。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

//    1->null
//   2->3
// 4->5->6->7->null
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) return root;
  let queue = [root];
  while (queue.length) {
    let n = queue.length;
    for (let i = 0; i < n; i++) {
      let node = queue.shift();
      if (i < n - 1) {
        node.next = queue[0];
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
};