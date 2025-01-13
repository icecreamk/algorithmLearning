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

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 先序 + 前缀和
var pathSum = function (root, targetSum) {
  if (root === null) return 0;
  let map = new Map();
  map.set(0, 1); //考虑从根结点开始的合法路径
  return dfs(root, map, 0, targetSum);
};
const dfs = (root, map, cur, targetSum) => {
  //先序遍历
  if (root === null) return 0;
  let res = 0;
  cur += root.val; //更新当前路径前缀和
  res += map.get(cur - targetSum) || 0; //判断节点值之和等于targetSum = 判断两个节点路径差等于targetSum = 如果当前结点前缀和等于cur,那么另外一个节点前缀和为 cur - targetSum
  map.set(cur, (map.get(cur) || 0) + 1); //给前缀和为cur的情况计数加1
  res += dfs(root.left, map, cur, targetSum); //左子树的res
  res += dfs(root.right, map, cur, targetSum); //右子树res
  map.set(cur, (map.get(cur) || 0) - 1); //能执行到这说明此节点的子节点都遍历完了，要减去经过此节点得到的前缀和，避免对其它节点的子节点计算造成影响
  return res;
};

console.log(
  pathSum(
    new TreeNode(
      2,
      new TreeNode(1, new TreeNode(5), new TreeNode(7)),
      new TreeNode(6)
    ),
    8
  )
);

//     2
//    1 6
//   5 7
