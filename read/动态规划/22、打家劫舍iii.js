// 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
// 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

// 例子
// 示例 1:
// 输入: [3,2,3,null,3,null,1]
//    3
//   /  \
//  2    3
//   \    \
//    3    1

// 3+3+1=7

// 暴力
// class Solution {
//   public:
//       int rob(TreeNode* root) {
//           if (root == NULL) return 0;
//           if (root->left == NULL && root->right == NULL) return root->val;
//           // 偷父节点
//           int val1 = root->val;
//           if (root->left) val1 += rob(root->left->left) + rob(root->left->right); // 跳过root->left，相当于不考虑左孩子了
//           if (root->right) val1 += rob(root->right->left) + rob(root->right->right); // 跳过root->right，相当于不考虑右孩子了
//           // 不偷父节点
//           int val2 = rob(root->left) + rob(root->right); // 考虑root的左右孩子
//           return max(val1, val2);
//       }
//   };
//   时间复杂度：O(n^2)，这个时间复杂度不太标准，也不容易准确化，例如越往下的节点重复计算次数就越多
//   空间复杂度：O(log n)，算上递推系统栈的空间

// 记忆化递推
// 所以可以使用一个map把计算过的结果保存一下，这样如果计算过孙子了，那么计算孩子的时候可以复用孙子节点的结果。

// class Solution {
// public:
//     unordered_map<TreeNode* , int> umap; // 记录计算过的结果
//     int rob(TreeNode* root) {
//         if (root == NULL) return 0;
//         if (root->left == NULL && root->right == NULL) return root->val;
//         if (umap[root]) return umap[root]; // 如果umap里已经有记录则直接返回
//         // 偷父节点
//         int val1 = root->val;
//         if (root->left) val1 += rob(root->left->left) + rob(root->left->right); // 跳过root->left
//         if (root->right) val1 += rob(root->right->left) + rob(root->right->right); // 跳过root->right
//         // 不偷父节点
//         int val2 = rob(root->left) + rob(root->right); // 考虑root的左右孩子
//         umap[root] = max(val1, val2); // umap记录一下结果
//         return max(val1, val2);
//     }
// };
// 时间复杂度：O(n)
// 空间复杂度：O(log n)，算上递推系统栈的空间


// 动态规划
// 时间复杂度：O(n)，每个节点只遍历了一次
// 空间复杂度：O(log n)，算上递推系统栈的空间

const rob = root => {
  // 后序遍历函数
  const postOrder = node => {
      // 递归出口
      if (!node) return [0, 0];
      // 遍历左子树
      const left = postOrder(node.left);
      // 遍历右子树
      const right = postOrder(node.right);
      // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
      const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
      // 偷当前节点，左右子节点只能不偷
      const Do = node.val + left[0] + right[0];
      // [不偷，偷]
      return [DoNot, Do];
  };
  const res = postOrder(root);
  // 返回最大值
  return Math.max(...res);
};

// 记忆化后序遍历
// const memory: Map<TreeNode, number> = new Map();
// function rob(root: TreeNode | null): number {
//     if (root === null) return 0;
//     if (memory.has(root)) return memory.get(root);
//     // 不取当前节点
//     const res1: number = rob(root.left) + rob(root.right);
//     // 取当前节点
//     let res2: number = root.val;
//     if (root.left !== null) res2 += rob(root.left.left) + rob(root.left.right);
//     if (root.right !== null) res2 += rob(root.right.left) + rob(root.right.right);
//     const res: number = Math.max(res1, res2);
//     memory.set(root, res);
//     return res;
// };
