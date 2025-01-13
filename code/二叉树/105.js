// 从前序与中序遍历序列构造二叉树

// 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// 输出: [3,9,20,null,null,15,7]

function buildTree(preorder, inorder) {
  if (!inorder.length) {
    return null;
  }

  const nodeVal = preorder[0];
  const midIdx = inorder.findIndex((item) => item === nodeVal);
  const leftChildren = midIdx > -1 ? inorder.slice(0, midIdx) : [];
  const rightChildren = midIdx > -1 ? inorder.slice(midIdx + 1) : [];
  preorder.shift();
  const head = new TreeNode(
    nodeVal,
    buildTree(preorder, leftChildren),
    buildTree(preorder, rightChildren)
  );
  return head;
}
console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
// console.log(buildTree([1, 2], [1, 2]));

//      3
//    9  20
//      15 7

// 1
//  2
