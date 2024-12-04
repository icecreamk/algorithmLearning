// 给出一个完全二叉树，求出该树的节点个数。

// 示例 1：

// 输入：root = [1,2,3,4,5,6]
// 输出：6
// 示例 2：

// 输入：root = []
// 输出：0
// 示例 3：

// 输入：root = [1]
// 输出：1

// 递归 
// 时间复杂度：O(n)
// 空间复杂度：O(log n)，算上了递归系统栈占用的空间

// 迭代
// 时间复杂度：O(n)
// 空间复杂度：O(n)


// 在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2^(h-1)  个节点。
// 完全二叉树只有两种情况，情况一：就是满二叉树，情况二：最后一层叶子节点没有满。
// 对于情况一，可以直接用 2^树深度 - 1 来计算，注意这里根节点深度为1。
// 对于情况二，分别递归左孩子，和右孩子，递归到某一深度一定会有左孩子或者右孩子为满二叉树，然后依然可以按照情况1来计算。


// 递归版本
var countNodes = function(root) {
    //递归法计算二叉树节点数
    // 1. 确定递归函数参数
    const getNodeSum = function(node) {
    //2. 确定终止条件
        if(node === null) {
            return 0;
        }
    //3. 确定单层递归逻辑
        let leftNum = getNodeSum(node.left);
        let rightNum = getNodeSum(node.right);
        return leftNum + rightNum + 1;
    }
    return getNodeSum(root);
};
// 迭代(层序遍历)版本
var countNodes = function(root) {
    //层序遍历
    let queue = [];
    if(root === null) {
        return 0;
    }
    queue.push(root);
    let nodeNums = 0;
    while(queue.length) {
        let length = queue.length;
        while(length--) {
            let node = queue.shift();
            nodeNums++;
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return nodeNums;
};
// 利用完全二叉树性质
var countNodes = function(root) {
    //利用完全二叉树的特点
    if(root === null) {
        return 0;
    }
    let left = root.left;
    let right = root.right;
    let leftDepth = 0, rightDepth = 0;
    while(left) {
        left = left.left;
        leftDepth++;
    }
    while(right) {
        right = right.right;
        rightDepth++;
    }
    if(leftDepth == rightDepth) {
        return Math.pow(2, leftDepth+1) - 1;
    }
    return countNodes(root.left) + countNodes(root.right) + 1;
};