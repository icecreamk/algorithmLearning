// 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
// 有效 二叉搜索树定义如下：
// 节点的左子树
// 只包含 小于 当前节点的数。
// 节点的右子树只包含 大于 当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。

// 输入：root = [2,1,3]
// 输出：true
// root = [5,1,4,null,null,3,6]
// 输出：false
// 解释：根节点的值是 5 ，但是右子节点的值是 4 。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let arr = [];
  const buildArr = (root) => {
    console.log(1, root && root.val)

    if (root) {
      buildArr(root.left);
      arr.push(root.val);
      buildArr(root.right);
    }
  };
  buildArr(root);
  console.log("arr", arr);
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] <= arr[i - 1]) return false;
  }
  return true;
};

console.log(
  isValidBST(
    new TreeNode(
      5,
      new TreeNode(4),
      new TreeNode(6, new TreeNode(3), new TreeNode(7))
    )
  )
);

//   5
//  4 6
//   3 7

var pathSum = function (root, targetSum) {
  if (root == null) {
    return 0;
  }
  let ret = 0;
  ret = rootSum(root, targetSum);
  ret += pathSum(root.left, targetSum);
  ret += pathSum(root.right, targetSum);
  return ret;
};

const rootSum = (root, targetSum) => {
  let ret = 0;
  if (root == null) {
    return 0;
  }
  console.log(targetSum, root.val);
  if (targetSum === root.val) {
    ret++;
  }

  ret += rootSum(root.left, targetSum - root.val);
  ret += rootSum(root.right, targetSum - root.val);
  return ret;
};
