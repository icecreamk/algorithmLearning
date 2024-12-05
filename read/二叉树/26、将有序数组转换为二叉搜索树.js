// 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1


// 示例:
// 给定有序数组: [-10,-3,0,5,9],
// 返回如下的二叉搜索树：

// 以下两种都可以：
// 如果要分割的数组长度为偶数的时候，中间元素为两个，
// 是取左边元素 就是树2，取右边元素就是树1。

//     0
//    / \
//   -3  9
//  /   /
// -10  5


//     0
//    / \
//   -10  5
//     \   \
//      -3  9


// 不断中间分割，然后递归处理左区间，右区间，也可以说是分治。

var sortedArrayToBST = function (nums) {
  const buildTree = (Arr, left, right) => {
    if (left > right) return null;
    let mid = Math.floor(left + (right - left) / 2);

    let root = new TreeNode(Arr[mid]);
    root.left = buildTree(Arr, left, mid - 1);
    root.right = buildTree(Arr, mid + 1, right);
    return root;
  };
  return buildTree(nums, 0, nums.length - 1);
};
// 迭代;
var sortedArrayToBST = function (nums) {
  if (nums.length === 0) {
    return null;
  }
  let root = new TreeNode(0); //初始根节点
  let nodeQue = [root]; //放遍历的节点,并初始化
  let leftQue = [0]; //放左区间的下标,初始化
  let rightQue = [nums.length - 1]; // 放右区间的下标

  while (nodeQue.length) {
    let curNode = nodeQue.pop();
    let left = leftQue.pop();
    let right = rightQue.pop();
    let mid = left + Math.floor((right - left) / 2);

    curNode.val = nums[mid]; //将下标为mid的元素给中间节点

    //         处理左区间
    if (left <= mid - 1) {
      curNode.left = new TreeNode(0);
      nodeQue.push(curNode.left);
      leftQue.push(left);
      rightQue.push(mid - 1);
    }

    //         处理右区间
    if (right >= mid + 1) {
      curNode.right = new TreeNode(0);
      nodeQue.push(curNode.right);
      leftQue.push(mid + 1);
      rightQue.push(right);
    }
  }
  return root;
};
