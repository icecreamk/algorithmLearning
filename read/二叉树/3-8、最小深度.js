
// 给定一个二叉树，找出其最小深度。

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

// 说明：叶子节点是指没有子节点的节点。
// 输入：root = [3,9,20,null,null,15,7]
// 输出：2
// 示例 2：

// 输入：root = [2,null,3,null,4,null,5,null,6]
// 输出：5


// **
//  * Definition for a binary tree node.
//  * function TreeNode(val, left, right) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.left = (left===undefined ? null : left)
//  *     this.right = (right===undefined ? null : right)
//  * }
//  */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root === null) return 0;
    let queue = [root];
    let depth = 0;
    while (queue.length) {
        let n = queue.length;
        depth++;
        for (let i=0; i<n; i++) {
            let node = queue.shift();
            // 如果左右节点都是null(在遇见的第一个leaf节点上)，则该节点深度最小
// 需要注意的是，只有当左右孩子都为空的时候，才说明遍历的最低点了。如果其中一个孩子为空则不是最低点

            if (node.left === null && node.right === null) {
                return depth;
            }
            node.left && queue.push(node.left);;
            node.right && queue.push(node.right);
        }
    }
    return depth;
};