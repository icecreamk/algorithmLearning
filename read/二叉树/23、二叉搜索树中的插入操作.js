// 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据保证，新值和原始二叉搜索树中的任意节点值都不同。
// 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。

//     4
//   2   7
//  1 3

// 插入5

// 第一种
//     4
//   2   7
//  1 3 5

// 第二种
//     5
//   2   7
//  1 3
//     4

// 以上两种都行

// 首先在二叉搜索树中的插入操作，大家不用恐惧其重构搜索树，其实根本不用重构。
// 然后在递归中，我们重点讲了如何通过递归函数的返回值完成新加入节点和其父节点的赋值操作，并强调了搜索树的有序性。
// 最后依然给出了迭代的方法，迭代的方法就需要记录当前遍历节点的父节点了，这个和没有返回值的递归函数实现的代码逻辑是一样的。

// 有返回值的递归写法;

var insertIntoBST = function (root, val) {
  const setInOrder = (root, val) => {
    if (root === null) {
      let node = new TreeNode(val);
      return node;
    }
    // 是想说明通过递归函数的返回值完成父子节点的赋值是可以带来便利的。(不要以为通过递归函数返回节点 这样的写法是天经地义，其实这里是有优化的！)
    if (root.val > val) root.left = setInOrder(root.left, val);
    else if (root.val < val) root.right = setInOrder(root.right, val);
    return root;
  };
  return setInOrder(root, val);
};

// 无返回值的递归;
var insertIntoBST = function (root, val) {
  let parent = new TreeNode(0);
  const preOrder = (cur, val) => {
    if (cur === null) {
      let node = new TreeNode(val);
      if (parent.val > val) parent.left = node;
      else parent.right = node;
      return;
    }
    parent = cur;
    if (cur.val > val) preOrder(cur.left, val);
    if (cur.val < val) preOrder(cur.right, val);
  };
  if (root === null) root = new TreeNode(val);
  preOrder(root, val);
  return root;
};

// 迭代;
var insertIntoBST = function (root, val) {
  if (root === null) {
    root = new TreeNode(val);
  } else {
    let parent = new TreeNode(0);
    let cur = root;
    while (cur) {
      parent = cur;
      if (cur.val > val) cur = cur.left;
      else cur = cur.right;
    }
    let node = new TreeNode(val);
    if (parent.val > val) parent.left = node;
    else parent.right = node;
  }
  return root;
};
