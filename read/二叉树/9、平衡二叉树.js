// 给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
// 例子


// 二叉树节点的深度：指从根节点到该节点的最长简单路径边的条数。
// 二叉树节点的高度：指从该节点到叶子节点的最长简单路径边的条数。

//             节点高度  深度
//      1       4        1
//    2   8     3        2
//   0 4 7 9    2        3
//    3 5       1        4

// 根节点的高度，而根节点的高度就是这棵树的最大深度
// 因为求深度可以从上到下去查 所以需要前序遍历（中左右），而高度只能从下到上去查，所以只能后序遍历（左右中）

// 当然此题用迭代法，其实效率很低，因为没有很好的模拟回溯的过程，所以迭代法有很多重复的计算。
// 虽然理论上所有的递归都可以用迭代来实现，但是有的场景难度可能比较大。
// 例如：都知道回溯法其实就是递归，但是很少人用迭代的方式去实现回溯算法！
// 因为对于回溯算法已经是非常复杂的递归了，如果再用迭代的话，就是自己给自己找麻烦，效率也并不一定高。

// 递归法：
var isBalanced = function(root) {
    //还是用递归三部曲 + 后序遍历 左右中 当前左子树右子树高度相差大于1就返回-1
    // 1. 确定递归函数参数以及返回值
    const getDepth = function(node) {
        // 2. 确定递归函数终止条件
        if(node === null) return 0;
        // 3. 确定单层递归逻辑
        let leftDepth = getDepth(node.left); //左子树高度
        // 当判定左子树不为平衡二叉树时,即可直接返回-1
        if(leftDepth === -1) return -1;
        let rightDepth = getDepth(node.right); //右子树高度
        // 当判定右子树不为平衡二叉树时,即可直接返回-1
        if(rightDepth === -1) return -1;
        if(Math.abs(leftDepth - rightDepth) > 1) {
            return -1;
        } else {
            return 1 + Math.max(leftDepth, rightDepth);
        }
    }
    return !(getDepth(root) === -1);
};
// 迭代法：
// 这个函数通过栈模拟的后序遍历找每一个节点的高度（其实是通过求传入节点为根节点的最大深度来求的高度）
// 获取当前节点的高度
var getHeight = function (curNode) {
    let queue = [];
    if (curNode !== null) queue.push(curNode); // 压入当前元素
    let depth = 0, res = 0;
    while (queue.length) {
        let node = queue[queue.length - 1]; // 取出栈顶
        if (node !== null) {
            queue.pop();
            queue.push(node);   // 中
            queue.push(null);
            depth++;
            node.right && queue.push(node.right);   // 右
            node.left && queue.push(node.left);     // 左
        } else {
            queue.pop();
            node = queue[queue.length - 1];
            queue.pop();
            depth--;
        }
        res = res > depth ? res : depth;
    }
    return res;
}
var isBalanced = function (root) {
    if (root === null) return true;
    let queue = [root];
    while (queue.length) {
        let node = queue[queue.length - 1]; // 取出栈顶
        queue.pop();
        if (Math.abs(getHeight(node.left) - getHeight(node.right)) > 1) {
            return false;
        }
        node.right && queue.push(node.right);
        node.left && queue.push(node.left);
    }
    return true;
};