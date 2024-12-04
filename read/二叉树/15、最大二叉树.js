// 给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

// 二叉树的根是数组中的最大元素。
// 左子树是通过数组中最大值左边部分构造出的最大二叉树。
// 右子树是通过数组中最大值右边部分构造出的最大二叉树。

// [3,2,1,6,0,5]
//      6
//   3     5
//    2   0
//     1

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  const BuildTree = (arr, left, right) => {
    if (left > right) return null;
    let maxValue = -1;
    let maxIndex = -1;
    for (let i = left; i <= right; ++i) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        maxIndex = i;
      }
    }
    let root = new TreeNode(maxValue);
    // 每次分隔尽量不要定义新的数组，而是通过下标索引直接在原数组上操作，这样可以节约时间和空间上的开销。
    root.left = BuildTree(arr, left, maxIndex - 1);
    root.right = BuildTree(arr, maxIndex + 1, right);
    return root;
  };
  let root = BuildTree(nums, 0, nums.length - 1);
  return root;
};
