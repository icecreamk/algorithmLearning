// 递归的前中后风格统一，而迭代的每种风格不同
// 这是因为前序遍历中访问节点（遍历节点）和处理节点（将元素放进result数组中）可以同步处理，但是中序就无法做到同步！

// 那么问题又来了，难道二叉树前后中序遍历的迭代法实现，就不能风格统一么？
// 当然可以，这种写法，还不是很好理解，我们将在下一篇文章里重点讲解，敬请期待！

// 入栈 右 -> 左
// 出栈 中 -> 左 -> 右
// 前序遍历: 
var preorderTraversal = function (root, res = []) {
  if (!root) return res;
  const stack = [root];
  let cur = null;
  while (stack.length) {
    cur = stack.pop();
    res.push(cur.val);
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return res;
};

// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右

//    1
//  2   3
// 4 5
// 4 2 5 1 3

// 中序遍历: 
var inorderTraversal = function (root, res = []) {
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    if (cur) {
      stack.push(cur);
      // 左
      cur = cur.left;
    } else {
      // --> 弹出 中
      cur = stack.pop();
      res.push(cur.val);
      // 右
      cur = cur.right;
    }
  }
  return res;
};

// 入栈 左 -> 右
// 出栈 中 -> 右 -> 左 结果翻转

// 后序遍历: 
var postorderTraversal = function (root, res = []) {
  if (!root) return res;
  const stack = [root];
  let cur = null;
  do {
    cur = stack.pop();
    res.push(cur.val);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  } while (stack.length);
  return res.reverse();
};
