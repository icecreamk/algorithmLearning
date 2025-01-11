// 二叉树的中序遍历

// var inorderTraversal = function (root) {
//   const res = [];
//   function dfs(node) {
//     if (!node) {
//       return;
//     }
//     dfs(node.left);
//     res.push(node.val);
//     dfs(node.right);
//   }
//   dfs(root);
//   return res;
// };


// 真难 理解
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
  }
  return res;
};


