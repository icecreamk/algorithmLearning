// 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
// 假设一个二叉搜索树具有如下特征：
//     节点的左子树只包含小于当前节点的数。
//     节点的右子树只包含大于当前节点的数。
//     所有左子树和右子树自身必须也是二叉搜索树。
// 示例 1:
//  2
// 1 3
// 输出:true
// 示例 2:
//   5
//  1 4
//   3 6
// 输出:false
// 解释:输入为:[5,1,4,null,null,3,6]。
// 根节点的值为5 ，但是其右子节点值为4。

// 验证二叉搜索树，就相当于变成了判断一个序列是不是递增的了
// 陷阱1:
// 不能单纯的比较左节点小于中间节点，右节点大于中间节点就完事了。
// 我们要比较的是 左子树所有节点小于中间节点，右子树所有节点大于中间节点
// 陷阱2：
// 在一个有序序列求最值的时候，不要定义一个全局变量，然后遍历序列更新全局变量求最值。因为最值可能就是int 或者 longlong的最小值。
// 推荐要通过前一个数值（pre）和后一个数值比较（cur），得出最值。

// 辅助数组解决
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let arr = [];
  const buildArr = (root) => {
    if (root) {
      buildArr(root.left);
      arr.push(root.val);
      buildArr(root.right);
    }
  };
  buildArr(root);
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i] <= arr[i - 1]) return false;
  }
  return true;
};

// 递归中解决
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
let pre1 = null;
var isValidBST = function (root) {
  let pre1 = null;
  const inOrder = (root) => {
    if (root === null) return true;
    let left = inOrder(root.left);
    if (pre1 !== null && pre1.val >= root.val) return false;
    pre1 = root;
    let right = inOrder(root.right);
    return left && right;
  };
  return inOrder(root);
};

// 迭代法:
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
let pre2 = null;
var isValidBST = function (root) {
  const queue = [];
  let cur = root;
  let pre2 = null;
  while (cur !== null || queue.length !== 0) {
    if (cur !== null) {
      queue.push(cur);
      cur = cur.left;
    } else {
      cur = queue.pop();
      if (pre2 !== null && cur.val <= pre2.val) {
        return false;
      }
      pre2 = cur;
      cur = cur.right;
    }
  }
  return true;
};
