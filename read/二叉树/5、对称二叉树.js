// 给定一个二叉树，检查它是否是镜像对称的。
//     1
//   2   2
//  3 4 4 3
// 5678 8765
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
//     1
//   2   2
//  3   3

// 本题遍历只能是“后序遍历”，因为我们要通过递归函数的返回值来判断两个子树的内侧节点和外侧节点是否相等。
// 所以准确的来说是一个树的遍历顺序是左右中，其实后序也可以理解为是一种回溯

// 递归判断是否为对称二叉树：
var isSymmetric = function (root) {
  // 使用递归遍历左右子树 递归三部曲
  // 1. 确定递归的参数 root.left root.right和返回值true false
  const compareNode = function (left, right) {
    // 2. 确定终止条件 空的情况
    if (
      (left === null && right !== null) ||
      (left !== null && right === null)
    ) {
      return false;
    } else if (left === null && right === null) {
      return true;
    } else if (left.val !== right.val) {
      return false;
    }
    // 3. 确定单层递归逻辑
    let outSide = compareNode(left.left, right.right);
    let inSide = compareNode(left.right, right.left);
    return outSide && inSide;
  };
  if (root === null) {
    return true;
  }
  return compareNode(root.left, root.right);
};
// 队列实现迭代判断是否为对称二叉树：
var isSymmetric = function (root) {
  // 迭代方法判断是否是对称二叉树
  // 首先判断root是否为空
  if (root === null) {
    return true;
  }
  let queue = [];
  queue.push(root.left);
  queue.push(root.right);
  while (queue.length) {
    let leftNode = queue.shift(); //左节点
    let rightNode = queue.shift(); //右节点
    if (leftNode === null && rightNode === null) {
      continue;
    }
    if (
      leftNode === null ||
      rightNode === null ||
      leftNode.val !== rightNode.val
    ) {
      return false;
    }
    queue.push(leftNode.left); //左节点左孩子入队
    queue.push(rightNode.right); //右节点右孩子入队
    queue.push(leftNode.right); //左节点右孩子入队
    queue.push(rightNode.left); //右节点左孩子入队
  }

  return true;
};
// 栈实现迭代判断是否为对称二叉树：
var isSymmetric = function (root) {
  // 迭代方法判断是否是对称二叉树
  // 首先判断root是否为空
  if (root === null) {
    return true;
  }
  let stack = [];
  stack.push(root.left);
  stack.push(root.right);
  while (stack.length) {
    let rightNode = stack.pop(); //左节点
    let leftNode = stack.pop(); //右节点
    if (leftNode === null && rightNode === null) {
      continue;
    }
    if (
      leftNode === null ||
      rightNode === null ||
      leftNode.val !== rightNode.val
    ) {
      return false;
    }
    stack.push(leftNode.left); //左节点左孩子入队
    stack.push(rightNode.right); //右节点右孩子入队
    stack.push(leftNode.right); //左节点右孩子入队
    stack.push(rightNode.left); //右节点左孩子入队
  }

  return true;
};
