// 根据一棵树的中序遍历与后序遍历构造二叉树。
// 注意: 你可以假设树中没有重复的元素。
// 例如，给出
// 中序遍历 inorder = [9,3,15,20,7]
// 后序遍历 postorder = [9,15,7,20,3] 返回如下的二叉树：

//     3
//  9    20
//     15  7

// 思路：以后序数组的最后一个元素为切割点

// 思考：
// 前序和中序可以唯一确定一棵二叉树。
// 后序和中序可以唯一确定一棵二叉树。
// 那么前序和后序可不可以唯一确定一棵二叉树呢？
// 前序和后序不能唯一确定一棵二叉树！，因为没有中序遍历无法确定左右部分，也就是无法分割。

var buildTree = function (inorder, postorder) {
  if (!inorder.length) return null;
  const rootVal = postorder.pop(); // 从后序遍历的数组中获取中间节点的值， 即数组最后一个值
  let rootIndex = inorder.indexOf(rootVal); // 获取中间节点在中序遍历中的下标
  const root = new TreeNode(rootVal); // 创建中间节点
  root.left = buildTree(
    inorder.slice(0, rootIndex),
    postorder.slice(0, rootIndex)
  ); // 创建左节点
  root.right = buildTree(
    inorder.slice(rootIndex + 1),
    postorder.slice(rootIndex)
  ); // 创建右节点
  return root;
};
// 从前序与中序遍历序列构造二叉树
var buildTree1 = function (preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder.shift(); // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
  const index = inorder.indexOf(rootVal); // 获取中间节点在中序遍历中的下标
  const root = new TreeNode(rootVal); // 创建中间节点
  root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index)); // 创建左节点
  root.right = buildTree(preorder.slice(index), inorder.slice(index + 1)); // 创建右节点
  return root;
};
