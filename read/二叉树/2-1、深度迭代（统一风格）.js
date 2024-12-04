// 前面提到说使用栈的话，无法同时解决访问节点（遍历节点）和处理节点（将元素放进结果集）不一致的情况。
// 那我们就将访问的节点放入栈中，把要处理的节点也放入栈中但是要做标记。
// 如何标记呢，就是要处理的节点放入栈之后，紧接着放入一个空指针作为标记。 这种方法也可以叫做标记法。

// 此时我们写出了统一风格的迭代法，不用在纠结于前序写出来了，中序写不出来的情况了。
// 但是统一风格的迭代法并不好理解，而且想在面试直接写出来还有难度的。
// 所以大家根据自己的个人喜好，对于二叉树的前中后序遍历，选择一种自己容易理解的递归和迭代法。

// 前序遍历统一迭代法
// 前序遍历：中左右
// 压栈顺序：右左中

var preorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    if (node.right) stack.push(node.right); // 右
    if (node.left) stack.push(node.left); // 左
    stack.push(node); // 中
    stack.push(null);
  }
  return res;
};

// 中序遍历统一迭代法
//  中序遍历：左中右
//  压栈顺序：右中左

//    1
//  2   3
// 4 5
// 4 2 5 1 3


var inorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    if (node.right) stack.push(node.right); // 右
    stack.push(node); // 中
    stack.push(null);
    if (node.left) stack.push(node.left); // 左
  }
  return res;
};

// 后序遍历统一迭代法
// 后续遍历：左右中
// 压栈顺序：中右左

var postorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    stack.push(node); // 中
    stack.push(null);
    if (node.right) stack.push(node.right); // 右
    if (node.left) stack.push(node.left); // 左
  }
  return res;
};
