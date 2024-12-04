// 翻转它，其实就把每一个节点的左右孩子交换一下就可以了。
// 关键在于遍历顺序，前中后序应该选哪一种遍历顺序？
// 这道题目使用前序遍历和后序遍历都可以，
// 唯独中序遍历不方便，因为中序遍历会把某些节点的左右孩子翻转了两次！
// （因为先左子树，再翻转root左右子树，这时的右子树其实是之前的左子树，最后翻转此时的右子树其实是翻转之前的左子树，这样左子树被翻转了两次。）
// 那么层序遍历可以不可以呢？依然可以的！只要把每一个节点的左右孩子翻转一下的遍历方式都是可以的！


// 递归法（前序遍历）
function invertTree(root) {
    if (root === null) return root;
    let tempNode = root.left;
    root.left = root.right;
    root.right = tempNode;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};

// 递归法（后序遍历）
function invertTree(root) {
    if (root === null) return root;
    invertTree(root.left);
    invertTree(root.right);
    let tempNode = root.left;
    root.left = root.right;
    root.right = tempNode;
    return root;
};

// 递归法（中序遍历）
function invertTree(root) {
    if (root === null) return root;
    invertTree(root.left);
    let tempNode = root.left;
    root.left = root.right;
    root.right = tempNode;
    // 因为左右节点已经进行交换，此时的root.left 是原先的root.right
    invertTree(root.left);
    return root;
};


// 使用迭代版本(统一模板))的前序遍历：
var invertTree = function (root) {
  //我们先定义节点交换函数
  const invertNode = function (root, left, right) {
    let temp = left;
    left = right;
    right = temp;
    root.left = left;
    root.right = right;
  };
  //使用迭代方法的前序遍历
  let stack = [];
  if (root === null) {
    return root;
  }
  stack.push(root);
  while (stack.length) {
    let node = stack.pop();
    if (node !== null) {
      //前序遍历顺序中左右  入栈顺序是前序遍历的倒序右左中
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
      stack.push(node);
      stack.push(null);
    } else {
      node = stack.pop();
      //节点处理逻辑
      invertNode(node, node.left, node.right);
    }
  }
  return root;
};

// 使用层序遍历：
var invertTree = function (root) {
  //我们先定义节点交换函数
  const invertNode = function (root, left, right) {
    let temp = left;
    left = right;
    right = temp;
    root.left = left;
    root.right = right;
  };
  //使用层序遍历
  let queue = [];
  if (root === null) {
    return root;
  }
  queue.push(root);
  while (queue.length) {
    let length = queue.length;
    while (length--) {
      let node = queue.shift();
      //节点处理逻辑
      invertNode(node, node.left, node.right);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
};
