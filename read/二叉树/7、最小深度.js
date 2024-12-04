// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。注意是叶子节点。

// 什么是叶子节点，左右孩子都为空的节点才是叶子节点！


// 递归法：
/**
    * @param {TreeNode} root
    * @return {number}
    */
var minDepth1 = function(root) {
    if(!root) return 0;
    // 到叶子节点 返回 1
    if(!root.left && !root.right) return 1;
    // 只有右节点时 递归右节点
    if(!root.left) return 1 + minDepth(root.right);
    // 只有左节点时 递归左节点
    if(!root.right) return 1 + minDepth(root.left);
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
// 迭代法：
/**
* @param {TreeNode} root
* @return {number}
*/
var minDepth = function(root) {
    if(!root) return 0;
    const queue = [root];
    let dep = 0;
    while(true) {
        let size = queue.length;
        dep++;
        while(size--){
            const node = queue.shift();
            // 到第一个叶子节点 返回 当前深度 
            if(!node.left && !node.right) return dep;
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
};