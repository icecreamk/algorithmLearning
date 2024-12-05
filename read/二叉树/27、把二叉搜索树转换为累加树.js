// 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
// 提醒一下，二叉搜索树满足下列约束条件：
// 节点的左子树仅包含键 小于 节点键的节点。 节点的右子树仅包含键 大于 节点键的节点。 左右子树也必须是二叉搜索树。

// 输入
// [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
// 输出
// [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

//               4(30)
//             /       \
//          1(36)       6(21)
//         /   \         /   \
//       0(36)  2(35)  5(26)   7(15)
//               \              \
//               3(33)          8(8)

// 其实这就是一棵树，大家可能看起来有点别扭，换一个角度来看，这就是一个有序数组[2, 5, 13]，
// 求从后到前的累加数组，也就是[20, 18, 13]，是不是感觉这就简单了。

// 那么知道如何遍历这个二叉树，也就迎刃而解了，从树中可以看出累加的顺序是右中左，
// 所以我们需要反中序遍历这个二叉树，然后顺序累加就可以了

// 递归
var convertBST = function (root) {
  let pre = 0;
  const ReverseInOrder = (cur) => {
    if (cur) {
      ReverseInOrder(cur.right);
      cur.val += pre;
      pre = cur.val;
      ReverseInOrder(cur.left);
    }
  };
  ReverseInOrder(root);
  return root;
};
// 迭代
var convertBST = function (root) {
  let pre = 0;
  let cur = root;
  let stack = [];
  while (cur !== null || stack.length !== 0) {
    while (cur !== null) {
      stack.push(cur);
      cur = cur.right;
    }
    cur = stack.pop();
    cur.val += pre;
    pre = cur.val;
    cur = cur.left;
  }
  return root;
};
